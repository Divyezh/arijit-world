# PRD — Arijit Singh: Love, In Every Note.
### A cinematic Bollywood-romance radio experience (redesigned on the Deluxe Saloon model)

**Doc status:** Draft v1
**Owner:** Divyesh
**Type:** Fan-tribute browser radio experience (not an official artist/label site)

---

## 1. Why this redesign

The original brief asked for a full **music-streaming product**: a centralized song database, a `/api/music/sync` ingestion pipeline, "authorized playback URLs," and direct in-app audio playback of Arijit Singh's catalog. That's a real license-and-rights business, not something a fan project can legally operate.

**Deluxe Saloon** (deluxesalon.org / deluxesaloon.space) solves the same emotional brief — nostalgic, cinematic, single-artist/era listening experience — without ever hosting or licensing audio itself. Its actual functionality:

| Deluxe Saloon does this | Not this |
|---|---|
| Simple browser "radio" UI: play / pause / skip / seek | No visible song-selection grid or library |
| Every track links out to **Spotify / YouTube Music** for actual playback | No self-hosted or scraped audio files |
| Real-time listener count + IST clock for "live radio" atmosphere | No user accounts, no streaming backend |
| Original editorial **Articles** section (nostalgia, culture, history) | No claim of official artist/label affiliation |
| Explicit **About / Disclaimer / Privacy / Terms** pages stating independence | No copyrighted lyrics/audio reproduced on-site |
| Retro salon visual theme (mirrors, barber chairs, warm light) as the whole brand identity | No literal reproduction of third-party branding |

This PRD ports that model onto the Arijit Singh cinematic concept: same GTA-poster-inspired visual ambition and "Previous / Play / Next" simplicity from the original brief, but restructured so playback, data, and legal posture match what Deluxe Saloon actually ships.

---

## 2. Product summary

A single-page-feel, cinematic **tribute radio** dedicated to Arijit Singh's romantic discography. Visitors land on a full-bleed poster-style hero, press one button, and the site "plays" a curated sequence — actual audio is handed off to the listener's own Spotify/YouTube Music app/tab via deep link, exactly as Deluxe Saloon does. The site's real content value is the **cinematic presentation, curation, and original editorial writing**, not audio hosting.

**North star:** *it should feel like you switched on a beautifully art-directed radio station devoted to Arijit's love songs — not like you're browsing a music library.*

---

## 3. Legal/positioning foundation (new — did not exist in original brief)

This section is the load-bearing change. Everything else in the PRD depends on it.

- The site is an **independent, unofficial fan tribute**. It is never presented as Arijit Singh's, his label's, or any streaming service's official property.
- **No audio files are hosted, mirrored, downloaded, or DRM-bypassed.** The player's "Play" action opens/deep-links the corresponding track on Spotify or YouTube Music (official embeds or `open.spotify.com` / `music.youtube.com` links), same pattern as Deluxe Saloon's "every track linked to Spotify and YouTube Music."
- Song **metadata only** (title, film, year, mood, artwork thumbnail, external link) is stored — never lyrics in full, never audio.
- Required legal pages, written in-house, mirroring Deluxe Saloon's set:
  - `/about` — what the site is, what it isn't, independence statement
  - `/disclaimer` — "not an official Arijit Singh / label / platform property"
  - `/privacy-policy`
  - `/terms`
  - `/contact`
- Footer and About copy explicitly state third-party media/platforms remain subject to their own rights holders' terms.

---

## 4. Information architecture

```
/                     Home — cinematic hero + persistent player + featured sections
/about                Independence & concept statement
/articles             Editorial index
/articles/[slug]      Individual essay (nostalgia, romantic-era history, etc.)
/moods                Mood-based curated queues (Love, Heartbreak, Longing, Dreamy, Soulful, Nostalgic)
/albums               Filmography grid (movie → curated queue)
/contact
/privacy-policy
/terms
/disclaimer
/sitemap.xml, /robots.txt
```

No `/songs` library page, no search, no dropdown — consistent with the original brief's "no visible song-selection library" rule, and with Deluxe Saloon's radio-only interface.

