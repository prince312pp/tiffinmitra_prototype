# 🍲 TiffinMitra — Homemade Food. Heartfelt Care.

> **Project Type:** Full-Stack Hyperlocal FoodTech Web Application & Marketplace  
> **Authority Documents:** `IDEA.md`, `DESIGN_SYSTEM.md`, `UI_UX.md`  
> **Database:** MongoDB Community Server (exclusively on `mongodb://localhost:27017/tiffinmitra`)  
> **Architecture:** Modular Full-Stack Next.js 14 App Router, Mongoose ODM, Tailwind CSS, TypeScript

---

## 📌 Executive Overview

**TiffinMitra** is a hyperlocal homemade food marketplace connecting students, working professionals, and individuals living away from home with certified local home cooks preparing fresh, comforting, everyday meals.

Unlike commercial fast-food aggregators that prioritize mass-produced restaurant dining, TiffinMitra is designed specifically around **home-cooked dining**:
- **Pure Domestic Kitchens:** Food cooked by neighborhood homemakers and independent home chefs in small batches.
- **Single-Cook Cart Invariant:** Orders are fulfilled exclusively from one kitchen at a time to ensure domestic food arrives fresh and hot together.
- **Morning Cutoff Guarantee:** Flexible meal subscriptions (5-Day, 14-Day, 30-Day) that diners can pause with zero cancellation fee, automatically extending plan validity.
- **Assimilated Payment System:** Production-grade payment provider abstraction (`PaymentProvider` & `MockPaymentProvider`) processing simulated UPI, Cards, NetBanking, and COD with full idempotency, audit records, and server-side paise integer calculations.

---

## 🎨 Design System Implementation

The design system is implemented strictly in accordance with `DESIGN_SYSTEM.md` and WCAG 2.2 AA accessibility standards.

### Color Tokens

| Semantic Token | Hex Code | HSL / RGB | Usage |
| :--- | :--- | :--- | :--- |
| `brand.darkGreen` | `#285943` | `rgb(40, 89, 67)` | Primary brand color, headers, primary buttons, active tabs (AAA contrast 7.8:1) |
| `brand.green` | `#4F805D` | `rgb(79, 128, 93)` | Secondary brand color, hover accents, icons (AA contrast 4.6:1) |
| `brand.cream` | `#FFF8EE` | `rgb(255, 248, 238)` | Primary application canvas and card surfaces |
| `brand.terracotta` | `#D97955` | `rgb(217, 121, 85)` | Accent highlights, secondary CTAs, urgency tags, discounts |
| `brand.charcoal` | `#252922` | `rgb(37, 41, 34)` | Primary typography, dark text (AAA contrast 13.2:1) |
| `brand.border` | `#E8E5DC` | `rgb(232, 229, 220)` | Structural borders, dividers, inputs |

### Dietary Classification Badges

- **Pure Veg:** `bg-emerald-50 text-emerald-800 border-emerald-200`
- **Jain (No Root Veg):** `bg-amber-50 text-amber-800 border-amber-200`
- **Non-Veg:** `bg-rose-50 text-rose-800 border-rose-200`
- **Vegan:** `bg-sky-50 text-sky-800 border-sky-200`

### Monetary Standard
- All prices are strictly stored and computed as **integers in minor currency units (paise)**:
  - `14000` paise = `₹140`
  - `18000` paise = `₹180`
  - `32400` paise = `₹324`
- Rendered using `formatCurrency(paise)` from `src/lib/utils.ts`.

---

## 📱 Core UX Invariants & Workflows

### 1. Single-Cook Cart Enforcement (`UI_UX.md` §4)
- When a meal is added, the cart locks to that specific home cook.
- If a diner attempts to add an item from a different cook, the system displays an accessible dialog:
  - **Prompt:** _"Replace items in cart? Your cart already contains delicious items from [Cook A]. Tiffin orders are freshly prepared in independent domestic kitchens and cannot be bundled across different cooks."_
  - **Action A:** _"Keep Current Order"_ (retains cart).
  - **Action B:** _"Clear & Add New Item"_ (clears cart, adds new dish, updates active cook).

### 2. Live Order Tracking Timeline (`UI_UX.md` §2)
- Orders transition through distinct stages:  
  `Placed` ➔ `Accepted by Cook` ➔ `Cooking Fresh` ➔ `Out for Delivery` / `Ready for Pickup` ➔ `Delivered`.
