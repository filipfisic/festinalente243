# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FESTINA LENTE 243 is a static one-page website for a Croatian travel agency (Ivan Forko). The site is in Croatian language. Domain: festinalente243.hr (hosted via GitHub Pages).

## Development

This is a plain HTML/CSS/JS project with no build tools, package manager, or framework. To develop:

- Open `index.html` directly in a browser
- No build step, no linting, no test suite
- Deploy target: GitHub Pages (static files served from root)

## Architecture

**Single-page structure** — everything lives in `index.html` with anchor-based navigation between sections: Hero → O meni (About) → Iduća putovanja (Upcoming trips) → Galerija (Gallery) → Recenzije (Testimonials) → Kontakt (Contact).

### CSS (3 files, loaded in order)
- `css/reset.css` — Box-sizing reset, reduced-motion media query
- `css/style.css` — All visual styles; uses CSS custom properties defined in `:root` for colors, fonts, spacing, and animations
- `css/responsive.css` — Breakpoints: ≤1199px (tablet), ≤767px (mobile), ≤480px (small mobile)

### JavaScript (`js/main.js`)
Single file, all code runs inside one `DOMContentLoaded` handler. Key systems:
- **Testimonials slider** — Manual (prev/next/dots) + auto-rotate every 5s
- **Benefits slider** — Mobile-only (≤767px) carousel with auto-play every 4s; shows all 4 items as grid on desktop
- **Gallery auto-rotation** — Shows 6 images at a time, rotates by 1 every 4s, pauses on hover
- **Days-until counter** — Calculates remaining days from `data-date` attributes on `.days-until` elements, updates hourly
- **Scroll animations** — IntersectionObserver-based fade-in for sections and elements
- **Sticky header** — Adds `.sticky` class after 100px scroll
- **Smooth scrolling** — Offsets by header height for anchor links
- **Parallax** — Hero background shifts at 0.5× scroll speed
- **Ripple effect** — Dynamically injected CSS + JS for button click animations

JS dynamically injects CSS via `document.createElement('style')` for animation classes (`.in-view`, `.ripple`).

### Design Tokens (CSS custom properties in `style.css`)
- Primary: `--primary-color: #f58d54` (orange)
- Secondary: `--secondary-color: #03152b` (dark blue)
- Card background: `--bg-card: #05243d`
- Heading font: Playfair Display / Body font: Open Sans (both loaded from Google Fonts CDN)
- Icons: Font Awesome 6.4.0 via CDN

## Content Conventions

- Trip dates are set via `data-date` attributes on both `.upcoming-card` and `.days-until` elements (format: `YYYY-MM-DD`)
- Social media links in header and footer currently point to `#` (placeholders)
- Contact phone number is placeholder: `+385 XX XXX XXXX`
