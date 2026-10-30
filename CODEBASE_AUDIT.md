# Codebase Audit: Cleanup and Optimisation

**Date:** 30 October 2026
**Branch:** `docs/website-audit`, starting from commit `5c689c9`
**Scope:** Remove dead and duplicated code, tighten configuration, patch vulnerable dependencies. No redesign, no content changes.

**Result:** 622 source lines removed and 191 added (lockfile and images excluded). 0 visual differences across 16 page/width combinations. `npm audit` dropped from 6 vulnerabilities (1 critical) to 0. Type check, lint and production build all pass.

---

## A. Project overview

| Area | Finding |
|---|---|
| Framework | Next.js 16 App Router with Turbopack. React 19.2.8, TypeScript 5 (strict), Tailwind CSS v4 via `@tailwindcss/postcss`. |
| Package manager | npm (`package-lock.json` v3). |
| Runtime dependencies | `next`, `react`, `react-dom`, `lucide-react`. All four are used. |
| Routes | `/`, `/about`, `/education`, `/services`, `/experience`, `/contact`, `robots.txt`, `sitemap.xml`, plus the custom `not-found` and `error` pages. Every route is prerendered as static. |
| Client components | `SiteHeader` (mobile menu), `ContactForm` / `ContactFormFromQuery` (enquiry tabs and WhatsApp hand-off), `app/error.tsx`. Everything else is a server component. |
| Content source | `data/profile.ts` (people, services, offerings, FAQs) and `data/seo.ts` (metadata and JSON-LD builders). |
| Styling | Design tokens in `app/globals.css` (`:root`), bridged to Tailwind with `@theme inline`. Components mostly use inline `style={{ color: "var(--…)" }}`. |
| Animation | No animation library. There is no 3D, canvas, GSAP, Framer Motion, scroll listener or `requestAnimationFrame` loop. Motion is limited to CSS transitions, one `fadeIn` keyframe for the mobile drawer, and a global `prefers-reduced-motion` override. |
| Backend / API | None. The contact form opens `wa.me` with a pre-filled message, and nothing is sent to a server. |
| Secrets | None in the repository. `.env*` is git-ignored, and `.env.example` holds only the public site URL. |
| Tests | No unit, integration or browser test setup exists in the repository. |

**Files inspected:** all 44 non-generated files in the repository (`node_modules`, `.next` and `.git` excluded). That covers every `.ts`, `.tsx`, `.css` and `.mjs` file, all config files, `public/` assets, `README.md`, `.vscode/` and the earlier `docs/website-audit.md`.

---

## B. Cleanup summary

### Files removed

| File | Why it was safe to remove |
|---|---|
| `components/theme-switcher.tsx` (163 lines) | Never imported. It set a `data-theme` attribute that no CSS rule reads, because the palette is permanent. |
| `components/home/teaching-philosophy.tsx` (124 lines) | Never imported. The same data (`teachingPrinciples`) is still rendered on `/education`. |
| `public/images/portrait.svg` (4.8 KB) | Not referenced by any code, CSS or metadata. Only the README mentioned it, and the README has been updated. |

Before removing each file I searched for static imports, dynamic imports, string paths, CSS `url()` references and metadata references, and found none.

### Unused data, exports and types removed (`data/profile.ts`, `data/seo.ts`)

- `profile.heroStatement`, `bio`, `teachingPhilosophySummary`, `servicePhilosophySummary`, `social`, `phoneRaw`: never read.
- `quickStats` export: never imported.
- `isPlaceholder` (type field plus three data entries), `EducationOffering.duration`, `TeachingPrinciple.quote`: never set or never read.
- Unused `CAService.icon` values `"chart"` and `"scale"`: no service uses them.
- `siteConfig.siteName`, `personName`, `jobTitle`, `location`, `contact`, `social`: these were aliases of `profile` fields, or unused. Code now reads `profile` directly.
- `defaultKeywords`: no longer exported, since only `seo.ts` uses it.
- The `sameAs` spread in `generatePersonSchema()`: dead logic. It filtered `wa.me` out of a list whose only entry was the `wa.me` link, so it always produced nothing. The JSON-LD output is byte-identical.
- The `targetClients` parameter of `generateServicesSchema()`: accepted but never used.

