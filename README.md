# PaulSklarXFit365 · Meta ad landing pages

Two landing pages for Meta ads. Plain HTML/CSS/JS, hosted on GitHub Pages.

- `warm/` → https://paulsklarxfit365.github.io/warm/ — for people who already follow Paul
- `cold/` → https://paulsklarxfit365.github.io/cold/ — for men who don't know Paul yet (40+ angle, Paul as the proof)
- `assets/js/config.js`: **the only file to edit.** Checkout link, price, Meta Pixel ID, logo, every photo/video slot, and member stories.
- `assets/img/`, `assets/video/`: upload photos and compressed .mp4 files here (under ~20 MB each).

Join buttons pass the ad's UTM tags and fbclid through to the checkout link, and add `utm_content=warm` or `utm_content=cold`.
Pixel events: PageView + ViewContent on load, InitiateCheckout on any Join tap.
The root URL forwards to paulsklarxfit.com. Pages are set to noindex.
