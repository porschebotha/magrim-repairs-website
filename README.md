# Magrim Repairs Website

A modern, mobile-friendly one-page website for **Magrim Repairs** — an
aluminum wheel repair specialist in Windhoek, Namibia.

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

## Formspree setup (customer reviews)

The customer review form sends each submission to **Formspree**, which emails
it to the business and lists it in the Formspree dashboard. Until Formspree is
set up, the form still works and shows the review on the visitor's own device,
but nothing is emailed.

Follow these steps once — no coding required:

1. **Create a Formspree account**
   - Go to <https://formspree.io/> and sign up (the free plan is enough for a
     small business).
   - Use the business email `marius@magrimrepairs.com` so review emails arrive
     in the right inbox.

2. **Create a form**
   - Click **+ New form**, name it e.g. `Magrim Reviews`.
   - Confirm the email address that should receive the reviews.

3. **Copy the form endpoint URL**
   - Formspree shows an endpoint that looks like
     `https://formspree.io/f/abcdefgh`.

4. **Paste the endpoint into the site**
   - Open `script.js` and find the `FORMSPREE_ENDPOINT` line near the top
     (just under the `FORMSPREE CONFIGURATION` comment block).
   - Replace the whole `https://formspree.io/f/YOUR_FORM_ID` placeholder with
     your real endpoint URL.
   - Commit and push — GitHub Pages redeploys and review submissions are now
     emailed to the business.

5. **First submission**
   - Formspree asks you to confirm the form the first time it receives a
     submission. Submit one test review and click the confirmation link in the
     email Formspree sends you.

What the form sends to Formspree: the **customer name**, **star rating** and
**review message**.

Built-in spam protection: a hidden honeypot field (`_gotcha`, which Formspree
also recognises), a 30-second cooldown between submissions on the same device,
and length validation on every field.

Note: Formspree delivers reviews to the business inbox/dashboard — it does not
publish them back onto the site automatically. The three example review cards
are part of `index.html`; to feature a real review, copy one of those cards
and edit its name, stars and text.
