---
name: deploy
description: Deploy the expense tracker to staging. Runs lint as the pre-deploy check, builds the production bundle, and pushes the current branch to the staging branch on origin. Use when the user asks to deploy, ship, or push to staging.
---

## Steps

Run these steps in order. Stop and report failure if any step fails — never continue to the next step or push broken code.

### 1. Run the pre-deploy check

```bash
npm run lint
```

This repo has no test suite configured (see CLAUDE.md), so ESLint is the deploy gate. If lint fails, stop and report the errors — do not proceed to build or push.

### 2. Build the production bundle

```bash
npm run build
```

Confirms the app compiles cleanly via Vite. If the build fails, stop and report the error.

### 3. Push to staging

Check for uncommitted changes first (`git status`) — if there are any, stop and ask the user whether to commit them before deploying; never deploy uncommitted work silently.

Push the current branch to the `staging` branch on `origin`:

```bash
git push origin HEAD:staging
```

This is a push to a shared remote branch — confirm with the user before running it, per standard practice for actions visible to others.

## Error Handling

- **Lint fails**: stop immediately. Show the ESLint output and do not run the build or push.
- **Build fails**: stop immediately. Show the Vite error output and do not push. Do not attempt to push a stale or partial `dist/` from a previous build.
- **Uncommitted changes present**: stop and ask the user whether to commit them first. Never deploy uncommitted work silently.
- **Push rejected or fails** (e.g. non-fast-forward, network error, auth failure): report the exact git error to the user and stop. Do not force-push to resolve it — ask the user how they want to proceed.
- In every failure case, state clearly which step failed and that no push to `staging` occurred.

## Success Output

When all three steps succeed, report:
- Confirmation that lint and build both passed
- The branch and commit SHA that was pushed to `staging` on `origin`
- A reminder that this only updates the `staging` branch — it does not trigger any deployment pipeline, since none is configured in this repo
