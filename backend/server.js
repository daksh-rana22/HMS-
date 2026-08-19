/**
 * Omedo HMS — Contact Form Backend
 * ─────────────────────────────────
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
    .notEmpty().withMessage('Full Name is required.')
    .isLength({ max: 120 }).withMessage('Full Name must be 120 characters or fewer.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email Address is required.')
    .isEmail().withMessage('Email Address must be a valid email.')
    .isLength({ max: 254 }).withMessage('Email Address is too long.'),

  body('facility')
    .trim()
    .notEmpty().withMessage('Healthcare Facility Name is required.')
    .isLength({ max: 200 }).withMessage('Healthcare Facility Name must be 200 characters or fewer.'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters.'),

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

function buildEmailHTML({ name, email, facility, message }) {
  const safe = {
    name: validator.escape(name),
    email: validator.escape(email),
    facility: validator.escape(facility),
    message: validator.escape(message).replace(/\n/g, '<br/>'),
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Contact Enquiry</title>
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
                New Contact Enquiry
              </h1>
              <p style="margin:6px 0 0;color:#b2f0ea;font-size:13px;">
                Received via the Omedo HMS website contact form
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <!-- Full Name -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#00685e;">
                      Full Name
                    </p>
                    <p style="margin:0;font-size:16px;color:#121d1f;font-weight:600;">
                      ${safe.name}
                    </p>
                  </td>
                </tr>

                <!-- Email Address -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#00685e;">
                      Email Address
                    </p>
                    <p style="margin:0;font-size:16px;color:#121d1f;">
                      <a href="mailto:${safe.email}" style="color:#00685e;text-decoration:none;font-weight:600;">
                        ${safe.email}
                      </a>
                    </p>
                  </td>
                </tr>

                <!-- Healthcare Facility -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#00685e;">
                      Healthcare Facility
                    </p>
                    <p style="margin:0;font-size:16px;color:#121d1f;font-weight:600;">
                      ${safe.facility}
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <div style="height:1px;background:linear-gradient(90deg,#e0f7f5,#00685e22,#e0f7f5);"></div>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#00685e;">
                      Message
                    </p>
                    <div style="background:#f8fffe;border-left:3px solid #00685e;border-radius:0 8px 8px 0;padding:16px 20px;font-size:15px;color:#3d4947;line-height:1.7;">
                      ${safe.message}
                    </div>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding-bottom:20px;">
                    <div style="height:1px;background:linear-gradient(90deg,#e0f7f5,#00685e22,#e0f7f5);"></div>
                  </td>
                </tr>

                <!-- Website -->
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:#00685e;">
                      Website
                    </p>
                    <p style="margin:0;font-size:14px;">
                      <a href="${WEBSITE_URL}" style="color:#00685e;text-decoration:none;">
                        ${WEBSITE_URL}
                      </a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 40px 32px;">
              <a href="mailto:${safe.email}"
                 style="display:inline-block;background:#00685e;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;padding:12px 28px;border-radius:50px;letter-spacing:0.2px;">
                Reply to ${safe.name}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f0fafb;padding:20px 40px;border-top:1px solid #e0f7f5;">
              <p style="margin:0;font-size:12px;color:#7a9a97;text-align:center;">
                This email was generated automatically by the Omedo HMS website contact form.<br/>
                Do not reply to this automated message — use the button above instead.
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

function buildEmailText({ name, email, facility, message }) {
  return [
    'NEW CONTACT ENQUIRY — OMEDO HMS',
    '='.repeat(50),
    '',
    `Full Name:            ${name}`,
    `Email Address:        ${email}`,
    `Healthcare Facility:  ${facility}`,
    '',
    'Message:',
    '-'.repeat(50),
    message,
    '-'.repeat(50),
    '',
    `Website: ${WEBSITE_URL}`,
    '',
    '='.repeat(50),
    'This email was generated automatically by the Omedo HMS website contact form.',
    'Reply directly to this email to contact the visitor.',
  ].join('\n');
}

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health probe — for deployment platforms (Render, Railway, Fly.io, etc.)
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'omedo-hms-contact-backend' });
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
    const email = validator.normalizeEmail(req.body.email.trim()) || req.body.email.trim();
    const facility = validator.escape(req.body.facility.trim());
    const message = req.body.message.trim(); // escape happens inside buildEmailHTML

    // ── 4. Send email
    try {
      await transporter.sendMail({
        from: `"Omedo HMS Website" <${SMTP_USER}>`,
        to: OWNER_EMAIL,
        replyTo: `"${name}" <${email}>`,
        subject: `New Website Enquiry — ${facility}`,
        text: buildEmailText({ name, email, facility, message }),
        html: buildEmailHTML({ name, email, facility, message }),
      });

      console.log(`[CONTACT] Email sent | Facility: "${facility}" | From: ${email}`);

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
  console.log(`[SERVER] Omedo HMS contact backend running on port ${PORT}`);
  console.log(`[SERVER] Allowed origin: ${FRONTEND_URL}`);
  console.log(`[SERVER] Environment: ${process.env.NODE_ENV || 'development'}`);
});
