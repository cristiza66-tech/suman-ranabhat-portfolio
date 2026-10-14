# Website Audit: Suman Ranabhat Portfolio

**Date:** 14 October 2026
**Scope:** The whole codebase at commit `f87b253`, plus the rendered site at desktop, tablet and mobile widths.
**Status:** Audit only. No source files were changed. This document is the only file added.

---

## How this audit was done

| Check | Method | Result |
|---|---|---|
| Source review | Read every file in `app/`, `components/`, `data/`, plus the config files | — |
| Type check | `npx tsc --noEmit` | Passed, 0 errors |
| Lint | `npm run lint` | Passed, 0 warnings |
| Production build | `npm run build` | Passed; all 9 routes prerendered as static |
| Rendering | Production server (`next start`) driven by headless Microsoft Edge over the DevTools protocol, at 1440×900, 820×1180 and 390×844, on all 6 pages | Full-page screenshots taken and reviewed |
| Layout, text and contrast | Script run inside each page: horizontal overflow, font-size share, WCAG contrast of text against its resolved background, tap-target sizes, heading outline | Results below |
| Keyboard | Pressed Tab 25 times on the desktop homepage and recorded the focus outline at each stop | Visible outline at every stop |
| Interactions | Opened and closed the mobile menu (including Escape); filled in and submitted the contact form; loaded `/contact?type=services` | Results below |
| Console and network | Captured console errors, exceptions, failed requests and 4xx/5xx responses on every page load | None, apart from the expected 404 on a made-up URL |
| Load timing | Navigation Timing, LCP and CLS from the browser's performance APIs | See the caveat below |
| Dependencies | `npm audit --omit=dev` | 1 critical, 2 high (see T1) |

**Limits.** Timing was measured on localhost with no network or CPU throttling. It shows relative cost, not real-world speed on a phone in Pokhara. Lighthouse was not run. No real screen reader was used. Safari and Firefox were not tested. The WhatsApp deep link was built and decoded but not opened in WhatsApp.

---

## 1. Executive summary

The site is technically solid. It is statically rendered, has no layout shift, no console errors and no horizontal overflow, the hero image is about 20 KB as AVIF, and all content lives in one data file. The problems are about **trust, clarity and focus**, not engineering:

1. **The professional identity doesn't match the brief.** The brief says the client is a *Chartered Accountant (CA)*. The site never says so: it calls him a "Commerce & Accounting Educator" throughout. The "qualifications" shown on three pages look like placeholders ("Recognized University", "Graduated", a job title listed as a qualification). For an accounting professional, this is the single biggest trust problem.
2. **The homepage is tuition-only above the fold.** A business owner looking for accounting help sees nothing for them until the third or fourth screen.
3. **The contact form doesn't send anything.** "Prepare & Send Inquiry" waits 400 ms, says "Inquiry Details Prepared", and then needs a second click to open WhatsApp. A visitor who stops at that screen believes they have sent the enquiry.
4. **The page is dense where it should be light, and light where it should be dense.** Between 57% and 75% of all text on every page renders at 12px or smaller. Yet basic decision information is missing: fees, batch times, where classes are held, years of experience, an email address.
5. **There is too much repetition.** "Commerce & Accounting Educator" appears 8 times on the homepage. The same qualification cards appear on 3 pages and the same FAQs on 3 pages. Two CTA blocks sit back to back before the footer, and there are 12 button-styled calls to action on the homepage, 9 of which go to the same `/contact` page.

Most of this can be fixed incrementally inside the current architecture. No rewrite, new framework or component library is needed.

---

## 2. Existing architecture and structure

| Area | What exists |
|---|---|
| Framework | Next.js 16.3.3 (App Router, Turbopack), React 19.2.8, TypeScript 5, Tailwind CSS v4, `lucide-react` icons. No other runtime dependencies. |
| Rendering | All routes are static (`○`). Client components: `SiteHeader` (mobile menu state), `ContactForm` and `app/error.tsx`. |
| Routes | `/`, `/about`, `/education` (shown in the nav as "Subjects"), `/services`, `/experience`, `/contact`, plus `robots.txt`, `sitemap.xml` and a custom 404/error page. |
| Content source | `data/profile.ts` (profile, offerings, services, qualifications, timeline, testimonials, FAQs) and `data/seo.ts` (titles, descriptions, JSON-LD generators). |
| Design tokens | CSS variables in `app/globals.css` ("Slate Blue"), exposed to Tailwind through `@theme inline`. Components mostly use inline `style={{ color: "var(--…)" }}` rather than Tailwind colour classes. |
| Shared UI | `PageHero`, `SectionHeading`, `.btn-*` and `.editorial-card` classes, `.eyebrow-badge`. |
| Homepage composition | `HeroSection` → inline "Personal introduction" → `DualPaths` → `CredentialsOverview` → inline testimonials → `CtaBanner` → footer (which has its own CTA callout). |
| Integrations | `tel:` link, `wa.me` link (with pre-filled text from the form). No email delivery, analytics, map or backend. |
| Security config | Security headers in `next.config.ts` (CSP, HSTS, X-Frame-Options and others). JSON-LD is escaped by `safeJsonLd`. |

**Dead or unused code** (confirmed by search):
- `components/theme-switcher.tsx`: not imported anywhere.
- `components/home/teaching-philosophy.tsx`: not imported anywhere.
- `public/images/portrait.svg`: not referenced.
- In `data/profile.ts`, these exports are never read: `quickStats`, `navigation`, `heroStatement`, `bio`, `teachingPhilosophySummary`, `servicePhilosophySummary`, `social`. The `isPlaceholder` field is also unused.
- There are three separate navigation lists: `data/profile.ts` `navigation` (unused), `site-header.tsx` `navItems`, and `site-footer.tsx` `footerNav`.

---

## 3. Overall UI/UX assessment

