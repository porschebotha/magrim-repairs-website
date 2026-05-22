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

## Firebase setup (customer reviews)

The customer reviews section can store reviews permanently in **Firebase
Firestore** so they are shared with every visitor. Until Firebase is set up,
the form still works but saves reviews only in each visitor's own browser.

Follow these steps once — no coding required:

1. **Create a project**
   - Go to <https://console.firebase.google.com/> and sign in with a Google
     account.
   - Click **Add project**, name it (e.g. `magrim-repairs`), and finish the
     wizard. Google Analytics is optional.

2. **Register a Web app**
   - On the project overview page, click the **`</>` (Web)** icon.
   - Give it a nickname (e.g. `Magrim website`) and click **Register app**.
   - Firebase shows a `firebaseConfig` object — keep this page open.

3. **Create the Firestore database**
   - In the left menu choose **Build → Firestore Database → Create database**.
   - Start in **Production mode** and pick a location close to Namibia
     (e.g. `europe-west1`).

4. **Add the security rules**
   - Open the Firestore **Rules** tab, replace everything with the rules
     below, and click **Publish**. They allow anyone to read reviews and to
     submit a *valid* review, but never to edit or delete:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /reviews/{id} {
         allow read: if true;
         allow create: if request.resource.data.name is string
           && request.resource.data.name.size() >= 2
           && request.resource.data.name.size() <= 60
           && request.resource.data.comment is string
           && request.resource.data.comment.size() >= 4
           && request.resource.data.comment.size() <= 400
           && request.resource.data.rating is number
           && request.resource.data.rating >= 1
           && request.resource.data.rating <= 5;
         allow update, delete: if false;
       }
     }
   }
   ```

5. **Paste the config into the site**
   - Open `script.js` and find the `FIREBASE_CONFIG` block near the top.
   - Replace each `YOUR_...` placeholder with the matching value from the
     `firebaseConfig` shown in step 2.
   - Commit and push — GitHub Pages will redeploy and reviews now save to
     Firestore and appear instantly for everyone.

6. **Allow your domain** (if reviews do not load)
   - In **Firestore/Authentication settings → Authorized domains**, make sure
     `porschebotha.github.io` is listed (it usually is by default).

**Is it safe to commit the Firebase config?** Yes. Firebase web config values
are designed to be public — security is enforced by the Firestore rules above,
not by hiding the keys. The free Firebase "Spark" plan is enough for a small
business review section.

Built-in spam protection: a hidden honeypot field, a 30-second cooldown
between submissions, length limits, and the server-side Firestore rules.
