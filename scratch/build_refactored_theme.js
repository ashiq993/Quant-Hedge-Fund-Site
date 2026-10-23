const fs = require('fs');
const path = require('path');

const orig = fs.readFileSync(path.join(__dirname, '../assets/css/two-sigma-theme.css'), 'utf8');
const lines = orig.split('\n');

function sliceLines(start, end) {
  return lines.slice(start - 1, end).join('\n').trim();
}

// Build the modules cleanly with comments and Table of Contents
const toc = `/* ==========================================================================
   GODSPEEDINVEST - TWO SIGMA THEME SYSTEM (OPTIMIZED & REFACTORED)
   ==========================================================================
   TABLE OF CONTENTS:
   01. Fonts & CSS Design Variables
   02. Base Resets & Global Typography (Inter Everywhere)
   03. Header, Navigation System & Dropdowns
   04. Buttons, Interactive Controls & Preloader
   05. Theme Palettes, Shapes, Elevation & Dark Mode
   06. Hero Sections & Breadcrumb Banners
   07. Citadel Content Grid / What We Do Section
   08. Home Page Opportunities & Capabilities
   09. Institutional Gated Portal Gateway (Newsletter CTA)
   10. Two Sigma Stats Section (Numbers & Metrics)
   11. Careers & Culture Module (Stages & Benefits)
   12. About Page & Global Reach Module
   13. Insights & Blog Article System
   14. Testimonials Panel & Team Grids
   15. Page Layout Alignments (Securities, Timeline, Accordions)
   16. FAQ & Utility Accordions
   17. Partnerships Logo Marquee
   18. Global Footer Module
   ========================================================================== */`;

const mod1 = `/* ==========================================================================
   01. FONTS & CSS DESIGN VARIABLES
   ========================================================================== */
${sliceLines(1, 81)}`;

const mod2 = `/* ==========================================================================
   02. BASE RESETS & GLOBAL TYPOGRAPHY (INTER EVERYWHERE)
   ========================================================================== */
${sliceLines(82, 144)}

/* Enhanced Whitespace & Typography Scale */
${sliceLines(1906, 1983)}

/* Global Body Text & Legibility: Inter (Weight 400 Regular) */
${sliceLines(3679, 3698)}

/* Enforce BOLD for Who We Are section title */
${sliceLines(3772, 3784)}

/* Priority Sections High-Legibility & Inter Font Enforcement */
${sliceLines(4187, 4251)}

/* Accessibility, Focus States & Smooth Scrolling */
${sliceLines(2160, 2180)}

${sliceLines(3366, 3388)}`;

const mod3 = `/* ==========================================================================
   03. HEADER, NAVIGATION SYSTEM & DROPDOWNS
   ========================================================================== */
/* Header Navigation Bar & Sticky Scroll Behavior */
${sliceLines(3003, 3056)}

/* Header Navigation Bar & Alignment Fix */
${sliceLines(3057, 3166)}

/* Submenu Dropdown Left-to-Right Alignment Fix */
${sliceLines(3167, 3248)}

/* Remove dark blue top border from nav submenus */
${sliceLines(4356, 4364)}

/* 2x3 Format Navigation Preview Dropdown */
${sliceLines(493, 571)}

/* Custom Header Logo Text and Spacing Overrides */
${sliceLines(1787, 1840)}

/* Color Palette Selector & Dark/Light Mode Buttons */
${sliceLines(1841, 1905)}

/* Global Logo Resizing (Header, Sticky Nav, Footer, and Sidebar) */
${sliceLines(1448, 1456)}

/* Move the logo container in the header right */
${sliceLines(1475, 1478)}`;

const mod4 = `/* ==========================================================================
   04. BUTTONS, INTERACTIVE CONTROLS & PRELOADER
   ========================================================================== */
/* Pill Shapes for Interactive Items */
${sliceLines(610, 660)}

/* Primary CTA Button Color Styling & Hover States */
${sliceLines(729, 739)}

/* Enhanced Button Consistency */
${sliceLines(2145, 2159)}

/* Send Message Pill Button UI Theme */
${sliceLines(3389, 3449)}

/* Ensure hover text is always white on buttons & sidebar links */
${sliceLines(3785, 3795)}

/* Scroll-to-Top Button */
${sliceLines(715, 728)}

/* Permanently Disable Loading Screen / Preloader Site-Wide */
${sliceLines(3796, 3806)}

/* Hide Pagination Navigation Bar Site-Wide */
${sliceLines(3807, 3813)}`;

