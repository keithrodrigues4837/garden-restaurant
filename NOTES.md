# The Garden Restaurant — Build Notes

**Live at https://garden-restaurant-ten.vercel.app** (deployed 2026-07-28). GitHub repo:
https://github.com/keithrodrigues4837/garden-restaurant (SSH remote, pushes via
`git push` work directly — an SSH key was set up on this machine and added to the
GitHub account for this). Vercel project auto-deploys on push to `master`.
`NEXT_PUBLIC_SITE_URL` is set as a Vercel env var to the real domain, so OG/social
metadata resolves correctly in production (verified).

## What this is
Next.js website for **The Garden Restaurant** — authentic North Indian restaurant at
La Ben Resort, Colva Beach Rd, Colva, Goa 403708, India. Open daily 1:00 PM–11:00 PM,
seats 60 (hours changed from 11:00 AM–11:00 PM on 2026-07-29 — see that session's
summary below). Built as a menu/info site; online pickup ordering exists in code but
is currently switched off (see below).

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
6b. **Floating Instagram follow button** (`src/components/InstagramButton.tsx`,
   also rendered site-wide in `layout.tsx`) — same style/pattern as the WhatsApp
   button, stacked directly above it, links to `instagram.com/garden.goa` (handle
   in `restaurant.instagram` in `restaurant-info.ts`). This is a follow link only,
   not a live embedded feed — user was offered both options and chose the simple
   follow button since a live feed would need a third-party service (SnapWidget/
   Elfsight-style) with the restaurant's Instagram account connected via that
   service's own login, which needs the user to set up themselves.
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
    The Time field is a `<select>` dropdown (not a native time input) listing
    only half-hour slots from 1:00 PM to 11:00 PM, generated from `OPEN_TIME`/
    `CLOSE_TIME` constants in the component — so guests physically cannot
    choose or type a time outside business hours.
12. **Homepage highlight tiles loop photos** — the three tiles below the hero
    (`src/app/page.tsx` `highlights` array + `src/components/RotatingImage.tsx`,
    a client component) each cross-fade through a rotating set of photos every
    4s, photo-only (no title/caption shown underneath, though `title` is still
    kept in the data for the `alt` text/React key).
    **2026-07-31 update:** the tiles now use the restaurant's own professional
    dish/kitchen photography instead of the earlier Instagram screenshots. User
    supplied 70 source photos from `C:\Users\keith\OneDrive\Desktop\Garden
    album\Garden Dishes`; they were resized (max 1400px, JPEG q78, ~12MB total)
    into `public/images/dishes/dish-01.jpg`…`dish-70.jpg` and split round-robin
    (i % 3) across the three tiles, ~23 photos each, so each tile cycles through
    a large rotating set rather than just 2 images. The old
    `public/images/instagram/` folder and its 6 screenshot crops were deleted.
    If more photos arrive later, add them to `public/images/dishes/` and append
    to the relevant `images` array in `highlights` (`src/app/page.tsx`).

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
Deployment is done (see top of file), Reserve a Table is live (see item 11 above),
homepage highlight tiles now loop the restaurant's own dish photography (item 12,
updated 2026-07-31), hours are updated, and production has been re-verified after
each change. Nothing outstanding except the two deliberately-deferred features
below — only revisit if the user brings them up.

Possible future asks, not yet requested: a custom domain (currently on the free
`*.vercel.app` subdomain), analytics.

## 2026-07-31 session summary
User supplied the promised folder of real restaurant photos (see item 12
above) and asked to replace the homepage tile photos entirely with these.
Clarified scope first (curate a handful vs. use everything) — user chose to
split all 70 photos evenly across the three tiles rather than hand-picking a
small set. Resized/compressed them with `sharp` (already a transitive
dependency via Next.js), wrote the output to `public/images/dishes/`, deleted
the old `public/images/instagram/` folder, and updated the `highlights` array
in `src/app/page.tsx`. Verified locally via the dev server and browser
screenshot before pushing (user asked to look first), then pushed and
confirmed the change live on production the same way. The stray `preview.html`
in the project root is still there, untouched.