**Worth keeping:**
- The calm slate-blue palette, Geist typography, generous section padding and consistent 1240px container. The overall look is clean and credible.
- The real portrait photo. It is professional and well lit.
- Static rendering, AVIF image delivery, zero CLS and the global `:focus-visible` outline (it shows on every keyboard stop).
- A global `prefers-reduced-motion` rule, and no animation library. Motion is limited to short CSS transitions, which suits the brand.
- The two-path idea in `DualPaths` (a light card for tuition, a dark card for accounting) is the right concept. It is just buried too far down.

**What makes the site feel busier than it is:**
- **Too many small labels.** Every section has an uppercase eyebrow badge (7 on the homepage). Cards add a second uppercase label, a coloured tagline, an icon tile and borders, so each card has 4–5 levels of hierarchy.
- **Small text.** Body copy in cards, testimonials, FAQs and lists is 12px, and many labels are 10px. Headings are fine, but the reading text is undersized for a parent on a phone.
- **Card-on-card layouts.** Bordered cards contain bordered rows that contain bordered icon tiles. Several non-clickable cards also have hover effects (`card-hover-accent`, `card-hover-gold`), which suggests they are clickable when they aren't.
- **Inconsistent palette in the form.** `contact-form.tsx`, `not-found.tsx` and `error.tsx` hard-code colours from an earlier "Academic Navy / cream" theme (`#0E2439`, `#C29B38`, `#F3F1EA`, `#FAF9F5`, `#E6E2D8`). The beige tab track and cream inputs are visibly off-palette next to the slate-blue page (see the contact page at any width).

---

## 4. Detailed findings

Priorities: **Critical** means trust-breaking or broken, so fix before promoting the site. **High** means a clear usability, accessibility or conversion loss. **Medium** is noticeable. **Low** is cleanup.

### 4.1 Main findings table

