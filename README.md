# Suman Ranabhat · Commerce & Accounting Educator

A fast, production-ready editorial personal portfolio website for **Suman Ranabhat** (Commerce & Accounting Educator) based in Pokhara, Gandaki Province, Nepal.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Lucide React**.

---

## Features

- **Education & Concept-First Positioning**: Positions Suman Ranabhat as a trusted **Commerce & Accounting Educator** focused on concept-first learning and student success.
- **Static-First Architecture**: 100% static pre-rendering at build time with minimal client-side JavaScript.
- **Local & Entity SEO**: Schema.org JSON-LD structured data (`Person`, `Course`, `ProfessionalService`, `FAQPage`), dynamic canonical URLs, and local search signals for Pokhara, Nepal.
- **WhatsApp Inquiry Flow**: Instant inquiry formatting for student cohort enrollment and academic consultations.
- **Zero-Bloat Performance**: Self-hosted Geist fonts with `display: swap`, responsive modern image decoding (`AVIF`/`WebP`), and safe HTTP security headers.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono (via `next/font`)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env.local` to customize your production domain:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Build & Deployment

### Build Command
```bash
npm run build
```

### Run Production Server
```bash
npm run start
```

### Linting
```bash
npm run lint
```

---

## Deployment Options

### 1. Vercel (Recommended)
1. Push your code to a Git repository (GitHub / GitLab / Bitbucket).
2. Import the repository in [Vercel](https://vercel.com).
3. Set the environment variable:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-custom-domain.com`
4. Click **Deploy**. Vercel will automatically build and distribute static assets across its global Edge Network.

### 2. Netlify / Cloudflare Pages
- **Build command**: `npm run build`
- **Publish directory**: `.next`

### 3. Self-Hosted (Node.js / Docker)
Run with Node.js 18+:
```bash
npm run build
npm run start
```

---

## Content Customization

- **Profile & Content**: Update contact coordinates, bios, services, courses, and FAQs in [`data/profile.ts`](data/profile.ts).
- **SEO & Structured Data**: Update site title, keywords, and canonical settings in [`data/seo.ts`](data/seo.ts).
- **Portrait Photo**: Replace [`public/images/suman-ranabhat.png`](public/images/suman-ranabhat.png) (also used as the social preview image) and update `profile.portrait` in `data/profile.ts` and `defaultOgImage` in `data/seo.ts` if the filename changes.

---

## License

Private / All rights reserved © Suman Ranabhat.