### Duplicate implementations consolidated

| Duplication | Change |
|---|---|
| Three navigation lists: `profile.navigation` (unused, with different labels), `navItems` in the header, `footerNav` in the footer | One `navigation` list in `data/profile.ts`, used by both header and footer. Rendered labels are unchanged. |
| 11 copies of `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(x) }} />` | New `components/json-ld.tsx` (`<JsonLd data={x} />`). The XSS-safe escaping now lives in one place. |
| Identical FAQ list markup in `/education` and `/services` | New `components/faq-list.tsx`. The `/contact` FAQ list has different styling, so it was left as is. |
| `PostalAddress` object written out three times in `seo.ts` | One shared `postalAddress` constant. |
| WhatsApp number written twice (`whatsappNumber`, `whatsappUrl`) | `whatsappUrl` is now derived from `whatsappNumber`. |
| The string "Commerce & Accounting Educator" hard-coded in 11 places across 7 files | Now reads `profile.title` everywhere. The rendered text is identical. |
| `.btn-primary`, `.btn-secondary` and `.btn-gold` each repeating 10 identical declarations | One grouped base rule. Each class keeps only its colours and transition. |
| `.btn-dark-secondary` base styles repeated as utilities plus inline `style={{ padding }}` in the footer and CTA banner | Moved into the CSS class. Values are identical (10px radius, 0.5rem gap, `text-sm` line-height). |

### CSS removed (`app/globals.css`)

- Unused classes: `.editorial-card`, `.editorial-card:hover`, `.editorial-card-subtle`, `.eyebrow-text`, `.link-accent-gold`.
- Unused tokens: `--color-gold-fg`, `--color-fg-light-muted`.
- Unused Tailwind theme bridges: `--color-page`, `--color-navy-light`, `--color-gold`, `--color-gold-soft`. No `bg-page`, `text-gold` or similar utility exists in the markup. The underlying `:root` variables are kept.
- `body` declarations already set by `<html>` or by the body's Tailwind classes: `background-color`, `color`, `display: flex`, `flex-direction`, and font smoothing (the `antialiased` class on `<html>`).
- Ineffective utilities on `.btn-*` elements: `inline-flex`, `items-center`, `justify-center`, `justify-between`, `gap-2`, `cursor-pointer`, `font-semibold`. The `.btn-*` rules are unlayered CSS, so they always override Tailwind's layered utilities, and these classes never did anything (see section F). `text-sm` and `text-xs` were kept because they still set line-height.

### Dependencies

Nothing was removed. All dependencies are used. Upgrades are listed under section C.

### Configuration cleaned

- `next.config.ts`: `'unsafe-eval'` is now added to the CSP only in development, as the Next.js CSP guide recommends. The deprecated `block-all-mixed-content` was removed (`upgrade-insecure-requests` already covers it). `compress: true` was removed because it is the default.
- `.vscode/launch.json`: the debugger URL changed from port 8080 to 3000, the port `next dev` actually uses.
- `README.md`: the portrait instructions now name the real file and explain the `defaultOgImage` link.

---

## C. Important code improvements

