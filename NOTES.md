# The Garden Restaurant — Build Notes

**Live at https://garden-restaurant-ten.vercel.app** (deployed 2026-07-28). GitHub repo:
https://github.com/keithrodrigues4837/garden-restaurant (SSH remote, pushes via
`git push` work directly — an SSH key was set up on this machine and added to the
GitHub account for this). Vercel project auto-deploys on push to `master`.
`NEXT_PUBLIC_SITE_URL` is set as a Vercel env var to the real domain, so OG/social
metadata resolves correctly in production (verified).

**Homepage highlight tiles are now a 4-theme cycling showcase** (`src/components/ThemeTiles.tsx`,
replaced the old flat `RotatingImage` 70-photo carousel on 2026-08-03). See item 12 below and
the 2026-08-03 session summary for full detail — if you see stale references to
`RotatingImage.tsx` or `public/images/dishes/`, check current code first, this changed.

**Homepage hero is a video, live in production** (`public/videos/hero-loop.mp4`,
full-bleed `object-cover`, no blur pillarbox, `bg-forest/70` dark overlay on top).
This flip-flopped a lot in one session (2026-07-31): built with a blurred-fill
pillarbox treatment → briefly reverted to the old static photo → user then asked
for the video back but *without* the blur → that's what's live now. If a "revert
to photo" instinct comes up again from an old note, check the actual code first —
`src/app/page.tsx`'s hero `<video>` vs `<Image src="/images/entrance-day.jpg">` —
this file has gone back and forth enough that stale notes here are a real risk.
See the 2026-07-31 "video hero" session summary below for how the video itself
was built (merged/crossfaded/looped from 3 Reels via `ffmpeg`).

## What this is
Next.js website for **The Garden Restaurant** — authentic North Indian restaurant at
La Ben Resort, Colva Beach Rd, Colva, Goa 403708, India. Open daily 1:00 PM–11:00 PM,
seats 60 (hours changed from 11:00 AM–11:00 PM on 2026-07-29 — see that session's
summary below). Built as a menu/info site — there is no online ordering (see item 5,
updated 2026-07-31: the feature was fully removed, not just paused).

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind v4), scaffolded with `create-next-app`
- Hosted on Vercel, auto-deploys from GitHub `master` (see top of file)
- No database, no cart/checkout code (removed 2026-07-31 — see item 5)

## Current state — what's live in the code right now
1. **Pages**: Home, About, Contact, Reserve — all built with real content and real
   photos. There is no `/menu` page (removed 2026-07-31, see item 5).
