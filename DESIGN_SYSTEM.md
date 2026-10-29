# 🎨 TiffinMitra Design System Specification

> **Version:** 1.0.0  
> **Applicability:** Frontend Web Application (`apps/web`), Shared UI Components  
> **Compliance:** WCAG 2.2 AA Standards, Mobile-First Responsive Architecture

---

## 1. Design Philosophy & Aesthetic Identity

TiffinMitra's design language reflects the warmth, authenticity, and domestic care of home-cooked Indian meals. Unlike high-frequency, commercial fast-food aggregators that employ neon hues and urgent gamified interfaces, TiffinMitra creates an inviting, trustworthy, and calm dining experience.

### Core Visual Principles

1. **Comfort & Warmth:** Soft cream canvas tones evoke traditional Indian dining tables, warm rotis, and homely comfort.
2. **Nutritional Freshness:** Earthy leaf greens convey fresh vegetables, clean ingredients, and sustainable home cooking.
3. **Culinary Warmth:** Rich terracotta accents reflect clay cookware, roasted spices, and earthen tiffin traditions.
4. **Accessible Contrast:** High-contrast charcoal text ensures effortless legibility across all ambient lighting conditions and device screens.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Brand Color Palette

| Token Name         | Hex Code  | HSL / RGB            | Semantic Role                                                      | Minimum Contrast Ratio                     |
| :----------------- | :-------- | :------------------- | :----------------------------------------------------------------- | :----------------------------------------- |
| `brand.darkGreen`  | `#285943` | `rgb(40, 89, 67)`    | Primary brand color, headers, primary buttons, active tabs         | **7.8:1** on `#FFF8EE` (AAA)               |
| `brand.green`      | `#4F805D` | `rgb(79, 128, 93)`   | Secondary brand color, hover states, sub-actions, icon accents     | **4.6:1** on `#FFF8EE` (AA)                |
| `brand.cream`      | `#FFF8EE` | `rgb(255, 248, 238)` | Primary application background, card fills, canvas                 | Base surface                               |
| `brand.terracotta` | `#D97955` | `rgb(217, 121, 85)`  | Accent highlights, secondary CTAs, urgency tags, discount callouts | **3.6:1** on `#FFF8EE` (Large UI / Badges) |
| `brand.charcoal`   | `#252922` | `rgb(37, 41, 34)`    | Primary typography, dark text, high-emphasis headings              | **13.2:1** on `#FFF8EE` (AAA)              |
| `brand.border`     | `#E8E5DC` | `rgb(232, 229, 220)` | Subtle borders, card dividers, input borders                       | Decorative / Structural                    |

### 2.2 Dietary Classification Tokens

Dietary clarity is vital in the Indian culinary landscape. Specific tokens identify dietary requirements unambiguously:

| Dietary Type | Background Token            | Text Token                     | Border Token         | Usage Context                                      |
| :----------- | :-------------------------- | :----------------------------- | :------------------- | :------------------------------------------------- |
| **Pure Veg** | `bg-emerald-50` (`#ECFDF5`) | `text-emerald-800` (`#065F46`) | `border-emerald-200` | 100% vegetarian preparations                       |
| **Jain**     | `bg-amber-50` (`#FFFBEB`)   | `text-amber-800` (`#92400E`)   | `border-amber-200`   | Strictly without onion, garlic, or root vegetables |
| **Non-Veg**  | `bg-rose-50` (`#FFF1F2`)    | `text-rose-800` (`#9F1239`)    | `border-rose-200`    | Egg, poultry, or meat preparations                 |
| **Vegan**    | `bg-sky-50` (`#F0F9FF`)     | `text-sky-800` (`#075985`)     | `border-sky-200`     | 100% plant-based, dairy-free meals                 |

### 2.3 Status & Feedback Tokens

| State                   | Background    | Text             | Border             | Icon          |
| :---------------------- | :------------ | :--------------- | :----------------- | :------------ |
| **Success**             | `bg-green-50` | `text-green-800` | `border-green-200` | CheckCircle   |
| **Warning**             | `bg-amber-50` | `text-amber-800` | `border-amber-200` | AlertTriangle |
| **Destructive / Error** | `bg-red-50`   | `text-red-800`   | `border-red-200`   | AlertCircle   |
| **Information**         | `bg-blue-50`  | `text-blue-800`  | `border-blue-200`  | Info          |

---

## 3. Typography Scale & Hierarchy

TiffinMitra adopts **Plus Jakarta Sans**, a modern geometric grotesque font with friendly rounded terminals and open apertures optimized for digital readability across small mobile viewports.

### Type Scale

