# Chef for Crews

Website for **Chef for Crews**, the culinary business of chef **Alexander Laska** in the Netherlands. It offers restaurant service, catering, sushi, private dinners and culinary consulting.

A freelance project built with **plain HTML, CSS and JavaScript**: no frameworks, no build step.

## Pages

| Page | Content |
|---|---|
| `index.html` | Home: animated intro, tagline, showcase video and an introduction to the chef |
| `services.html` | The five services, each with a description and a photo gallery, plus quick links to every section |
| `partnerships.html` | Partnerships (coming soon) |
| `contact.html` | Email and phone contact |

## Features

- **Animated intro on the home page:** a curtain with a progress bar, then the "Chef For Crews" title sliding in before the page is revealed.
  - It plays **once per visit**: going back to Home from another page skips it, using `sessionStorage`.
  - It's skipped for visitors who have **"reduce motion"** turned on in their system settings.
- **Fade-in on scroll** for service descriptions and galleries, using a debounced scroll handler with `requestAnimationFrame`.
- **Autoplaying showcase video**, muted and looping, with `playsinline` so it also autoplays on iPhones.
- **Responsive layout** with mobile-first breakpoints at 481, 769 and 1025 px, and separate portrait and landscape background images.
- **Fixed background that also works on iOS Safari:** the background layer is pinned to the viewport instead of relying on `background-attachment: fixed`, which iOS ignores.
- **Optimized media:**
  - photos served as WebP
  - backgrounds resized to screen size
  - the muted video re-encoded without its unused audio track
- **SEO and accessibility basics:** a descriptive title and meta description on every page, descriptive `alt` text on all images, and `aria-label`s on navigation links.

## Project structure

```
├── index.html, services.html, partnerships.html, contact.html
├── script.js                  # fade-in effects (all pages)
├── curtain-reveal-script.js   # home page intro animation
├── styles/                    # one stylesheet per page
├── assets/                    # logo, favicon, video and service photos
└── background.webp, background-portrait.webp
```

## Run locally

All links are relative, so the site works from any folder or sub-path. Serve it with any static server:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

---

Designed and developed by **Dimitris Kourkoutas**. Content and branding © Chef for Crews.
