# Magrim Repairs Website

A modern, mobile-friendly one-page website for **Magrim Repairs** — a car rim
repair business in Windhoek, Namibia.

## Run it

It is a plain static site — no build step needed.

- Open `index.html` directly in a browser, **or**
- Serve the folder locally: `python3 -m http.server` then visit
  `http://localhost:8000`.

## Files

| File         | Purpose                                            |
|--------------|----------------------------------------------------|
| `index.html` | Page content and structure                         |
| `styles.css` | Styling (dark automotive theme, responsive layout) |
| `script.js`  | WhatsApp links, footer year, mobile menu           |

## Things to customise

1. **WhatsApp number** — edit `CONFIG.whatsappNumber` in `script.js`
   (international format, digits only, e.g. `264811234567`).
2. **Logo** — replace the text logo in `index.html` (look for the
   `PLACEHOLDER` comment near `.brand`) with an `<img>` tag.
3. **Photos** — replace the `.media-placeholder` boxes in `index.html`
   (About and Contact sections) with real `<img>` tags. Search the file
   for `PLACEHOLDER` to find each spot.
