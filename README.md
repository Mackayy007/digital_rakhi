# Digital Rakhi

A Raksha Bandhan web app: pick a frame, answer three quick questions about your sibling, and send a personalised digital rakhi over WhatsApp. The recipient opens the link, "unties" it with a tap, sees the card, and can tie one back — no account, no backend, no database. Every card's content lives entirely in its own URL.

## What's inside

- **Landing** (`/`) — tap-to-begin intro with ambient festival music.
- **Create** (`/create` → `/create/frame`) — a 3-question form (who it's for, who it's from, one memory) then a live-preview frame picker with three frames: Sibling Warranty, Sibling Algorithm, Handwritten Love Note.
- **Share** (`/share/[data]`) — shows exactly what the recipient will see, with a one-tap WhatsApp share button and a copy-link fallback.
- **Reveal** (`/r/[data]`) — the recipient's page: a thread "untie" animation, then the personalised card, then a **Tie It Back** button that pre-fills a reciprocal card in their name.
- Server-rendered Open Graph tags and a dynamic OG preview image per card (`/r/[data]/opengraph-image`), so every WhatsApp link preview is unique to that card.

No database: card data (`to`, `from`, `memory`, `frame`, avatar choices) is base64url-encoded straight into the URL and decoded on the fly, both in the browser and on the server.

## Running it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploying (no command line needed)

You don't have push access to a GitHub repo from this session, so the fastest path is: upload this folder to GitHub through the browser, then import it into Vercel.

1. **Create a GitHub repo.** Go to github.com → New repository → give it a name (e.g. `digital-rakhi`) → Create repository. Leave it empty (don't add a README).
2. **Upload the files.** On the new repo's page, click "uploading an existing file". Unzip the file you downloaded from this conversation, then drag the *contents* of the folder (not the folder itself) into the upload box — everything except `node_modules` is already excluded from the zip, so this is well under GitHub's web-upload limit. Commit the upload.
3. **Import into Vercel.** Go to vercel.com → Add New → Project → import the GitHub repo you just created. Vercel auto-detects Next.js — just click Deploy.
4. **Set the site URL env var.** Once deployed, copy your production URL (e.g. `https://digital-rakhi.vercel.app`). In the Vercel project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SITE_URL` = your production URL (no trailing slash)

   This is used to build correct WhatsApp share links and Open Graph image URLs. Redeploy after adding it (Vercel → Deployments → ⋯ → Redeploy).
5. **Test it end to end**: open your deployed URL, tap through the create flow, share the resulting link to yourself on WhatsApp, and confirm the link preview and the "untie" animation both look right on a phone.

## Notes for future work

- **Avatars**: v1 ships with two fixed cartoon avatars (male/female) for the Sibling Algorithm frame, picked via a small toggle in the form. Real photo upload was scoped out for launch — see the design notes if you want to add it later.
- **Fonts**: Hanken Grotesk (UI) and Caveat (handwriting/script accents) load via `next/font/google` and are self-hosted at build time — this requires network access to fonts.googleapis.com during the build, which Vercel has by default.
- **Audio**: the ambient loop only starts after a tap (autoplay policy) and persists across the create → share → reveal flow via a small React context in `components/AudioProvider.tsx`, rather than restarting on every page.
