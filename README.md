# GELAP ENDHONESA

`gelap-endhonesa` is a frozen ENDHONESA artefact app built with Next.js, React, Tailwind CSS, and Thirdweb.

The app presents the **ENDHONESA - Gelap, OiOi!!!!** experience and includes a wallet connection plus OiOi token claim interface. The claim copy and deadline are intentionally preserved as an artefact: the claim window has already passed, including the **17 Agustus 2025** text.

## Live URL

- Production: `https://gelap.endhonesa.com/`
- Current availability check may return Vercel Challenge `HTTP 429`; under the Evergreen Standard this counts as reachable but blocked.

## Tech Stack

- Next.js 16.2.6 with App Router and Turbopack build
- React 19.2.6
- Tailwind CSS 4.3.0
- Thirdweb 5.120.0
- Vercel Analytics 2.0.1
- TypeScript 5.9.3
- pnpm 11.5.0
- Node.js 24.x

## Local Development

Use Node.js 24 and pnpm 11.

```bash
nvm use
corepack pnpm install
corepack pnpm dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` from `.env.example` when wallet functionality needs to work against Thirdweb.

```bash
cp .env.example .env.local
```

Required variable:

```bash
NEXT_PUBLIC_TW_CLIENT_ID=
```

`NEXT_PUBLIC_TW_CLIENT_ID` is public by design, but the real project value should still be managed through local/Vercel environment settings instead of being committed.

Without this variable, the app still builds with an Evergreen placeholder client ID, but wallet functionality should be considered non-production until the real value is configured.

## Scripts

```bash
corepack pnpm lint
corepack pnpm build
corepack pnpm start
```

## EVERGREEN Maintenance

This repo is classified as **Class A — App Repo** under the Prof. NOTA EVERGREEN Standard.

- Runtime target: **Node.js 24.x** (`.nvmrc`, `package.json#engines`)
- Package manager: **pnpm 11.x** (`packageManager: pnpm@11.5.0`)
- Lockfile: `pnpm-lock.yaml`
- Build command: `corepack pnpm build`
- Lint command: `corepack pnpm lint`

### Current Evergreen Status

- Monthly safe updates are applied.
- Quarterly major updates applied: Next.js 16, Vercel Analytics 2, Tailwind CSS 4.3, Node types 24, and pnpm 11 metadata.
- Package manager was normalized to pnpm; stale `package-lock.json` was removed.
- `next lint` was replaced with `eslint .` because Next.js no longer supports the old lint command.
- Claim status is intentionally frozen as an artefact; the claim deadline has passed and the user-facing copy is preserved.
- `typescript@6` is intentionally deferred because current Solana/Thirdweb transitive packages peer to TypeScript 5.x.
- `eslint@10` was tested and deferred because the current Next/TypeScript ESLint parser stack fails with `scopeManager.addGlobals is not a function`.
- `@types/node@25` is intentionally deferred because the app targets Node.js 24.x.
- Remaining audit findings are moderate transitive issues in Next/PostCSS and Web3 wallet dependencies that currently require upstream package changes or risky overrides.

### Evergreen Commands

```bash
nvm use
corepack pnpm install
corepack pnpm outdated
corepack pnpm audit --audit-level moderate
corepack pnpm lint
corepack pnpm build
```
