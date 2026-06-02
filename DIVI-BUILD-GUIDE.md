# Magrim Repairs — Divi Build Guide

A step-by-step Divi page structure for rebuilding the Magrim Repairs site
inside WordPress. The site is built as a **single Home page** with stacked
sections (best for a small workshop business). Each section is described
with exact module choices, content, colour values and mobile notes.

---

## 0. Prerequisites

| Step | Action |
|------|--------|
| 1 | Install WordPress on the host. |
| 2 | Buy/install the **Divi Theme** from Elegant Themes. Activate. |
| 3 | Install plugins: **WPForms Lite** (optional, simpler form), **WP Mail SMTP** (deliverable email). Divi has its own Contact Form module — fine to use. |
| 4 | Pages → **Add New**, title `Home`. Click **Use The Divi Builder → Build From Scratch**. |
| 5 | Settings → Reading → set this page as the **Static homepage**. |
| 6 | Appearance → Menus → create primary nav with anchor links: `#hero`, `#about`, `#services`, `#gallery`, `#reviews`, `#location`, `#contact`. |

---

## 1. Global Divi settings

**Divi → Theme Customizer**

| Setting | Value |
|---------|-------|
| Body background | `#0F1115` |
| Body text colour | `#B0B0B0` |
| Heading text colour | `#FFFFFF` |
| Body font | Inter (Google Font) |
| Heading font | Sora (Google Font) |
| Section padding (top/bottom) | 100 px desktop / 60 px tablet / 50 px mobile |
| Container width | 1180 px |

**Divi → Theme Options → General**

- Primary colour: `#1E90FF` (only used as a small highlight)
- Button text colour: `#FFFFFF`
- Button background colour: `#1E90FF`
- Button border radius: `8 px`

**Theme Customizer → Header & Navigation**

- Style: Default centered logo OR left-logo (left looks more workshop-modern).
- Background: `#0F1115`
- Menu link colour: `#FFFFFF`
- Hover colour: `#1E90FF`
- Add the Magrim logo (transparent PNG, ~120 px tall) to **Logo**.

> **Tip**: define your colour palette once under Divi → Theme Customizer →
> **Colour Schemes**, then every module's colour picker remembers them.

### Palette reference

| Token | Hex | Where it is used |
|-------|-----|------------------|
| Deep charcoal | `#0F1115` | Main background, header, footer |
| Dark grey | `#171A21` | Alternating section background, cards |
| Metallic silver | `#C0C0C0` | Section eyebrows, subtle dividers, icons |
| Electric blue | `#1E90FF` | Small accents, link hover, primary button |
| White | `#FFFFFF` | Headings, button labels, key text |
| Light grey | `#B0B0B0` | Body copy, captions |

---

## 2. Section background rhythm

Top to bottom on the Home page:

| # | Section | Background |
|---|---------|------------|
| 1 | Hero | Image with `#0F1115` dark overlay |
| 2 | About | `#171A21` (dark grey) |
| 3 | Services | `#0F1115` (deep charcoal) |
| 4 | Gallery | `#171A21` |
| 5 | Reviews | `#0F1115` |
| 6 | Location | `#171A21` |
| 7 | Contact | `#0F1115` |
| 8 | Footer | `#0B0D11` (a hair darker for finality) |

Alternating dark / darker grey is set per **Section → Background → Colour**.

---

## 3. Page build — section by section

For every section: open Divi Builder → **Add Section → Regular** (or
**Specialty/Fullwidth** where noted). Inside each, add rows + modules as
described.

---

### Section 1 · Hero (Fullwidth Header)

**Type**: Fullwidth Section → **Fullwidth Header Module**

**Why**: gives the cinematic hero feel without manually stacking rows.

**Module settings**

| Field | Value |
|-------|-------|
| Title | `Expert Alloy Wheel Repairs in Windhoek` |
| Subhead | `Repairs · Refurbishment · Customisation` |
| Body | `Magrim Repairs restores damaged, buckled and scuffed alloy wheels for passenger cars, motorcycles and quad bikes — fast, professional workmanship you can trust.` |
| Button 1 text | `WhatsApp Us` |
| Button 1 link | `https://wa.me/264811241272?text=Hello%20Magrim%20Repairs%2C%20I%20would%20like%20a%20quote.` (open in new tab) |
| Button 2 text | `View Services` |
| Button 2 link | `#services` |
| Background image | A wide automotive workshop photo (`hero.jpg`, ~1920×1080) |
| Background overlay colour | `#0F1115` at **65 %** opacity |
| Text alignment | **Left** |
| Minimum height | `92 vh` (Design → Sizing → Min Height) |