2. **Menu is a PDF, with a view/download choice** (changed 2026-08-03): the file is
   `public/the-garden-restaurant-menu.pdf` (renamed from `menu.pdf`), referenced via
   `restaurant.menuPdf` in `restaurant-info.ts`. Every "View Menu" spot site-wide
   (header nav CTA, header mobile dropdown, home hero, home "Perfect for Family
   Get-Togethers" section, footer) is now a `<MenuOptionsButton>`
   (`src/components/MenuOptionsButton.tsx`) — a button that opens a small dropdown
   with "View in Browser" (plain link, opens in a new tab) and "Download PDF"
   (`download={restaurant.menuPdfDownloadName}`, always saves as
   "The Garden Restaurant Menu.pdf" regardless of the URL). No more raw
   `<a download target="_blank">` tags for the menu anywhere in the codebase.
   **Known issue, not fixed:** the PDF's own document-title metadata reads
   "Garden Menu + Bot instructions" (visible in the browser tab when viewed) —
   flagged to the user, they'd need to fix it in whatever tool exported the PDF;
   nothing embedded in the actual menu pages, just stray metadata.
3. **Real photos**: sourced from the restaurant's own public Google Business Profile
   listing plus a later batch of professional photography (see item 12), in
   `public/images/`, used across Home/About.
4. **Real contact info**: real phone `+91 83790 43188` in `src/lib/restaurant-info.ts`
   (`phoneIsPlaceholder: false`), shown in the footer, Contact page, and JSON-LD.
5. **Online ordering was removed entirely on 2026-07-31**, not just paused. Previously
   there was an `orderingEnabled` flag with a full cart/checkout system
   (`CartContext`, `CartPanel`, `MobileCartBar`, a `/menu` page with ~150 digitized
   dish items in `src/lib/menu-data.ts`) that had been switched off since it was
   built. The user then asked to get rid of the Menu page entirely and just have
   "View Menu" download a PDF instead — at that point the whole cart/ordering
   system was fully dead code (only reachable from the now-deleted page), so it was
   deleted rather than left dormant: `src/app/menu/`, `src/components/MenuBrowser.tsx`,
   `CartPanel.tsx`, `MobileCartBar.tsx`, `src/context/CartContext.tsx`, and
   `src/lib/menu-data.ts` are all gone, along with the `orderingEnabled`/`pickup`
   fields in `restaurant-info.ts`. **If online ordering is ever wanted again, it
   needs to be rebuilt from scratch** — there is no flag to flip back on anymore.
6. **Floating WhatsApp button** (`src/components/WhatsAppButton.tsx`, rendered
   site-wide in `layout.tsx`) — links to `wa.me/918379043188` with a prefilled
   greeting, opens in a new tab. Fixed at `bottom-6` (no longer needs to dodge a
   mobile cart bar, since that's gone — see item 5).
6b. **Floating Instagram follow button** (`src/components/InstagramButton.tsx`,
   also rendered site-wide in `layout.tsx`) — same style/pattern as the WhatsApp
   button, stacked directly above it, links to `instagram.com/garden.goa` (handle
   in `restaurant.instagram` in `restaurant-info.ts`). This is a follow link only,
   not a live embedded feed — user was offered both options and chose the simple
   follow button since a live feed would need a third-party service (SnapWidget/
   Elfsight-style) with the restaurant's Instagram account connected via that
   service's own login, which needs the user to set up themselves.
6c. **Floating Google Maps button** (`src/components/MapsButton.tsx`, added
   2026-08-03) — same style/pattern as WhatsApp/Instagram, stacked *above* the
   Instagram button (`bottom-[10.5rem]`), red pin icon on white, links to
   `restaurant.mapsUrl` in `restaurant-info.ts`. The address text itself (in
   the footer and on the Contact page) is also wrapped in an `<a>` to that same
   `restaurant.mapsUrl` — all three spots share one constant. **2026-08-05:**
   `mapsUrl` was changed from a computed `google.com/maps/search/?api=1&query=...`
   string to a fixed short link the user provided directly
   (`https://maps.app.goo.gl/jXAged3c1GWSGec87`) — if the restaurant's Maps
   listing ever changes, this needs a new link from the user, it's no longer
   derived from `address.mapsQuery`. The Contact page's embedded map iframe is
   separate (`mapSrc` in `contact/page.tsx`, still built from `mapsQuery`) and
   was intentionally left alone — the user's ask was about click-through links,
   not the embed.
7. **SEO**: full Open Graph + Twitter card metadata, a `Restaurant` JSON-LD
   structured-data script (now includes `telephone` since the number is real),
   a generated 1200×630 `opengraph-image.jpg` (cropped from the entrance-sign
   photo), and a working Google Maps embed on the Contact page (no API key
   needed, `output=embed` pattern — this already existed from an earlier session).
8. ~~Menu page extras~~ — n/a, the Menu page and all its features (dish search,
   category filters, sticky cart bar) were removed 2026-07-31 along with the page
   itself. See item 5.
9. **Build verified clean**: `npm run build` compiles successfully; routes
   prerender as static content (7 routes as of 2026-07-31, down from 8 after the
   Menu page was removed).
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
12. **Homepage highlight tiles → 4-theme cycling showcase** (rebuilt 2026-08-03,
    fully replaces the old flat 70-photo `RotatingImage` carousel described in
    prior sessions — that component and `public/images/dishes/` are no longer
    used by the homepage, though the dish images are still on disk unused).
    The 3 tiles now cycle **as a group** through 4 curated themes, not
    independently: `src/components/ThemeTiles.tsx` (client component) holds
    `themeIndex`/`subIndex` state; every 4s the currently-visible sub-image
    within each tile swaps, and every 8s (every 2nd tick) the whole group
    advances to the next theme along with its name + tagline shown below the
    grid. Each theme has exactly 6 photos, split 2 per tile. Theme data lives
    in `src/app/page.tsx`'s `homepageThemes` array (names/taglines updated
    2026-08-05, photos updated 2026-08-05 — see that session summary; treat
    both as current, prior session summaries below reference older versions):
    1. **Flame. Focus. Flavour.** — "Every dish earns its place before it
       earns its plate." (`public/images/homepage-themes/kitchen-action/`)
    2. **Fired, Not Faked.** — "Real char. Real smoke. Real tandoor."
       (`.../tandoor-grills/`)
    3. **Depth Takes Time.** — "Nothing here is rushed. Nothing here is
       ordinary." (`.../curries-gravies/`)
    4. **Small Plates. Big Intent.** — "The first bite decides everything."
       (`.../starters-snacks/`)
    Names/taglines are user-provided copy (2026-08-05) or picked from drafted
    directions (2026-08-03) — **this has already changed twice in two days,
    check `src/app/page.tsx` directly rather than trusting any note here**,
    including this one, before telling the user what's currently live.
    **Important implementation detail, don't regress this:** all 24 images
    (4 themes × 6) are mounted simultaneously with `loading="eager"` and
    cross-faded via opacity — do NOT go back to only rendering the current
    theme's 6 images and swapping `src`/keys on theme change. That was the
    original approach and it caused a real bug in production: each theme
    switch unmounted/remounted fresh `<Image>` elements, so the browser had to
    fetch that theme's photos from scratch on every switch, showing blank
    tiles for ~1-2s each time (worse on slower networks). Confirmed fixed by
    preloading everything up front; verified via `naturalWidth`/`complete` JS
    checks in the browser, not just visually, since blank-tile bugs here are
    easy to misdiagnose as "still loading."
    Source photos came from sorting three Google Drive links the user shared
    (see the 2026-08-03 session summary for the full sort) — the curated
    "best 6 per theme" picks are also saved at
    `C:\Users\keith\Desktop\themes\` (10 theme folders, 226 total sorted
    photos) if more homepage/marketing use is wanted later.
13. **AI/chatbot discoverability (GEO), added 2026-08-10.** `src/app/robots.ts`
    explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and 8
    other AI crawlers (plus the wildcard `*` allow-all). `src/app/sitemap.ts`
    lists all 4 routes. `public/llms.txt` is a machine-readable one-page summary
    of the restaurant for AI systems to read directly. The site-wide `Restaurant`
    JSON-LD in `layout.tsx` gained `sameAs` (Instagram), a real photo array,
    `acceptsReservations`, `hasMenu`/`menu` (the PDF), and an `aggregateRating`
    (4.2★, 1,250 reviews — user-provided real Google numbers, not fabricated).
    The About page got a visible FAQ section (6 Q&As: cuisine, veg options,
    location, hours, reservations, "no delivery/online ordering") plus matching
    `FAQPage` JSON-LD — this is the part most likely to get quoted verbatim by
    a chatbot. `restaurant.description` was lightly enriched with category-level
    keywords (kebabs, biryani, dals) without naming specific dishes/prices, so it
    won't drift out of sync with the PDF menu.
14. **About page photo tiles → 4 rotating guest photos, added 2026-08-10.**
    The two static food-photo tiles (tandoori chicken, seekh kebab) were first
    swapped to dal makhani/tikka skewers, then per the user's follow-up request
    replaced entirely with 4 real candid guest photos (`public/images/guests/
    guest-1.jpg` … `guest-4.jpg`, resized from originals in `OneDrive\Desktop\
    Garden album\Garden family\`). New component `src/components/
    RotatingPairTiles.tsx`: 2 tiles, each cycling between 2 of the 4 photos
    every 4s with a crossfade — same "mount everything eagerly, fade via
    opacity" pattern as `ThemeTiles.tsx` (see item 12) to avoid the blank-tile
    bug from that earlier session. **If asked to touch these tiles again, note
    the 5 old food photos (`food-dal-makhani.jpg`, `food-tikka-skewers.jpg`,
    `food-tandoori-chicken.jpg`, `food-seekh-kebab.jpg`,
    `food-hara-bhara-kebab.jpg`) are now unused dead weight in `public/images/`**
    — flagged for cleanup, not yet removed (see 2026-08-10 session summary).

## Known deferred features (deliberately not built — user's choice, don't re-raise unprompted)
- **AI Q&A/upsell assistant** (Claude API, not chat-ordering) — was mid-setup in an
  earlier session (walking the user through creating an Anthropic API key at
  console.anthropic.com); user has since deprioritized it twice ("we'll get back
  to this", "skip for now"). If they bring it up again: add `.env.local` with
  `ANTHROPIC_API_KEY`, `npm install @anthropic-ai/sdk`, build
  `src/app/api/assistant/route.ts`. **Note:** the original plan put its chat widget
  on the Menu page, which no longer exists (removed 2026-07-31) — the menu itself
  is now just a static PDF (`public/menu.pdf`), so the system prompt would need to
  either read from that PDF or a re-digitized version of it, and the widget would
  need a new home (e.g. the homepage).
- **Online ordering** — not just paused anymore, fully removed on 2026-07-31 (see
  item 5 above) along with the Menu page it lived on. Rebuilding it means starting
  over: a menu page/data source, cart UI, and an order backend (email/SMS/call —
  ask before assuming which). Don't assume any of the old cart code is salvageable
  without checking git history first.

## Next steps
Deployment is done (see top of file), Reserve a Table is live (see item 11 above),
homepage highlight tiles now cycle through 4 curated themes (item 12), hours are
updated, the Menu page has been replaced by a PDF with a view/download choice
(item 5), address text and a new floating button link to Google Maps (item 6c),
AI/chatbot discoverability is live (item 13), and the About page tiles now rotate
4 guest photos (item 14). Nothing outstanding except the deliberately-deferred AI
assistant feature above — only revisit if the user brings it up. **A full bug
audit was done 2026-08-10 — see "Waiting on the user" item 3 below for the list
awaiting the user's go-ahead before any of it is fixed.**

Possible future asks, not yet requested: a custom domain (currently on the free
`*.vercel.app` subdomain).

**Waiting on the user (pick up next session):**
1. **Menu update workflow.** User wants to be able to change the menu content
   without having to send a new PDF file and get it redeployed every time.
   Proposed hosting the PDF on Google Drive (or Dropbox) and pointing
   `restaurant.menuPdf` at that external link instead of `public/menu.pdf` —
   replacing the file's *content* in Drive/Dropbox keeps the same share link,
   so the site would auto-serve the new version with zero code changes. User
   said "something else" (has a different idea in mind) but the conversation
   moved on before they explained it — **ask what they had in mind**, don't
   assume it's the Drive/Dropbox approach.
2. **iOS vs Android layout question, unresolved.** User asked why the site
   looks/behaves differently on iOS vs Android, specifically that tapping
   "View Menu" downloads the PDF on Android but just opens it in-browser on
   iOS — explained this is normal Safari behavior (iOS ignores the `download`
   attribute for PDFs, no reliable web-only fix) and asked for a general
   "layout difference" they mentioned. They then sent two screenshots meant to
   show iOS vs Android side by side, but **both screenshots were literally the
   same file** (identical timestamp/content) — flagged this to the user rather
   than guessing, asked them to resend the correct pair. Still waiting on that.
3. **Full site bug/trends audit done 2026-08-10, nothing fixed yet — user said
   "we'll pick this up tomorrow."** Read code + linted + clicked through every
   page + checked console errors + cross-checked every image/video path against
   disk. Findings, presented to the user but not yet approved:
   - **Bugs:** (a) phone number is plain text, not a `tel:` link, on both the
     Contact page and the footer (Reserve page already does this correctly —
     just those two spots missing); (b) broken/mistyped URLs hit Next's raw
     default 404 (plain black screen, off-brand, no "back home" link — header/
     footer still render around it though); (c) minor — the Reserve form's
     minimum selectable date is computed from UTC (`toISOString()`), so in the
     ~5.5hr window right after midnight IST a visitor could technically pick an
     already-past date.
   - **Dead code to clean up:** `src/components/VegBadge.tsx` (unused since the
     old menu system was removed), 5 now-unused food photos in `public/images/`
     (see item 14 above), and the default `create-next-app` scaffold SVGs
     (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` in
     `public/`) which are never referenced anywhere.
   - **Trend suggestions offered, all optional:** Vercel Analytics + Speed
     Insights (cookieless, 2-line install, currently zero traffic visibility);
     respecting `prefers-reduced-motion`/data-saver for the 9MB autoplay hero
     video; adding 2-3 real quoted guest reviews as visible testimonials +
     `Review` schema (builds on the aggregateRating already shipped); a few
     standard security headers (`Referrer-Policy` etc.) in `next.config.ts`.
   **Next session: ask which of these the user wants done, then implement and
   push.** Don't assume "fix everything" — the bugs are safe/obvious, but the
   trend suggestions need the user's buy-in first (especially the hero-video and
   reviews ones, which involve a visible/content trade-off).

