# Sustainability Shopping Assistant

A frontend-only sustainability shopping assistant web application. Built with Vite, React, and Tailwind CSS.

## Prerequisites

- **Node.js** LTS (v18 or v20 recommended)

## How to run

```bash
cd WJ/app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to build

```bash
npm run build
npm run preview
```

The built app will be in `dist/`. Use `npm run preview` to serve it locally.

## Folder structure

```
WJ/app/
├── src/
│   ├── app/
│   │   └── providers/     # AppProvider (filters, sort, persistence)
│   ├── components/
│   │   ├── nav/           # TopNav, BottomNav
│   │   ├── search/        # SearchBar
│   │   ├── filters/       # FilterControls, SortControls
│   │   ├── accessibility/ # AccessibilityToggles, AccessibilityPresets
│   │   ├── common/        # ProductCard, Layout, etc.
│   │   └── index.js       # Barrel export for shared components
│   ├── context/           # AccessibilityContext
│   ├── data/              # mockProducts.js
│   ├── hooks/             # useFilteredProducts, useAppState
│   ├── pages/             # Route pages
│   ├── utils/             # storage.js, filterSort.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Routes

- `/` - Home
- `/search` - Search with autocomplete
- `/account` - Account and settings
- `/accessibility` - Accessibility settings
- `/filters` - Filters and sorting
- `/product/:id` - Product detail (placeholder)
- `/scan` - Scan screen (placeholder)
- `/wishlist` - Saved items (placeholder)
- `/compare` - Comparison tool (placeholder)

## Merge later guide

This is a 4-person group project. Teammates work in their own folders (MA, WA, YA, WJ).

**When merging teammate work into WJ/app:**

1. Copy their pages into `src/pages/`
2. Copy their components into the appropriate `src/components/` subfolders (nav, search, filters, accessibility, common)
3. Update routes in `App.jsx`
4. Keep shared mock data in `src/data/mockProducts.js` and ensure all use it consistently
5. Use `AppProvider` for filters/sort and `AccessibilityProvider` for accessibility settings