**Design tab**

- Title font: Sora 700, **64 px** desktop / 44 px tablet / 32 px mobile
- Title colour: `#FFFFFF`
- Subhead colour: `#1E90FF` (the only spot of blue in the hero)
- Body colour: `#C0C0C0`, font size 18 px
- Button 1: solid `#1E90FF`, white text, 18 px padding y / 32 px x, radius 8 px
- Button 2: transparent, white text, 1 px white border, radius 8 px

**Mobile**

- Set Min Height → 78 vh on Phone.
- Reduce title size to 32 px on Phone.
- Both buttons stack full width.

---

### Section 2 · About Magrim Repairs

**Section settings** — background `#171A21`, custom padding 100/60/50 px.

**Row** — 2 columns (2/3 + 1/3 on desktop, 1 column on tablet & phone).

**Left column · Text Module**

```
Eyebrow (small uppercase, silver):     ABOUT MAGRIM REPAIRS
Heading (H2, white):                   Over 25 years of alloy wheel craftsmanship
Body (light grey):                     Magrim Repairs is a well-established alloy wheel specialist based in Windhoek, Namibia. We offer expert repairs, customisation and refurbishment for all makes of alloy wheels.

With over 25 years of experience, we have built a reputation for honest advice and professional workmanship. We service passenger cars, motorcycles and quad bikes — bringing damaged, buckled and scuffed wheels back to life.

For quotes and inquiries you can speak directly to Marius, who will guide you through the best repair option.
```

**Below the body — Blurb stack (4 blurbs in a 2×2 row on desktop, 1 column on mobile)**

Use 4 **Blurb Modules** (Image/Icon = Divi icon, no graphic), titles only:

1. **25+ years of alloy wheel experience**
2. **Repairs, customisation and refurbishment under one roof**
3. **Honest advice — talk directly to Marius**
4. **Friendly, professional local service**

- Blurb icon: simple check-circle, colour `#1E90FF`
- Blurb title: white, 16 px, bold
- Background of each blurb: `#0F1115`, padding 18 px, border radius 12 px

**Right column · Image Module**

- Image: the Magrim Repairs logo on dark background (`logo-2.png`) or a workshop photo.
- Border radius: 16 px, slight box-shadow `0 12px 40px rgba(0,0,0,0.5)`.

---

### Section 3 · Services

**Section settings** — background `#0F1115`, padding 100/60/50.

**Row 1** — full width, centred heading.

- **Text Module**
  - Eyebrow (silver, uppercase): `OUR SERVICES`
  - H2 (white): `What we do best`
  - Body (light grey, max-width 600 px): `Expert repairs, customisation and refurbishment for all makes of alloy wheels.`

**Row 2** — **3 equal columns** on desktop, 1 column on mobile. One **Blurb Module** per column.

| # | Title | Body |
|---|-------|------|
| 1 | **Wheel Straightening & Welding** | Professional repairs for buckled, cracked or severely damaged rims, straightened and welded back to a safe, true condition. |
| 2 | **Refurbishment & Customisation** | Restoring scuffed or curb-damaged alloy wheels, plus custom paint finishes for a fresh, personalised look. |
| 3 | **Vehicle Compatibility** | Alloy wheel services for passenger cars, motorcycles and quad bikes — all makes welcome. |

**Per blurb styling**

- Use **Icon** (not image). Pick a Divi icon: wrench, sparkle, car.
- Icon colour: `#1E90FF`
- Icon size: 48 px, placed above title.
- Card background: `#171A21`
- Padding: 32 px
- Border radius: 14 px
- Box shadow: `0 16px 40px rgba(0,0,0,0.5)`
- Hover (Design → Hover): scale 1.03, border-top 3 px solid `#1E90FF`.
- Title: Sora 700, 22 px, uppercase, white.
- Body: Inter 400, 16 px, `#B0B0B0`.

**Row 3** — full-width CTA strip.

- **Text + Button row** (use a Row with 2 columns: 2/3 text + 1/3 button).
- Text: `Send us photos of your damaged rims for a quote.`
- Button: `Get a Quote` → `https://wa.me/264811241272?text=Hello%20Magrim%20Repairs%2C%20I%20would%20like%20a%20quote.`
- Background: `#171A21` row background, border-left `4 px solid #1E90FF`, padding 24 px, radius 16 px.

