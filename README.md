# LJS Industries

Industrial-modern ecommerce marketplace — practical products for home, workspace, and everyday projects.

**Tagline:** Built For Everyday Life.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion + Embla Carousel

## Development

```bash
npm install
npm run dev
```

## Images

Download curated Unsplash assets (no API key required for the curated script):

```bash
npm run images:unsplash
```

Product search downloads (optional, requires local env — never commit keys):

```bash
UNSPLASH_ACCESS_KEY=your_key npm run images:products
```

`.env*` files are gitignored. Never commit Unsplash API keys.
