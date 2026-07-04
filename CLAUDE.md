# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Starter project for a "Claude Code" course (codewithmosh.com). A basic expense tracker built with React + Vite. It intentionally contains a bug, poor UI, and messy code that get fixed progressively through the course — don't assume the current state is a mistake to silently "clean up" unless asked.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint over the project
```

There is no test suite and no test runner configured in this repo.

## Architecture

This is a minimal, single-screen Vite + React 19 app — there is no routing, no state management library, and no backend/API layer.

- `src/main.jsx` — entry point, mounts `App` into `#root` under `StrictMode`.
- `src/App.jsx` — the entire application. All state (transactions, form fields, filters), derived values (totals, balance, filtered list), and JSX markup live in this one component. There are no sub-components yet.
- `src/App.css` / `src/index.css` — styling, plain CSS (no CSS-in-JS, no Tailwind).

State shape: `transactions` is an array of `{ id, description, amount, type, category, date }`, seeded with hardcoded sample data in `useState`. `amount` is stored as a **string**, not a number — this matters when doing arithmetic (e.g. summing income/expenses via `reduce`).

`type` is `"income" | "expense"`; `category` is a free-form string drawn from the fixed `categories` array in `App.jsx`.

Filtering (`filterType`, `filterCategory`) is applied client-side by deriving `filteredTransactions` from `transactions` on every render — there's no memoization.

## Linting

ESLint flat config (`eslint.config.js`) uses `@eslint/js` recommended rules plus `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` (Vite-oriented). Notable custom rule: `no-unused-vars` allows unused identifiers matching `^[A-Z_]`.