---

### Section 4 · Gallery

**Section settings** — background `#171A21`, padding 100/60/50.

**Row 1** — single column, centred heading text.

- Eyebrow (silver): `OUR WORK`
- H2 (white): `Recent rim repair jobs`
- Body (light grey): `A look at completed alloy wheel repairs from the Magrim Repairs workshop. Tap a photo for a full-screen view.`

**Row 2** — **Gallery Module**

| Setting | Value |
|---------|-------|
| Images | Upload all your `car-*.jpg` photos via Media Library |
| Layout | **Grid** |
| Images per page | 12 (with pagination off if you have fewer than 12) |
| Show title & caption | Off |
| Show pagination | Off (or on if more than 12) |
| Image hover overlay | Icon `zoom`, colour `#1E90FF` |
| Background overlay opacity | 70 % |
| Border radius (per image) | 12 px |

**Design tab**

- Custom CSS (in Module → Advanced → Custom CSS → Main Element):
  ```
  .et_pb_gallery_item img { transition: transform .4s ease; }
  .et_pb_gallery_item:hover img { transform: scale(1.06); }
  ```
- Mobile: 1 column on Phone, 2 columns on Tablet.

> If you want the single-large-image slideshow look instead of a grid,
> swap the Gallery Module for the **Slider Module** (one image per slide,
> auto-rotate every 5 s, dot pagination only).

---

### Section 5 · Reviews / Testimonials

**Section settings** — background `#0F1115`, padding 100/60/50.

**Row 1** — heading text.

- Eyebrow: `WHAT OUR CLIENTS SAY`
- H2: `Trusted by drivers across Windhoek`

**Row 2** — **3 columns**, one **Testimonial Module** per column.

Per Testimonial module:

| Field | Example for #1 |
|-------|----------------|
| Author | `Tangeni N.` |
| Job title | `Windhoek` |
| Body | `Hit a pothole and badly buckled my rim. Magrim straightened it perfectly and it drives true again. Highly recommended.` |
| Quote icon background | `#1E90FF` |
| Background colour | `#171A21` |
| Border radius | 16 px |
| Box shadow | `0 16px 40px rgba(0,0,0,0.55)` |
| Body text colour | `#B0B0B0` |
| Author colour | `#FFFFFF` |
| Stars | Use the **Star Rating Module** below the body (5 stars, blue `#1E90FF`). |

Reviews 2 and 3:

- **Maria S. / Windhoek** — `My alloys were full of curb scuffs. They came back refurbished and looking brand new. Friendly service and a fair price.`
- **Johannes K. / Windhoek** — `Sent photos on WhatsApp and Marius replied quickly with a quote. Honest advice and proper professional work.`

**Row 3** — leave-a-review CTA.

- Text: `Were we good to your wheels? Let us know.`
- Button: `Leave a Review` → link to your Google review URL (`https://g.page/r/...`).

> **Submission form (optional)**: if you want visitors to submit reviews
> straight to your inbox without Google, add a **Contact Form Module**
> with fields *Name*, *Star rating (radio)*, *Review*. Connect it to your
> email under the form's Email settings.

---

### Section 6 · Our Location

**Section settings** — background `#171A21`, padding 100/60/50.

**Row 1** — heading text.

- Eyebrow: `FIND US`
- H2: `Our workshop in Prosperita`
- Body: `Our workshop is in Prosperita, just minutes from central Windhoek, at 225 Copper Street. Come by anytime for alloy wheel repairs, refurbishment and customisation — or send us photos on WhatsApp first for a quick quote.`

**Row 2** — **2 columns** (1/3 info + 2/3 map). Stack on tablet & mobile.

**Left column · Text Module (info card)**

Build as a single Text Module with HTML, OR three stacked Text Modules
inside a column with row-background `#0F1115`, padding 32 px, border-left
`4 px solid #1E90FF`, border-radius 16 px.

```
WORKSHOP ADDRESS
225 Copper Street
Prosperita, Windhoek
Namibia

──────────────────

PHONE & WHATSAPP
+264 81 124 1272

──────────────────

WORKSHOP HOURS
Monday – Friday, business hours.
Call ahead for weekend appointments.
```

Below the info, place two buttons side by side:

| Button | Link | Style |
|--------|------|-------|
| `Find Us` (Get Directions) | `https://www.google.com/maps/dir/?api=1&destination=225+Copper+Street,+Prosperita,+Windhoek,+Namibia` | Solid `#1E90FF`, white text |
| `WhatsApp Us` | `https://wa.me/264811241272` | Solid `#171A21`, white text, white 1 px border |

