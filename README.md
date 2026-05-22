# Magrim Repairs Website

A modern, mobile-friendly one-page website for **Magrim Repairs** — an alloy
wheel repair specialist in Windhoek, Namibia.

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

Hero (with a full-bleed background image), About, Services, a swipeable photo
gallery carousel, Customer Reviews, a call-to-action banner, and Contact —
plus a floating WhatsApp button.

## Photos

Photos live in the `images/` folder. The hero background, the contact-section
image and the gallery all use the uploaded `car-*`, `rim-*` and `image-1`
files. See `images/README.md` for which image is used where and how to swap
them.

## Things to customise

1. **Facebook Page** — edit `CONFIG.facebookUrl` in `script.js` with the
   real Magrim Repairs Facebook Page URL.
2. **Logo** — `images/logo-1.jpg` / `logo-2.jpg` are available; replace the
   text logo in `index.html` (the `PLACEHOLDER` comment near `.brand`) with
   an `<img>` tag to use one.

The WhatsApp number, phone, email and address are already set to the real
Magrim Repairs details (`+264 81 124 1463`, `marius@magrimrepairs.com`,
225 Copper Street, Prosperita, Windhoek).
