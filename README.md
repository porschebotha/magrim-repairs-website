# Magrim Repairs Website

A modern, mobile-friendly one-page website for **Magrim Repairs** — a car rim
repair business in Windhoek, Namibia.

## Run it

It is a plain static site — no build step needed.

- Open `index.html` directly in a browser, **or**
- Serve the folder locally: `python3 -m http.server` then visit
  `http://localhost:8000`.

## Files

| File         | Purpose                                                         |
|--------------|-----------------------------------------------------------------|
| `index.html` | Page content and structure                                      |
| `styles.css` | Styling (dark automotive theme, responsive layout)              |
| `script.js`  | WhatsApp links, footer year, mobile menu, scroll animations     |

## Sections

Hero, About, Services, Work Gallery, Before & After, Customer Reviews, a
call-to-action banner, and Contact — plus a floating WhatsApp button.

## Things to customise

1. **WhatsApp number** — edit `CONFIG.whatsappNumber` in `script.js`
   (international format, digits only, e.g. `264811234567`).
2. **Logo** — replace the text logo in `index.html` (look for the
   `PLACEHOLDER` comment near `.brand`) with an `<img>` tag.
3. **Photos** — replace the `.media-placeholder` boxes in `index.html`
   with real `<img>` tags. They appear in the About, Gallery,
   Before & After, and Contact sections. Search the file for
   `PLACEHOLDER` to find each spot.