**Right column · Map Module**

- Open the **Map Module**.
- Add a pin: Title `Magrim Repairs`, Address `225 Copper Street, Prosperita, Windhoek, Namibia`. Divi will geocode.
- Zoom level: 15.
- Disable mouse-wheel zoom (so the page doesn't accidentally scroll the map).
- Border radius: 16 px (Module → Design → Border).
- Box shadow: `0 24px 60px rgba(0,0,0,0.55)`.
- Map type: Roadmap.
- Optional: under Custom CSS, apply a dark-mode filter:
  ```
  .et_pb_map { filter: grayscale(0.4) contrast(0.95) brightness(0.85); }
  ```

> **Map alternative without a Google API key**: replace the Map Module
> with a **Code Module** containing this iframe — works on plain
> WordPress with no key:
> ```html
> <iframe src="https://maps.google.com/maps?q=225+Copper+Street,+Prosperita,+Windhoek,+Namibia&output=embed"
>         width="100%" height="380" style="border:0;border-radius:16px"
>         loading="lazy" referrerpolicy="no-referrer-when-downgrade"
>         allowfullscreen></iframe>
> ```

---

### Section 7 · Contact

**Section settings** — background `#0F1115`, padding 100/60/50.

**Row 1** — heading.

- Eyebrow: `GET IN TOUCH`
- H2: `Send us a photo for a quote`
- Body: `Send photos of your damaged rims on WhatsApp or fill in the form. Marius will reply with a quote and next steps.`

**Row 2** — **2 columns** (1/2 + 1/2), stack on mobile.

**Left column · Contact details (Text + Buttons)**

Use a stack of small **Blurb Modules** (no icon, or use small Divi icon
in `#1E90FF`):

| Label | Value |
|-------|-------|
| Contact person | Marius |
| Phone / WhatsApp | `+264 81 124 1272` (linked: `tel:+264811241272`) |
| Email | `marius@magrimrepairs.com` (linked: `mailto:...`) |
| Address | 225 Copper Street, Prosperita, Windhoek, Namibia |

Underneath, **two Button Modules**:

- `WhatsApp Us` → `https://wa.me/264811241272` (open in new tab) — solid blue.
- `Call Marius` → `tel:+264811241272` — outlined white.

**Right column · Contact Form Module**

Field list:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full Name | Text | Yes | maxlength 60 |
| Phone | Text | Yes | placeholder `e.g. 081 124 1272` |
| Email | Email | No | for replies |
| Vehicle | Text | No | e.g. `2018 Polo` |
| Service needed | Select | Yes | options: *Wheel Straightening, Refurbishment, Custom Paint, Inspection, Other* |
| Message | Textarea | Yes | maxlength 600 |

**Form settings**

- Submit button text: `Get a Quote`
- Email recipient: `marius@magrimrepairs.com`
- Custom subject: `New quote request — Magrim Repairs website`
- Enable **Anti-spam** (default Divi captcha) → set to on.
- Success message: `Thanks! We'll get back to you shortly.`

**Form styling**

- Input background: `#171A21`, text white, border 1 px `#2A2D34`, focus border `#1E90FF`.
- Border radius on inputs and submit: 10 px.
- Field padding: 14 px / 16 px.
- Field gap: 14 px.
- Submit button: full width, solid `#1E90FF`, white text.

---

### Section 8 · Footer

Divi has a **Theme Builder → Footer** template. Build it there once and
it'll appear on every page.

- Background: `#0B0D11` (a touch darker than body).
- Row 1: 3 columns:
  - Column 1: Magrim logo + tagline `Expert alloy wheel repairs in Windhoek.`
  - Column 2: Contact (address + phone + WhatsApp link)
  - Column 3: Quick links (Home, About, Services, Gallery, Reviews, Location, Contact)
- Top border: 3 px solid `#1E90FF`.
- Row 2 (small): `© {year} Magrim Repairs — 225 Copper Street, Prosperita, Windhoek.` Light grey text.

---

## 4. Buttons — reusable patterns

Save these as Divi **Global Presets** (Module → "Save to Library" → set as
Global so all instances update together).

| Button name | Background | Text colour | Border | Use |
|-------------|------------|-------------|--------|-----|
| `btn-primary` | `#1E90FF` | `#FFFFFF` | none | WhatsApp Us, Get a Quote, Find Us |
| `btn-outline` | transparent | `#FFFFFF` | 1 px white | View Services, secondary actions |
| `btn-dark` | `#171A21` | `#FFFFFF` | 1 px `#2A2D34` | Tertiary buttons on light cards (rare in this dark theme) |

Padding: 16 px / 32 px desktop, 14 px / 24 px mobile. Border radius 8 px.

---

## 5. Floating "WhatsApp Us" button (sticky)

Add via Divi → **Theme Builder → Global Header** → drop a **Button
Module** at the bottom, then in **Advanced → Custom CSS**:

```
position: fixed;
right: 24px;
bottom: 24px;
z-index: 9999;
padding: 14px 22px;
border-radius: 999px;
background: #1E90FF;
color: #fff;
font-weight: 700;
box-shadow: 0 14px 28px rgba(30,144,255,0.45);
```

Link: `https://wa.me/264811241272`. Make sure **Open in new window** is on.

---

## 6. Mobile responsiveness — checklist

For every section, open the module → **Design → Spacing / Sizing →
Tablet/Phone tabs**:

- Reduce H2 size by ~25 % on tablet and ~40 % on phone.
- Stack all multi-column rows to single column on phone.
- Reduce section padding from 100/100 desktop to 60/60 tablet, 50/50 phone.
- Buttons become full width on phone for tap comfort.
- Map: keep min-height 320 px on phone, 380 px desktop.
- Hide blurb hover effects on phone (Design → Hover tab → Show on Hover = off).

Run Divi's built-in **Responsive Preview** (small device icons at the top
of the Visual Builder) and double-check each section at all three sizes.

