# CLUE Review Generator

A zero-cost, GitHub Pages-ready review drafting tool for CLUE Lounge & Bar.

## Features

- 100% client-side: no API, server, database or API key.
- 1–5 star rating changes the vocabulary and sentiment.
- Optional experience topics: music, food, drinks, ambience, service, DJ, crowd.
- Three styles: Casual, Polished, Short.
- Random combinations create fresh drafts.
- Copy-to-clipboard.
- Mobile responsive.
- Works offline after the files are loaded.
- Easy to expand by editing `reviews.js`.

## Run locally

Open `index.html` in a browser.

For the best local development experience, use VS Code Live Server or:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Create a public GitHub repository, e.g. `clue-review-generator`.
2. Upload `index.html`, `style.css`, `script.js`, and `reviews.js`.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save and wait for the Pages URL.

## Customize

Edit `reviews.js` to add more phrase variations. The more phrases you add, the more combinations are possible.

Important: the tool is intended to help a real customer draft/edit a review based on their actual experience. It should not be used to fabricate customer experiences or post reviews on behalf of people who did not have them.