---

## 5. Tech stack (unchanged from original brief, still appropriate)

- Next.js (latest stable), React, TypeScript, Tailwind CSS
- Framer Motion for cinematic transitions
- Lucide React icons
- No Howler.js / HTML5 `<audio>` element for the catalog itself — playback is external (see §7). Audio API is only needed if/when a short, rights-cleared ambient loop or a single officially-embeddable preview is used.
- Server-side API routes for **metadata only**
- next/image, lazy loading, code-splitting, dynamic imports

---

## 6. Hero section

Same cinematic direction as the original brief:

- Full-viewport 16:9 poster artwork (GTA-poster-inspired illustration direction — bold outlines, warm sunset grading, dramatic light; never the actual GTA logo/branding)
- Headline: **ARIJIT SINGH**, subhead: **LOVE, IN EVERY NOTE.**
- Subtle grain, floating dust particles, extremely restrained parallax
- Live "on-air" strip beneath the headline, styled after Deluxe Saloon's "90s Memories Loading… / Purane Yaadein · 90s Bollywood Hits" ticker — here: **"Now Streaming · Arijit's Romantic Era"** with a soft pulse dot
- Optional real-time **listener counter** ("XXX listening now") — simulated/randomized client-side, purely atmospheric, same device Deluxe Saloon uses for "live radio" feel
- CTA: **PLAY** — starts the radio-style queue

---

## 7. Global player (redesigned)

**Controls, exactly as the original brief specified:** Previous · Play/Pause · Next. No dropdown, no playlist panel, no in-hero library.

**What changes:** what "Play" actually does.

1. Player advances an internal queue of metadata-only track objects.
2. Pressing Play/Next opens the current track's authorized external destination:
   - Primary: Spotify Web Playback (if the visitor is logged into Spotify, via the Spotify embed/iFrame API) — this is the one path where audio genuinely plays *inside* the page, using Spotify's own licensed embed, not a hosted file.
   - Fallback: a styled "Continue on Spotify / YouTube Music" panel with deep links, mirroring Deluxe Saloon's link-out pattern, when no embeddable player is available for that track.
3. Hero content (title / film / year) still cross-fades in sync with queue position, per the original brief's "dynamic hero content" spec — this is purely a metadata-driven UI reaction, independent of where audio actually plays.
4. "Now playing" progress bar reflects the embedded player's real position when available; otherwise shows a static "Playing on Spotify ↗" state.
5. Auto-advance on track end (when using the Spotify embed); loop back to first track at end of queue — same behavior as the original brief.
6. If a track has no authorized embeddable/linkable source at all, it's automatically skipped with a subtle toast, and flagged `unavailable` in the dataset — same fallback rule as the original brief, just without ever assuming a hosted file exists.

---

## 8. Song metadata & data pipeline (redesigned — no ingestion of audio)

Dataset fields per track:

```
id, title, movie, year, mood, language,
artist_display ("Arijit Singh"), artwork_url,
spotify_track_id (optional), youtube_music_url (optional),
featured: boolean, romantic_era_rank: number,
availability: "embed" | "link_out" | "unavailable"
```

- Metadata is entered/curated manually or pulled from **official, permitted metadata APIs** (e.g., Spotify Web API for track/artist metadata and embed IDs) — never scraped audio, never third-party mirrors, never DRM circumvention.
- Name normalization still applies (e.g., "Arijit Singh" / "Arijit Singh Ji" / "Arijit" collapse to one canonical artist record) — retained from the original brief.
- No `/api/music/sync` "discovery crawler." Instead: a small admin-only **curation endpoint** (`/api/admin/tracks`) for adding/editing metadata rows, auth-gated, rate-limited, no public write access.
- Duplicate detection and artwork validation rules carry over from the original brief, scoped to metadata only.

---

## 9. Editorial content (new — ported from Deluxe Saloon)

This is the section that gives the site real, defensible content value, same role Deluxe Saloon's Articles section plays.

