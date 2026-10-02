# Leadboy

Leadboy is a local browser automation agent for authorized Foundit lead-entry workflows.

## Phase 1

The first milestone deliberately does only this:

1. Open the supplied Foundit affiliate registration URL.
2. Preserve the supplied URL and its attribution parameters.
3. Use a visible persistent Playwright browser profile.
4. Inspect the registration form using DOM selectors.
5. Save a screenshot and structured JSONL log.
6. Detect possible human-verification signals.
7. Never attempt to bypass CAPTCHA or other human verification.

Later phases will add Excel lead mapping, temporary-email integration, OTP handling, profile entry, validation, and reporting.

## Setup

```bash
git clone https://github.com/zikomomoose/leadboy.git
cd leadboy
cp .env.example .env
npm install
npm run typecheck
npm run recon
```

Keep your VPN active before `npm run recon`.

The browser is intentionally visible during development. Do not use your personal Chrome profile. Playwright uses `data/browser-profile`.

## Expected first result

The command should open Foundit and print a structured inspection similar to:

```json
{
  "url": "https://www.foundit.sg/...",
  "title": "Foundit - Job Search & Recruitment",
  "inputs": [],
  "buttons": [],
  "selects": [],
  "captchaSignals": []
}
```

The exact fields depend on the current Foundit page.

## Human verification

If a CAPTCHA, Cloudflare challenge, or other human-verification step appears, the agent stops treating it as an ordinary form and does not try to defeat it. Manual intervention is required.

## Development workflow

The project is intentionally built in small milestones. Run `npm run typecheck` before each local test and commit only working changes.
