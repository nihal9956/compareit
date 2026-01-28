# Quick Compare 🛒⚡

Quick Compare is a modern, responsive product comparison web application built with **React**, **TypeScript**, and **Material UI (MUI)**.  
It allows users to browse products by category, search efficiently, and compare up to **three products side‑by‑side** with a clean, animated UI.

---

## 🚀 Live Features

- 🔍 **Debounced Search** (optimized for performance)
- 🗂 **Category-based Browsing** (Mobiles, Laptops, Tablets)
- ⚖️ **Side-by-side Product Comparison**
- 💾 **Persistent Compare List** using Local Storage
- 🌗 **Light / Dark Theme Toggle**
- 📱 **Fully Responsive Layout**
- ✨ **Micro-interactions & Hover Animations**
- 🧠 **Optimized Rendering with React.memo**
- 🧩 **Reusable & Scalable Component Architecture**
- 🧼 **Graceful Empty States**

---

## 🧱 Tech Stack

- **React 18**
- **TypeScript**
- **Material UI (MUI v5)**
- **Vite**
- **CSS-in-JS (MUI sx)**
- **LocalStorage API**

---

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx
│   └── main.tsx
│
├── components/
│   ├── Header.tsx
│   ├── SkeletonGrid.tsx
│
├── data/
│   ├── products.mock.ts
│   └── categories.ts
│
├── features/
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   └── ProductList.tsx
│   │
│   └── compare/
|       ├── compare.constants.ts
│       ├── ComparePanel.tsx
│       ├── CompareTable.tsx
│       ├── useCompare.ts
│
├── hooks/
│   ├── useDebouncedValue.ts
│   └── useLocalStorage.ts
│
├── theme/
│   └── ThemeContext.tsx
│   └── mui.d.ts
│   └── theme.ts
│
├── pages/
│   └── ProductComparePage.tsx
│
├── types/
│   └── product.types.ts
│
└── assets/
└── styles/global.css (global styles whenever needed)
```

---

## 🧠 Architecture Decisions

### 1. Feature-based Folder Structure
Each feature (products, compare) owns its UI, hooks, and logic — improving scalability and maintainability.

### 2. Controlled Comparison Logic
- Comparison logic lives inside a custom hook: `useCompare`
- UI components remain **stateless and reusable**

### 3. Persistent State
- `useLocalStorage` ensures comparison data survives page reloads

### 4. Performance Optimizations
- `useMemo` for filtered product lists
- `React.memo` for product cards
- Debounced search to reduce re-renders

---

## 🎨 UI / UX Decisions

- Subtle hover lift & shadow animations
- Button actions pinned to card bottom for consistency
- Visual highlight of differing values in comparison table
- Color palette inspired by modern fintech & e-commerce apps
- Accessibility-friendly contrast & spacing

---
## ♿ Accessibility (A11y)

Accessibility was treated as a **first-class concern**, not an afterthought.

### Implemented Accessibility Features

- **Semantic HTML**
  - Proper use of buttons, lists, and landmarks
- **Keyboard Navigation**
  - All interactive elements are reachable via keyboard
  - Comparison panel controls accessible without mouse
- **ARIA Attributes**
  - `aria-label` for buttons and interactive regions
  - `aria-pressed` for comparison state
- **Focus Management**
  - Visible focus outlines for cards and buttons
  - Logical tab order maintained
- **Readable Contrast**
  - Color palette respects contrast ratios in both themes
- **Screen Reader Friendly**
  - Product names, prices, and actions are announced clearly

This ensures the app is usable for users relying on assistive technologies.

---

## 🔄 Comparison Rules

- Maximum **3 products** can be compared at once
- Comparison panel opens **only when user clicks**
- “See comparison” button appears after 2 selections
- Products can be removed individually or cleared entirely

---

## 🧪 Edge Cases Handled

- Empty search results
- Duplicate product addition prevention
- Disabled comparison when limit reached
- Responsive behavior across breakpoints
- Page refresh persistence
- Category switch with active comparison
- Removing items while panel is open

---

## 🧩 Custom Hooks

### `useCompare`
Handles:
- Add / Remove / Clear items
- Open / Close comparison panel
- LocalStorage persistence

### `useDebouncedValue`
- Delays search execution for better performance

---

## 🌗 Theming

- Centralized theme via `ThemeContext`
- Supports Light & Dark modes
- Custom color tokens for highlights & interactions

---

## 📈 Seniority Signals Demonstrated

- Clean separation of concerns
- Performance-first mindset
- Scalable architecture
- Thoughtful UX decisions
- Defensive coding
- Reusable abstractions

---

## 🔮 Future Enhancements

- Product sorting & filtering
- Server-driven data integration
- Virtualized product lists for very large datasets
- URL-based comparison sharing
- Product images lazy loading
- Server-side data fetching
- Unit & accessibility testing
- Analytics on comparison behavior

---

## 🛠️ Running the Project

```bash
npm install
npm run dev
```

---

## 🙌 Author

Built with care to demonstrate **senior frontend engineering practices** using React & TypeScript.