- `/articles` index + individual long-form pages, **original writing** (never reproducing lyrics or press copy), covering:
  - The history and evolution of Arijit Singh's romantic-song era
  - Essays on specific films/soundtracks' cultural impact
  - "How to build a Bollywood romance playlist" style practical pieces
  - Behind-the-mood explainers for each Moods category (Love, Heartbreak, Longing, Dreamy, Soulful, Nostalgic)
- FAQ block on Home, same pattern as Deluxe Saloon's "Deluxe Saloon, Explained": *What is this site? Is it official? Do I need an account? Can I use it on mobile?*

---

## 10. Sections (redesigned from original brief)

### Home
Hero + player + "on-air" strip + 3 feature callouts (Cinematic Romantic Radio / Original Editorial / Simple Browser Player) + Articles teaser + FAQ.

### Romantic Era
Cinematic timeline of tracks (large artwork + year), sourced dynamically from the metadata store, seeded conceptually with tracks like Tum Hi Ho, Agar Tum Saath Ho, Channa Mereya, Gerua, Hawayein, Ve Maahi — not asserted as the complete catalog.

### Moods
Six mood tiles; selecting one swaps the internal queue, never exposes a list — identical rule to the original brief.

### Albums / Filmography
Movie poster grid; selecting a movie swaps the queue to that film's tracks.

### About
Independence statement (§3), concept origin, visual-language explanation (retro-cinematic, not an official product).

### Articles
Editorial index + article template (title, hero image, body, related mood/era tags).

### Footer
Wordmark + tagline + legal links (About, Articles, Privacy, Terms, Disclaimer, Contact) — mirrors Deluxe Saloon's minimal footer link set rather than social/official links (since there are none to claim).

---

## 11. Visual & animation direction

Unchanged from the original brief's ambition, with Deluxe Saloon's atmosphere-first restraint applied:

- Bold condensed display type (Anton / Bebas Neue / Oswald / League Gothic) for headings; Inter/Manrope/DM Sans for body
- Warm ivory/cream text, muted gold/orange accents, cinematic red-orange-gold poster grading
- Framer Motion for reveal, parallax, cross-fade queue transitions, mood-switch transitions, micro-interactions
- `prefers-reduced-motion` respected throughout
- "Breathing" artwork and gentle gold pulses while playing; near-static, slightly darker frame while paused — retained from the original brief

---

## 12. Responsiveness, performance, SEO, accessibility, error handling, security

All carried over from the original brief, scoped to the redesigned (metadata + link-out) architecture:

- **Responsive:** true mobile recomposition of the hero (never crop the singer's face), compact player, mobile nav
- **Performance:** next/image, lazy-loaded artwork, no full-catalog fetch on load, Lighthouse 90+ target
- **SEO:** metadata, OG/Twitter cards, canonical URLs, sitemap, robots.txt, semantic HTML — same suggested title/description as original brief
- **Accessibility:** labeled controls ("Previous song," "Play song," "Pause song," "Next song"), keyboard support, visible focus states, contrast, reduced motion
- **Error handling:** unavailable track → auto-skip + subtle toast; embed failure → automatic fallback to "Continue on Spotify/YouTube Music" panel; never a hard crash from one bad track
- **Security:** all API keys server-side/env-only; admin curation endpoint auth-gated and rate-limited; no arbitrary external URLs accepted as playback sources — only allow-listed Spotify/YouTube domains

---

## 13. Explicit non-goals

- Not a Spotify clone, not a dashboard, not a searchable library (unchanged from original brief)
- **Not** an audio hosting or streaming backend
- **Not** a `/api/music/sync` scraper/ingestion crawler
- **Not** presented anywhere as an official Arijit Singh, label, or platform product

---

## 14. Open questions for build

- Do we have (or need) a Spotify Developer app for the Web Playback/embed API, or should launch ship link-out only (fastest, lowest-risk, closest to Deluxe Saloon's actual current implementation)?
- Should the "listener count" be purely cosmetic/randomized, or wired to a lightweight real-time count (e.g., active WebSocket connections)?
- Article cadence/volume needed for launch (Deluxe Saloon ships a handful of evergreen essays, not a blog cadence).
