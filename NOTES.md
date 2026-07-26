# The Garden Restaurant — Build Notes

Session paused here. Resume by picking up at "Next steps" below.

## What this is
Next.js website for **The Garden Restaurant** — authentic North Indian restaurant at
La Ben Resort, Colva Beach Rd, Colva, Goa 403708, India. Open daily 11:00 AM–11:00 PM,
seats 60. Pickup ordering only (no delivery), ASAP pickup timing (no scheduled slots).

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind v4), scaffolded with `create-next-app`
- Hosting target: Vercel (not yet deployed)
- No database — menu is static data in `src/lib/menu-data.ts`, cart is client-side
  React Context + localStorage, orders are NOT persisted anywhere yet (see below)

## Done so far
1. ✅ Node.js, npm, Git installed via winget
2. ✅ Real menu digitized from the restaurant's own PDF menu (`src/lib/menu-data.ts`) —
   ~150 items across 20 categories. Alcohol (wine/beer/spirits/cocktails) intentionally
   **excluded** from online ordering per user decision — food & non-alcoholic drinks only.
   A few "market rate" seafood items (Pomfret, Crabs, etc.) also excluded since they have
   no fixed price — noted in a category `note` field telling customers to call in.
3. ✅ Pages built: Home, Menu & Order (with cart), About, Contact/Location
4. ✅ Full pickup ordering flow: browse menu → add to cart → quantity steppers → checkout
   form (name/phone/notes) → order confirmation with generated order # and ready-by time.
   **This is currently front-end only** — no backend/email/SMS notifies the kitchen. That's
   a gap to flag to the user before calling the site "done": right now placing an order
   just shows a confirmation screen and clears the cart, nothing is actually sent anywhere.
5. ✅ Real logo integrated (`public/logo-cropped.png`, transparent background, tagline
   recolored white for legibility) — used in Header, Footer, and favicon (`src/app/icon.png`).
6. ✅ Color theme iterated several times, landed on: deep leaf green header/footer
   (`--color-forest: #123a26`), marigold gold CTAs (`--color-gold: #e0a83c`), maroon accent
   (`--color-maroon: #5c1620`) used for "Chef's Special" badges and the family-gathering
   section, mint-green highlight cards, cream base. All tokens in `src/app/globals.css`.
7. ✅ Git initialized, committed after every change (see `git log`).

## Known placeholders — still need real values from the user
- **Phone number**: `src/lib/restaurant-info.ts` has `+91 00000 00000` marked as placeholder.
  Shown with a visible "(placeholder)" label in the footer/contact page until replaced.

## Next steps (in order)
1. **AI assistant (in progress, blocked)** — user chose "smart menu + AI Q&A/upsell
   assistant" (not chat-ordering) using the **Claude API**. User was walked through creating
   an Anthropic API key at console.anthropic.com but had not returned with the key when the
   session paused. Once they have it:
   - Add `.env.local` (git-ignored) with `ANTHROPIC_API_KEY=...`
   - Build `src/app/api/assistant/route.ts` — Route Handler calling the Claude API
     (`@anthropic-ai/sdk`, not yet installed — run `npm install @anthropic-ai/sdk`), with a
     system prompt containing the full menu so it only discusses real dishes/prices and
     recommends upsells/pairings. Keep it conversational Q&A, not order-placing (that stays
     in the existing cart UI).
   - Build a chat widget component (floating button + panel), likely on the Menu page.
2. **Decide on a real order backend** — flag to the user that orders currently go nowhere.
   Simplest options to offer: send an email/SMS notification on order submit (needs a
   service like Resend/Twilio + real phone/email), or just ship as-is for now and treat it
   as a "call to confirm" placeholder. Don't build this unprompted — ask first.
3. **Local testing pass** — click through full flow again after AI assistant is added.
4. **Deploy to Vercel** — push to a git remote (none configured yet, this repo is local-only),
   connect Vercel, set `ANTHROPIC_API_KEY` as an env var there too.
5. Replace the placeholder phone number once the user provides it.

## Environment gotcha (Windows/PowerShell)
Each PowerShell tool call starts a fresh process — `$env:Path` changes don't persist
between calls. Every command needs this prefix to see `node`/`npm`/`git`:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## Dev server
Run `npm run dev` from `C:\Users\keith\garden-restaurant` (with the PATH prefix above).
Site runs at http://localhost:3000. A background dev server may still be running from
this session — check before starting a second one (port 3000 conflict).

## Ignore this
The Next.js dev overlay may show a hydration "Console Error" mentioning a `webcrx=""`
attribute mismatch on `<html>`. This is caused by a browser extension injecting an
attribute client-side, not a real bug — confirmed harmless, safe to dismiss/ignore.
