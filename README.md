# Emma Lee — Personal Website

A single-page personal portfolio site: hero, about, experience, research,
projects, and an editable blog. Pure HTML/CSS/JS — no build step, no
framework, no server required.

## Structure

```
personal-website/
│
├── index.html            Page markup (nav, hero, sections, modals)
│
├── css/
│   └── style.css         Design tokens, layout, components, responsive rules
│
├── js/
│   └── script.js         All content data + interactivity
│
├── images/
│   ├── profile.jpg        Profile photo
│   └── texture-navy.jpg   Decorative background texture (dark sections)
│
└── README.md
```

## Running it

No build tools needed. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve the folder locally for the most accurate experience (some
  browsers restrict `localStorage` on `file://` URLs), e.g.:

  ```bash
  cd personal-website
  python3 -m http.server 8000
  ```

  then visit `http://localhost:8000`.

## What's included

- **Résumé links** (nav bar + footer) point to the Google Drive résumé:
  `https://drive.google.com/file/d/1dO2boFIBOtPT0oPezZbxld5jnUunw_Jk/view?usp=drive_link`
- **One hero layout** — the centered hero with photo, rotating role text,
  and stats, matching the original page's default.
- **Animated canvas backgrounds** (particle networks) behind the hero and
  the blog section, a typing effect, a rotating highlight strip, scroll
  reveal animations, and a scroll-spy nav.
- **Editable blog**: the "＋ New post" button and the "Edit" button on
  each blog card open a form to create, edit, or delete posts. Posts are
  saved to the browser's `localStorage` (key `emma_blog_posts`), so they
  persist between visits on the same browser/device. As posts are
  added, the blog grid — and its animated background layer — grow
  automatically to cover all posts (there's no fixed height / clipping).
- **Fully responsive**: layout, type sizes and spacing adapt with
  `clamp()`/grid `auto-fit` for laptop screens, and phones get a
  dedicated breakpoint (≤620px) with a compact horizontally-scrollable
  nav strip, single-column layouts, larger tap targets, and modals that
  scroll comfortably within the viewport instead of being clipped.

## Notes

- Fonts (Lato, Inter Tight, IBM Plex Mono) are loaded from Google Fonts
  in `css/style.css` — no local font files needed.
- Because blog posts are stored in the browser's `localStorage`, they
  are per-browser/per-device, not shared across visitors. If you want
  posts to be visible to everyone (a real multi-user blog), you'd need
  to wire the editor up to a small backend or a hosted database instead
  of `localStorage`.