| # | Priority | Issue | Evidence | Recommended fix | Affected files |
|---|---|---|---|---|---|
| T1 | Critical | `next@16.3.3` has published advisories. They include Image Optimization SSRF and SSG/ISR cache poisoning on self-hosted deployments. This site uses `next/image` and is static. | `npm audit`: next 16.0.0–16.3.7 rated critical, fix available in 16.4.0 (not a major version). `sharp` and `source-map-js` are rated high, both transitive. | Upgrade `next` and `eslint-config-next` to ≥16.4.0, then run `npm audit fix` for the transitive packages. Re-run the build and lint. | `package.json`, `package-lock.json` |
| C1 | Critical | The CA identity is missing, or not confirmed. The site never mentions Chartered Accountant, ICAN or any licence, yet it offers "statutory and tax audit file preparation", "tax assessment handling and dispute representation" and "cross-border tax advisory". | A search for `chartered\|ICAN\|CA` in `app/`, `components/` and `data/` finds nothing. `profile.title` is "Commerce & Accounting Educator". | **Client must confirm.** If he is a CA (ICAN member), state it in the hero, header subtitle, qualifications, `Person` JSON-LD and page titles: it is the strongest trust signal available. If not, reword or remove any service a non-licensed practitioner may not offer or advertise, and remove "Highest Professional Code of Ethics" style claims that imply a regulatory body. | `data/profile.ts`, `data/seo.ts`, `components/home/hero-section.tsx`, `components/site-header.tsx` |
| C2 | Critical | The qualifications look like placeholders, yet they are presented as "Verified background". | `qualifications` in `data/profile.ts`: body "Recognized University", year "Graduated"; "Professional Accounting & Mentorship Network" / "Commerce & Financial Education Forum"; and the job title "Commerce & Accounting Educator" listed as a *Professional* qualification. Rendered on `/`, `/about` and `/experience`. | Replace them with real, specific credentials (degree, institution, year, membership number if any). If none are available yet, remove the section rather than show vague entries. Drop the word "Verified" unless documents back it. | `data/profile.ts`, `components/home/credentials-overview.tsx`, `app/about/page.tsx`, `app/experience/page.tsx` |
| C3 | Critical | The testimonials can't be verified: they are anonymous, but flagged `isPlaceholder: false`. | `testimonials` authors are "Commerce Student", "Business Client" and "BBS Commerce Student". The homepage heading claims "Honest experiences". | Confirm they are real and that each person agreed to be quoted. Use a first name and initial, plus level or year (for example "Aarati S., Class 12, 2025"). If they can't be confirmed, remove the section until real ones exist. | `data/profile.ts`, `app/page.tsx` |
| C4 | Critical | The contact form never sends. The submit button fakes a 400 ms delay and shows "Inquiry Details Prepared"; the actual send needs a second click on "Send via WhatsApp". Email is required but goes nowhere except inside the WhatsApp text. | `components/contact-form.tsx` `handleSubmit` → `setTimeout(…, 400)`. Verified in the browser: after submitting, the only network activity was route prefetches; the WhatsApp URL was built correctly. | **Option A (no new setup):** rename the button to "Continue on WhatsApp", open the `wa.me` link directly on submit (after validation), remove the fake delay and success screen, and make email optional. **Option B:** real delivery (email via a form service, or a route handler plus a mail provider). This needs an account, an API key in env, spam protection and a privacy note, so it should be confirmed before building. | `components/contact-form.tsx` |
| H1 | High | The hero serves only the tuition audience. Both hero buttons are tuition or phone, and the eyebrow, subtitle, tagline and both photo overlays all say "tuition" or "educator". The accounting path first appears in `DualPaths`, about 2,900px down on mobile (around the 4th screen) and about 1,450px down on desktop. | Screenshots at 390px and 1440px; `hero-section.tsx`. | Put two clearly labelled paths in the hero ("For students & parents" / "For businesses"), each with one primary action. Merge `DualPaths` into the hero area as two compact cards. | `components/home/hero-section.tsx`, `components/home/dual-paths.tsx`, `app/page.tsx` |
| H2 | High | Body text is too small. Text at 12px or smaller makes up 57–75% of rendered characters on every page, at every width (homepage 59%, contact page 73%). 10px labels make up 4–6%. | Measured in the browser. Testimonials, card lists, FAQ answers and footer use `text-xs` (12px) and `text-[10px]`. | Set the minimum reading text to 16px (`text-base`). Secondary text 14px minimum; labels 12px minimum. Remove `text-[10px]`. Fewer words (see H8) makes the bigger size fit. | All pages and components (search for `text-xs` and `text-[10px]`) |
| H3 | High | Colour contrast falls below WCAG AA 4.5:1 in 14 places. | Measured: `.btn-gold` text `#0F1E2E` on `#2E6DB4` is **3.18:1** ("Explore Accounting Services", "Enroll in Tuition Cohort", "Schedule a Consultation", "Start a Conversation"). Blue links on the dark footer are **3.46:1** ("All Academic Offerings →", "Back to Top"). `--color-dark-fg-muted` on `--color-accent` bands is **3.90:1** (CTA banner paragraph, ethics and CPD callouts, confidentiality card). The "Bio" link is 3.46:1. The footer copyright is 4.40:1. | In `.btn-gold`, use white text on a darker blue (around `#245990` or darker), or reuse `.btn-primary`. Lighten `--color-dark-fg-muted` for use on `--color-accent`. Use `--color-dark-accent` for links on the dark footer. Re-check with the same script. | `app/globals.css`, `components/site-footer.tsx`, `components/home/cta-banner.tsx` |
| H4 | High | There are too many competing calls to action, with inconsistent labels for the same destination. The homepage has 12 button-styled CTAs plus a "Bio" link and a phone link; 9 links go to `/contact`. `CtaBanner` and the footer callout sit back to back, giving 4 large buttons in a row. | Counted in the rendered HTML. Labels for the same page: "Get in Touch", "Schedule a Consultation", "Schedule Academic Consultation", "Enroll in Tuition Cohort", "Contact Directly", "Start a Conversation". | Use one CTA per journey: **"Enquire about tuition"** and **"Discuss accounting work"**. Make the header CTA a neutral "Contact". Remove the footer callout block (keep `CtaBanner`, or replace both with the contact section). Delete the intro section's buttons. | `app/page.tsx`, `components/site-footer.tsx`, `components/home/cta-banner.tsx`, all `PageHero` callers |
| H5 | High | Contact page links ignore the visitor's intent. `CtaBanner` links to `/contact?type=tuition`, but nothing reads `type`. The contact page always opens on the tuition tab, so a business owner who clicks "Get in Touch" lands on "Academic Cohort & Tuition Registration". | `app/contact/page.tsx` hard-codes `defaultTab="tuition"`. In the browser, `/contact?type=services` rendered the tuition heading. | Read the query in `ContactForm` with `useSearchParams()` (wrapped in `<Suspense>` so the page stays static) and set the tab from it. Point the accounting CTAs at `?type=services`. | `components/contact-form.tsx`, `app/contact/page.tsx`, CTA components |
| H6 | High | The contact form, 404 page and error page use hard-coded colours from an old theme, so they don't match the site. | `contact-form.tsx`: `#0E2439`, `#C29B38`, `#EFE4CA`, `#F3F1EA`, `#FAF9F5`, `#E6E2D8`, `#DEDAD0`. `not-found.tsx` / `error.tsx`: `#12161A`, `#475467`. Cream inputs and a beige tab track are visible in the screenshots. | Replace them with the existing tokens (`--color-accent`, `--color-surface`, `--color-border` and so on). | `components/contact-form.tsx`, `app/not-found.tsx`, `app/error.tsx` |
| H7 | High | Subject claims contradict each other. The homepage lists "Economics, Business Mathematics, Corporate Finance"; the tuition page, FAQ and footer list Accountancy, Financial Accounting, Cost & Management Accounting, and Taxation & Commercial Laws. B.Com appears in offerings and the form, but not in the hero or SEO. | `dual-paths.tsx` (hard-coded list) vs `educationOfferings` and `faqs` in `data/profile.ts`. | **Client must confirm** the real subject list. Then render the homepage list from `educationOfferings` instead of hard-coded JSX, so it can't drift again. | `components/home/dual-paths.tsx`, `data/profile.ts` |
| H8 | High | The same information is repeated. "Commerce & Accounting Educator" appears 8 times on the homepage (header, hero subtitle, photo tag, quote card, qualification card, two in the footer, plus alt text). The qualification cards appear on 3 pages, teaching principles on 2, and FAQs on 3 (with `FAQPage` JSON-LD on each). | Counted in the rendered HTML; `app/about`, `app/experience`, `credentials-overview.tsx`. | Say the identity once in the hero and once in the header. Show qualifications once on the homepage (a compact strip) and in full on About only. Keep each FAQ on one page (tuition FAQs on `/education`, service FAQs on `/services`), and link to them from Contact. | See the redesign plan |
| H9 | High | Page metadata is broken on 5 of 6 pages. (a) The person's name is doubled in titles, for example "Accounting & Advisory Services in Pokhara \| Suman Ranabhat \| Suman Ranabhat". (b) Subpages lose `og:image`, `og:site_name` and `og:type`, because a page's `openGraph` replaces the layout's entirely (shallow merge; see `node_modules/next/dist/docs/.../generate-metadata.md`, "Merging"). (c) `twitter:title` on every subpage is the homepage title. | Rendered `<head>` of every page fetched and compared. | Remove "\| Suman Ranabhat" from `pageSeo.*.title` (the layout template adds it). Build a shared `baseOpenGraph` object and spread it into each page's `openGraph`. Set `twitter` per page, or omit it so it falls back to OG. | `data/seo.ts`, `app/layout.tsx`, every `app/*/page.tsx` |
| H10 | High | The canonical domain is uncertain. `seo.ts` falls back to `https://sumanranabhat.com`, `.env.example` says `https://sumanranabhat.com.np`, and there is no `.env.local`. All canonicals, the sitemap, OG URLs and JSON-LD currently point to `.com`. | Rendered `<link rel="canonical" href="https://sumanranabhat.com/…">`. | **Client must confirm** the domain. Set `NEXT_PUBLIC_SITE_URL` in the hosting environment and make the code fallback match it. | `data/seo.ts`, hosting env |
| H11 | High | Key decision information is missing. There are no fees or fee range, no batch timings, no class location (area in Pokhara), no batch size, no years of experience, no email address, and no response time. The FAQ subtitles promise "fees" and "turnaround times", but no answer covers them. | `app/education/page.tsx` FAQ subtitle; `app/services/page.tsx` FAQ subtitle; `profile.email = ""`. | Collect the details from the client (see section 13). Add 2–3 FAQ entries. Until then, remove the promises from the subtitles. | `data/profile.ts`, `app/education/page.tsx`, `app/services/page.tsx` |
| H12 | High | The hero photo is covered by two overlays: a top tag and a bottom card that repeat the name and title. The bottom card covers about a fifth of the photo and holds a 12px "Bio" link (3.46:1 contrast, 36×16px tap target). | `hero-section.tsx`; screenshots. | Remove both overlays and show the photo cleanly. | `components/home/hero-section.tsx` |
| M1 | Medium | Heading structure is inconsistent. `h4` comes straight after `h2` in FAQs, the engagement steps and the contact page (which has `h4` "Confidentiality Guarantee" before any `h2`). The footer's marketing `h2` ("Elevating academic understanding…") appears on every page. The About page `h1` is a job title, not the person; the Contact page `h1` is just the name. | Heading outline extracted per page. | Use `h3` under `h2`. Turn the footer heading into a `p`, or remove it. About `h1` "About Suman Ranabhat"; Contact `h1` "Contact". | `app/*/page.tsx`, `components/site-footer.tsx` |
| M2 | Medium | Pages are long because content is repeated. The mobile homepage is 7,380px (about 8.7 screens), the tuition page 8,797px (10.4 screens) and the services page 7,830px. | Measured at 390×844. | The redesign below targets about 5 screens for the mobile homepage, without hiding anything essential. | — |
| M3 | Medium | The copy contains claims that can't be backed up, and vague marketing language. Examples: "Zero rote-memorization", "Active Statutory & Regulatory Compliance Mastery", "Highest Professional Code of Ethics", "Confidentiality Guarantee", "Mentored students to standout results", "Distinction in accounting", "Active Batches" (a static claim that never changes), "VAT / GST" (confirm GST is relevant in Nepal), and "Due diligence for mergers, acquisitions". | `data/profile.ts`, `credentials-overview.tsx`, `app/services/page.tsx`, `app/contact/page.tsx`. | Replace with plain, specific statements the client confirms, or remove them. Specific facts (levels, subjects, modes, location) build more trust than adjectives. | Same files |
| M4 | Medium | The narrative voice switches between first person ("My mission…", About), "we/our" (Services, Education) and third person ("Suman Sir…"). | About, Services and Education pages. | Use first person throughout: it is a personal portfolio, and it reads warmer to parents. | Page copy |
| M5 | Medium | The footer mail icon links to `/contact` with the label "Direct Contact & Inquiry", which reads as an email address that doesn't exist. The Contact page shows "Email: Available upon inquiry / WhatsApp". | `site-footer.tsx`, `app/contact/page.tsx`. | Add a real email if the client has one. Otherwise remove the email rows and show phone, WhatsApp and location only. | Same files |
| M6 | Medium | Navigation labels don't match the pages, and there is a thin extra page. The nav says "Subjects", but the page is "Commerce & Accounting Tuition" at `/education`. `/experience` is an undated four-step timeline ("Early Foundation", "Professional Training"…) that repeats the qualifications. | `site-header.tsx`, `app/experience/page.tsx`. | Nav: **Tuition · Accounting Services · About · Contact**. Fold the timeline into About (once real dates and organisations exist) and redirect `/experience` → `/about`. | `site-header.tsx`, `site-footer.tsx`, `app/experience`, `next.config.ts` (redirect) |
| M7 | Medium | Some tap targets are small, and the active nav link isn't announced. The hamburger is 36×36px. Footer and inline links are 16px tall. Nav links have no `aria-current="page"`. | Measured; `site-header.tsx`. | Hamburger at least 44×44px. Footer links with `py-1.5` or more. Add `aria-current` to the active link. | `site-header.tsx`, `site-footer.tsx` |
| M8 | Medium | Form accessibility gaps. The tab switcher buttons have no `aria-pressed` or tab semantics. The error message has no `role="alert"`. There is no skip link anywhere. | Checked in the DOM. | Add `aria-pressed` (or `role="tablist"`/`tab`/`aria-selected`). Add `role="alert"` on the error. Add a "Skip to content" link targeting `<main id="main">`. | `contact-form.tsx`, `app/layout.tsx` |
| M9 | Medium | Some structured data misrepresents the offering. `Course.educationalCredentialAwarded` is set to the class level (for example "Class 11 & 12 (NEB Commerce)"), which claims tuition awards that credential. `Person.knowsAbout` includes "Statutory Audit & Compliance" (depends on C1). `FAQPage` is emitted on 3 pages with overlapping questions. | `data/seo.ts`. | Use `educationalLevel` instead. Align `knowsAbout` with the confirmed services. Emit each FAQ in one place only. | `data/seo.ts`, page files |
| M10 | Medium | The social sharing image is poor. The OG image is the raw 966 KB, 768×1024 portrait PNG, but it is declared as 600×750. A portrait-shaped image is cropped badly by `summary_large_image` cards (WhatsApp and Facebook previews matter for this audience). | `layout.tsx` metadata; the PNG header. | Create a 1200×630 OG image (photo plus name plus credential line), under 200 KB, and declare its real size. | `public/images/`, `app/layout.tsx` |
| M11 | Medium | The CSP is looser than it needs to be, and HSTS makes a lasting commitment. The production CSP allows `'unsafe-eval'`, which Next only needs in dev. `block-all-mixed-content` is deprecated. HSTS `includeSubDomains; preload` breaks any non-HTTPS subdomain and is hard to undo. | Response headers from `next start`. | Add `'unsafe-eval'` only when `NODE_ENV !== "production"`. Remove `block-all-mixed-content`. Keep `preload` only if the domain owner intends to submit to the preload list. | `next.config.ts` |
| M12 | Medium | The `<Image priority>` prop is deprecated in Next 16 in favour of `preload`. The declared image size (600×750) doesn't match the file (768×1024). | `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` ("`priority`… deprecated"); `hero-section.tsx`, `about/page.tsx`. | Use `preload` (or `fetchPriority="high"`), and set `width={768} height={1024}`. | Same files |
| L1 | Low | Dead code and assets. | See section 2. | Delete `theme-switcher.tsx`, `teaching-philosophy.tsx`, `portrait.svg`, the unused data exports and the duplicate nav list. | Listed files |
| L2 | Low | Hover effects on non-clickable cards (qualification cards, testimonial cards, principle cards), and a `translateY` lift on every button. | `globals.css` `.card-hover-*`; page markup. | Keep hover effects for clickable elements only. Drop the lift, or keep it at 1px but only on primary buttons. | `globals.css`, markup |
| L3 | Low | The mobile drawer sets hover colours with `onMouseEnter`/`onMouseLeave` inline-style mutation. | `site-header.tsx`. | Use a CSS `:hover` class. | `site-header.tsx` |
| L4 | Low | Geist Mono is loaded only for the step numbers "01–04" (fonts total about 53 KB per page). | `layout.tsx`, `font-mono` usages. | Drop Geist Mono and use Geist with `tabular-nums`. | `app/layout.tsx`, `app/globals.css` |
| L5 | Low | The README is stale. It refers to `portrait.svg`, says "Netlify publish directory `.next`", and mentions port 3000. `.vscode/launch.json` points at port 8080. The package name has a typo ("protfolio"). | Files listed. | Update them when convenient. | `README.md`, `.vscode/launch.json`, `package.json` |
| L6 | Low | The sitemap `lastModified` is the build time for every URL. The 404 page reuses the homepage `<title>` (it is correctly `noindex`). | `app/sitemap.ts`; the rendered 404. | Use static dates per page. Give the 404 page its own title. | `app/sitemap.ts`, `app/not-found.tsx` |