| File | Original issue | Change | Reason and impact |
|---|---|---|---|
| `package.json`, `package-lock.json` | `next@16.3.3` was affected by a critical advisory set (RCE in Image Optimization with SVG files, Image Optimization SSRF, SSG/ISR cache poisoning and others). Transitive `sharp`, `zod`, `js-yaml`, `brace-expansion` and `source-map-js` had high advisories. | `next` and `eslint-config-next` pinned to `16.4.3` (same major version). `npm audit fix` without `--force` for the transitive packages. | `npm audit`: 6 vulnerabilities (1 critical, 5 high) went to 0. Build, lint and visual diff all pass on the new version. |
| `next.config.ts` | The production CSP allowed `'unsafe-eval'`. | Added only when `NODE_ENV === "development"`. | Smaller script-injection surface in production. The dev server still works. |
| `components/site-header.tsx` | The `keydown` listener was attached on every page for the whole session, even with the menu closed. | It is attached only while the mobile menu is open and removed when it closes. | Less work on every keystroke. Escape still closes the menu (tested). |
| `components/home/hero-section.tsx` | Used `priority`, which is deprecated in Next 16 (`node_modules/next/dist/docs/.../image.md`). | Replaced with `preload`. | Same behaviour: the `<link rel="preload" as="image">` is still emitted. |
| `hero-section.tsx`, `app/about/page.tsx`, `data/seo.ts` | Declared image size (600×750, and 768×1024 for OG) did not match the file. | Set to the real size of the current file, 1086×1448. | Correct intrinsic ratio and accurate `og:image:width/height`. No layout change, because the frame is sized with CSS (`aspect-[4/5]`, `object-cover`). |
| `app/layout.tsx` | Geist Mono was preloaded on every page, but only the "01–04" step numbers on `/education` and `/services` use it. | `preload: false`. | One fewer font preload (23 KB) on every page. The font still loads where it is used (`display: swap`). |
| `app/services/page.tsx` | The icon map was untyped and had a `\|\| Briefcase` fallback that could never run. | Typed `Record<CAService["icon"], LucideIcon>` and the fallback removed. | A new icon value without a mapping is now a compile error instead of a silent fallback. |
| Several pages | `key={idx}` / `key={i}` on static lists. | Stable string keys (`faq.question`, the highlight text, `item.label` and so on). | React best practice. No rendering change. |
| `components/home/dual-paths.tsx` | A `group` class with no `group-*` children. | Removed. | Dead class. |

---

## D. Performance measurements

All numbers below come from `next build` plus `next start` on localhost. "Before" is commit `5c689c9`. Payload is the sum of the files each page's HTML references. Gzip sizes were computed locally with Node's zlib.

| Metric (homepage unless noted) | Before | After cleanup (Next 16.3.3) | Final (Next 16.4.3) |
|---|---|---|---|
| CSS bundle | 38,374 B (gzip 8,156) | 35,036 B (gzip 7,563) | 34,930 B (gzip 7,537) **−8.9%** |
| JS referenced by `/` | 598,783 B (gzip 185,632) | 598,007 B (gzip 185,336) | 599,508 B (gzip 186,568) |
| HTML `/` | 118,518 B (gzip 18,184) | 117,331 B (gzip 17,993) | 117,092 B (gzip 18,109) |
| Font preloads per page | 2 (52,396 B) | 1 (29,288 B) | 1 (29,288 B) |
| `public/` assets | 971,213 B | — | portrait.svg removed (−4,784 B); see the note on the portrait below |

- **JavaScript:** the cleanup cut about 0.3 KB gzipped. The Next 16.4.3 security upgrade added about 1.2 KB gzipped of framework code. Getting rid of the critical advisory is worth far more than 1 KB.
- **Image payload:** the hero portrait is served through `next/image` as AVIF. With the current portrait it is 14,825 B at 640w and 29,732 B at 1080w.
- **Portrait file:** `public/images/suman-ranabhat.png` was replaced on disk during this session, outside this cleanup: 768×1024 at 966 KB became 1086×1448 at 1.85 MB. The change was kept, not reverted. Visitors get the optimised AVIF, but social previews download the raw PNG (see F).
- **Build time:** 18 s for the baseline (cold) and 9 s for the final build (warm cache). The caches differ, so these two numbers aren't a fair comparison and I make no claim from them.
- **Not measured:** Lighthouse was not run, and there are no field Core Web Vitals. LCP, INP and CLS were not measured under throttling, so no figures are given for them.

---

## E. Testing results

