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

## Adding photos

The site already references image files by name. Drop the photos into the
`images/` folder using the file names listed in `images/README.md` and they
appear automatically — no code changes needed. Until a file exists, a styled
placeholder is shown in its place.

Key files: `hero.jpg` (hero background), `image-1.jpg` (contact section),
`rim-1.jpg`…`rim-5.jpg` and `car-1.jpg`…`car-5.jpg` (gallery).

## Things to customise

1. **Facebook Page** — edit `CONFIG.facebookUrl` in `script.js` with the
   real Magrim Repairs Facebook Page URL.
2. **Logo** — replace the text logo in `index.html` (look for the
   `PLACEHOLDER` comment near `.brand`) with an `<img>` tag.
3. **Photos** — see `images/README.md`.

The WhatsApp number, phone, email and address are already set to the real
Magrim Repairs details (`+264 81 124 1463`, `marius@magrimrepairs.com`,
225 Copper Street, Prosperita, Windhoek).