### 4.2 Verified as working, no change needed

- No horizontal overflow on any page at 390, 820 or 1440px.
- No console errors, exceptions or failed requests (apart from the deliberate 404 test).
- CLS was 0 on every page. LCP on localhost was the hero image on `/` and `/about` (about 60–310 ms unthrottled; this is not a field metric).
- About 152 KB of JS and 8 KB of CSS transferred per page. The hero image is about 10–20 KB as AVIF, thanks to `next/image`.
- The mobile menu opens, sets `aria-expanded="true"`, closes on Escape and closes on navigation. Its links are 40px tall.
- A keyboard focus outline is visible on every interactive element tested.
- Native `required` validation fires for name, email, phone and message. The WhatsApp message is correctly URL-encoded with all the fields.
- JSON-LD is escaped against `</script>` injection. No secrets are in the repository (`.env*` is git-ignored; only `.env.example` with a public URL is committed).
- External links use `rel="noopener noreferrer"`.

---

## 5. Homepage content density and hierarchy

### Current homepage, in order

| # | Section | What it says | Assessment |
|---|---|---|---|
| 1 | Hero | Name, "Commerce & Accounting Educator", "Concept-First Commerce Tuition", tagline, tuition and Call buttons, 3 tuition trust badges, photo with 2 overlays | Strong name. **One audience only.** The trust badges are adjectives, not facts. |
| 2 | Personal introduction | Another H2 about fundamentals, two paragraphs, two buttons, a quote card repeating the name and title | Repeats the hero. **Remove**, or fold one sentence into About. |
| 3 | Dual paths | Tuition card plus accounting card, each with a header row, badge, title, tagline, intro and 4 bullets | The right content in the wrong place, and too many layers per card. **Move up and simplify.** |
| 4 | Credentials | 3 generic ethics rows plus 3 placeholder qualification cards | **Replace** with a one-row strip of verified facts. |
| 5 | Testimonials | 3 anonymous quotes at 12px | **Keep only if verified** (C3). |
| 6 | CTA banner | "Ready to Build Clarity…", 2 buttons plus phone | Keep **one** closing contact section. |
| 7 | Footer callout | Another H2 and 2 more buttons | **Remove.** It duplicates section 6. |
| 8 | Footer | Bio, 4 tuition links, 4 service links, 5 nav links, bottom bar | Over-long for a small site. **Trim.** |

