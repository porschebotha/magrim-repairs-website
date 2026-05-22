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

Hero, About, Services, a swipeable photo gallery carousel, Customer Reviews,
a call-to-action banner, and Contact — plus a floating WhatsApp button.

## Things to customise

1. **Facebook Page** — edit `CONFIG.facebookUrl` in `script.js` with the
   real Magrim Repairs Facebook Page URL.
2. **Logo** — replace the text logo in `index.html` (look for the
   `PLACEHOLDER` comment near `.brand`) with an `<img>` tag.
3. **Photos** — replace the `.media-placeholder` boxes in `index.html`
   with real `<img>` tags. They appear in the About section, the Gallery
   carousel (6 job photos), and the Contact section. Search the file for
   `PLACEHOLDER` to find each spot.

The WhatsApp number, phone, email and address are already set to the real
Magrim Repairs details (`+264 81 124 1463`, `marius@magrimrepairs.com`,
225 Copper Street, Prosperita, Windhoek).
