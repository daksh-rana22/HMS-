/**
 * OMEDO — Contact Form Backend
 * ─────────────────────────────
 * Receives form submissions from the frontend, validates and sanitises
 * the input, then sends a professional email to the owner via SMTP.
 *
 * Security measures:
 *   • helmet        — HTTP security headers
 *   • cors          — allowlist-only origins (no wildcard in production)
 *   • express-rate-limit — 10 requests / 15 min per IP
 *   • express-validator  — strict field validation
 *   • validator.escape   — HTML-entity sanitisation
 *   • honeypot field     — silent bot rejection
 *   • No credentials / stack traces returned to client
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import validator from 'validator';

// ─── Environment ─────────────────────────────────────────────────────────────

const {
  PORT = 5000,
  SMTP_HOST,
  SMTP_PORT = '587',
  SMTP_SECURE = 'false',
  SMTP_USER,
  SMTP_PASSWORD,
  OWNER_EMAIL,
  FRONTEND_URL,
  WEBSITE_URL,
} = process.env;

// Validate required env vars at startup — fail fast rather than at request time
const REQUIRED_VARS = [
  'SMTP_HOST',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'OWNER_EMAIL',
  'FRONTEND_URL',
  'WEBSITE_URL',
];
const missing = REQUIRED_VARS.filter((v) => !process.env[v]);
if (missing.length > 0) {
  console.error(
    `[STARTUP ERROR] Missing required environment variables: ${missing.join(', ')}\n` +
      'Please copy .env.example to .env and fill in all values.'
  );
  process.exit(1);
}

// ─── App Setup ───────────────────────────────────────────────────────────────

const app = express();

// Trust first proxy (needed for correct IP detection on Render, Railway, etc.)
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// ─── CORS ────────────────────────────────────────────────────────────────────
// Allow the production frontend URL plus localhost variants for development.
// No wildcard "*" in production.

const allowedOrigins = new Set([
  FRONTEND_URL.replace(/\/$/, ''), // e.g. https://www.omedo.in
]);

// Always allow localhost during development
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.add('http://localhost:5173');
  allowedOrigins.add('http://localhost:4173');
  allowedOrigins.add('http://localhost:3000');
  allowedOrigins.add('http://127.0.0.1:5173');
}

app.use(
  cors({
    origin(origin, callback) {
      // Allow server-to-server calls (origin is undefined) only in development
      if (!origin) {
        if (process.env.NODE_ENV !== 'production') return callback(null, true);
        return callback(new Error('CORS: Origin required in production'), false);
      }
      if (allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error(`CORS: Origin ${origin} is not allowed`), false);
    },
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// ─── Rate Limiting ───────────────────────────────────────────────────────────
// 10 requests per 15 minutes per IP — generous for real users, harsh for bots.

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please wait a few minutes before trying again.',
  },
});

// ─── Nodemailer Transport ────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === 'true', // true → SSL (port 465), false → STARTTLS (port 587)
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
  // Reject unauthorised TLS certs in production
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production',
  },
});

// Verify SMTP connection on startup
transporter.verify((err) => {
  if (err) {
    console.error('[SMTP] Connection verification failed:', err.message);
    console.error(
      '[SMTP] The server will still start, but emails will fail until SMTP is configured correctly.'
    );
  } else {
    console.log('[SMTP] Connection verified — ready to send mail.');
  }
});

// ─── Validation Rules ────────────────────────────────────────────────────────

const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 120 }).withMessage('Name must be 120 characters or fewer.'),

  body('mobile')
    .trim()
    .notEmpty().withMessage('Mobile number is required.')
    .isLength({ min: 7, max: 25 }).withMessage('Please enter a valid mobile number.'),

  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Please enter a valid email address.')
    .isLength({ max: 254 }).withMessage('Email Address is too long.'),

  body('facility')
    .trim()
    .notEmpty().withMessage('Hospital / Clinic Name is required.')
    .isLength({ max: 200 }).withMessage('Hospital / Clinic Name must be 200 characters or fewer.'),

  body('location')
    .trim()
    .notEmpty().withMessage('Location is required.')
    .isLength({ max: 200 }).withMessage('Location must be 200 characters or fewer.'),

  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 5000 }).withMessage('Message must be 5000 characters or fewer.'),

  // Honeypot — must be empty (bots fill it, real users never see it)
  body('website')
    .optional()
    .custom((value) => {
      if (value && value.trim() !== '') {
        throw new Error('Spam detected.');
      }
      return true;
    }),
];

// ─── Email Builder ────────────────────────────────────────────────────────────

function buildEmailHTML({ name, mobile, email, facility, location, message }) {
  const safeMessage = message ? validator.escape(message).replace(/\n/g, '<br/>') : '<em>No message provided</em>';
  const displayEmail = email ? `<a href="mailto:${email}" style="color:#008378;text-decoration:none;font-weight:500;">${email}</a>` : '<span style="color:#888;">Not provided</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Enquiry — Talk to Us About OMEDO</title>
</head>
<body style="margin:0;padding:0;background:#f0fafb;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fafb;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,104,94,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#00685e 0%,#009e8f 100%);padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">
                New Enquiry — Talk to Us About OMEDO
              </h1>
              <p style="margin:6px 0 0;color:#b2f0ea;font-size:13px;">
                Received via the OMEDO website enquiry form
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 24px;font-size:15px;line-height:24px;color:#2c3e3c;">
                      A new enquiry has been submitted through the website. Details are provided below:
                    </p>
                  </td>
                </tr>

                <!-- Details Box -->
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0fafb;border-radius:8px;border:1px solid #d4eff1;margin-bottom:24px;">
                      <tr>
                        <td style="padding:14px 20px;border-bottom:1px solid #e0f4f6;width:38%;font-size:13px;font-weight:600;color:#00685e;">
                          Name
                        </td>
                        <td style="padding:14px 20px;border-bottom:1px solid #e0f4f6;font-size:14px;color:#1a2e2b;font-weight:600;">
                          ${name}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 20px;border-bottom:1px solid #e0f4f6;font-size:13px;font-weight:600;color:#00685e;">
                          Mobile
                        </td>
                        <td style="padding:14px 20px;border-bottom:1px solid #e0f4f6;font-size:14px;color:#1a2e2b;font-weight:600;">
                          <a href="tel:${mobile}" style="color:#008378;text-decoration:none;">${mobile}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 20px;border-bottom:1px solid #e0f4f6;font-size:13px;font-weight:600;color:#00685e;">
                          Email
                        </td>
                        <td style="padding:14px 20px;border-bottom:1px solid #e0f4f6;font-size:14px;color:#1a2e2b;">
                          ${displayEmail}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 20px;border-bottom:1px solid #e0f4f6;font-size:13px;font-weight:600;color:#00685e;">
                          Hospital / Clinic Name
                        </td>
                        <td style="padding:14px 20px;border-bottom:1px solid #e0f4f6;font-size:14px;color:#1a2e2b;font-weight:600;">
                          ${facility}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 20px;font-size:13px;font-weight:600;color:#00685e;">
                          Location
                        </td>
                        <td style="padding:14px 20px;font-size:14px;color:#1a2e2b;font-weight:600;">
                          ${location}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message Box -->
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#00685e;text-transform:uppercase;letter-spacing:0.5px;">
                      Message / Requirements
                    </p>
                    <div style="background:#fafefe;border-left:4px solid #008378;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;font-size:14px;line-height:22px;color:#2c3e3c;white-space:pre-wrap;word-break:break-word;">
                      ${safeMessage}
                    </div>
                  </td>
                </tr>

                <!-- Quick Action Buttons -->
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <a href="tel:${mobile}"
                       style="display:inline-block;background:linear-gradient(135deg,#00685e 0%,#009e8f 100%);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:24px;letter-spacing:0.2px;box-shadow:0 4px 12px rgba(0,104,94,0.25);margin-right:10px;">
                      Call ${name} (${mobile})
                    </a>
                    ${email ? `<a href="mailto:${email}?subject=Re:%20OMEDO%20Enquiry%20—%20${encodeURIComponent(facility)}" style="display:inline-block;background:#f0fafb;color:#00685e;border:1px solid #b2f0ea;font-size:14px;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:24px;">Email</a>` : ''}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f0fafb;padding:20px 40px;border-top:1px solid #e0f7f5;">
              <p style="margin:0;font-size:12px;color:#7a9a97;text-align:center;">
                This email was generated automatically by the OMEDO website enquiry form.<br/>
                Do not reply to this automated message — use the buttons above instead.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText({ name, mobile, email, facility, location, message }) {
  return [
    'NEW ENQUIRY — TALK TO US ABOUT OMEDO',
    '='.repeat(50),
    '',
    `Name:                   ${name}`,
    `Mobile:                 ${mobile}`,
    `Email:                  ${email || 'Not provided'}`,
    `Hospital / Clinic Name: ${facility}`,
    `Location:               ${location}`,
    '',
    'Message / Requirements:',
    '-'.repeat(50),
    message || 'No message provided',
    '-'.repeat(50),
    '',
    `Website: ${WEBSITE_URL}`,
    '',
    '='.repeat(50),
    'This email was generated automatically by the OMEDO website enquiry form.',
  ].join('\n');
}

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health probe — for deployment platforms (Render, Railway, Fly.io, etc.)
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'omedo-contact-backend' });
});

// Contact form endpoint
app.post(
  '/api/contact',
  contactLimiter,
  contactValidationRules,
  async (req, res) => {
    // ── 1. Honeypot check (fast reject before validation overhead)
    const honeypot = req.body.website;
    if (honeypot && honeypot.trim() !== '') {
      // Silent 200 to bots — they won't know they've been rejected
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    }

    // ── 2. Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please check your form details',
        // Return field-level hints to the client (no server internals)
        fields: errors.array().map((e) => ({ field: e.path, hint: e.msg })),
      });
    }

    // ── 3. Extract and normalise inputs
    const name = validator.escape(req.body.name.trim());
    const mobile = validator.escape(req.body.mobile.trim());
    const email = req.body.email && req.body.email.trim() ? (validator.normalizeEmail(req.body.email.trim()) || req.body.email.trim()) : '';
    const facility = validator.escape(req.body.facility.trim());
    const location = validator.escape(req.body.location.trim());
    const message = req.body.message ? req.body.message.trim() : '';

    // ── 4. Send email
    try {
      const mailOptions = {
        from: `"OMEDO Website" <${SMTP_USER}>`,
        to: OWNER_EMAIL,
        subject: `New Enquiry from ${name} — ${facility} (${location})`,
        text: buildEmailText({ name, mobile, email, facility, location, message }),
        html: buildEmailHTML({ name, mobile, email, facility, location, message }),
      };

      if (email) {
        mailOptions.replyTo = `"${name}" <${email}>`;
      }

      await transporter.sendMail(mailOptions);

      console.log(`[CONTACT] Enquiry sent | Facility: "${facility}" (${location}) | Contact: ${name} (${mobile})`);

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully',
      });
    } catch (smtpErr) {
      // Log full error server-side but NEVER send it to the client
      console.error('[CONTACT] SMTP send failed:', smtpErr.message);

      return res.status(500).json({
        success: false,
        message: 'Unable to send your message right now',
      });
    }
  }
);

// ─── 404 / Error Handlers ────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  // CORS errors surface here
  if (err.message && err.message.startsWith('CORS:')) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  console.error('[SERVER ERROR]', err.message);
  return res.status(500).json({ success: false, message: 'Internal server error' });
});

// ─── Start ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`[SERVER] OMEDO contact backend running on port ${PORT}`);
  console.log(`[SERVER] Allowed origin: ${FRONTEND_URL}`);
  console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
});
