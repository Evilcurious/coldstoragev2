# Frostline Cold Storage website

A single-page marketing website for a temperature-controlled cold storage and logistics company.
Built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check and produce a static build in dist/
npm run preview    # serve the production build locally
npm run lint
```

## Before launch: replace the placeholders

Company details live in one file, `src/config/site.ts`. Anything still wrapped in square brackets
(for example `[Phone number]`) is a placeholder. The site shows it as "to be added" and never turns it into a link.

- [ ] Company name and short name (`site.name`, `site.shortName`). "Frostline" is a working name.
- [ ] Production domain (`site.url`, and the `canonical` and `og:*` tags in `index.html`).
- [ ] Phone number, business email, facility address, and business hours (`site.contact`).
- [ ] Social profiles (`site.socials`). Leave empty if none exist.
- [ ] Logo: the mark is in `src/components/Logo.tsx` and `public/favicon.svg`.
- [ ] Facility capabilities and product categories (`src/data/content.ts`). Only keep claims the business can confirm.
- [ ] Photography (see below).

The site makes no certification, capacity, temperature-range, or statistics claims. Keep it that way unless the business provides verified details.

## Connecting the quote form

The quote form sends a JSON `POST` to the URL in `VITE_FORM_ENDPOINT`. Until that variable is set, the form
shows a clear "not connected" message and sends nothing. It never displays a fake success.

1. Create a form endpoint that accepts JSON. Options include:
   - **Formspree** (`https://formspree.io`): create a form and copy its endpoint URL.
   - **Web3Forms** (`https://web3forms.com`): requires an access key, so use a small API route if you want to keep it private.
   - **Your own API route** (Next.js, Cloudflare Worker, Netlify function, and so on) that emails the request through your mail provider.
2. Copy `.env.example` to `.env.local` and set the value:
   ```bash
   VITE_FORM_ENDPOINT=https://formspree.io/f/your-form-id
   ```
3. Rebuild (`npm run build`). `VITE_` values are public, so only put a public form endpoint here, never a secret key.

Spam protection: the form has a hidden honeypot field. Add a CAPTCHA at your endpoint if spam becomes a problem.

## Photography

The images in `public/images/` were generated as original, text-free illustrations of cold storage
interiors and loading areas. They are not photographs of the business's own facilities. Before launch, replace them with
licensed photographs of the real facility, or with images you have permission to use. Keep the same
file names, or update the references in `src/components/*.tsx` and `src/data/content.ts`. Each image has descriptive
`alt` text. Update it to match any new photo.

## Motion and accessibility

- Hero intro, section reveals, card stagger, and image reveals use Framer Motion.
- `MotionConfig reducedMotion="user"` in `src/App.tsx` removes movement for visitors who prefer reduced motion. Fades remain.
- Smooth scrolling is disabled under reduced motion in `src/index.css`.
- Keyboard focus styles, skip link, labelled form fields, `aria-live` status messages, and `aria-expanded` on the mobile menu are included.

## Project structure

```
src/
  config/site.ts          company details and form endpoint
  data/content.ts         services, capabilities, reasons, products, form options
  components/
    SiteHeader.tsx        sticky navigation, mobile menu, active-section highlight
    Hero.tsx              hero section with staged animations
    WhyChooseUs.tsx       "About & Why Choose Us"
    Services.tsx          four service cards
    Facilities.tsx        facility capabilities and image gallery
    Products.tsx          product category tiles
    QuoteSection.tsx      contact details and quote form
    SiteFooter.tsx        footer
    Button.tsx, Logo.tsx, Reveal.tsx, SectionHeading.tsx
  hooks/                  scroll state and active-section observer
public/images/            photography used on the site
```
