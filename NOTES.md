# The Garden Restaurant — Build Notes

Session paused here (2026-07-27, evening) — user was tired, picking up tomorrow.
Resume by continuing the deployment walkthrough in "Next steps" below (step 1) —
we were mid-way through connecting a git remote + Vercel when the session ended.

## What this is
Next.js website for **The Garden Restaurant** — authentic North Indian restaurant at
La Ben Resort, Colva Beach Rd, Colva, Goa 403708, India. Open daily 11:00 AM–11:00 PM,
seats 60. Built as a menu/info site; online pickup ordering exists in code but is
currently switched off (see below).

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind v4), scaffolded with `create-next-app`
- Hosting target: Vercel (not yet deployed — no git remote configured yet either)
- No database — menu is static data in `src/lib/menu-data.ts`; cart is client-side
  React Context + localStorage (currently unused in the UI, see ordering flag below)

## Current state — what's live in the code right now
1. **Pages**: Home, Menu, About, Contact — all built with real content and real photos.
2. **Real menu**: ~150 items across 20 categories, digitized from the restaurant's own
   PDF menu (`src/lib/menu-data.ts`). Alcohol and un-priced "market rate" seafood are
   excluded, with a `note` field telling customers to call in for those.
3. **Real photos**: sourced from the restaurant's own public Google Business Profile
   listing, in `public/images/`, used across Home/About/Menu.
4. **Real contact info**: real phone `+91 83790 43188` in `src/lib/restaurant-info.ts`
   (`phoneIsPlaceholder: false`), shown in the footer, Contact page, and JSON-LD.
5. **Online ordering is OFF** via `restaurant.orderingEnabled = false` in
   `restaurant-info.ts`. This is one flag, not a deletion: the Menu page shows
   dish info only (no Add buttons/cart/checkout, full-width layout), and the
   Header CTA, Home CTAs/copy, Footer link, and About page copy all read as plain
   "View Menu" / menu-browsing language instead of promising ordering. All the
   cart/checkout code (`CartContext`, `CartPanel`, `MobileCartBar`) is untouched —
   **flip `orderingEnabled` back to `true` and everything reverts automatically**,
   no other changes needed.
6. **Floating WhatsApp button** (`src/components/WhatsAppButton.tsx`, rendered
   site-wide in `layout.tsx`) — links to `wa.me/918379043188` with a prefilled
   greeting, opens in a new tab. Its bottom offset already accounts for the mobile
   cart bar reappearing if ordering is ever turned back on.
7. **SEO**: full Open Graph + Twitter card metadata, a `Restaurant` JSON-LD
   structured-data script (now includes `telephone` since the number is real),
   a generated 1200×630 `opengraph-image.jpg` (cropped from the entrance-sign
   photo), and a working Google Maps embed on the Contact page (no API key
   needed, `output=embed` pattern — this already existed from an earlier session).
8. **Menu page extras**: dish name/description search, a "Chef's Specials only"
   filter (alongside "vegetarian only"), a mobile sticky cart bar (dormant while
   ordering is off), and two bug fixes — the category-nav pills used to list
   categories a filter had emptied out, and the pill row was causing genuine
   horizontal page overflow on desktop (fixed with `min-w-0`).
9. **Build verified clean**: `npm run build` compiles successfully and all 6
   routes prerender as static content. `eslint` flags one pre-existing,
   non-blocking issue in `CartContext.tsx` (a `setState` call inside an effect,
   `react-hooks/set-state-in-effect`) — doesn't fail the build, and the cart UI
   is currently hidden anyway, so it's fine to leave until ordering comes back.
10. Git initialized, committed after every change (see `git log`) — **but no
    remote configured yet**, this repo is local-only.

## Known deferred features (deliberately not built — user's choice, don't re-raise unprompted)
- **AI Q&A/upsell assistant** (Claude API, not chat-ordering) — was mid-setup in an
  earlier session (walking the user through creating an Anthropic API key at
  console.anthropic.com); user has since deprioritized it twice ("we'll get back
  to this", "skip for now"). If they bring it up again: add `.env.local` with
  `ANTHROPIC_API_KEY`, `npm install @anthropic-ai/sdk`, build
  `src/app/api/assistant/route.ts` with the full menu in the system prompt, and a
  chat widget on the Menu page.
- **Real order backend** (email/SMS notifying the kitchen) — moot right now since
  ordering is paused; only relevant again if/when `orderingEnabled` goes back to
  `true`. Ask before building — don't assume email vs SMS vs "call to confirm".

## Next steps (in order)
1. **Deploy — connect a git remote + Vercel.** This is what we were doing when the
   session paused (user was about to answer whether they already have a GitHub
   account). Plan already agreed on:
   - Neither `gh` (GitHub CLI) nor a logged-in `vercel` CLI session exists in this
     environment (confirmed: `gh` isn't installed; `npx vercel --version` works
     but isn't authenticated). Logging into GitHub and Vercel both require the
     user's own action — can't be done on their behalf.
   - Simplest path: user creates an empty GitHub repo via github.com (give exact
     steps, or offer to drive their browser via Chrome automation if they're
     already logged in and say yes) → run `git remote add origin <url>` and
     `git push -u origin master` (Git Credential Manager will likely pop a browser
     login the first time) → user connects that repo at vercel.com ("Add New
     Project" → import from GitHub → Next.js auto-detected, no config needed).
   - Once first deployed, set `NEXT_PUBLIC_SITE_URL` as a Vercel env var to the
     real `*.vercel.app` (or custom domain) URL, then redeploy, so the OG image
     and social-share metadata resolve to the live domain instead of localhost.
2. Once live, do one more click-through pass on the actual production URL (not
   just localhost) — check images, fonts, and the WhatsApp button work there too.
3. Only revisit the AI assistant or order backend if the user brings them up.

## Environment gotcha (Windows/PowerShell)
Each PowerShell tool call starts a fresh process — `$env:Path` changes don't persist
between calls. Every command needs this prefix to see `node`/`npm`/`git`:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```
(Note: the Bash tool in this environment does NOT need this prefix — `git`, `node`,
and `npm` already resolve there. Only PowerShell calls need it.)

## Dev server
Run `npm run dev` from `C:\Users\keith\garden-restaurant` (with the PATH prefix above
if using PowerShell). Site runs at http://localhost:3000. A background dev server may
still be running from a previous session — check before starting a second one (port
3000 conflict).

## Ignore this
The Next.js dev overlay may show a hydration "Console Error" mentioning a `webcrx=""`
attribute mismatch on `<html>`. This is caused by a browser extension injecting an
attribute client-side. It's suppressed with `suppressHydrationWarning` on the `<html>`
tag in `layout.tsx` — confirmed harmless, already handled.
