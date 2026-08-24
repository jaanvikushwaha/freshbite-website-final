# FreshBite Café — Final Refined Website (Week 5)

This is the final, fully tested version of the FreshBite Café responsive website, produced at the end of a 5-week design-to-development internship project.

## Project history

| Week | Milestone |
|---|---|
| 1–2 | Wireframes → high-fidelity visual mockups |
| 3 | Built as responsive HTML/CSS/JavaScript (no frameworks) |
| 4 | Heuristic UI/UX evaluation (Nielsen's 10 heuristics + WCAG 2.1 AA) — 6 issues found and fixed |
| 5 | **This version.** Final regression QA pass (38 automated checks across 8 screen widths, both pages) — found and fixed 1 additional horizontal-overflow bug at 320px width |

See `FreshBite_Design_Documentation_Report.pdf` (in the submission alongside this code) for the full design process, challenges, tools used, and reflections.

## What changed in this final pass (v2 → v2.1)

- Fixed a flexbox intrinsic-sizing bug causing 20px of horizontal overflow on the homepage at 320px viewport width (iPhone SE / smallest common Android width)
- Added a dedicated `max-width: 340px` breakpoint to keep the header (logo + cart + Order Now + hamburger) from crowding on very small phones
- Added a defensive `overflow-x: hidden` on `<body>` as a safety net against future regressions
- Ran a full 38-point automated regression suite (console errors, link integrity, interactivity, menu filters, touch target sizing, horizontal overflow) across both pages — **38/38 passing**

Every change is marked with an inline `/* v2 fix: ... */` or `/* v2.1 fix (final QA): ... */` comment explaining the original issue and reasoning.

## Structure

```
freshbite-website-final/
├── index.html      — Homepage
├── menu.html        — Menu subpage
├── css/style.css    — All styles + responsive media queries (4 breakpoints: 960px, 700px, 420px, 340px)
├── js/script.js      — All interactivity
└── README.md
```

## How to run

Open `index.html` directly in a browser, or serve locally:

```bash
python3 -m http.server 8000
```

## Tested & verified

- **Browsers:** Chromium (Chrome/Edge/Opera/Android WebView) — fully automated. Firefox/WebKit could not be binary-tested in this environment (no network access for browser downloads), but the codebase uses only broadly-supported baseline CSS/JS features (Grid, Flexbox, `clamp()`, `aspect-ratio`, `:focus-visible`, standard ES6) with no vendor-specific APIs.
- **Screen widths:** 320px, 360px, 375px, 414px, 768px, 820px, 1024px, 1440px — no horizontal overflow on any.
- **Interactivity:** mobile nav toggle, add-to-cart (counter + toast), testimonial slider, menu category filters, footer "coming soon" links — all verified via automated click-and-assert tests, not just visual inspection.
