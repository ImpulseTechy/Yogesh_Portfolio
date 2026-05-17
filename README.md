# Yogesh Bawane — Portfolio

Personal portfolio for [yogeshbawane.in](https://yogeshbawane.in).
Robotics Engineer · Hardware Educator · VLSI Researcher.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS v3
- Framer Motion
- Lucide React

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm start
```

## Deployment

Push to GitHub and import the repo in [Vercel](https://vercel.com).
No environment variables required.

## Customization

- Content lives directly inside each component under `components/`.
- Design tokens (colors, fonts) are CSS variables in `app/globals.css` and
  surfaced to Tailwind via `tailwind.config.ts`.
- Add photos to `public/` and replace the placeholder blocks marked
  `{/* PHOTO: ... */}` in the components.

## Structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx          Composition of all sections
  globals.css       Design tokens + base styles
components/
  Nav · Hero · Stats · HardwarePortfolio · Experience
  Research · Teaching · YouTube · Skills · Contact · Footer
lib/
  motion.ts         Reusable Framer Motion variants
```
