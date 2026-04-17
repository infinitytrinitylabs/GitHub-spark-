# dephodile.co

> **Worn stories, reborn.** An advanced 3D ecommerce experience for thrifted clothes, heirloom jewellery and considered accessories.

dephodile is an immersive, real‑time 3D storefront inspired by cinematic sites like [studiodialect.com](https://studiodialect.com), [blackbirdawards.com](https://blackbirdawards.com), [string-tune.fiddle.digital](https://string-tune.fiddle.digital) and [astrodither.robertborghesi.is](https://astrodither.robertborghesi.is). Every product turns in light, in your browser — no flat photography.

## What's inside

- **React 18 + TypeScript + Vite** — modern, fast toolchain
- **three.js + @react-three/fiber** — the 3D engine driving every scene
- **@react-three/drei** — environments, shadows, float, orbit controls
- **@react-three/postprocessing** — bloom, vignette, grain
- **Framer Motion + GSAP** — cinematic UI transitions
- **Lenis** — buttery smooth scroll driving 3D parallax
- **Zustand (persisted)** — cart state that survives a reload
- **Tailwind CSS** — custom daffodil / earthy palette, Fraunces + Inter typography

## Features

- Cinematic 3D hero with floating heirloom products, dynamic lighting, contact shadows, bloom and vignette.
- Scroll- and pointer-driven camera rig — the scene breathes as you move.
- Custom cursor, film grain, radial vignette, scroll-reveal animations, infinite marquee.
- Three product houses — **Thrifted Clothes**, **Jewellery**, **Accessories** — with live filter pills.
- Interactive **Product Detail** page with a full 3D viewer (orbit, zoom, auto-rotate).
- Every product is a **procedural 3D mesh** (PBR materials, transmission, clearcoat) — no heavy model files, tiny bundle.
- Persistent cart drawer with quantities, subtotal, and checkout CTA.
- Responsive, motion-reduced friendly, mixed-blend-mode nav, SEO & OG meta.

## Run it

```bash
npm install
npm run dev         # http://localhost:5173
npm run build       # typecheck + production bundle
npm run preview     # preview the production build
npm run lint        # typecheck only (tsc --noEmit)
```

## Project structure

```
src/
├── App.tsx                 # router, page transitions, layout shell
├── main.tsx                # React entry
├── components/             # Navbar, Cursor, Footer, CartDrawer, SmoothScroll, LoadingScreen
├── scenes/                 # HeroScene, ProductViewer, ProductCardCanvas, ProductMesh
├── pages/                  # Home, Shop, ProductDetail, Story
├── data/products.ts        # Seed catalogue
├── store/cart.ts           # Zustand + persist
└── styles/globals.css      # Tailwind + custom CSS (cursor, grain, marquee, reveals)
```

## Design language

- **Palette** — ink `#14110F`, bone `#F2ECE2`, daffodil `#E9B949`, ochre, amber, rust, moss. Warm, earthy, archival.
- **Type** — Fraunces (display, lowercase, italic accents) + Inter (body) + JetBrains Mono (eyebrow labels).
- **Motion** — slow, cinematic, `cubic-bezier(0.2, 0.8, 0.2, 1)`. Nothing jitters.

## Next steps

- Swap procedural meshes for scanned / `.glb` photogrammetry of real pieces.
- Wire a real checkout (Shopify Hydrogen, Stripe, or Medusa).
- Add a CMS-backed journal, sourcing diaries, and repair records per garment.
- Add real-time inventory and sold-out 3D states.

---

Built for the dephodile studio. Every garment once loved.