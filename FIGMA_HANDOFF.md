# Figma-ready design handoff — Kiprop Haggai Portfolio

> The connected Figma integration available in this workspace can inspect and render existing Figma files, but does not expose file creation or editing. This document records the implemented visual system and component behaviour for recreation in an editable Figma file.

## Brand direction
- Mood: confident, grounded, editorial, human-centred, contemporary East African development practice.
- Core palette: Deep Teal `#102D2A`; Ink `#10201F`; Teal `#17665D`; Teal Light `#2D8A7C`.
- Energy accents: Warm Coral `#FF765F`; Amber `#F5B64C`.
- Surfaces: Off-white `#F6F5F0`; Warm Cream `#EEE9DD`; White `#FFFEFA`; muted text `#65716C`; divider `#DCDED6`.
- Typography: Manrope 400–800 for display/headings; DM Sans 400–700 for UI/body; Playfair Display 500 italic for editorial emphasis.
- Radius: 14–22 px; pill controls 999 px; spacing based on 8 px rhythm.

## Figma pages and frames
1. `00 — Foundations`: colour styles, text styles, spacing, grid, radii, shadows, icon/arrow treatment.
2. `01 — Desktop`: Home 1440×1024; Projects index 1440×1024; Project detail 1440×1200; About 1440×1200; Contact 1440×1024.
3. `02 — Mobile`: Home 390×844; Projects 390×844; Detail 390×844; About 390×844; Contact 390×844.
4. `03 — Components`: Header / desktop and mobile; primary, dark and outline buttons; category chips; project card; metric tile; timeline row; project KPI; photo figure; contact card; footer.
5. `04 — Prototype`: Home → Projects; Projects → Project detail; Detail → Projects; Header → Experience / About / Contact; mobile menu open/close; category filter and search states.

## Layout system
- Desktop content max-width: 1240 px, 28 px outer gutters. Tablet: 24 px. Mobile: 20 px.
- Header: 82 px desktop, 70 px mobile; sticky with translucent off-white surface and blur.
- Hero: deep teal full-bleed field, two-column desktop composition; oversized display typography; orbit graphic as a simple editable vector group; stacked layout on mobile.
- Section spacing: 105 px desktop, 78 px tablet, 65 px mobile.
- Project index: 2-column card grid desktop; 1-column mobile. Case detail: main narrative + sticky metadata rail desktop; single column mobile.

## Interaction and motion
- Route transitions: 420 ms ease-out fade + 18 px upward settle; exit 180 ms; use reduced-motion fallback.
- Cards: 6 px lift and subtle shadow; image scale 1.045.
- Filter chips: deep-teal selected state with white label. Search filters cards in place.
- Navigation: active underline coral; mobile drawer expands beneath header.
- Focus ring: 3 px coral with 4 px offset. All controls have visible keyboard focus.

## Content and image treatment
- Use the original Google Drive school/WASH photographs in the project case study; keep captions and descriptive alt text.
- Do not use the archived bed-condition photograph in public-facing pages; use only infrastructure and school-environment imagery.
- Programme outcomes and proposal targets must remain visually distinct and retain their explanatory notes.