Every result below was produced by an actual run.

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`) | Passed before and after: 0 errors. |
| Lint (`npm run lint`) | Passed before and after: 0 problems. |
| Production build (`npm run build`) | Passed. All 9 routes are prerendered as static (`○`). |
| Unit, integration and browser test suites | None exist in the project, so none were run. |
| Visual regression | Original and final builds served side by side and compared in headless Microsoft Edge 156. For every element on 8 URLs (`/`, `/about`, `/education`, `/services`, `/experience`, `/contact`, `/contact?type=services`, a 404) at 390 px and 1440 px, I compared 26 computed style properties plus position and size. **Result: 0 differences.** No horizontal overflow on any page. |
| Metadata and SEO | `<title>`, meta, canonical, OG and Twitter tags and all JSON-LD blocks compared on 6 pages: identical (16 JSON-LD blocks in total). `sitemap.xml` and `robots.txt` are identical apart from `lastmod`. After that comparison, `og:image:width/height` was intentionally updated to match the new portrait. |
| Interaction tests (headless Edge, CDP) | 15/15 passed: the mobile menu opens with `aria-expanded`, Escape closes it, a nav link navigates and closes it, `aria-current` is set, desktop and mobile nav labels are correct, the hero image loads, `?type=services` opens the accounting tab, tab switching works, submitting the form opens `wa.me/9779805864812` with the correctly encoded message, FAQ lists render, service icons render, in-page anchors exist, and there were no console errors or exceptions. |
| Security headers | Production CSP checked with `curl -I`: no `'unsafe-eval'`, no `block-all-mixed-content`. All other headers unchanged. |
| Dependency audit (`npm audit`) | Before: 6 (1 critical, 5 high). After: **0**. |
| Accessibility | No dedicated tool was run (no axe or Lighthouse). The DOM, ARIA attributes, focus styles and contrast-relevant colours are unchanged; the visual diff shows identical computed colours. |

---

## F. Remaining issues and manual review

### Needs your decision

1. **Canonical domain mismatch.** `data/seo.ts` falls back to `https://sumanranabhat.com`, but `.env.example` says `https://sumanranabhat.com.np`. If `NEXT_PUBLIC_SITE_URL` isn't set where the site is hosted, every canonical URL, the sitemap and the JSON-LD point to `.com`. Confirm the real domain, then set the env var and make the fallback match. I didn't change this, because I can't tell which domain is correct.
2. **New portrait file (1.85 MB PNG).** It also serves as the `og:image`, so WhatsApp and Facebook previews download the full PNG, and a portrait-shaped image gets cropped in `summary_large_image` cards. I recommend a separate 1200×630 JPEG or WebP OG image under 200 KB. The portrait PNG itself could also be stored as a high-quality JPEG (visitors are unaffected, because `next/image` serves AVIF).
3. **Content items carried over from `docs/website-audit.md`** (not changed here, because they are content decisions, not code): the qualifications look like placeholders ("Recognized University", "Graduated"), the testimonials are anonymous, and the CA or ICAN status needs confirming.

### Technical debt intentionally left

- **Ineffective `text-xs` on `.btn-primary`.** In the education and services cards and the header CTA, `text-xs` doesn't change the font size, because unlayered `.btn-*` rules beat Tailwind utilities; it only affects line-height. The same cascade explains why the removed `justify-between` never had an effect on the `DualPaths` buttons. If smaller or space-between buttons were the intent, use `text-xs!` or `justify-between!`. That would be a visible change, so it was not made.
- **`:root --radius-*` overrides Tailwind's radius scale.** `rounded-lg` renders at 14px and `rounded-xl` at 20px, not Tailwind's defaults. This is now documented in `globals.css`. `--radius-sm` and `--radius-xl` look unused in custom CSS, but they are used through these utilities, so they were kept.
- **Qualification cards are near-duplicates in `/about` and `/experience`.** The icon size, radius and border differ slightly, so merging them would change one page's look.
- **Inline `style={{ color: "var(--…)" }}` is used throughout** instead of Tailwind colour utilities. Converting it is a large mechanical refactor with no user-facing benefit, so it was left.
- **The `Geist_Mono` font** is kept, because it is part of the current look of the step numbers. Swapping it for Geist with `tabular-nums` would save the font download completely, at the cost of a small visual change.
- **Mixed CRLF/LF line endings** in the working tree. They are harmless with `core.autocrlf=true` (the index is LF), but adding `.gitattributes` with `* text=auto eol=lf` would stop the warnings.
- **Package name typo** `suman-ranabhat-protfolio` in `package.json`. Left alone to avoid lockfile churn.
- **`sitemap.ts`** uses the build time as `lastModified` for every URL.

### Recommended next steps

- Add a minimal Playwright smoke test (nav, mobile menu, contact form hand-off) so the checks above can be repeated in CI.
- Run Lighthouse against the deployed site on a throttled mobile profile to get real LCP, INP and CLS figures.
