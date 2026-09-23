# Trường & Tuyết — Wedding invitation + D1 backend

The approved wedding UI is preserved in `public/`. The Worker in `src/` adds D1-backed personalized invitations, RSVP, wishes, admin reporting, CSV export, and admin authentication.

## 1. Install Wrangler

```bash
npm install
npx wrangler login
```

## 2. Create D1

```bash
npx wrangler d1 create truong-tuyet-wedding
```

Copy the returned `database_id` into `wrangler.toml` under `[[d1_databases]]`. Keep binding name `DB`.

## 3. Apply migrations

```bash
npm run db:migrate:remote
```

For local development:

```bash
npm run db:migrate:local
```

## 4. Configure admin secrets

Never put real secrets in source. Configure production secrets:

```bash
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put ADMIN_SESSION_SECRET
```

Use a long random password and a random session secret of at least 32 bytes. For local development, copy `.dev.vars.example` to `.dev.vars` and replace placeholders.

## 5. Run / deploy

```bash
npm run dev
npm run deploy
```

Admin: `/admin` (not linked from public UI).

Personalized link: `https://CURRENT_DOMAIN/?i=INVITATION_CODE`. Create invitations in Admin; the dashboard generates/copies links using the current origin.

## Data behavior

- D1 is the source of truth.
- Personalized invitation: one current RSVP per invitation (database unique index + UPSERT).
- Public RSVP: browser stores only an opaque `wedding_public_rsvp_token`; the server uses it to update that browser's current public RSVP.
- Wishes are append-only and unlimited per guest; every successful submission creates a new row.
- Public wishes API is paginated (`limit` max 50) and exposes only display name, message and created time.
- Public invitation lookup returns only the requested invitation's display metadata and never exposes internal IDs.
- Wish/RSVP writes have IP-hash-based D1 rate counters to reduce automated abuse without imposing a lifetime wish limit.
- Database timestamps are UTC. Admin renders dates in `Asia/Ho_Chi_Minh`.

## Admin metrics

- **Total Invitations**: active rows in `invitations`.
- **Responded / Not Responded**: invitation-based only; public responses are not counted as invitations.
- **Attending / Not attending invitations**: latest/current personalized RSVP state.
- **Expected Guest Count**: sum of `guest_count` for all attending current RSVPs, including public-link RSVPs.
- **Public RSVP**: separate count of public-link response records.
- **Total Wishes**: all wishes, including multiple wishes from the same guest.

## Security notes

`/admin` and `/api/admin/*` require a signed HttpOnly/Secure/SameSite=Strict admin session. The browser never receives the configured password/session secret. SQL uses bound parameters. API payloads are size/type/length validated and public errors do not include stack traces or D1 errors.