## 2026-08-05 session summary (new taglines, fixed Maps link, new theme photos)
Short session, three quick follow-ups on the 2026-08-03 work:

1. **New tagline copy for all 4 homepage themes** — user supplied finished
   name+tagline copy directly (not a request to draft options this time); a
   straightforward 1:1 swap in `homepageThemes` (`src/app/page.tsx`). See item
   12 above for the current live set.
2. **Maps links switched to a fixed short link** — user provided
   `https://maps.app.goo.gl/jXAged3c1GWSGec87` and asked for it used
   everywhere "which takes them to maps." Since all 3 click-through spots
   (footer address, Contact page address, floating Maps button) already read
   from the single `restaurant.mapsUrl` constant (built 2026-08-03), this was
   a one-line change. See item 6c above.
3. **Homepage theme photos replaced again** — user said they'd supply new
   pictures and asked how; given instructions to create one folder with 4
   subfolders (one per theme, 6 photos each). User's actual reply was just
   "Website Image Proposals," pointing at a folder already sitting in
   `OneDrive\Desktop\Website Image Proposals\Website Image Proposals\` —
   **not newly taken photos**, but a proposal package (an `index.html`
   mockup + an `images/` folder) that reused the *exact* 10-theme structure
   from the 2026-08-03 Drive sort (`01_kitchen-action` … `10_ambience-decor`),
   apparently prepared by/for someone called "Lionel" for review, with
   suggested new names/taglines and status notes per theme (e.g. "replaces
   placeholder," "new section — no bread shots available yet"). Only 01–04
   map to the site's current 4 live tile themes; 05–10 (rice/biryani,
   pizza/burgers, drinks, coffee, veg curries, ambience) don't correspond to
   anything built yet. **Scoped this down to just what was asked** — swapped
   the 6 photos per theme for the 4 live themes only (`public/images/homepage-
   themes/<slug>/1.jpg`…`6.jpg`, overwritten in place, same resize pipeline as
   before), left the taglines from step 1 alone (didn't adopt the proposal
   HTML's suggested captions since that wasn't requested), and didn't touch
   folders 05–10. **If the user wants to expand beyond 4 tiles/themes later,
   folders 05–10 in that proposal package are sitting there ready** — flag
   this rather than silently expanding scope next time it comes up.
   Verification gotcha hit this session: after overwriting the on-disk JPEGs,
   the dev-server browser tab that had been open all session showed a mix of
   old and new photos under the same theme — **that was stale browser image
   cache, not a real bug** (confirmed by opening the raw static file URL
   directly in a fresh tab and checking its reported dimensions matched the
   new source files). Don't mistake this for the 2026-08-03 blank-tile bug
   recurring; if photos look mismatched right after a same-filename swap,
   check a fresh tab/incognito or the raw file URL before assuming the code
   regressed.

All three changes pushed and re-verified live in production.

## 2026-08-03 session summary (Drive photo sort, homepage theme tiles, menu dropdown, Maps)
Long session, four distinct pieces of work:

1. **Sorted three Google Drive folders into 10 themed photo folders.** User shared
   three Drive links (not part of this git repo) and asked for the photos sorted
   into 10 themes, excluding "LaBen Hotel and the rooftop." The three links turned
   out to be a **mixed bag**, not clean restaurant-only folders: hotel room
   photography (AC/Deluxe/Non-AC room categories, bathrooms), local sightseeing
   (a church, Colva Beach), and an entire separate "Rooftop" sports-bar venue's
   menu shoot (pizza/burgers/cocktails under a distinct "Rooftop — home of
   International Sporting Events" logo) — all interleaved *within the same
   folders* as legitimate TGR restaurant photography, sometimes in the same
   folder file-by-file. Handled this by downloading each folder as a zip,
   building image "contact sheets" and "badge-strip" sheets (small node/sharp
   scripts, tiled thumbnails with index labels) to visually review every photo's
   watermark/content rather than trusting folder names, then classifying and
   copying with a dedup pass (MD5 hash) since ~40 photos were exact duplicates
   shared across two of the three links. Result: 226 unique kept photos (138
   excluded as hotel/rooftop) sorted into
   `C:\Users\keith\Desktop\themes\01_...` through `10_...`. **If asked to redo
   or extend this sort, don't assume a Drive folder's name/label reflects its
   actual contents** — this dataset specifically punished that assumption.
2. **Built the 4-theme homepage tile showcase** — see item 12 in "Current state"
   above for the full technical detail, including a real bug (blank tiles from
   lazy-loading) that was caught and fixed before going live. User picked 4 of
   the 10 sorted themes, then asked for the 6 best shots + a tagline per theme;
   names/taglines went through a couple of rounds (direction options, then
   mix-and-match, then a re-roll of one) before landing on the current set.
3. **Menu PDF: view/download choice + rename** — see item 2 above.
4. **Google Maps: address links + new floating button** — see item 6c above.

All four pushed to production and re-verified live via the browser (not just
`npm run build`) after each change, per this project's usual practice.

**Still open, unaddressed this session** (see "Waiting on the user" above,
unchanged since 2026-07-31): the menu-update-workflow question (user said
"something else" but never explained what) and the iOS/Android screenshot
mix-up. Don't re-raise unprompted — wait for the user.

## 2026-07-31 session summary (menu → PDF, hero tweaks)
Two more changes in the same day as the video hero work above, after the video
was already live in production:
1. **Hero overlay opacity tuning** — user asked to change the dark overlay
   over the hero video from its original 85% down to 70%, then 60%, then
   changed their mind mid-request (interrupted a command) and asked to go
   back to 70%. Current value: `bg-forest/70` in `src/app/page.tsx`. Each
   change was checked live in the browser and pushed individually — don't
   assume 70% is "final," this went back and forth quickly.
2. **Menu page removed, replaced with a PDF download.** User asked to get rid
   of the Menu page entirely and have every "View Menu" button just download
   the restaurant's actual PDF menu instead. Clarified scope first (all
   buttons vs. just the header, delete vs. unlink the page) — user chose "all
   buttons" and "delete." User supplied `public/menu.pdf` directly (their real
   PDF menu, 23 pages). Since ordering was already switched off and the whole
   cart/checkout system was only reachable from the Menu page, deleted it all
   rather than leaving it dormant — see item 5 in "Current state" above for
   the full list of removed files. All "View Menu" links (header desktop nav,
   header mobile dropdown, home hero, home mid-page section, footer) now point
   to `restaurant.menuPdf` (`/menu.pdf`) via a plain `<a download target="_blank">`
   instead of `<Link href="/menu">`. Verified locally (all 4 links resolve to
   `/menu.pdf`, `/menu` route now correctly 404s, no console errors) before
   pushing.

## 2026-07-31 session summary (video hero)
User wanted a video added to the site, specifically as the homepage hero
background, and asked to edit it together rather than just dropping in a
pre-made file. `ffmpeg` was not installed in this environment — installed via
`winget install --id Gyan.FFmpeg`, lands at
`C:\Users\keith\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_*\ffmpeg-*\bin\`
(not yet on PATH mid-session without a shell restart — invoked with the full
path throughout). Source footage: three Instagram Reels from
`OneDrive\Desktop\Garden album\Garden Reels\` (`TGR Reel 1/3/4.mp4`, all
1080×1920 portrait, 30fps, h264/aac), each ending in the same static "The
Garden Restaurant" contact-card outro that needed trimming off. Workflow, one
reel at a time per the user's request:
1. Generated contact-sheet thumbnails (`ffmpeg -vf "fps=...,tile=..."`) to
   find each outro's fade-in point, then trimmed each reel just before it
   (Reel 1 → 17.2s, Reel 3 → 14.1s, Reel 4 → 9.45s) and saved previews to
   the user's Desktop (`OneDrive\Desktop\TGR Reel N - trimmed preview.mp4`)
   for them to actually watch before continuing — there's no way to play
   video for the user in-chat, so local preview files + asking them to
   double-click are the pattern for this kind of review.
2. Merged the three trims with `xfade`/`acrossfade` (0.6s crossfades, not
   hard cuts — an unprompted quality call the user approved) into one
   ~39.6s clip.
3. Made it loop-safe: crossfaded the last 0.6s back into the first 0.6s
   (via `split`+`trim` and `xfade`/`acrossfade` on a single input) so
   restarting doesn't hard-cut. Verified by concatenating the result with
   itself and previewing across the seam.
4. Built the final web asset: stripped audio (browsers only autoplay muted
   video), scaled to 720px wide (was 1080, cut file size a lot),
   `-movflags +faststart`. First pass was a plain portrait crop —
   looked bad once actually placed in the hero (see below) — so it went
   through a second pass.
5. **Portrait-in-wide-hero problem**: the hero section is wide and short,
   so `object-cover` on a raw 9:16 clip crops in extremely tight — checked
   this live in the browser and it read as an unrecognisable dark-green
   blur, not food. Fixed with a "blurred fill" composite (ffmpeg
   `split`+`scale`+`crop`+`gblur` for a soft zoomed background layer, the
   full un-cropped portrait clip overlaid centered on top) baked directly
   into the video file at a 1600×667 canvas — keeps the subject fully
   visible in the center with a soft blurred glow filling the sides,
   rather than relying on CSS. Final file:
   `public/videos/hero-loop.mp4` (~9MB), poster frame
   `public/images/hero-video-poster.jpg`. `src/app/page.tsx` hero section
   now has a `<video autoPlay muted loop playsInline>` in place of the old
   `<Image src="/images/entrance-day.jpg">` — same `object-cover` container
   pattern as before.
6. Committed locally but **user chose to hold off pushing** — see the note
   near the top of this file. `entrance-day.jpg` is still used by the About
   page, so it wasn't deleted.

Earlier in the same session, the user also asked to swap the homepage hero
photo itself (still-image era, before the video ask) to a different real
photo, then immediately asked to reposition it so the restaurant's sign was
visible, then changed their mind mid-edit and asked to revert to how it was
before any of that — reverted cleanly with `git revert` (that commit was
never pushed, so production was never affected either way). Net effect: the
photo hero briefly detoured through a night-time entrance photo and back to
`entrance-day.jpg`, before the whole photo hero was replaced by the video
above. **Don't be surprised if `entrance-night.jpg` doesn't exist** — it was
added and then removed by that revert.

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
3000 conflict). **Gotcha (hit repeatedly on 2026-08-03):** when port 3000 is taken,
Next.js silently falls back to 3001, 3002, etc. — always read the actual "Local:"
line from the dev server's own log output before navigating the browser there,
rather than assuming 3000. Browsing a stale server on the wrong port looks
identical to the new code not working (old markup/behavior, confusing to debug).

## Unresolved: stray `preview.html`
An untracked `preview.html` (~62KB, static Tailwind-CDN copy of the homepage) sits
in the project root, not part of any commit. Origin unclear — left alone and
un-staged rather than guessed at; ask the user before deleting or committing it.

## Ignore this
The Next.js dev overlay may show a hydration "Console Error" mentioning a `webcrx=""`
attribute mismatch on `<html>`. This is caused by a browser extension injecting an
attribute client-side. It's suppressed with `suppressHydrationWarning` on the `<html>`
tag in `layout.tsx` — confirmed harmless, already handled.