### What should be visible right away, and what can be revealed later

- **Visible immediately (first screen):** name; verified credential line; one sentence covering both offerings; the two audience paths, each with its primary action; the photo.
- **Visible on a normal scroll:** a short trust strip; a summary for each offering (subjects or services as scannable rows); a short About; the contact options.
- **Revealed on interaction (accordion, using native `<details>`, no JS):** FAQs (fees, schedule, online vs in-person, how a consultation starts), and per-service deliverables.
- **Linked out to dedicated pages:** full syllabus per subject, full service scope, full biography and timeline.

---

## 6. User-journey analysis

**Prospective accounting client (business owner or individual taxpayer)**
1. Lands on the homepage. The hero says "tuition for school and college students". *Thinks this is a tutor, not an accountant.* Many will leave here.
2. If they scroll, they find the dark "Accounting & Advisory Services" card on screen 3–4 and click through to `/services`. That page is detailed, but there is no credential, no years of practice, no indication of fees or engagement size, and an ethics claim with no body behind it.
3. They click "Request Consultation" and the form defaults correctly to Accounting there. But from the header "Get in Touch" they reach the **tuition** form (H5). Submitting shows "Inquiry Details Prepared", and they may never press the WhatsApp button (C4).

*Needs:* a credential line, an immediate services path, specific services in plain words, a direct "Discuss accounting work" action that opens WhatsApp or a call.