const mod5 = `/* ==========================================================================
   05. THEME PALETTES, SHAPES, ELEVATION & DARK MODE
   ========================================================================== */
/* Global Theme Colors & Dark Mode */
${sliceLines(572, 609)}

/* Shadows & Elevation */
${sliceLines(661, 704)}

/* Brand Accent Colors & Interactive Fills */
${sliceLines(705, 714)}
${sliceLines(740, 752)}

/* Card Component Consistency */
${sliceLines(2077, 2116)}

/* Force White Color on Body Paragraphs Inside Dark Navy Sidebar Cards */
${sliceLines(4149, 4186)}

/* Brand Teal (#007084) Consistency for Checkmarks & Number Badges */
${sliceLines(4379, 4392)}`;

const mod6 = `/* ==========================================================================
   06. HERO SECTIONS & BREADCRUMB BANNERS
   ========================================================================== */
/* Two Sigma Hero Section - Exact Match */
${sliceLines(2181, 2306)}

/* Full-Bleed Gradient Hero / Breadcrumbs */
${sliceLines(753, 865)}

/* Section Header & Blog Breadcrumb Hero */
${sliceLines(3814, 3891)}`;

const mod7 = `/* ==========================================================================
   07. CITADEL CONTENT GRID / WHAT WE DO SECTION
   ========================================================================== */
${sliceLines(184, 492)}`;

const mod8 = `/* ==========================================================================
   08. HOME PAGE OPPORTUNITIES & CAPABILITIES
   ========================================================================== */
/* Opportunities Callout Banner */
${sliceLines(866, 1008)}

/* Capabilities Section & Cards */
${sliceLines(1009, 1058)}

/* Section Title Two Sigma Style */
${sliceLines(2425, 2462)}

/* Hide Identify / Backtest / Execute Box */
${sliceLines(4365, 4371)}`;

const mod9 = `/* ==========================================================================
   09. INSTITUTIONAL GATED PORTAL GATEWAY (NEWSLETTER CTA)
   ========================================================================== */
.cta-newsletter-section {
  background-image: url('../img/home-1/cta-newsletter.jpg') !important;
  background-size: cover !important;
  background-position: center center !important;
  padding: 60px 0 !important;
  position: relative !important;
  width: 100% !important;
  max-width: 100% !important;
  border-radius: 0 !important;
  margin: 0 !important;
}

.cta-newsletter-wrapper {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  flex-wrap: wrap !important;
  gap: 30px !important;
}

.cta-newsletter-wrapper h2,
.cta-newsletter-section .tx-title,
.cta-newsletter-section .sec_title,
.cta-newsletter-section h2 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-size: 38px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  color: #ffffff !important;
  margin: 0 !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35) !important;
}

.cta-newsletter-section .tx-title span,
.cta-newsletter-section .sec_title span,
.cta-newsletter-section h2 span,
.cta-newsletter-wrapper h2 span {
  color: #FFFFFF !important;
}

.newsletter-form {
  max-width: 480px !important;
  width: 100% !important;
}

.newsletter-form p,
.cta-newsletter-section .cta-newsletter-wrapper p,
.cta-newsletter-wrapper .newsletter-form p,
.cta-newsletter-section .newsletter-form p {
  color: #ffffff !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  margin-bottom: 10px !important;
  line-height: 1.4 !important;
  text-shadow: none !important;
  -webkit-font-smoothing: antialiased !important;
}

.newsletter-form form {
  background: #ffffff !important;
  border-radius: 50px !important;
  padding: 4px 6px 4px 20px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2) !important;
  width: 100% !important;
  height: 52px !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

.newsletter-form form input {
  border: none !important;
  outline: none !important;
  background: transparent !important;
  color: #1e293b !important;
  font-size: 14px !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  flex: 1 !important;
  padding: 0 10px 0 0 !important;
  height: 100% !important;
  margin: 0 !important;
  box-shadow: none !important;
}

.newsletter-form form input::placeholder {
  color: #94a3b8 !important;
}

.newsletter-form form button.email-btn,
.newsletter-form form button[type="submit"] {
  width: 42px !important;
  height: 42px !important;
  min-width: 42px !important;
  min-height: 42px !important;
  border-radius: 50% !important;
  background: #001A33 !important;
  color: #ffffff !important;
  border: none !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
  cursor: pointer !important;
  margin: 0 !important;
  padding: 0 !important;
  line-height: 1 !important;
  transition: background 0.25s ease !important;
}

.newsletter-form form button.email-btn:hover,
.newsletter-form form button[type="submit"]:hover {
  background: #007084 !important;
}

.newsletter-form form button.email-btn i,
.newsletter-form form button[type="submit"] i {
  font-size: 15px !important;
  color: #ffffff !important;
  line-height: 1 !important;
  margin: 0 !important;
}`;

