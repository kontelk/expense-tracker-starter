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
- `src/App.jsx` — top-level component. Owns only the `transactions` state and the fixed `categories` list, plus `handleAddTransaction` (appends a new transaction) and `handleDeleteTransaction` (filters a transaction out by `id`) callbacks. Composes the four components below; no calculation or filtering logic lives here anymore.
- `src/Summary.jsx` — receives `transactions` as a prop and derives `totalIncome`, `totalExpenses`, and `balance` internally via `reduce`. Renders the three summary cards.
- `src/SpendingChart.jsx` — receives `transactions` as a prop, derives expense totals per `category` via `reduce`, and renders them as a `recharts` `PieChart` (with `Cell`, `Tooltip`, `Legend`, wrapped in `ResponsiveContainer`). Renders nothing (`null`) when there are no expense transactions.
- `src/TransactionForm.jsx` — owns its own local state for the form fields (`description`, `amount`, `type`, `category`). On submit, builds the new transaction object (including `id: Date.now()` and today's `date`) and calls the `onAddTransaction` prop rather than mutating `transactions` directly; resets its own fields afterward.
- `src/TransactionList.jsx` — owns `filterType`/`filterCategory` state, filters the `transactions` prop client-side (no memoization), and renders the filter selects plus the transactions table. Each row has a Delete button that confirms via `window.confirm` before calling the `onDeleteTransaction` prop with the transaction's `id`.
- `src/App.css` / `src/index.css` — styling, plain CSS (no CSS-in-JS, no Tailwind).

Data flow is one-way, standard "lift state up" pattern: `App` holds the single source of truth (`transactions`), passes it down as props to `Summary`/`SpendingChart`/`TransactionList`, and receives changes back up via callback props — new entries from `TransactionForm` via `onAddTransaction`, removals from `TransactionList` via `onDeleteTransaction`. `categories` is likewise owned by `App` and passed down to both `TransactionForm` and `TransactionList`.

## Dependencies

- `recharts` — charting library, used only by `SpendingChart.jsx`.

State shape: `transactions` is an array of `{ id, description, amount, type, category, date }`. The seeded sample data in `App.jsx` uses numeric `amount` values, but transactions added through `TransactionForm` store `amount` as a **string** (raw value from the number input) — this inconsistency matters if arithmetic is ever done directly on `t.amount` without coercion.

`type` is `"income" | "expense"`; `category` is a free-form string drawn from the fixed `categories` array owned by `App.jsx`.

## Linting

ESLint flat config (`eslint.config.js`) uses `@eslint/js` recommended rules plus `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` (Vite-oriented). Notable custom rule: `no-unused-vars` allows unused identifiers matching `^[A-Z_]`.