**Student (Class 11–12, BBS or BBA)**
1. The hero speaks to them. "Explore Tuition & Subjects" leads to `/education`, which covers 4 subjects in reasonable detail.
2. Questions left unanswered: *When are the classes? Where? How much? Is there a batch for my college?* The FAQ subtitle mentions fees, but there is no fee answer.
3. The 12px text and long page (10 phone screens) make it hard to read on a phone, which is their main device.

*Needs:* subjects by level, class mode, location, timings, fee guidance or "fees on request", and one WhatsApp action pre-filled with their level.

**Parent**
1. Wants to know who the teacher is, what qualifies them, whether they are trustworthy, and the logistics.
2. Sees vague qualifications ("Recognized University") and anonymous testimonials. *These lower trust rather than raise it.*
3. "Call Now" in the hero is good for this audience. Keep a visible phone number.

*Needs:* real credentials, years of teaching, results or testimonials with permission, a location, and a clear phone or WhatsApp number.

---

## 7. Responsive and mobile findings

| Finding | Evidence | Fix |
|---|---|---|
| No overflow; stacking works | Measured at 390 and 820px | — |
| The first mobile screen shows tuition only, with the photo pushed below the fold | `m-home` screenshots | Two path cards in the hero; a smaller photo beside or below the name |
| Mobile homepage is 8.7 screens; tuition page 10.4 | Measured | Remove duplicate sections (section 5) |
| Contact page: the form starts below the contact card and the confidentiality card (about one screen down) | Screenshot | On mobile, put WhatsApp and Call buttons first, then the form |
| Contact form tab labels wrap to two lines at 390px ("Student / Tuition Inquiry") | Screenshot | Shorter labels: "Tuition" / "Accounting" |
| Hamburger 36×36, footer links 16px tall | Measured | See M7 |
| No sticky contact control on mobile | — | Optional: a small bottom "WhatsApp" bar on mobile only, not a floating bubble, and not on the contact page |
| Tablet (820px): desktop nav shows, the header CTA is hidden below 1024px | `site-header.tsx` (`hidden lg:flex`) | Acceptable. With 4 nav items, the CTA can show from `md` |

---

## 8. Accessibility, performance, SEO and reliability

**Accessibility:** see H2 (text size), H3 (contrast), M1 (headings), M7 (targets, `aria-current`) and M8 (form semantics, skip link). Image alt text is present and descriptive. Reduced motion is respected. Focus outlines are visible.

**Performance:** already in good shape (section 4.2). Remaining items are minor: L4 (drop Geist Mono), M10 (OG image weight), M12 (`preload`). The 966 KB source PNG doesn't hurt page loads, because `next/image` serves about 20 KB AVIF, but it is what social crawlers fetch.

**SEO:** H9 (titles and OG), H10 (domain), M9 (structured data), M1 (headings), M6 (meaningful nav labels). Local terms ("Pokhara", "Class 11/12", "BBS") are already used well in titles and descriptions. If he is a CA, add "Chartered Accountant Pokhara" and "tax consultant Pokhara" terms to the services page; this depends on C1.

**Security and reliability:** T1 (upgrade Next), M11 (CSP and HSTS). The form only builds a WhatsApp URL, so there is no server-side input handling and no injection surface. If option B (real email delivery) is chosen for C4, add server-side validation, rate limiting or a honeypot, and keep the API key server-only (not `NEXT_PUBLIC_`).

**Animations:** only CSS transitions (150–200 ms) and a 150 ms fade on the mobile drawer. There is no scroll-reveal, parallax or animation library. **Keep it this way.** Only remove the hover effects on non-clickable cards (L2).

---

## 9. Proposed minimal homepage wireframe

```
┌──────────────────────────────────────────────────────────────────────┐
│ HEADER (sticky, 64px)                                                │
│ [SR] Suman Ranabhat                Tuition  Accounting  About  [Contact] │
│      <credential line — CONFIRM>                                     │
├──────────────────────────────────────────────────────────────────────┤
│ HERO  — purpose: who he is + choose your path (one screen on desktop)│
│                                                                      │
│  Pokhara · In person & online                       ┌────────────┐   │
│  Suman Ranabhat                     (H1)            │   photo    │   │
│  <Credential — CONFIRM> · Accounting teacher        │ no overlays│   │
│  Accounting tuition for Class 11–12 and BBS/BBA     └────────────┘   │
│  students, and accounting & tax support for                          │
│  businesses in Pokhara.                                              │
│                                                                      │
│  ┌ For students & parents ───────┐  ┌ For businesses & individuals ─┐│
│  │ Class 11–12 · BBS · BBA       │  │ Tax & VAT · Bookkeeping ·     ││
│  │ Accountancy, Costing, Tax     │  │ Financial statements · Audit  ││
│  │ [Enquire about tuition]       │  │ [Discuss accounting work]     ││
│  │  See subjects →               │  │  See services →               ││
│  └───────────────────────────────┘  └───────────────────────────────┘│
├──────────────────────────────────────────────────────────────────────┤
│ TRUST STRIP — one row, 3–4 VERIFIED facts only (CONFIRM each)        │
│  <Qualification> · <N years teaching> · <Levels taught> · <Mode>     │
├──────────────────────────────────────────────────────────────────────┤
│ TUITION  (#tuition)  — purpose: answer a student's/parent's questions│
│  H2 "Accounting tuition for Class 11–12 and Bachelor's students"     │
│  4 subject rows: title · level · one line   (from educationOfferings)│
│  How classes run: small batches · in person in <area> / online ·     │
│  weekly doubt sessions   (3 short lines, no cards)                   │
│  ▸ Fees and timings?  ▸ Online or in person?  ▸ Can I join mid-year? │
│  [Enquire about tuition]      Full subject details →                 │
├──────────────────────────────────────────────────────────────────────┤
│ ACCOUNTING SERVICES  (#services) — purpose: show a client what's done│
│  H2 "Accounting and tax support for businesses and individuals"      │
│  4 service rows: title · who it's for · one line  (from services)    │
│  How it works: Call → Review your records → Agreed scope & fee       │
│  [Discuss accounting work]    Full service details →                 │
├──────────────────────────────────────────────────────────────────────┤
│ ABOUT — 3–4 sentences, first person, + verified qualifications list  │
│  Read more →                                                         │
├──────────────────────────────────────────────────────────────────────┤
│ TESTIMONIALS — only if verified & permitted; max 3; 16px text        │
├──────────────────────────────────────────────────────────────────────┤
│ CONTACT — purpose: one obvious next step per audience                │
│  [WhatsApp about tuition]  [WhatsApp about accounting]  [Call]       │
│  <Address / area> · <Hours> · <Email if any>                         │
│  (full form remains on /contact)                                     │
├──────────────────────────────────────────────────────────────────────┤
│ FOOTER — name · phone · location · 4 links · ©                       │
└──────────────────────────────────────────────────────────────────────┘
```