const mod10 = `/* ==========================================================================
   10. TWO SIGMA STATS SECTION (NUMBERS & METRICS)
   ========================================================================== */
.twosigma-stats-section {
  background: #ffffff !important;
  padding: 60px 0 !important;
}

.twosigma-stats-section .twosigma-stat-item {
  text-align: center !important;
  padding: 0 !important;
}

.twosigma-stats-section .twosigma-stat-item h2 {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-size: 54px !important;
  font-weight: 700 !important;
  color: #000000 !important;
  margin-bottom: 12px !important;
  letter-spacing: -1.5px !important;
  white-space: nowrap !important;
}

.twosigma-stats-section .twosigma-stat-item h2,
.twosigma-stats-section .twosigma-stat-item h2 *,
.twosigma-stats-section .twosigma-stat-item h2 span,
.twosigma-stats-section .twosigma-stat-item h2 span.count,
.twosigma-stats-section .twosigma-stat-item h2 span.tilde-sym,
.twosigma-stats-section .twosigma-stat-item h2 strong,
.twosigma-stats-section .twosigma-stat-item h2 b,
.tilde-sym {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  font-weight: 700 !important;
}

.twosigma-stats-section .twosigma-stat-item p,
.twosigma-stat-item p {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
  font-size: 14.5px !important;
  font-weight: 400 !important;
  color: #475569 !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}

@media (max-width: 991px) {
  .twosigma-stats-section .twosigma-stat-item h2 {
    font-size: 42px !important;
  }
}

@media (max-width: 767px) {
  .twosigma-stats-section .twosigma-stat-item h2 {
    font-size: 36px !important;
  }
  .twosigma-stats-section .twosigma-stat-item p {
    font-size: 14px !important;
  }
}`;

const mod11 = `/* ==========================================================================
   11. CAREERS & CULTURE MODULE (STAGES & BENEFITS)
   ========================================================================== */
/* Career Stages Section */
${sliceLines(2117, 2144)}

/* Career Stage Cards */
${sliceLines(3251, 3301)}

/* Benefit Cards */
${sliceLines(3302, 3344)}

/* Service Box Item Headings */
${sliceLines(3345, 3365)}`;

const mod12 = `/* ==========================================================================
   12. ABOUT PAGE & GLOBAL REACH MODULE
   ========================================================================== */
${sliceLines(3450, 3678)}

/* Fix About Page Location Link Button Text White on Hover */
${sliceLines(4032, 4081)}`;

const mod13 = `/* ==========================================================================
   13. INSIGHTS & BLOG ARTICLE SYSTEM
   ========================================================================== */
${sliceLines(2631, 2964)}

/* Hide Tagcloud Tags Section Across Blog Details Pages */
.tagcloud,
.tag-share-wrap .tagcloud {
  display: none !important;
}`;

const mod14 = `/* ==========================================================================
   14. TESTIMONIALS PANEL & TEAM GRIDS
   ========================================================================== */
/* Team Section & 3x3 Photo Grid */
${sliceLines(1133, 1196)}

/* Insights Gradient Banner */
${sliceLines(1197, 1301)}

/* Two Sigma Testimonials Panel Styles (4x4 Grid) */
${sliceLines(1302, 1447)}

/* Testimonial slider same-height alignment */
${sliceLines(1480, 1503)}

/* Ultra-Minimal Card Style */
${sliceLines(2307, 2377)}`;

const mod15 = `/* ==========================================================================
   15. PAGE LAYOUT ALIGNMENTS (SECURITIES, TIMELINE, ACCORDIONS)
   ========================================================================== */
${sliceLines(1504, 1786)}`;

const mod16 = `/* ==========================================================================
   16. FAQ & UTILITY ACCORDIONS
   ========================================================================== */
${sliceLines(4347, 4355)}

/* Make FAQ question numbers match question text color */
${sliceLines(4372, 4378)}`;

const mod17 = `/* ==========================================================================
   17. PARTNERSHIPS LOGO MARQUEE
   ========================================================================== */
${sliceLines(4252, 4346)}`;

const mod18 = `/* ==========================================================================
   18. GLOBAL FOOTER MODULE
   ========================================================================== */
.footer-section {
  position: relative !important;
  border-radius: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  background-color: #001A33 !important;
  color: #FFFFFF !important;
}

.footer-area {
  background-color: #001A33 !important;
  color: #FFFFFF !important;
  margin: 0 !important;
  border-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}

@media (max-width: 1399px) {
  .footer-area,
  .footer-section {
    margin: 0 !important;
    border-radius: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

${sliceLines(2474, 2630)}`;

const refactoredCSS = [
  toc,
  mod1,
  mod2,
  mod3,
  mod4,
  mod5,
  mod6,
  mod7,
  mod8,
  mod9,
  mod10,
  mod11,
  mod12,
  mod13,
  mod14,
  mod15,
  mod16,
  mod17,
  mod18
].join('\n\n');

fs.writeFileSync(path.join(__dirname, 'two-sigma-theme.refactored.css'), refactoredCSS, 'utf8');
console.log('Refactored CSS written successfully!');
console.log('Refactored Lines:', refactoredCSS.split('\n').length);
console.log('Refactored Bytes:', Buffer.byteLength(refactoredCSS, 'utf8'));