| Level              | Desktop Size / Leading   | Mobile Size / Leading    | Weight                        | Tracking   | Usage                              |
| :----------------- | :----------------------- | :----------------------- | :---------------------------- | :--------- | :--------------------------------- |
| **Hero Display**   | `3.5rem (56px) / 1.1`    | `2.25rem (36px) / 1.15`  | Bold (700)                    | `-0.02em`  | Homepage hero headlines            |
| **Heading 1**      | `2.5rem (40px) / 1.2`    | `1.875rem (30px) / 1.25` | Bold (700)                    | `-0.015em` | Page titles, major category titles |
| **Heading 2**      | `1.875rem (30px) / 1.25` | `1.5rem (24px) / 1.3`    | Semibold (600)                | `-0.01em`  | Section headers, modal titles      |
| **Heading 3**      | `1.25rem (20px) / 1.35`  | `1.125rem (18px) / 1.4`  | Semibold (600)                | Normal     | Card titles, subsection headings   |
| **Body Large**     | `1.125rem (18px) / 1.5`  | `1rem (16px) / 1.5`      | Regular (400)                 | Normal     | Hero intros, lead paragraphs       |
| **Body Regular**   | `1rem (16px) / 1.5`      | `0.9375rem (15px) / 1.5` | Regular (400) / Medium (500)  | Normal     | Standard UI text, descriptions     |
| **Body Small**     | `0.875rem (14px) / 1.4`  | `0.8125rem (13px) / 1.4` | Regular (400) / Medium (500)  | Normal     | Supporting labels, timestamps      |
| **Caption / Tiny** | `0.75rem (12px) / 1.3`   | `0.75rem (12px) / 1.3`   | Medium (500) / Semibold (600) | `+0.01em`  | Badges, tags, form helper notes    |

---

## 4. Spacing, Elevation & Layout Grid

### 4.1 Spacing Scale

Built on an 8-point harmonic grid (4px sub-grid for fine adjustments):

- `2` (8px): Micro-spacing between icon and adjacent label.
- `3` (12px): Internal card chip padding, input vertical padding.
- `4` (16px): Standard component padding, list gap.
- `6` (24px): Card container padding, form field gap.
- `8` (32px): Subsection spacing, modal internal padding.
- `12` (48px): Section vertical spacing on mobile.
- `16` (64px): Section vertical spacing on desktop.

### 4.2 Elevation & Shadows

- **Card Flat:** `border border-brand-border bg-white` (Default clean aesthetic).
- **Card Hover:** `hover:shadow-md hover:border-brand-green/30 transition-all duration-200`.
- **Drawer / Modal Overlay:** `shadow-xl backdrop-blur-sm bg-black/40`.
- **Floating Bar / Sticky Nav:** `bg-brand-cream/95 backdrop-blur-md border-b border-brand-border/60 shadow-sm`.

---

## 5. UI Component Library Specification

All components are built with TypeScript, Tailwind CSS, and Radix UI primitives.

### 5.1 Button (`apps/web/src/components/ui/button.tsx`)

Supports flexible variants and sizes via Class Variance Authority (CVA):

- **Variants:**
  - `default`: Solid `#285943` with white text. Primary call to action.
  - `secondary`: Solid `#4F805D` with white text. Secondary workflow action.
  - `terracotta`: Solid `#D97955` with white text. High-visibility marketing trigger.
  - `outline`: Border `#E8E5DC` on white. Clean secondary action.
  - `ghost`: Transparent with hover background. Navigation links and icon buttons.
  - `destructive`: Crimson alert action for cancellations and item removal.
- **Sizes:** `default` (h-10 px-4), `sm` (h-9 px-3), `lg` (h-12 px-8), `icon` (h-10 w-10).
- **Slot Composition:** Compatible with Next.js `<Link>` via `asChild`.

### 5.2 Input (`apps/web/src/components/ui/input.tsx`)

- High-contrast text on pure white background.
- Border `#E8E5DC` with `focus-visible:ring-2 focus-visible:ring-brand-darkGreen`.
- Disabled state with reduced opacity and cursor not-allowed.

### 5.3 Badge (`apps/web/src/components/ui/badge.tsx`)

- Specialized variants: `veg`, `jain`, `nonVeg`, `vegan`, `default`, `secondary`, `terracotta`, `success`, `warning`, `destructive`.
- Rounded pill geometry with semantic font sizing (`text-xs font-semibold`).

### 5.4 Card (`apps/web/src/components/ui/card.tsx`)

- Semantic composition: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- White container on `#FFF8EE` warm canvas with soft `#E8E5DC` border.

### 5.5 Dialog (`apps/web/src/components/ui/dialog.tsx`)

- Accessible modal dialog using `@radix-ui/react-dialog`.
- Automatic backdrop blur, accessible labels, ESC key handling, and focus-trap.

### 5.6 Tabs (`apps/web/src/components/ui/tabs.tsx`)

- Tab navigation based on `@radix-ui/react-tabs`.
- Active indicator in `#285943` with animated state changes.

### 5.7 Skeleton (`apps/web/src/components/ui/skeleton.tsx`)

- Shimmer loading state with subtle pulsing animation for asynchronous content loading.

---

## 6. Currency & Monetary Display Standard

In alignment with core architectural rules:

- All monetary amounts in the database and API are stored in **integer minor units (paise)**.
- Frontend rendering exclusively uses `formatCurrency(paise: number)` from `@/lib/utils`.
- Example formatting:
  - `14000` paise -> `₹140`
  - `9950` paise -> `₹99.50`
  - `0` paise -> `₹0`

---

## 7. Accessibility (A11y) & WCAG 2.2 AA Compliance

1. **Color Contrast:** All body text meets or exceeds a **4.5:1** contrast ratio; large text meets **3:1**.
2. **Keyboard Focus:** Every interactive control features a visible `focus-visible:ring-2 focus-visible:ring-brand-darkGreen` focus ring with an outline offset.
3. **Screen Readers:** Semantic HTML elements (`<nav>`, `<header>`, `<main>`, `<footer>`, `<dialog>`, `<section>`, `<article>`) are employed throughout.
4. **Motion Reduction:** Animations (via Framer Motion or CSS transitions) strictly adhere to `prefers-reduced-motion: reduce`.