**Pages after the redesign:** `/` (above), `/education` (full subjects, modes, tuition FAQ, form), `/services` (full scope, engagement steps, services FAQ, form), `/about` (bio, qualifications, timeline merged in from `/experience`), `/contact`. Redirect `/experience` → `/about`.

---

## 10. Before-and-after recommendations

| Element | Before | After |
|---|---|---|
| Hero eyebrow | "ACADEMIC MENTORSHIP & CONCEPT-FIRST TUITION" | "Pokhara · In person & online" |
| Hero subtitle | "Commerce & Accounting Educator · Concept-First Commerce Tuition" | "<Confirmed credential> · Accounting teacher" |
| Hero line | "Concept-first commerce & accounting tuition for school and college students in Pokhara." | "Accounting tuition for Class 11–12 and BBS/BBA students, and accounting and tax support for businesses in Pokhara." |
| Hero actions | "Explore Tuition & Subjects" + "Call Now" | Two path cards: **"Enquire about tuition"** / **"Discuss accounting work"**; "Call" stays in the header on mobile |
| Trust badges | "Concept First / Zero rote-memorization", "Strong Fundamentals", "Personal Attention" | Verified facts only, for example "<Degree, Institution>", "<N> years teaching", "Class 11 to BBA" |
| Intro section | H2, 2 paragraphs, 2 buttons, quote card | Removed (one sentence moves to About) |
| Dual path cards | 5 levels of labels, 4 bullets at 12px, button | Merged into the hero; 1 title, 1 line, 1 action each |
| Credentials | 3 ethics rows + 3 placeholder cards | One trust strip (homepage); a full list on About |
| Closing CTAs | CTA banner (2 buttons + phone) + footer callout (2 buttons) | One contact section with 2 WhatsApp buttons and Call |
| Header nav | About · Subjects · Services · Experience · Contact + "Get in Touch" | Tuition · Accounting · About · **Contact** |
| Form submit | "Prepare & Send Inquiry" → "Inquiry Details Prepared" → "Send via WhatsApp" | "Continue on WhatsApp" (opens directly), or real email delivery if approved |
| Form tabs | "Student / Tuition Inquiry" / "Accounting & Advisory Inquiry" | "Tuition" / "Accounting" (set from `?type=`) |
| Body text | 12px | 16px (secondary text 14px) |
| `.btn-gold` | Dark text on mid-blue (3.18:1) | White text on a darker blue (≥4.5:1), or merged into `.btn-primary` |
| Page titles | "… \| Suman Ranabhat \| Suman Ranabhat" | "… \| Suman Ranabhat" |

---

## 11. Prioritised implementation roadmap

### Phase 1: Essential fixes

| Task | Depends on | Files | Risk | Verify by |
|---|---|---|---|---|
| 1.1 Upgrade Next to ≥16.4.0 and fix the audit findings (T1) | — | `package.json`, lockfile | Low (minor version); read the Next 16.4 release notes first | `npm audit` clean; `tsc`, lint and build pass; pages render |
| 1.2 Confirm and correct the credentials, CA status, subjects and testimonials (C1, C2, C3, H7) | **Client input** | `data/profile.ts`, `data/seo.ts` | None technically; high content risk if guessed | Client sign-off on the content list |
| 1.3 Fix the form submit flow (C4, option A) and honour `?type=` (H5) | — | `contact-form.tsx`, `app/contact/page.tsx`, CTA links | Low | Submit opens `wa.me` with the encoded text; `/contact?type=services` shows the Accounting tab; page still prerenders `○` |
| 1.4 Fix the metadata (H9) and the domain (H10) | Domain from the client | `data/seo.ts`, `app/*/page.tsx` | Low | Fetch each page's `<head>`: single name in the title, `og:image` present, correct canonical host |
| 1.5 Fix contrast and the form palette (H3, H6) | — | `globals.css`, `contact-form.tsx`, `not-found.tsx`, `error.tsx` | Low | Re-run the contrast script: 0 failures |
| 1.6 Accessibility basics: skip link, `aria-current`, form `aria-pressed`/`role="alert"`, 44px hamburger (M7, M8) | — | `layout.tsx`, `site-header.tsx`, `contact-form.tsx` | Low | Tab walk, DOM attributes, measured target sizes |

### Phase 2: UI/UX redesign

