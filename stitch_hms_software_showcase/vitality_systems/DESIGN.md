---
name: Vitality Systems
colors:
  surface: '#effcfe'
  surface-dim: '#d0dcdf'
  surface-bright: '#effcfe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf6f8'
  surface-container: '#e4f0f2'
  surface-container-high: '#deeaed'
  surface-container-highest: '#d9e5e7'
  on-surface: '#121d1f'
  on-surface-variant: '#3d4947'
  inverse-surface: '#273234'
  inverse-on-surface: '#e7f3f5'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685e'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#67d9ca'
  secondary: '#2d685e'
  on-secondary: '#ffffff'
  secondary-container: '#afecde'
  on-secondary-container: '#326c62'
  tertiary: '#555e5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d7675'
  on-tertiary-container: '#f5fefc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#85f5e6'
  primary-fixed-dim: '#67d9ca'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#b2eee1'
  secondary-fixed-dim: '#97d2c5'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#0e5046'
  tertiary-fixed: '#dbe4e2'
  tertiary-fixed-dim: '#bfc8c7'
  on-tertiary-fixed: '#151d1c'
  on-tertiary-fixed-variant: '#404847'
  background: '#effcfe'
  on-background: '#121d1f'
  surface-variant: '#d9e5e7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is engineered for the modern healthcare sector, prioritizing clarity, accessibility, and a sense of calm reliability. The visual language blends **Corporate/Modern** precision with **Glassmorphism** accents to suggest a high-tech, forward-thinking medical environment that remains approachable to patients and practitioners alike.

The target audience includes healthcare administrators, medical professionals, and patients who require information to be organized with extreme logic. The emotional response should be one of "effortless efficiency"—reducing the cognitive load of complex medical data through generous whitespace, soft gradients, and a refreshing minty palette.

## Colors

The palette is derived from medical aesthetics: sterile but warm.

*   **Primary (#129B8E):** A deep teal used for primary actions, branding, and critical navigation. It conveys professional authority.
*   **Secondary (#A9E5D8):** A soft mint green used for highlights, secondary buttons, and success states. It adds a layer of "freshness" to the UI.
*   **Tertiary (#F0F9F7):** A barely-there mint wash used for section backgrounds and large containers to prevent "stark white" eye strain.
*   **Neutral (#1E292B):** A dark charcoal with a slight blue tint for typography and borders, ensuring high legibility without the harshness of pure black.
*   **Accent/Surface:** Pure white (#FFFFFF) is reserved for the highest level of the elevation stack (cards and modals) to create a clean, high-contrast reading experience.

## Typography

This design system utilizes **Plus Jakarta Sans** for its geometric yet friendly appearance, which softens the "clinical" nature of healthcare software. For utility-heavy interfaces like data tables and labels, **Inter** is used for its superior legibility at small sizes.

Typographic hierarchy relies on significant weight differences (Bold vs. Regular) rather than just size changes. Headlines should always use tighter letter spacing to maintain a "tight," high-tech feel, while body text uses a generous 1.5–1.6 line height to facilitate reading of long medical reports or patient histories.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with fixed maximum widths for readability on ultra-wide monitors. 

*   **Grid:** A 12-column grid system is used for desktop (breakpoints at 1440px and 1024px) and a 4-column grid for mobile (375px). 
*   **Whitespace:** Generous padding (MD and LG) is mandated between sections to provide "breathing room," which is psychologically associated with better care and less chaos.
*   **Reflow:** On mobile, side-by-side card layouts reflow into a single-column vertical stack. Navigation moves from a top-bar to a bottom-tab bar for easier reachability in a clinical setting.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and **Tonal Layers**.

1.  **Background Layer:** The base surface uses the Tertiary mint (#F0F9F7).
2.  **Mid Layer (Cards):** Pure white cards with a subtle 1px border (#E0E8E6) and a very soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.04)).
3.  **Top Layer (Modals/Popovers):** Higher elevation using a stronger shadow (0px 10px 40px rgba(18, 155, 142, 0.1)) to draw focus.
4.  **Glassmorphism:** Navigation bars and sticky headers use a backdrop-blur (12px) with 80% opacity white, allowing the primary brand colors to peek through as the user scrolls, creating a sense of depth and continuity.

## Shapes

The shape language is consistently **Rounded**. Square corners are avoided to minimize visual "sharpness," reinforcing the approachable nature of the brand.

*   **Standard Elements (Buttons, Inputs):** Use a 0.5rem (8px) radius.
*   **Containers (Cards, Modals):** Use a 1rem (16px) radius for a modern, friendly feel.
*   **Decorative Elements:** Icons and avatars should follow a circular or highly rounded super-ellipse container.

## Components

*   **Buttons:** Primary buttons are solid Teal (#129B8E) with white text. Secondary buttons use a ghost style with a Mint border (#A9E5D8) and Teal text. Use "Pill" shapes for action-oriented CTAs to make them feel "tappable."
*   **Input Fields:** Large tap targets with 16px internal padding. Focus states should use a 2px Mint (#A9E5D8) outer glow.
*   **Chips:** Used for patient status (e.g., "Stable," "In-Review"). These should have low-saturation backgrounds derived from the status color with high-contrast text.
*   **Cards:** The core of the healthcare UI. Cards should have a "Header" section with a light grey separator line. Content inside cards should follow the 8px spacing grid strictly.
*   **Lists:** High-density lists (for lab results) should use zebra-striping with the Tertiary color (#F0F9F7) rather than borders to reduce visual noise.
*   **Progress Indicators:** Use the Mint green (#A9E5D8) for positive progress and the Primary Teal for active steps.