---

## 7. Make it easy for the client to edit

| Where the client edits | How |
|------------------------|-----|
| Text on any section | Front-end (logged in): hover the text, click the pencil icon, type, save. |
| Replace a gallery photo | WP Admin → Media → Add new. Then Pages → Home → open Gallery Module → reselect images. |
| Change the phone number / WhatsApp link | Open every Button with a `wa.me/` URL or `tel:` URL, update the number. Tip: set the phone as a **Divi Global Variable** under Theme Customizer → Custom CSS variables so it lives in one place. |
| Add a service | Duplicate one of the Service blurb modules in the Services row, edit title + body. |
| Add a new testimonial | Duplicate a Testimonial Module in the Reviews row. |
| Update the map pin | Open the Map Module, edit the pin's address; Divi re-geocodes automatically. |

> **Strong recommendation**: turn on **Divi → Theme Options → Builder →
> Advanced → Static CSS File Generation** for speed.

---

## 8. Reusable section blueprint (copy into Divi → Library)

After building the first time, save these to the **Divi Library** so the
client can drop them onto future pages:

- *Hero / Fullwidth header*
- *About row*
- *Services 3-card grid*
- *Gallery grid*
- *Testimonial trio*
- *Location info + map*
- *Contact form*
- *Footer*

Each saved as **Layout** with **Global** off (so editing one doesn't
affect the others) but you can re-import them anywhere.

---

## 9. Quick content reference

| Item | Value |
|------|-------|
| Business name | Magrim Repairs |
| Location | 225 Copper Street, Prosperita, Windhoek, Namibia |
| Contact person | Marius |
| Phone / WhatsApp | `+264 81 124 1272` |
| WhatsApp URL | `https://wa.me/264811241272` |
| Email | `marius@magrimrepairs.com` (suggested) |
| Tagline | Expert alloy wheel repairs in Windhoek |
| Tone | Premium, professional, automotive, trustworthy |

---

## 10. Build order checklist

1. Install Divi, set up global colours and fonts.
2. Build the **Theme Builder Header** (logo, nav, sticky WhatsApp).
3. Build the **Theme Builder Footer**.
4. Build the **Home page** section by section in the order above.
5. Save each finished section to the **Divi Library**.
6. Preview at Desktop / Tablet / Phone — fix spacing.
7. Connect the Contact Form Module to `marius@magrimrepairs.com` and
   test a real submission.
8. Add SEO meta (Yoast or Rank Math): title `Magrim Repairs — Alloy
   Wheel Repairs in Windhoek`, description `Specialist alloy wheel
   repair and refurbishment in Prosperita, Windhoek. Over 25 years of
   experience. Send photos on WhatsApp for a quote.`
9. Launch.

---

*This guide is meant to be opened in Divi side by side with WordPress.
Each section above corresponds 1:1 to a Divi Section, with explicit
modules and styles called out so nothing is left to guesswork.*