| Task | Depends on | Files | Risk | Verify by |
|---|---|---|---|---|
| 2.1 New hero with two audience paths; remove photo overlays (H1, H12) | 1.2 | `hero-section.tsx`, `dual-paths.tsx` | Medium (the most visible change) | Screenshots at 390, 820 and 1440; both paths visible on the first desktop screen and within the first 1.5 screens on mobile |
| 2.2 Rebuild the homepage order to match the wireframe; remove the intro section and the footer callout; add the trust strip, tuition and service summaries, and contact section (H4, H8, M2) | 2.1 | `app/page.tsx`, `components/home/*`, `site-footer.tsx` | Medium | Mobile homepage at or under about 5 screens; no repeated sections; one CTA per journey |
| 2.3 Raise the type scale; remove 10px text; reduce the badges and nested cards (H2, L2) | — | `globals.css`, all components | Medium (layout reflow) | Font-size share: 12px or smaller under 15% of characters; screenshots show no overflow |
| 2.4 Navigation: 4 items; merge `/experience` into `/about` with a redirect (M6) | 1.2 for timeline dates | `site-header.tsx`, `site-footer.tsx`, `app/about`, `app/experience`, `next.config.ts` | Low | `/experience` returns 308 to `/about`; sitemap updated |
| 2.5 Copy pass: first-person voice, remove unprovable claims, add fees, timings and location FAQs (M3, M4, M5, H11) | Client input | `data/profile.ts`, pages | Low | Client review |
| 2.6 Headings and de-duplicated FAQ and schema (M1, M9) | 2.2 | pages, `data/seo.ts` | Low | Heading outline has no skipped levels; each FAQ question appears in only one `FAQPage` |

### Phase 3: Polish and optimisation

| Task | Files | Risk | Verify by |
|---|---|---|---|
| 3.1 1200×630 OG image (M10) | `public/images`, `layout.tsx` | Low | Preview in a WhatsApp or Facebook share debugger |
| 3.2 Tighten the CSP; review HSTS (M11) | `next.config.ts` | Medium: a too-strict CSP breaks hydration | No CSP errors in the console on any page |
| 3.3 `preload` instead of `priority`; correct image dimensions (M12) | `hero-section.tsx`, `about/page.tsx` | Low | Build has no deprecation warning; preload link present |
| 3.4 Delete dead code; drop Geist Mono; CSS-only hover in the drawer (L1, L3, L4) | listed files | Low | Build and lint pass; font transfer reduced |
| 3.5 README, sitemap dates, 404 title (L5, L6) | listed files | Low | Review |
| 3.6 Optional mobile-only WhatsApp bar | new small component | Low | Doesn't cover content; hidden on `/contact` |

---

## 12. Potential regressions and recommended tests

The project has **no automated tests** today. Recommended additions:

1. **CI gate:** `tsc --noEmit`, `npm run lint` and `npm run build` on every push (GitHub Actions; no new dependencies).
2. **Smoke tests for the main journeys** (this needs Playwright added as a dev dependency, which is a decision for the developer):
   - The homepage shows both "Enquire about tuition" and "Discuss accounting work" in the first viewport at 1440 and 390.
   - `/contact?type=services` opens the Accounting tab.
   - Submitting a valid form produces a `wa.me` URL that contains every field, URL-encoded.
   - The mobile menu opens, closes on Escape and closes on navigation.
3. **Accessibility:** an axe-core scan per page in the same suite. The contrast script used in this audit (`ratio < 4.5`) can be repeated.
4. **Metadata snapshot:** for each route, assert the title, canonical, `og:image` and a single `<h1>`.
5. **Visual check** at 390, 820 and 1440 after the Phase 2 changes.

**Regressions to watch for:**
- Reading `useSearchParams` in `ContactForm` without `<Suspense>` would make `/contact` dynamic, or fail the build.
- A tighter CSP can block Next's inline bootstrap script.
- Raising the type scale can cause overflow in the two-column hero at 1024–1280px.
- Removing `/experience` without a redirect breaks any shared links.
- Changing `siteUrl` changes every canonical URL. Resubmit the sitemap in Search Console.

---

## 13. Questions and missing content for the client

**Identity and credentials**
1. Is Suman Ranabhat a Chartered Accountant (ICAN member)? If so: membership type and number (optional to display), and the year qualified. If not, what is the exact professional title he should use?
2. What are his real academic qualifications (degree, institution, year)?
3. Is he a member of any professional bodies? Exact names.
4. How many years has he been teaching? How many years in accounting practice?
5. Which employers or firms can be named in the experience timeline, with dates?

**Tuition**
6. The exact subjects by level. Does he teach Economics, Business Mathematics or Corporate Finance, which the homepage currently lists? Does he teach B.Com?
7. Where are in-person classes held (area or landmark in Pokhara)? Are online classes really offered?
8. Batch timings, typical batch size, and whether students can join mid-session.
9. Fees: a range, "per month", or "on request"?
10. Any results he is willing to state (for example board or university outcomes), with permission?

**Accounting services**
11. Which of the listed services does he actually provide today? (Particularly statutory audit file preparation, dispute representation, cross-border tax, M&A due diligence, GST.)
12. Typical clients (individuals, small businesses, NGOs…) and how fees are set (fixed, hourly, retainer).

**Proof and contact**
13. Are the three testimonials real, and did each person agree to be quoted? Can we use a first name and initial?
14. Is there a business email address? Office hours?
15. Which domain is final: `sumanranabhat.com` or `sumanranabhat.com.np`?
16. Should enquiries stay WhatsApp-only, or should the form send email as well (this needs a mail service account)?

---

## Five highest-impact improvements

1. **State the real credential and replace the placeholder qualifications and testimonials** (C1–C3). Nothing else improves trust as much for both clients and parents, and it costs no code complexity.
2. **Put both audience paths in the hero, each with one clear action** (H1, H4). A business owner should know within 5 seconds that accounting services are offered.
3. **Make the enquiry actually send, and open on the right audience** (C4, H5). "Continue on WhatsApp", opened directly and preset from the CTA, removes the false "sent" moment.
4. **Cut the repeated sections and raise body text to 16px** (H2, H8, M2). Removing the intro, footer callout and repeated credentials makes room for larger text, so the page gets both more readable and shorter.
5. **Upgrade Next.js and fix contrast and metadata** (T1, H3, H9). These are low-risk, mechanical fixes that close a security advisory, meet WCAG AA, and make shared links preview correctly.
