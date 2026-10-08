/* ============================================================
   PAULSKLARXFIT365 LANDING PAGES · CONFIG
   This is the only file you need to edit. Both pages (warm/ and cold/) read it.
   ============================================================ */

window.PSX_CONFIG = {

  /* ---- Where the buttons go ----
     Paste the checkout link for the $39.99/mo plan. Every "Join" button on both pages uses it.
     UTM tags and fbclid from the ad are passed through to this link automatically. */
  checkoutUrl: "",

  /* ---- Price shown on the pages ---- */
  price: "$39.99",
  per: "/mo",

  /* ---- Meta Pixel ----
     Paste the Pixel ID (numbers only). Leave "" to run without tracking.
     Events fired: PageView on load, ViewContent on load (content_name = "warm" or "cold"),
     InitiateCheckout when someone taps a Join button. */
  pixelId: "",

  /* ---- Logo ----  White or red-on-dark PNG/SVG, e.g. "../assets/img/logo.png". Empty = typed wordmark. */
  logo: ""
};

/* ============================================================
   PHOTOS AND VIDEO
   Paste a link between the quotes. Accepts YouTube, Vimeo, or a file you upload:
     "https://vimeo.com/123456789"      "../assets/video/hero.mp4"      "../assets/img/paul.jpg"
   (Paths start with ../ because the pages live one folder down.)
   Leave "" and the slot shows a labelled grey placeholder.
   Hero slots play muted on a loop. Everything else gets play controls.
   Own .mp4 files: 1080p H.264, keep each under ~20 MB.
   ============================================================ */
window.PSX_MEDIA = {

  /* ---- Warm page (people who already follow Paul) ---- */
  "warm-hero":     "",   // Hero · 9:16 · Paul training, silent loop (feels like his feed)
  "warm-app-1":    "",   // App preview · 9:16 · screen recording: workout of the day
  "warm-app-2":    "",   // App preview · 9:16 · screen recording: exercise video demo
  "warm-app-3":    "",   // App preview · 9:16 · screen recording: community
  "warm-paul":     "",   // "No BS" section · 4:5 · Paul portrait
  "warm-video":    "",   // Optional · 16:9 or 9:16 · Paul talking to camera about the app, with sound

  /* ---- Cold page (men who don't know Paul yet) ---- */
  "cold-hero":     "",   // Hero · 9:16 · Paul training, silent loop (he is the proof)
  "cold-coach":    "",   // Meet your coach · 4:5 · Paul portrait
  "cold-app-1":    "",   // App preview · 9:16 · screen recording: workout of the day
  "cold-app-2":    "",   // App preview · 9:16 · screen recording: exercise video demo
  "cold-app-3":    "",   // App preview · 9:16 · screen recording: community
  "cold-video":    ""    // Optional · 16:9 or 9:16 · Paul explaining the program, with sound
};

/* ============================================================
   MEMBER STORIES (both pages)
   Real members only, with their permission. A story can have a vertical video, a quote, or both.
   Empty stories are hidden on the live page.
   ============================================================ */
window.PSX_STORIES = [
  { video: "", quote: "", name: "", detail: "" },   // e.g. detail: "Member since 2021"
  { video: "", quote: "", name: "", detail: "" },
  { video: "", quote: "", name: "", detail: "" }
];