Later in the same session, user flagged (via a phone screenshot) that the
tiles looked bad on mobile — each one was full-width and nearly full-screen
tall, stacked one below the other. Fixed the grid in `src/app/page.tsx`:
`grid-cols-2` on mobile (2 photos per row) with the third tile centered below
at the same size (`col-span-2 mx-auto w-1/2`), `sm:grid-cols-3` unchanged for
desktop. **Note:** the browser automation tool's `resize_window` did not
actually change the page's viewport in this environment (confirmed via
`window.innerWidth` staying at desktop size even after a "successful" resize
call) — could not get a real mobile-viewport screenshot this session. Verified
the fix instead by having the user check it live on their phone over the LAN
dev-server address before pushing.

Also swapped the site logo (`public/logo.png`, used in `Header.tsx` and
`Footer.tsx`) for a new design the user provided from
`OneDrive\Desktop\Garden album\Garden logo\Gardenlogo.png` — same leaf/pill
mark as before, but now with a "Specialising in Authentic Indian Cuisine"
tagline baked into the image underneath. The source file has that tagline in
dark text, which was invisible against the dark green header/footer
background — recolored just those pixels to white with a raw-buffer script
(`sharp`, threshold on y-coordinate + alpha, no other part of the artwork
touched) rather than cropping the tagline off, per user's explicit request.
Old `public/logo-cropped.png` deleted; note `public/logo-transparent.png`
(unused, pre-dates this session) is still sitting in `public/` untouched — not
part of this change, low priority to clean up.

User separately asked about the watermarks ("THE GARDEN RESTAURANT" logo
baked into ~most of the professional dish photos, position varies — top-left/
top-center/top-right depending on the shoot) — explained there's no true
inpainting tool available, only a blur-patch trick that would look uneven
across photos (seamless on blurry/bokeh backgrounds, smudged on sharp ones
like a shrimp platter shot). **User said to leave watermarks as-is — don't
touch them, don't re-raise unprompted.**

## 2026-07-29 session summary
Three small feature changes to the homepage and Reserve page, all pushed live
and verified in production:
1. **Homepage highlight tiles → looping Instagram photos** (see item 12 above).
   User initially asked for one static photo per tile matched to its category;
   after a proposal, they instead wanted each tile to loop between different
   Instagram posts, and later to drop the vegetarian-only framing on the third
   tile ("don't keep a veg title... later I'll upload the file with all the
   pictures") and to drop the title/description text under all three tiles
   entirely, leaving photo-only cards.
2. **Opening hours changed from 11:00 AM to 1:00 PM** (closing stays 11:00 PM).
   Updated the single source of truth (`restaurant.hours`/`hoursShort` in
   `restaurant-info.ts`), which propagates to the hero, footer, About, Contact,
   and Reserve pages, plus the `Restaurant` JSON-LD `openingHoursSpecification`.
3. **Reserve page time field restricted to business hours.** First pass added
   `min`/`max` to the native time input (browser-enforced but only a soft
   guarantee across browsers); user then asked more directly for the picker
   itself to only offer 1:00 PM–11:00 PM, so it was replaced with a `<select>`
   dropdown of fixed half-hour slots — no way to enter an out-of-range time now.

All three commits pushed to `master` and confirmed live via a production
click-through (homepage tile rotation, hero/footer hours text, Reserve page
dropdown all checked with the browser).

## 2026-07-28 session summary
Picked up the deployment that was paused at the end of the prior session and
finished it, then shipped two feature requests:
1. **Deployment** — created the GitHub repo, pushed via SSH (see "Git auth
   gotcha"), imported into Vercel, deployed, set `NEXT_PUBLIC_SITE_URL`, verified
   production.
2. **Header/footer color exploration** — user asked to recolor the header/footer.
   Followed [[feedback-color-iteration-workflow]]: built an artifact with four
   named, grounded directions (Deep Forest/current, Tandoor Clay, Spice Market
   Espresso, Colva Tide) instead of guessing one edit. User picked **Tandoor
   Clay**, it was implemented and verified, then the user changed their mind
   ("keep the previous design as it was") before it was pushed — reverted
   cleanly, confirmed via `git diff --stat` showing zero changes. **Net result:
   header/footer are still Deep Forest, unchanged from before this session** —
   don't assume Tandoor Clay is live, and don't re-propose a recolor unprompted.
3. **Reserve a Table** — added per item 11 above, pushed live.

Also noticed the stray `preview.html` (see below) — flagged to the user, not
resolved either way.

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
