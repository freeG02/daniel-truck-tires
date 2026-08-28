# Daniel Truck and Tires

Marketing website for **Daniel Truck and Tires**, a Dominican Republic importer of
truck tires (gomas), rims (aros) and imported trucks (camiones). Spanish-language,
with WhatsApp as the conversion path (no online checkout).

Built with **Next.js 16**, **TypeScript** and **Tailwind CSS v4**.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

Pushing to `main` builds a static export and publishes it to **GitHub Pages** via
`.github/workflows/deploy.yml`. The static build is produced with:

```bash
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/daniel-truck-tires npm run build
```

The normal dev server and `npm run build` (without those env vars) are unaffected.

> Product photos in `public/products/` are free-license placeholders and are meant
> to be replaced with real inventory photos.
