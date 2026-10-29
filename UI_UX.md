# 📱 TiffinMitra UI / UX Specification & User Journeys

> **Version:** 1.0.0  
> **Applicability:** Web Client (`apps/web`), Responsive Layouts, User Journey Maps  
> **Primary Authority:** `IDEA.md`, `AGENTS.md`

---

## 1. Information Architecture & Navigation Structure

TiffinMitra's information architecture is structured around two distinct customer segments:

1. **Everyday Diners:** Seeking predictable, home-cooked daily meals (lunch/dinner) or recurring tiffin subscriptions.
2. **Local Home Cooks:** Homemakers and independent home chefs managing menus, orders, and daily capacities without technical friction.

```text
TiffinMitra Navigation Hierarchy
├── Public Discovery (Unauthenticated & Authenticated)
│   ├── Home (Hero, Locality Filter, Featured Thalis, Featured Cooks, Meal Plans)
│   ├── Explore / Discover (Locality, Cuisine, Dietary Filter, Distance)
│   ├── Cook Storefront (/cooks/:cookSlug - Bio, Specialties, Daily Menu, Subscriptions, Reviews)
│   ├── How It Works (/how-it-works - Diner & Cook Walkthroughs)
│   ├── Become a Cook (/become-a-cook - Value Proposition & Application Entry)
│   ├── About Us (/about - Mission, Invariants, Domestic Care)
│   ├── FAQ (/faq - Filtered by Diners, Subscriptions, Cooks)
│   └── Contact & Support (/contact)
│
├── Customer Workflows
│   ├── Cart Drawer / Sheet (Single-Cook Cart Enforcement, Add-ons, Delivery Slot)
│   ├── Checkout (/checkout - Address Selection, Slot Confirmation, Simulated Payment)
│   ├── Order Tracking (/orders/:orderNumber - Real-Time Preparation Stages)
│   ├── Subscription Manager (/subscriptions - Delivery Calendar, Morning Cutoff Pause/Resume)
│   └── Profile & Addresses (/profile - Saved Home/Work/PG Addresses, Order History)
│
├── Cook Portal (/cook/dashboard - Milestone M5)
│   ├── Live Kitchen Dashboard (Incoming Orders, Stage Transitions)
│   ├── Menu & Inventory Management (Daily Portions, Thali Items, Pricing)
│   ├── Subscription Schedule (Upcoming Deliveries, Paused Diners)
│   └── Daily Capacity Limits (Max Daily Thalis Throttling)
│
└── Administrative Portal (/admin - Milestone M8)
    ├── Cook Applications Queue (Document Inspection, Kitchen Hygiene Review, Approvals)
    ├── Marketplace Audit (Order Logs, Simulated Payment Audits, Reviews Moderation)
    └── Platform Settings
```

---

## 2. Customer Discovery & Ordering Journey

```text
[Landing / Hero]
      │
      ▼
[Select Locality] (e.g. Koramangala, HSR Layout, Indiranagar)
      │
      ▼
[Browse Storefronts or Dishes] (Filter by Veg / Jain / Non-Veg / Cuisines)
      │
      ▼
[Inspect Cook Profile & Menu]
  ├── Verified Order Reviews (4.8★ rating, real photos)
  ├── Preparation Times & Daily Remaining Portions
  └── Dietary & Hygiene Badges (FSSAI verified, 100% domestic kitchen)
      │
      ▼
[Add to Cart] ──────────┐
      │                 │ (If cart contains items from Cook A and
      │                 │  user adds from Cook B)
      │                 ▼
      │         [Single-Cook Cart Modal]
      │         ├── "Your cart contains items from Cook A."
      │         ├── "Would you like to clear your cart and start a new order with Cook B?"
      │         └── [Keep Cart] or [Replace Cart & Add]
      ▼
[Review Cart] (Delivery Slot, Address Selection, Item Quantities)
      │
      ▼
[Checkout & Simulated Payment]
      │
      ▼
[Live Order Status & Stage Progress] (Placed -> Accepted -> Preparing -> Out for Delivery -> Delivered)
```

---

## 3. Mobile-First Design Principles

Over 75% of hyperlocal food ordering in urban India occurs on mobile smartphones. The UI is built mobile-first:

1. **Touch Targets:** All clickable interactive elements have a minimum bounding area of **44x44 points** to prevent accidental touches.
2. **Bottom Navigation / Sheet Drawers:** Navigation on mobile devices utilizes smooth sliding sheets (cart drawer, mobile menu drawer, filter drawer) within the natural reach of the user's thumb.
3. **Sticky Call to Actions:** Key actions (such as "Proceed to Checkout" or "Find Your Tiffin") pin cleanly to the viewport bottom with safe-area insets.
4. **Instant Visual Feedback:** Interactive triggers feature immediate pressed states, subtle scale micro-interactions (`active:scale-98`), and loading spinners during asynchronous mutations.

---

## 4. The Single-Cook Cart UX Invariant

In home-cooked food marketplaces, mixing items from multiple independent domestic kitchens in a single delivery order is operationally impractical (different preparation locations, disparate kitchen timings, independent delivery runs).

### UX Rules for Single-Cook Cart

1. **Active Cook Lock:** When the first meal is added, the cart locks to that cook's storefront.
2. **Cross-Cook Detection:** If a diner attempts to add an item from a different cook, the action does not silently fail or overwrite the cart.
3. **Transparent Modal Prompt:** An accessible dialog displays:
   - Header: _"Replace items in cart?"_
   - Description: _"Your cart already contains delicious items from **[Current Cook]**. Tiffin orders are freshly prepared in independent domestic kitchens and cannot be bundled across different cooks."_
   - Action A: _"Keep Current Order"_ (Closes modal without altering cart).
   - Action B: _"Clear & Add New Item"_ (Clears existing items, adds the new item, and switches the active cook).

---

## 5. Trust, Hygiene & Quality Communication

Because TiffinMitra features domestic home cooks rather than commercial restaurant kitchens, diners require explicit trust indicators:

1. **Transparent Cook Profiles:** Every cook profile features the cook's name, domestic kitchen story, regional specialty, and city locality.
2. **Verified Order Reviews:** Reviews and star ratings can only be submitted by diners who completed a delivered order from that specific cook.
3. **Small Batch Portions:** Menus display real-time portion limits (e.g. _"Only 6 portions remaining for dinner"_), conveying freshly cooked food rather than mass-refrigerated commercial food.
4. **FSSAI & Hygiene Badges:** Clear verification tags display FSSAI registration numbers and platform kitchen inspection status.

---

## 6. Meal Plans & Recurring Tiffin Subscriptions UX

Daily decision fatigue is the primary pain point for students and busy professionals. TiffinMitra solves this through flexible recurring meal subscriptions:

1. **Duration Choices:** 7-Day Trial, 14-Day Routine, or 30-Day Monthly Plan.
2. **Daily Meal Slots:** Lunch, Dinner, or Both.
3. **Morning Cutoff Pause Guarantee:**
   - Diners can pause individual days or entire weeks through a visual calendar.
   - For lunch deliveries, changes must be made before **8:00 AM**.
   - For dinner deliveries, changes must be made before **3:00 PM**.
   - Pausing a meal automatically extends the subscription validity end date by one day with zero cancellation penalty.