- Status updates made by the cook in the Cook Portal immediately update the diner's live tracking view.
- Customers can cancel eligible placed orders with automatic simulated refund processing.
- Verified diners can submit 1 to 5-star reviews on delivered orders, updating the cook's live rating.

### 3. Morning Cutoff Pause Guarantee for Subscriptions (`UI_UX.md` §6)
- Interactive delivery calendar allows diners to pause/resume individual days.
- Cutoffs: Lunch before **8:00 AM**, Dinner before **3:00 PM**.
- Pausing extends the subscription validity end date by 1 day with zero cancellation charge.

### 4. Cook Kitchen Portal (`/cook/dashboard` & `/cook/menu`)
- Real-time order action queue: Accept, Reject, Start Cooking, Mark Ready, Deliver.
- Inventory & portion limits: Set daily maximum capacities (e.g., 25 thalis/day).
- Add new dishes with dietary labels, ingredients, and preparation time.

### 5. Administrator Governance (`/admin/dashboard` & `/admin/applications`)
- Marketplace analytics: Total users, approved cooks, pending applications, GMV.
- Cook Application Queue: Inspect hygiene declarations and approve/reject storefronts.
- Payment Audit Records: Inspect provider references, settlement times, and statuses.

---

## 💳 Assimilated Simulated Payment System (`IDEA.md` §13)

Implemented behind a pluggable `PaymentProvider` interface:
```typescript
interface PaymentProvider {
  createPaymentIntent(input: CreatePaymentInput): Promise<PaymentIntent>;
  verifyPayment(input: VerifyPaymentInput): Promise<PaymentResult>;
  refundPayment(paymentId: string, amountMinor: number): Promise<RefundResult>;
}
```

- **Supported Methods:** Simulated UPI (GPay/PhonePe), Credit/Debit Card, Net Banking, Pay on Delivery.
- **Deterministic Test Scenarios:**
  - `Test Instant Success`: Simulates successful bank authorization and order confirmation.
  - `Test Bank Decline / Retry`: Simulates bank decline, allowing verification of the retry mechanism.
- **Database Records:** Generates unique references (`mock_ref_XXXX`), payment records in MongoDB, and immutable historical order snapshots.

---

## 👥 Predefined Demo Accounts

The prototype features a **1-Click Role Switcher** (floating widget on the bottom right) and fast login buttons on `/login`:

| Persona | Name | Email | Password | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Diner** | Rahul Sharma | `customer@tiffinmitra.com` | `password123` | `customer` |
| **Home Cook** | Asha Patel | `cook@tiffinmitra.com` | `password123` | `cook` |
| **Platform Admin** | Admin Operator | `admin@tiffinmitra.com` | `password123` | `admin` |

---

## 🚀 Running the Application Locally

### Prerequisites
- Node.js `v18+` or `v20+` or `v24+`
- MongoDB Community Server running on `localhost:27017`

### Setup Commands
```bash
# 1. Install dependencies
npm install

# 2. Seed deterministic mock data into MongoDB
npm run seed

# 3. Start development server
npm run dev

# Or build and start production server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ MongoDB Database Collections

- `users`: Diners, cooks, and admins with password hashes, roles, and saved delivery addresses.
- `cookprofiles`: Storefront bios, cuisine tags, service areas, ratings, and FSSAI numbers.
- `cookapplications`: Onboarding applications with review notes and status (`pending_review`, `approved`, `rejected`).
- `mealcategories`: Categories (Daily Thalis, Regional Specials, Dietary & Jain, Weekly Subscriptions).
- `meals`: Dishes with price in paise, dietary labels, portion descriptions, and available portion counts.
- `carts`: Persistent shopping cart enforcing the single-cook constraint.
- `orders`: Immutable order snapshots, calculated totals, delivery slot, notes, and lifecycle timestamps.
- `payments`: Transaction records with payment provider references and settlement states.
- `subscriptionplans`: 5-Day, 14-Day, and 30-Day recurring meal routines.
- `subscriptions`: Active diner plans with paused dates calendar.
- `reviews`: Verified order feedback from diners who completed delivered meals.
- `auditlogs`: Platform audit events.
