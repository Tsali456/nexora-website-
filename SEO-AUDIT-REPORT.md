# Nexora SEO Audit Report

Nexora is a fictional brand. This report lists what is implemented and what still needs checking. Nothing here has been tested in a browser or with SEO tools yet.

## Implemented in the code
- Unique `<title>` and meta description on all 4 pages.
- One `<h1>` per page, with `<h2>`/`<h3>` below it in order.
- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `footer`; skip link.
- Canonical URL, Open Graph and Twitter card tags on every page.
- Inline SVG favicon (no extra file request).
- `robots.txt` and `sitemap.xml` (4 URLs).
- No images to download: logo, icons and mockups are inline SVG/CSS. Mockups carry `role="img"` and `aria-label`.
- No external scripts, fonts or frameworks. One CSS file, one small JS file.
- Viewport meta tag, responsive layout, reduced-motion support.
- No structured data added: nothing factual (address, ratings, social profiles) exists to describe.
- No `og:image`: no real image asset exists. Add one later (1200x630 PNG) and reference it.

## Placeholders to replace before deployment
Replace every `YOUR_DEPLOYED_DOMAIN` with your Vercel domain (no `https://`, no trailing slash), e.g. `nexora-demo.vercel.app`.
Files: `index.html`, `features.html`, `about.html`, `contact.html` (canonical + `og:url`), `robots.txt`, `sitemap.xml`.
Also replace `YOUR_FORM_ID` in `contact.html` (`data-endpoint`) with your form service ID.

## Contact form
The form validates in the browser. It sends only if `data-endpoint` points to a real service such as Formspree. Until then it shows "Message not sent" and never pretends success.
Setup: create a free Formspree form, copy the endpoint URL (`https://formspree.io/f/xxxx`) into `data-endpoint`. The URL is public by design. Never put secret API keys in these files.

## Remaining verification steps
1. Open each page on a phone and check no sideways scrolling.
2. Test the menu, FAQ and every link.
3. Submit the form with invalid and valid data after connecting a service.
4. Run Lighthouse (Chrome DevTools or PageSpeed Insights) on the live URL.
5. Check the canonical URLs and sitemap in Google Search Console after deployment.
6. Proofread all copy once more.
