# The Garden Restaurant — Build Notes

**Live at https://garden-restaurant-ten.vercel.app** (deployed 2026-07-28). GitHub repo:
https://github.com/keithrodrigues4837/garden-restaurant (SSH remote, pushes via
`git push` work directly — an SSH key was set up on this machine and added to the
GitHub account for this). Vercel project auto-deploys on push to `master`.
`NEXT_PUBLIC_SITE_URL` is set as a Vercel env var to the real domain, so OG/social
metadata resolves correctly in production (verified).

## What this is
Next.js website for **The Garden Restaurant** — authentic North Indian restaurant at
La Ben Resort, Colva Beach Rd, Colva, Goa 403708, India. Open daily 11:00 AM–11:00 PM,
seats 60. Built as a menu/info site; online pickup ordering exists in code but is
currently switched off (see below).

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind v4), scaffolded with `create-next-app`
- Hosted on Vercel, auto-deploys from GitHub `master` (see top of file)
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
10. Git initialized, committed after every change (see `git log`), pushed to
    GitHub, auto-deployed to Vercel on every push to `master`.
11. **Reserve a Table** (`/reserve`, `src/components/ReservationForm.tsx`) — a
    form (name, phone, date, time, party size, notes) that opens WhatsApp with a
    pre-filled reservation message to the restaurant's real number on submit.
    No backend/database involved; confirmation is manual via WhatsApp or phone.
    Linked from the header nav, the home hero ("Reserve a Table", replacing the
    old "Visit Us" button — location info is still one click away via the
    "Location" nav item), and the footer. Verified end-to-end in production.

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

## Next steps
Deployment is done (see top of file) and a production click-through (Home, Menu —
images, WhatsApp button) came back clean. Nothing outstanding except the two
deliberately-deferred features below — only revisit if the user brings them up.

Possible future asks, not yet requested: a custom domain (currently on the free
`*.vercel.app` subdomain), analytics.

## Environment gotcha (Windows/PowerShell)
Each PowerShell tool call starts a fresh process — `$env:Path` changes don't persist
between calls. Every command needs this prefix to see `node`/`npm`/`git`:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```
(Note: the Bash tool in this environment does NOT need this prefix — `git`, `node`,
and `npm` already resolve there. Only PowerShell calls need it.)

## Git auth gotcha
`git push` over HTTPS hung indefinitely in this sandboxed Bash tool — Git Credential
Manager tries to pop a browser login window that never became visible/interactive
here. Fixed by switching to SSH: generated `~/.ssh/id_ed25519` (no passphrase),
added the public key to the GitHub account's SSH keys, and set the `origin` remote
to `git@github.com:keithrodrigues4837/garden-restaurant.git`. Plain `git push` now
works fine. If push ever hangs again, check `git remote -v` first — HTTPS URLs
will hit the same GCM problem.

## Dev server
Run `npm run dev` from `C:\Users\keith\garden-restaurant` (with the PATH prefix above
if using PowerShell). Site runs at http://localhost:3000. A background dev server may
still be running from a previous session — check before starting a second one (port
3000 conflict).

## Unresolved: stray `preview.html`
An untracked `preview.html` (~62KB, static Tailwind-CDN copy of the homepage) sits
in the project root, not part of any commit. Origin unclear — left alone and
un-staged rather than guessed at; ask the user before deleting or committing it.

## Ignore this
The Next.js dev overlay may show a hydration "Console Error" mentioning a `webcrx=""`
attribute mismatch on `<html>`. This is caused by a browser extension injecting an
attribute client-side. It's suppressed with `suppressHydrationWarning` on the `<html>`
tag in `layout.tsx` — confirmed harmless, already handled.
