# TiffinMitra
### Homemade Food. Heartfelt Care.

**Project Type:** Full-Stack Web Application  
**Development Stage:** Prototype / MVP  
**Product Category:** FoodTech / Hyperlocal Food Marketplace  
**Primary Market:** India  
**Database:** MongoDB exclusively  
**Architecture:** Modular Full-Stack Application  
**Primary Goal:** Build a production-quality application foundation with a functional prototype, realistic user workflows, and a clear path to commercial deployment.

---

# 1. Project Overview

## 1.1 The Problem

Students, working professionals, and individuals living away from home often struggle to find affordable, reliable, and freshly prepared homemade meals for their everyday needs. Meanwhile, many home cooks lack an accessible platform to connect with potential customers and earn income from their cooking skills.

Existing food delivery options may not adequately address the demand for personalized, home-style daily meals.

TiffinMitra aims to bridge this gap by connecting local home cooks with people looking for convenient, affordable, and comforting homemade food.

## 1.2 The Solution

TiffinMitra is a hyperlocal homemade food marketplace where customers can discover local home cooks, explore their menus, order freshly prepared meals, subscribe to recurring tiffin services, and manage their everyday food requirements.

Home cooks can create storefronts, publish menus, manage availability, receive orders, configure meal plans, and grow their customer base through a dedicated dashboard.

The platform provides a unified experience for discovering food, ordering meals, tracking order progress, and managing recurring subscriptions.

Rather than competing solely on restaurant-style food delivery, TiffinMitra focuses on the convenience, familiarity, and affordability of home-style meals.

## 1.3 Vision

To make fresh, home-style food accessible to everyone while empowering home cooks to transform their culinary skills into sustainable income opportunities.

## 1.4 Mission

To build a trusted local ecosystem that connects people seeking everyday homemade meals with the people who prepare them.

## 1.5 Slogan

**TiffinMitra — Homemade Food. Heartfelt Care.**

## 1.6 Core Value Proposition

For customers:
- Discover homemade food near their location.
- Find affordable alternatives to restaurant meals.
- Order daily lunches, dinners, and complete meal plans.
- Discover cooks offering regional and personalized cuisines.
- Manage recurring meals without placing the same order every day.
- Track orders and manage subscriptions from one place.

For home cooks:
- Reach nearby customers without building their own website.
- Showcase their food, specialties, and cooking style.
- Manage menus, prices, and daily availability.
- Receive and process orders through a single dashboard.
- Offer recurring meal plans.
- Track sales, earnings, and customer feedback.

For administrators:
- Manage users, cooks, listings, and orders.
- Review cook applications.
- Handle complaints and reported listings.
- Monitor marketplace activity.
- Maintain platform quality and operational integrity.

---

# 2. Product Principles

The entire application must follow these principles.

### 2.1 Homemade Food First

The experience should prioritize everyday home-style meals rather than restaurant-style browsing.

### 2.2 Local Discovery

Customers should be able to discover cooks based on their delivery area, service availability, cuisine, price, and meal preferences.

### 2.3 Trust and Transparency

Display accurate menus, prices, availability, preparation estimates, cook information, and order statuses.

Never invent ratings, reviews, food certifications, delivery promises, or customer counts.

### 2.4 Convenience

Ordering a daily meal should require minimal effort.

Returning customers should be able to reorder previous meals or manage recurring meal plans without navigating the entire marketplace again.

### 2.5 Cook Empowerment

Home cooks should have simple tools to manage their businesses without requiring technical knowledge.

### 2.6 Production-Oriented Engineering

Even though the initial product is a prototype, the codebase must use sound security practices, modular architecture, reliable data handling, automated tests, and deployment-ready configuration.

### 2.7 Mobile-First Experience

The application must work particularly well on mobile devices because customers may browse, order, and track meals throughout the day.

The desktop experience must remain equally polished for cook and administrator dashboards.

---

# 3. Target Audience

## 3.1 Primary Customers

### College Students

Students living in hostels, PG accommodations, rented rooms, or shared apartments.

Their needs:
- Affordable daily meals.
- Monthly tiffin subscriptions.
- Reliable lunch and dinner availability.
- Simple ordering.
- Vegetarian and regional food options.

### Working Professionals

Individuals with limited time to cook during the workweek.

Their needs:
- Convenient meal ordering.
- Predictable daily meal costs.
- Scheduled meals.
- Consistent availability.
- Flexible subscription management.

### Individuals Living Away From Home

People who miss familiar home-style food.

Their needs:
- Regional cuisines.
- Homemade meal options.
- Direct access to local cooks.
- Flexible meal preferences.
- Reliable everyday food arrangements.

## 3.2 Home Cooks

Individuals who prepare food at home and want to serve nearby customers.

Examples:
- Homemakers.
- Independent home chefs.
- Small-scale tiffin providers.
- Local cooks specializing in regional cuisines.

Their needs:
- An easy registration process.
- A storefront and menu management system.
- Order management.
- Meal subscription management.
- Business analytics.
- Customer communication.

## 3.3 Administrators

Authorized platform operators responsible for maintaining marketplace quality, reviewing applications, resolving issues, and monitoring platform activity.

---

# 4. User Roles and Permissions

The application has three principal roles.

## 4.1 Customer

Customers can:
- Register and log in.
- Manage their profiles.
- Save delivery addresses.
- Browse available cooks.
- Search and filter meals.
- View cook profiles.
- Add items to a cart.
- Place orders.
- Complete the checkout workflow.
- View order status.
- Cancel eligible orders.
- Reorder previous meals.
- Purchase meal subscriptions.
- Pause or cancel eligible subscriptions.
- Review completed orders.
- Save favorite cooks.
- Receive notifications.
- Contact support.
- View their order history.

Customers must not be able to access cook or administrator functionality by modifying URLs or API requests.

## 4.2 Home Cook

Home cooks can:
- Register as customers and apply to become cooks, or use a dedicated cook registration flow.
- Submit their cook profile.
- Provide necessary business and food-related information.
- Create and edit their storefront.
- Upload food images.
- Create menu categories.
- Add and edit menu items.
- Set prices and meal descriptions.
- Configure vegetarian and other dietary labels.
- Manage item availability.
- Set operating hours.
- Define serviceable areas.
- Configure preparation times.
- Accept or reject incoming orders.
- Update order statuses.
- Create meal subscription plans.
- Manage recurring customer orders.
- View sales and order analytics.
- Review customer feedback.
- Manage customer inquiries.
- Update account settings.

A cook must not automatically receive approval to sell food simply by registering.

The cook application should have explicit statuses such as:

- `draft`
- `pending_review`
- `approved`
- `rejected`
- `suspended`

Only approved cooks can publish listings and accept orders.

## 4.3 Administrator

Administrators can:
- View marketplace statistics.
- Manage customer accounts.
- Review cook applications.
- Approve or reject cook applications.
- Suspend or reactivate accounts.
- Review food listings.
- Remove inappropriate content.
- View and investigate reported orders.
- Manage disputes.
- Review customer reports.
- Manage categories and platform settings.
- View platform audit logs.
- Monitor suspicious activity.
- Inspect payment transaction records.
- Initiate permitted refunds when supported by the configured payment provider.

Administrative access must be enforced on the server.

Hiding administrator buttons in the frontend is not an authorization mechanism.

---

# 5. Scope and Development Strategy

The project should be developed in stages.

## 5.1 Stage One: Functional Prototype

The first milestone is a complete, demonstrable web application.

It must include:
- Responsive public website.
- Authentication.
- Customer dashboard.
- Cook dashboard.
- Administrator dashboard.
- Cook application and approval workflow.
- Cook storefronts.
- Menu management.
- Search and filtering.
- Shopping cart.
- Checkout.
- Simulated payment processing.
- Order creation and tracking.
- Basic meal subscriptions.
- Reviews.
- Notifications.
- MongoDB integration.
- Seed data.
- Automated tests.

The prototype should use actual MongoDB persistence rather than relying on browser local storage for its core business data.

A local MongoDB instance or a dedicated MongoDB development database can be used during development.

## 5.2 Stage Two: Pre-Production Hardening

Prepare the application for controlled external testing.

Include:
- Production-style environment configuration.
- Robust validation.
- Rate limiting.
- Authentication hardening.
- Database indexes.
- Error monitoring.
- Logging.
- Backup and recovery procedures.
- Integration testing.
- Accessibility testing.
- Security testing.
- Deployment automation.
- Privacy and legal documentation.
- Cook onboarding and operational policies.

## 5.3 Stage Three: Commercial Launch

Introduce real operational integrations.

Potential additions:
- Real payment gateway.
- Payment reconciliation.
- Verified cook onboarding.
- Appropriate food business compliance checks.
- Real notifications.
- Delivery coordination.
- Refund processing.
- Customer support operations.
- Production monitoring.
- Business reporting.
- Subscription billing.
- Operational and financial reconciliation.

**Important:** A production-oriented codebase is not automatically production-ready for a real food marketplace. Commercial launch requires operational validation, security review, legal compliance, and real payment and fulfilment integrations.

---

# 6. Application Structure

TiffinMitra should be organized as a modular monolithic application.

A modular monolith provides clear separation of responsibilities without the complexity of maintaining multiple microservices during the prototype stage.

Use a monorepo with separate frontend, backend, documentation, and deployment directories.

## 6.1 Recommended Technology Stack

### Frontend

- Next.js with the App Router.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui for reusable interface components.
- Framer Motion for purposeful animations.
- React Hook Form for form handling.
- Zod for frontend validation.
- TanStack Query for server-state management.
- Zustand for lightweight client-side state where necessary.
- Lucide icons.
- A suitable charting library for dashboards.

### Backend

- Node.js.
- TypeScript.
- Express.js.
- MongoDB.
- Mongoose.
- Zod for request validation.
- A secure password hashing library such as Argon2id.
- A structured logging library.
- OpenAPI for API documentation.

### Testing

- Vitest for unit tests.
- Supertest for API integration tests.
- Playwright for end-to-end browser tests.
- Testing Library for React component tests.

### Development and Deployment

- Git and GitHub.
- Docker and Docker Compose.
- MongoDB Community Server for local development.
- MongoDB Atlas or a managed MongoDB deployment for hosted environments.
- GitHub Actions for CI.
- A compatible Next.js hosting platform.
- A compatible Node.js backend hosting platform.

The exact dependency versions must be selected, pinned, and verified when implementation begins.

Do not blindly install outdated packages or use incompatible major versions.

## 6.2 Architectural Boundaries

The frontend must not connect directly to MongoDB.

All persistent application data must flow through the backend API.

The architecture should follow:

Customer or Cook
→ Next.js Frontend
→ Backend API
→ Validation and Authorization
→ Application Services
→ MongoDB

External integrations such as email, image storage, and payment processing must be isolated behind service interfaces.

This makes it possible to replace development adapters with production integrations without rewriting the business logic.

---

# 7. Complete Repository File Structure

Use the following structure as the initial repository blueprint.

```text
tiffinmitra/
│
├── AGENTS.md
├── README.md
├── IDEA.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── LICENSE
├── .gitignore
├── .editorconfig
├── .nvmrc
├── .prettierrc.json
├── .prettierignore
├── package.json
├── package-lock.json
├── tsconfig.base.json
├── eslint.config.mjs
├── docker-compose.yml
├── Dockerfile
├── .env.example
│
├── apps/
│   │
│   ├── web/
│   │   ├── package.json
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   ├── postcss.config.mjs
│   │   ├── components.json
│   │   │
│   │   ├── public/
│   │   │   ├── images/
│   │   │   │   ├── branding/
│   │   │   │   ├── food/
│   │   │   │   ├── cooks/
│   │   │   │   └── placeholders/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   │
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx
│   │       │   ├── page.tsx
│   │       │   ├── globals.css
│   │       │   ├── error.tsx
│   │       │   ├── not-found.tsx
│   │       │   ├── loading.tsx
│   │       │   ├── robots.ts
│   │       │   ├── sitemap.ts
│   │       │   │
│   │       │   ├── (marketing)/
│   │       │   │   ├── about/
│   │       │   │   ├── how-it-works/
│   │       │   │   ├── become-a-cook/
│   │       │   │   ├── faq/
│   │       │   │   ├── contact/
│   │       │   │   ├── privacy/
│   │       │   │   └── terms/
│   │       │   │
│   │       │   ├── (auth)/
│   │       │   │   ├── login/
│   │       │   │   ├── register/
│   │       │   │   ├── forgot-password/
│   │       │   │   ├── reset-password/
│   │       │   │   └── verify-email/
│   │       │   │
│   │       │   ├── (customer)/
│   │       │   │   ├── discover/
│   │       │   │   ├── search/
│   │       │   │   ├── cooks/
│   │       │   │   │   └── [slug]/
│   │       │   │   ├── meals/
│   │       │   │   │   └── [id]/
│   │       │   │   ├── cart/
│   │       │   │   ├── checkout/
│   │       │   │   ├── orders/
│   │       │   │   │   └── [id]/
│   │       │   │   ├── subscriptions/
│   │       │   │   ├── favorites/
│   │       │   │   ├── reviews/
│   │       │   │   └── profile/
│   │       │   │
│   │       │   ├── (cook)/
│   │       │   │   └── cook/
│   │       │   │       ├── onboarding/
│   │       │   │       ├── dashboard/
│   │       │   │       ├── storefront/
│   │       │   │       ├── menu/
│   │       │   │       ├── categories/
│   │       │   │       ├── orders/
│   │       │   │       ├── subscriptions/
│   │       │   │       ├── customers/
│   │       │   │       ├── reviews/
│   │       │   │       ├── analytics/
│   │       │   │       └── settings/
│   │       │   │
│   │       │   ├── (admin)/
│   │       │   │   └── admin/
│   │       │   │       ├── dashboard/
│   │       │   │       ├── customers/
│   │       │   │       ├── cooks/
│   │       │   │       ├── applications/
│   │       │   │       ├── meals/
│   │       │   │       ├── orders/
│   │       │   │       ├── payments/
│   │       │   │       ├── reviews/
│   │       │   │       ├── reports/
│   │       │   │       ├── disputes/
│   │       │   │       ├── audit-logs/
│   │       │   │       └── settings/
│   │       │   │
│   │       │   └── api/
│   │       │       └── health/
│   │       │           └── route.ts
│   │       │
│   │       ├── components/
│   │       │   ├── ui/
│   │       │   ├── layout/
│   │       │   ├── navigation/
│   │       │   ├── marketing/
│   │       │   ├── discovery/
│   │       │   ├── meals/
│   │       │   ├── cooks/
│   │       │   ├── cart/
│   │       │   ├── checkout/
│   │       │   ├── orders/
│   │       │   ├── subscriptions/
│   │       │   ├── dashboards/
│   │       │   ├── forms/
│   │       │   ├── feedback/
│   │       │   └── shared/
│   │       │
│   │       ├── features/
│   │       │   ├── auth/
│   │       │   ├── discovery/
│   │       │   ├── menu/
│   │       │   ├── cart/
│   │       │   ├── checkout/
│   │       │   ├── orders/
│   │       │   ├── subscriptions/
│   │       │   ├── reviews/
│   │       │   └── notifications/
│   │       │
│   │       ├── hooks/
│   │       ├── lib/
│   │       │   ├── api-client.ts
│   │       │   ├── auth.ts
│   │       │   ├── env.ts
│   │       │   ├── query-client.ts
│   │       │   └── utils.ts
│   │       │
│   │       ├── stores/
│   │       ├── types/
│   │       └── middleware.ts
│   │
│   └── api/
│       ├── package.json
│       ├── tsconfig.json
│       ├── Dockerfile
│       ├── .env.example
│       │
│       └── src/
│           ├── server.ts
│           ├── app.ts
│           │
│           ├── config/
│           │   ├── env.ts
│           │   ├── database.ts
│           │   ├── cors.ts
│           │   ├── logger.ts
│           │   └── security.ts
│           │
│           ├── api/
│           │   ├── router.ts
│           │   ├── response.ts
│           │   └── pagination.ts
│           │
│           ├── middleware/
│           │   ├── authenticate.ts
│           │   ├── authorize.ts
│           │   ├── validate.ts
│           │   ├── rate-limit.ts
│           │   ├── request-id.ts
│           │   ├── error-handler.ts
│           │   └── not-found.ts
│           │
│           ├── modules/
│           │   ├── auth/
│           │   │   ├── auth.routes.ts
│           │   │   ├── auth.controller.ts
│           │   │   ├── auth.service.ts
│           │   │   ├── auth.validation.ts
│           │   │   └── auth.types.ts
│           │   │
│           │   ├── users/
│           │   ├── addresses/
│           │   ├── cooks/
│           │   ├── cook-applications/
│           │   ├── categories/
│           │   ├── menus/
│           │   ├── meals/
│           │   ├── search/
│           │   ├── cart/
│           │   ├── checkout/
│           │   ├── orders/
│           │   ├── payments/
│           │   ├── subscriptions/
│           │   ├── reviews/
│           │   ├── favorites/
│           │   ├── notifications/
│           │   ├── support/
│           │   ├── admin/
│           │   └── audit-logs/
│           │
│           ├── models/
│           │   ├── User.ts
│           │   ├── Address.ts
│           │   ├── CookProfile.ts
│           │   ├── CookApplication.ts
│           │   ├── MealCategory.ts
│           │   ├── Meal.ts
│           │   ├── Cart.ts
│           │   ├── Order.ts
│           │   ├── Payment.ts
│           │   ├── SubscriptionPlan.ts
│           │   ├── Subscription.ts
│           │   ├── Review.ts
│           │   ├── Favorite.ts
│           │   ├── Notification.ts
│           │   ├── SupportTicket.ts
│           │   └── AuditLog.ts
│           │
│           ├── services/
│           │   ├── email/
│           │   ├── storage/
│           │   ├── payment/
│           │   │   ├── PaymentProvider.ts
│           │   │   ├── MockPaymentProvider.ts
│           │   │   └── payment.factory.ts
│           │   ├── notifications/
│           │   ├── scheduling/
│           │   └── monitoring/
│           │
│           ├── jobs/
│           │   ├── subscription-renewal.job.ts
│           │   ├── order-reminders.job.ts
│           │   └── notification-cleanup.job.ts
│           │
│           ├── utils/
│           ├── constants/
│           └── types/
│
├── packages/
│   ├── shared-types/
│   ├── validation/
│   ├── eslint-config/
│   └── tsconfig/
│
├── database/
│   ├── README.md
│   ├── indexes.ts
│   ├── seed.ts
│   ├── seed-data/
│   └── scripts/
│       ├── verify-connection.ts
│       └── clear-development-data.ts
│
├── docs/
│   ├── README.md
│   ├── PRODUCT.md
│   ├── REQUIREMENTS.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── AUTHENTICATION.md
│   ├── AUTHORIZATION.md
│   ├── SECURITY.md
│   ├── PRIVACY.md
│   ├── PAYMENTS.md
│   ├── ORDER_LIFECYCLE.md
│   ├── SUBSCRIPTIONS.md
│   ├── SEARCH.md
│   ├── NOTIFICATIONS.md
│   ├── UI_UX.md
│   ├── DESIGN_SYSTEM.md
│   ├── ACCESSIBILITY.md
│   ├── TESTING.md
│   ├── DEPLOYMENT.md
│   ├── ENVIRONMENT_VARIABLES.md
│   ├── BACKUPS.md
│   ├── MONITORING.md
│   ├── TROUBLESHOOTING.md
│   ├── CONTRIBUTING.md
│   ├── ROADMAP.md
│   │
│   └── adr/
│       ├── README.md
│       ├── 001-modular-monolith.md
│       ├── 002-mongodb-and-mongoose.md
│       ├── 003-api-boundaries.md
│       ├── 004-payment-provider-abstraction.md
│       └── 005-authentication-strategy.md
│
├── tests/
│   ├── integration/
│   ├── e2e/
│   ├── fixtures/
│   └── helpers/
│
├── scripts/
│   ├── setup.sh
│   ├── setup.ps1
│   ├── check-env.ts
│   └── validate-project.ts
│
└── .github/
    └── workflows/
        ├── ci.yml
        ├── security.yml
        └── deploy.yml
```

This structure is the target architecture, not a requirement to create hundreds of empty files immediately.

Create files when their associated functionality is implemented. Avoid empty modules, placeholder business logic, and duplicate implementations.

---

# 8. Product Design and User Experience

## 8.1 Design Direction

TiffinMitra should feel warm, modern, trustworthy, and distinctly Indian without relying on excessive cultural decoration.

The visual experience should combine:
- Contemporary food marketplace design.
- Warm, appetizing photography.
- Clean typography.
- Generous whitespace.
- Soft surfaces.
- Rounded cards.
- Subtle shadows.
- Purposeful motion.
- Clear navigation.
- Strong readability.

Avoid making the application look like a generic admin template.

Do not make every section a card. Use typography, whitespace, imagery, and layout to establish hierarchy.

## 8.2 Suggested Visual Identity

### Primary Colors

- Deep Leaf Green: `#285943`
- Fresh Green: `#4F805D`
- Warm Cream: `#FFF8EE`
- Soft White: `#FFFFFF`
- Terracotta: `#D97955`
- Dark Charcoal: `#252922`
- Muted Text: `#74796F`
- Border: `#E8E5DC`

Use semantic color tokens rather than hardcoding these values throughout the application.

### Typography

Use a modern, highly readable sans-serif typeface.

Possible choices:
- Inter.
- Manrope.
- Plus Jakarta Sans.

Choose one primary family and use a consistent type scale.

### UI Components

Build reusable components for:
- Buttons.
- Inputs.
- Selects.
- Search fields.
- Cards.
- Dialogs.
- Drawers.
- Tabs.
- Dropdown menus.
- Badges.
- Avatars.
- Pagination.
- Toast notifications.
- Loading skeletons.
- Empty states.
- Confirmation dialogs.
- Data tables.
- Status indicators.

## 8.3 Animation Guidelines

Use Framer Motion selectively.

Appropriate animations include:
- Page transitions.
- Hero section reveals.
- Meal card entrance animations.
- Filter panel transitions.
- Add-to-cart feedback.
- Cart drawer interactions.
- Order status transitions.
- Dashboard chart reveals.
- Modal and dropdown transitions.

Animations should generally be short and subtle.

Respect `prefers-reduced-motion`.

Do not animate every element or make customers wait for decorative effects before interacting with the application.

---

# 9. Public Website

## 9.1 Homepage

The homepage should immediately explain what TiffinMitra does.

### Navigation

Include:
- Logo.
- Discover Meals.
- Explore Cooks.
- How It Works.
- Become a Cook.
- Login.
- Get Started.
- Cart indicator.

On mobile, use a compact navigation pattern with a menu drawer and clear access to the cart.

### Hero Section

Suggested headline:

**A Little Taste of Home, Every Day.**

Supporting text:

Discover local home cooks serving fresh, comforting meals made for your everyday life.

Primary CTA:
**Find Your Tiffin**

Secondary CTA:
**Become a Home Cook**

Include a strong food image or carefully art-directed collage of Indian home-style dishes.

The hero must remain readable and functional on small screens.

### Location Discovery

Provide a location selector or delivery-area input.

Customers should be able to enter a locality, PIN code, or supported delivery area.

During the prototype, location matching may use configured service areas rather than a paid mapping service.

Do not request precise GPS location unnecessarily.

### Featured Cooks

Display approved cooks with:
- Profile image.
- Name.
- Short introduction.
- Cuisine.
- Typical meal price.
- Delivery or pickup availability.
- Operating status.
- Genuine rating, if sufficient verified reviews exist.

### Popular Meals

Display:
- Meal image.
- Name.
- Description.
- Price.
- Cook name.
- Dietary labels.
- Availability.
- Add-to-cart action.

### How It Works

Present three clear steps:

1. Discover local home cooks.
2. Choose your meal or tiffin plan.
3. Enjoy homemade food.

### Meal Plans

Introduce daily, weekly, and monthly meal options.

Do not claim that all cooks offer subscriptions.

### Become a Cook

Explain the benefits of joining the platform and provide an application CTA.

### Trust Section

Explain how cook applications, listing moderation, reviews, and customer support work.

Only describe verification practices that are actually implemented.

### Footer

Include:
- About.
- Contact.
- FAQ.
- Terms.
- Privacy.
- Refund and cancellation policies.
- Become a Cook.
- Support information.

---

# 10. Customer Application

## 10.1 Customer Dashboard

The dashboard should provide:
- Welcome message.
- Next scheduled meal.
- Active orders.
- Active subscriptions.
- Recent orders.
- Favorite cooks.
- Recommended meals.
- Saved addresses.
- Account settings.

Prioritize useful actions over decorative statistics.

## 10.2 Meal Discovery

Customers must be able to:
- Browse all available meals.
- Browse cooks.
- Search by meal name.
- Search by cuisine.
- Filter by price.
- Filter by vegetarian status.
- Filter by meal category.
- Filter by delivery or pickup.
- Filter by availability.
- Sort by price.
- Sort by rating when meaningful ratings exist.
- View cook profiles.
- Clear all filters.

Search must be backed by the API.

For the prototype, MongoDB text indexes or carefully designed query filters are sufficient. A separate search engine is not required initially.

## 10.3 Cook Storefront

Every approved cook should have a public storefront.

Display:
- Cook name.
- Profile image.
- Cover image.
- Introduction.
- Cuisine specialties.
- Available meal categories.
- Operating hours.
- Serviceable areas.
- Delivery or pickup options.
- Estimated preparation time.
- Menu.
- Meal prices.
- Dietary information.
- Genuine reviews.
- Subscription plans.
- Current availability.

Use readable URLs, such as:

`/cooks/ghar-ka-swaad`

The slug must be unique.

## 10.4 Meal Details

Each meal page should include:
- Meal name.
- Images.
- Description.
- Price.
- Portion information.
- Ingredients when supplied by the cook.
- Dietary labels.
- Allergen information when supplied.
- Cook information.
- Availability.
- Preparation estimate.
- Quantity selector.
- Add-to-cart button.

Never automatically label a meal as allergen-free merely because the cook has not provided allergen information.

## 10.5 Shopping Cart

The cart should support:
- Adding meals.
- Removing meals.
- Changing quantities.
- Displaying item prices.
- Showing subtotal.
- Showing applicable delivery fees.
- Showing applicable taxes.
- Showing discounts when supported.
- Calculating the total.
- Persisting cart data for authenticated customers.
- Displaying an empty state.

For the initial marketplace, enforce **one cook per cart and per order**.

This simplifies preparation, delivery, cancellation, payment reconciliation, and order tracking.

If a customer attempts to add an item from another cook, explain the restriction and let them switch carts.

Do not rely on frontend prices when calculating totals.

The backend must retrieve authoritative prices from MongoDB and calculate the final order amount.

## 10.6 Checkout

The checkout flow should collect:
- Delivery or pickup selection.
- Delivery address, when applicable.
- Contact information.
- Requested delivery time, where supported.
- Order notes.
- Payment method.
- Order summary.

The backend must verify:
- The customer is authorized to place the order.
- The cook is approved.
- The cook is available.
- The selected meals exist.
- The meals are currently available.
- Quantities are valid.
- The order belongs to one cook.
- The final amount is calculated correctly.
- The address is serviceable.
- The checkout request has not already been processed.

Create an immutable order snapshot so that subsequent changes to meal prices or descriptions do not alter the customer's historical order.

## 10.7 Order Tracking

Display a clear order timeline.

Suggested statuses:

- `pending_payment`
- `placed`
- `accepted`
- `preparing`
- `ready_for_pickup`
- `out_for_delivery`
- `delivered`
- `cancelled`
- `rejected`
- `refund_pending`
- `refunded`

Not every order follows every status.

For example, pickup orders may not use `out_for_delivery`.

Define valid status transitions on the backend.

Customers must not be able to set their own orders to `delivered`.

During the prototype, status updates may be performed by the cook dashboard.

Do not display a live map unless actual location tracking has been implemented.

## 10.8 Reordering

Customers should be able to reorder previous meals.

Before creating a new order, verify that:
- The cook remains active.
- The meals are still available.
- Current prices are used.
- The selected quantities are valid.

Historical orders must remain unchanged.

## 10.9 Favorites

Allow customers to save favorite cooks.

Favorites should persist in MongoDB for authenticated customers.

## 10.10 Reviews

Only customers with eligible completed orders may submit reviews.

Each review should contain:
- Rating.
- Optional written feedback.
- Creation timestamp.
- Associated order.
- Associated cook.
- Associated customer.

Prevent duplicate reviews for the same order unless an explicit editing workflow is implemented.

Do not seed fake reviews into a live environment.

---

# 11. Home Cook Application

## 11.1 Cook Onboarding

Provide a guided onboarding wizard.

### Step 1: Personal Information

Collect the minimum information required for the account and application.

### Step 2: Storefront Details

Collect:
- Cook or business name.
- Short introduction.
- Cuisine specialties.
- Profile photo.
- Cover image.

### Step 3: Service Details

Collect:
- Operating days.
- Operating hours.
- Delivery or pickup availability.
- Serviceable localities.
- Preparation estimates.
- Maximum daily order capacity.

### Step 4: Food and Business Information

Collect relevant food business information and any applicable registration or licensing details required by the platform's onboarding policy.

Clearly distinguish between information submitted by the cook and information actually verified by the platform.

### Step 5: Application Review

Show:
- Submitted information.
- Application status.
- Any missing requirements.
- Resubmission instructions if rejected.

The application should be saved as a draft until submitted.

## 11.2 Cook Dashboard

Display:
- Today's orders.
- Pending order requests.
- Orders being prepared.
- Completed orders.
- Today's gross sales.
- Recent customer activity.
- Best-selling meals.
- Menu availability.
- Active subscriptions.
- Application or account status.

Do not display misleading financial metrics.

Distinguish gross order value from actual earnings and settled payouts.

If payouts are not implemented, explain the metric appropriately in the dashboard.

## 11.3 Menu Management

Cooks must be able to:
- Create meals.
- Edit meals.
- Delete or archive meals.
- Upload images.
- Set prices.
- Add descriptions.
- Configure categories.
- Set dietary labels.
- Set available quantities.
- Set preparation time.
- Mark meals unavailable.
- Schedule meal availability.

An unavailable meal must not be orderable through a direct API request.

## 11.4 Order Management

Cooks must be able to:
- View incoming orders.
- Accept orders.
- Reject orders with a reason.
- Begin preparation.
- Mark orders ready.
- Mark pickup orders completed.
- Mark delivery orders ready for handoff.
- View order details.
- View customer-provided instructions.
- View permitted delivery information.
- Review order history.

A cook must not be able to modify another cook's orders.

Order transitions must be validated by the backend.

## 11.5 Operating Hours and Capacity

Cooks should be able to configure:
- Weekly operating schedules.
- Special closures.
- Meal availability windows.
- Daily order limits.
- Delivery lead times.
- Cutoff times for scheduled meals.

The application should prevent orders when the cook is closed or has reached a configured capacity.

## 11.6 Analytics

Provide useful, simple analytics:
- Orders by day.
- Gross order value.
- Completed orders.
- Cancelled orders.
- Most-ordered meals.
- Average order value.
- Repeat customer count.

Clearly label estimates and calculated metrics.

Do not represent gross sales as net profit.

---

# 12. Meal Subscription System

Recurring meal plans are an important differentiator.

The initial version should implement basic subscriptions without introducing unnecessary billing complexity.

## 12.1 Subscription Plans

A cook can create plans such as:
- Lunch for five weekdays.
- Lunch and dinner for one week.
- Monthly weekday tiffin.
- Vegetarian daily meals.
- Custom weekly meal arrangements.

Each plan should specify:
- Name.
- Description.
- Included meals.
- Price.
- Schedule.
- Duration.
- Serviceable areas.
- Available capacity.
- Cancellation rules.
- Whether substitutions are allowed.

## 12.2 Subscription Purchase

The customer should be able to:
1. Open a cook's subscription plan.
2. Select a start date.
3. Choose permitted meal preferences.
4. Review the schedule.
5. Select a delivery address or pickup arrangement.
6. Review the total price.
7. Complete checkout.
8. Receive confirmation.
9. View the subscription in their dashboard.

## 12.3 Subscription Lifecycle

Suggested statuses:
- `pending_payment`
- `scheduled`
- `active`
- `paused`
- `completed`
- `cancelled`
- `expired`

## 12.4 Subscription Management

Customers should be able to:
- View upcoming meals.
- View the subscription schedule.
- Pause or resume when permitted.
- Cancel under the applicable policy.
- Review previous meal deliveries.

Cooks should be able to:
- View active subscriptions.
- View upcoming meal commitments.
- Manage eligible meal substitutions.
- Pause plans when unavailable.
- Review subscription demand.

## 12.5 Prototype Limitations

During the prototype:
- Use prepaid plan purchases through the configured simulated payment provider.
- Store subscription state in MongoDB.
- Generate scheduled meal occurrences.
- Track fulfilment for each occurrence.
- Do not attempt automatic real-money recurring billing.
- Do not claim that future payments will be collected automatically.

A real recurring billing system requires a compatible payment gateway, payment mandates where applicable, retry handling, cancellation rules, and reconciliation.

---

# 13. Payment Architecture

## 13.1 Objective

Implement a complete checkout and payment lifecycle without connecting to a real payment gateway during the prototype stage.

The payment layer must be designed so that a real provider can replace the simulated implementation later.

## 13.2 Payment Provider Abstraction

Create a provider interface.

Example conceptual contract:

```ts
interface PaymentProvider {
  createPaymentIntent(input: CreatePaymentInput): Promise<PaymentIntent>;

  verifyPayment(input: VerifyPaymentInput): Promise<PaymentResult>;

  refundPayment(input: RefundPaymentInput): Promise<RefundResult>;
}
```

Define shared request and response types.

The simulated provider must implement this contract.

The checkout service must depend on the interface rather than directly depending on the simulated provider.

## 13.3 Simulated Payment Flow

The prototype should support:
1. Customer reviews the order.
2. Backend calculates the final amount.
3. Backend creates a pending payment record.
4. Customer selects the available checkout option.
5. The configured development payment adapter processes the request.
6. The adapter returns a controlled success or failure result.
7. Backend verifies the adapter result.
8. Backend records the payment state.
9. Backend confirms the order only when the payment state is eligible.
10. Customer sees the appropriate checkout result.
11. Cook receives the confirmed order.

Support deterministic test scenarios:
- Payment succeeds.
- Payment fails.
- Payment is cancelled.
- Payment times out.
- Duplicate confirmation is received.
- Payment confirmation arrives after the order expires.

These scenarios should be controllable in development and automated tests.

## 13.4 Payment Records

Store:
- Internal payment ID.
- Order ID.
- Customer ID.
- Amount in the smallest currency unit.
- Currency.
- Provider name.
- Provider reference.
- Payment status.
- Creation timestamp.
- Update timestamp.
- Failure reason, when applicable.
- Refund state, when applicable.

Never store raw card numbers, CVVs, payment passwords, or UPI PINs.

## 13.5 Payment States

Suggested statuses:
- `pending`
- `processing`
- `succeeded`
- `failed`
- `cancelled`
- `refund_pending`
- `partially_refunded`
- `refunded`

The backend must define valid transitions.

## 13.6 Payment Integrity

Implement:
- Server-side price calculation.
- Payment idempotency.
- Duplicate request protection.
- Transaction-state validation.
- Payment/order consistency checks.
- Retry-safe operations.
- Audit logging for sensitive actions.
- Explicit separation between payment state and order state.

A successful payment must not create duplicate orders.

A failed payment must not result in an order being falsely marked as paid.

The payment provider adapter must be selected through validated server-side configuration.

The frontend must never decide that a payment succeeded simply because the user returned to a success URL.

## 13.7 User-Facing Payment Experience

The prototype should provide a polished checkout interface with:
- Order summary.
- Payment method selection.
- Processing state.
- Success screen.
- Failure screen.
- Retry action.
- Receipt or order confirmation.
- Clear transaction reference.

The payment interface may use realistic checkout interactions, but it must not falsely claim that actual money has been transferred when only the development adapter ran.

Keep the development adapter identifiable in configuration and technical records. Before accepting real customers or presenting the product as a live commercial service, replace it with a genuine payment provider and test the complete transaction lifecycle.

## 13.8 Future Payment Integration

Prepare for a gateway such as Razorpay or another provider suitable for the intended Indian market.

When integrated, implement:
- Server-created payment orders.
- Provider-side signature verification.
- Authenticated webhook verification.
- Webhook idempotency.
- Refund reconciliation.
- Payment status reconciliation.
- Failed payment recovery.
- Monitoring and alerts.

Do not build the production integration by simply changing the displayed payment method name.

---

# 14. MongoDB Database Design

MongoDB is the only application database.

Do not introduce PostgreSQL, MySQL, SQLite, or another persistent relational database.

Redis may be considered later for caching or distributed coordination, but it is not required for the initial prototype and must not become a second source of truth for business data.

Use Mongoose schemas with:
- Explicit types.
- Required fields.
- Validation.
- Indexes.
- Timestamps.
- Controlled updates.
- Appropriate references.
- Document versioning where useful.

## 14.1 Users Collection

Collection: `users`

Fields:

```text
_id
name
email
normalizedEmail
passwordHash
role
phone
avatarUrl
emailVerifiedAt
accountStatus
lastLoginAt
createdAt
updatedAt
```

Role values:
- `customer`
- `cook`
- `admin`

Account statuses:
- `active`
- `suspended`
- `pending_verification`
- `deactivated`

Use a unique index on normalized email.

Normalize email addresses consistently before lookup and uniqueness checks.

Do not store plaintext passwords.

Administrative role assignment must be restricted to trusted server-side operations.

## 14.2 Addresses Collection

Collection: `addresses`

Fields:

```text
_id
userId
label
recipientName
phone
addressLine1
addressLine2
locality
city
state
postalCode
country
deliveryInstructions
isDefault
createdAt
updatedAt
```

Index:
- `userId`

Validate that customers can only access their own addresses.

## 14.3 Cook Profiles Collection

Collection: `cookprofiles`

Fields:

```text
_id
userId
slug
displayName
description
profileImage
coverImage
cuisineTypes
dietaryOptions
serviceAreas
deliveryEnabled
pickupEnabled
operatingHours
preparationTime
dailyOrderCapacity
applicationStatus
isAcceptingOrders
averageRating
reviewCount
createdAt
updatedAt
```

Indexes:
- Unique `userId`.
- Unique `slug`.
- `applicationStatus`.
- Relevant discovery fields.

Rating aggregates must be calculated from eligible reviews or updated through trusted backend logic.

Do not trust values supplied by the client.

## 14.4 Cook Applications Collection

Collection: `cookapplications`

Fields:

```text
_id
userId
cookProfileId
applicationData
submittedAt
reviewedAt
reviewedBy
status
rejectionReason
createdAt
updatedAt
```

An application may contain information required for review.

Limit access to sensitive onboarding information.

Only authorized administrators may approve or reject applications.

## 14.5 Meal Categories Collection

Collection: `mealcategories`

Fields:

```text
_id
name
slug
description
imageUrl
isActive
sortOrder
createdAt
updatedAt
```

Indexes:
- Unique `slug`.
- `isActive` and `sortOrder`.

## 14.6 Meals Collection

Collection: `meals`

Fields:

```text
_id
cookId
name
slug
description
categoryId
imageUrls
priceMinor
currency
portionDescription
ingredients
allergens
dietaryLabels
preparationMinutes
availableQuantity
isAvailable
availabilitySchedule
createdAt
updatedAt
```

Indexes:
- `cookId` and `isAvailable`.
- `categoryId`.
- Relevant search fields.
- Appropriate price and availability filters.

Use integer minor currency units for prices.

For INR, represent ₹120.00 as `12000` paise.

Do not use floating-point arithmetic for financial calculations.

## 14.7 Carts Collection

Collection: `carts`

Fields:

```text
_id
userId
cookId
items
updatedAt
createdAt
```

Each item contains:
- `mealId`
- `quantity`

Use a unique index on `userId` if the application maintains one active cart per customer.

Cart data is temporary shopping state, not an authoritative order record.

Revalidate prices and availability at checkout.

## 14.8 Orders Collection

Collection: `orders`

Fields:

```text
_id
orderNumber
customerId
cookId
items
deliveryMode
deliveryAddressSnapshot
customerContactSnapshot
subtotalMinor
deliveryFeeMinor
taxMinor
discountMinor
totalMinor
currency
paymentStatus
orderStatus
customerNotes
cookNotes
estimatedPreparationMinutes
placedAt
acceptedAt
preparingAt
readyAt
completedAt
cancelledAt
cancellationReason
createdAt
updatedAt
```

Each order item must contain an immutable snapshot:

```text
mealId
mealName
imageUrl
unitPriceMinor
quantity
lineTotalMinor
```

Do not calculate historical order totals using current meal prices.

Use a unique index on `orderNumber`.

Add indexes for:
- `customerId` and creation date.
- `cookId` and order status.
- Order status and creation date.
- Payment status.

## 14.9 Payments Collection

Collection: `payments`

Fields:

```text
_id
orderId
customerId
provider
providerReference
idempotencyKey
amountMinor
currency
status
failureCode
failureMessage
refundAmountMinor
refundStatus
processedAt
createdAt
updatedAt
```

Indexes:
- `orderId`.
- `customerId` and creation date.
- Unique provider reference where applicable.
- Unique idempotency key in its appropriate scope.

Use an immutable transaction history or a dedicated payment-event collection if a complete audit trail is required.

## 14.10 Subscription Plans Collection

Collection: `subscriptionplans`

Fields:

```text
_id
cookId
name
description
mealDefinitions
schedule
durationDays
priceMinor
currency
serviceAreas
capacity
isActive
cancellationPolicy
createdAt
updatedAt
```

## 14.11 Subscriptions Collection

Collection: `subscriptions`

Fields:

```text
_id
subscriptionNumber
customerId
cookId
planId
planSnapshot
deliveryAddressSnapshot
startDate
endDate
schedule
status
totalMinor
currency
paymentId
pausedAt
cancelledAt
createdAt
updatedAt
```

Preserve a plan snapshot so future plan edits do not silently alter an existing subscription.

## 14.12 Subscription Occurrences Collection

Collection: `subscriptionoccurrences`

Fields:

```text
_id
subscriptionId
scheduledDate
mealDetails
status
orderId
createdAt
updatedAt
```

Create a unique index on the appropriate combination of `subscriptionId` and scheduled occurrence identifier.

This prevents duplicate scheduled meal occurrences.

## 14.13 Reviews Collection

Collection: `reviews`

Fields:

```text
_id
customerId
cookId
orderId
mealId
rating
comment
moderationStatus
createdAt
updatedAt
```

Indexes:
- `cookId` and creation date.
- Unique `orderId` and `customerId` for one review per eligible order, where that matches the business rules.

## 14.14 Favorites Collection

Collection: `favorites`

Fields:

```text
_id
customerId
cookId
createdAt
```

Create a unique compound index on `customerId` and `cookId`.

## 14.15 Notifications Collection

Collection: `notifications`

Fields:

```text
_id
userId
type
title
message
relatedEntityType
relatedEntityId
readAt
createdAt
```

Index:
- `userId` and creation date.

## 14.16 Support Tickets Collection

Collection: `supporttickets`

Fields:

```text
_id
ticketNumber
userId
orderId
subject
description
category
status
priority
assignedTo
resolution
createdAt
updatedAt
resolvedAt
```

## 14.17 Audit Logs Collection

Collection: `auditlogs`

Fields:

```text
_id
actorUserId
action
entityType
entityId
requestId
metadata
createdAt
```

Audit important actions such as:
- Cook approval.
- Account suspension.
- Order cancellation.
- Payment status correction.
- Refund initiation.
- Administrative settings changes.

Never place passwords, authentication tokens, payment secrets, or unnecessary personal data in audit metadata.

## 14.18 MongoDB Design Rules

- Use MongoDB as the only application database.
- Create indexes deliberately.
- Validate schemas.
- Use pagination for list endpoints.
- Avoid unbounded embedded arrays.
- Use references for independently queried entities.
- Embed snapshots when historical accuracy matters.
- Use MongoDB transactions when supported and necessary for multi-document financial or order operations.
- Ensure the MongoDB deployment supports the transaction capabilities required by the application.
- Do not assume local standalone MongoDB supports every production transaction workflow.
- Avoid unnecessary transactions for simple single-document operations.
- Use explicit concurrency controls for inventory and capacity.
- Never trust client-supplied ownership IDs.
- Do not expose raw MongoDB documents directly as API responses.

---

# 15. API Design

Use a versioned REST API.

Base path:

`/api/v1`

Return consistent JSON responses.

## 15.1 Response Format

Successful response:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Error response:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid information.",
    "details": []
  },
  "requestId": "request-id"
}
```

Do not expose stack traces, database internals, or secret configuration in production error responses.

## 15.2 Authentication

```text
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
GET    /api/v1/auth/me
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
POST   /api/v1/auth/verify-email
```

Implement refresh and logout according to the chosen session strategy.

Password-reset tokens must expire and be single-use.

## 15.3 Users

```text
GET    /api/v1/users/me
PATCH  /api/v1/users/me
GET    /api/v1/users/me/addresses
POST   /api/v1/users/me/addresses
PATCH  /api/v1/users/me/addresses/:id
DELETE /api/v1/users/me/addresses/:id
```

## 15.4 Discovery

```text
GET /api/v1/cooks
GET /api/v1/cooks/:slug
GET /api/v1/cooks/:slug/meals
GET /api/v1/meals
GET /api/v1/meals/:id
GET /api/v1/categories
GET /api/v1/search
```

Support pagination, sorting, and validated filters.

Only approved and active cooks should appear in public discovery results.

## 15.5 Cook Applications

```text
POST  /api/v1/cook-applications
GET   /api/v1/cook-applications/me
PATCH /api/v1/cook-applications/me
POST  /api/v1/cook-applications/me/submit
```

Administrator actions:

```text
GET  /api/v1/admin/cook-applications
POST /api/v1/admin/cook-applications/:id/approve
POST /api/v1/admin/cook-applications/:id/reject
```

## 15.6 Cook Dashboard and Menu

```text
GET    /api/v1/cook/dashboard
GET    /api/v1/cook/profile
PATCH  /api/v1/cook/profile
GET    /api/v1/cook/meals
POST   /api/v1/cook/meals
GET    /api/v1/cook/meals/:id
PATCH  /api/v1/cook/meals/:id
DELETE /api/v1/cook/meals/:id
PATCH  /api/v1/cook/meals/:id/availability
GET    /api/v1/cook/orders
GET    /api/v1/cook/orders/:id
POST   /api/v1/cook/orders/:id/accept
POST   /api/v1/cook/orders/:id/reject
POST   /api/v1/cook/orders/:id/start-preparing
POST   /api/v1/cook/orders/:id/mark-ready
POST   /api/v1/cook/orders/:id/complete
```

Validate every order transition on the server.

## 15.7 Cart

```text
GET    /api/v1/cart
POST   /api/v1/cart/items
PATCH  /api/v1/cart/items/:mealId
DELETE /api/v1/cart/items/:mealId
DELETE /api/v1/cart
```

## 15.8 Checkout and Orders

```text
POST /api/v1/checkout/quote
POST /api/v1/checkout
GET  /api/v1/orders
GET  /api/v1/orders/:id
POST /api/v1/orders/:id/cancel
POST /api/v1/orders/:id/reorder
```

The quote endpoint must not be treated as an authorization to charge or as a guaranteed reservation.

Recalculate totals during order creation.

## 15.9 Payments

```text
POST /api/v1/payments
GET  /api/v1/payments/:id
POST /api/v1/payments/:id/confirm
POST /api/v1/payments/:id/retry
POST /api/v1/payments/:id/refund
```

Use the exact route set required by the chosen payment adapter.

Do not expose a public endpoint that allows arbitrary users to set a payment to `succeeded`.

Production webhook endpoints must authenticate and verify provider events.

## 15.10 Subscriptions

```text
GET    /api/v1/subscription-plans
GET    /api/v1/subscription-plans/:id
POST   /api/v1/subscriptions
GET    /api/v1/subscriptions
GET    /api/v1/subscriptions/:id
POST   /api/v1/subscriptions/:id/pause
POST   /api/v1/subscriptions/:id/resume
POST   /api/v1/subscriptions/:id/cancel
GET    /api/v1/subscriptions/:id/schedule
```

Cook endpoints should support managing their own plans and eligible subscription operations.

## 15.11 Reviews and Favorites

```text
GET    /api/v1/cooks/:slug/reviews
POST   /api/v1/reviews
PATCH  /api/v1/reviews/:id
GET    /api/v1/favorites
POST   /api/v1/favorites/:cookId
DELETE /api/v1/favorites/:cookId
```

## 15.12 Notifications

```text
GET   /api/v1/notifications
PATCH /api/v1/notifications/:id/read
POST  /api/v1/notifications/read-all
```

## 15.13 Administrator

```text
GET   /api/v1/admin/dashboard
GET   /api/v1/admin/users
GET   /api/v1/admin/cooks
GET   /api/v1/admin/orders
GET   /api/v1/admin/payments
GET   /api/v1/admin/reviews
GET   /api/v1/admin/reports
GET   /api/v1/admin/audit-logs
PATCH /api/v1/admin/users/:id/status
PATCH /api/v1/admin/cooks/:id/status
```

Administrator routes require explicit server-side authorization.

## 15.14 Health

```text
GET /health/live
GET /health/ready
```

Liveness confirms that the process is running.

Readiness checks whether required dependencies, including MongoDB, are available.

Do not expose sensitive infrastructure information through public health endpoints.

---

# 16. Authentication and Security

## 16.1 Authentication Strategy

Use secure, server-managed authentication.

A suitable approach is:
- Short-lived access sessions or tokens.
- Rotating refresh sessions when using refresh tokens.
- Secure, HTTP-only cookies for browser authentication.
- CSRF protection where required by the chosen cookie strategy.
- Strict session invalidation on logout and sensitive account changes.

Document the chosen strategy in `docs/AUTHENTICATION.md`.

Avoid storing long-lived authentication tokens in browser local storage.

## 16.2 Password Security

- Use Argon2id or an appropriately configured password hashing algorithm.
- Never store plaintext passwords.
- Enforce sensible password requirements.
- Rate-limit login attempts.
- Avoid revealing whether an email address exists during password recovery.
- Expire password-reset tokens.
- Invalidate reset tokens after use.

## 16.3 Authorization

Use role-based access control and resource ownership checks.

Examples:
- Customers can access their own orders.
- Cooks can access orders belonging to their cook profile.
- Administrators can access permitted administrative resources.
- Only approved cooks can publish meals.
- Only authorized users can perform refunds.
- Suspended accounts cannot perform restricted operations.

Authorization must be applied at the service or route boundary on the backend.

## 16.4 Input Validation

Validate:
- Request bodies.
- Query parameters.
- URL parameters.
- File uploads.
- Numeric limits.
- MongoDB identifiers.
- Enum values.
- Sort fields.
- Pagination values.

Reject unexpected fields where practical.

Never pass arbitrary client objects directly into MongoDB query filters or update operators.

## 16.5 Security Controls

Implement:
- Helmet or equivalent HTTP security headers.
- Strict CORS configuration.
- Rate limiting.
- Request size limits.
- Secure cookie settings.
- Request correlation IDs.
- Centralized error handling.
- Dependency vulnerability checks.
- Secret management.
- Audit logging.
- Secure file upload validation.
- Protection against NoSQL injection.
- Protection against cross-site scripting.
- CSRF protection where applicable.
- Protection against unauthorized object access.
- Appropriate security monitoring.

## 16.6 Privacy

Collect only the personal data required for the product.

Do not expose:
- Password hashes.
- Private addresses to unauthorized users.
- Sensitive onboarding documents.
- Internal administrative notes.
- Payment provider secrets.
- Authentication tokens.

Provide appropriate privacy and data-retention documentation.

---

# 17. Food Safety and Marketplace Trust

TiffinMitra operates in a category where trust and food safety matter.

The platform must distinguish between:
- Information submitted by a cook.
- Information checked by an administrator.
- Information independently verified through an appropriate process.

Never display a verified badge solely because a cook uploaded a document.

## 17.1 Cook Verification

Design a review process for:
- Identity information, where required.
- Business information.
- Applicable food business registrations.
- Contact information.
- Service details.
- Listing accuracy.

The required checks should be determined by the actual operating model and applicable local regulations.

## 17.2 Food Information

Support:
- Ingredient descriptions.
- Dietary labels.
- Allergen disclosures.
- Portion information.
- Preparation estimates.
- Storage or handling instructions where appropriate.

Do not invent nutritional claims.

## 17.3 Reviews and Reports

Provide mechanisms for:
- Reporting inaccurate listings.
- Reporting inappropriate reviews.
- Reporting order problems.
- Flagging potential food safety issues.

Administrators must be able to investigate and record resolutions.

---

# 18. Image and File Management

Do not store large image binaries directly in ordinary MongoDB documents.

Use an image storage abstraction.

During local development:
- Use local storage or a development-compatible storage service.

For deployment:
- Use object storage or a managed image service.

Store references and metadata in MongoDB.

Validate:
- MIME type.
- File size.
- Allowed image formats.
- Image dimensions where appropriate.

Do not trust the file extension alone.

Use randomized object names and restrict upload permissions.

Do not expose private onboarding documents through public image URLs.

---

# 19. Notifications

The prototype should support in-app notifications.

Possible events:
- Cook application submitted.
- Cook application approved.
- Cook application rejected.
- Order placed.
- Order accepted.
- Order rejected.
- Meal preparation started.
- Order ready.
- Order completed.
- Payment failed.
- Refund status changed.
- Subscription activated.
- Subscription paused.
- Subscription cancelled.

Notification delivery should be triggered by successful business events rather than directly by arbitrary frontend actions.

Email and SMS can be added through adapters later.

Do not make successful order creation depend on an optional email service being available.

---

# 20. Error Handling and Reliability

Implement a centralized error-handling system.

Use predictable error codes for common failures:
- `VALIDATION_ERROR`
- `UNAUTHENTICATED`
- `FORBIDDEN`
- `NOT_FOUND`
- `CONFLICT`
- `RATE_LIMITED`
- `PAYMENT_FAILED`
- `ORDER_UNAVAILABLE`
- `INTERNAL_ERROR`

Return appropriate HTTP status codes.

The application must handle:
- Network failures.
- Database disconnections.
- Expired sessions.
- Invalid forms.
- Duplicate requests.
- Stale cart contents.
- Unavailable meals.
- Cook unavailability.
- Payment failures.
- Cancelled orders.
- Failed uploads.
- Missing resources.

Provide useful user-facing error messages.

Never silently swallow exceptions or display raw stack traces to customers.

---

# 21. Design System and Frontend Standards

Create reusable components and consistent visual rules.

## 21.1 Design Tokens

Define tokens for:
- Colors.
- Typography.
- Spacing.
- Border radius.
- Shadows.
- Breakpoints.
- Z-index.
- Animation durations.

## 21.2 Component States

Every interactive component must handle:
- Default state.
- Hover state.
- Focus state.
- Disabled state.
- Loading state.
- Error state.
- Success state, where appropriate.

## 21.3 Page States

Every data-driven page must support:
- Loading.
- Loaded.
- Empty.
- Error.
- Unauthorized.
- Unavailable.

For example, a cook dashboard with no orders should display a useful empty state rather than an empty table.

## 21.4 Accessibility

Aim for WCAG 2.2 AA.

Implement:
- Semantic HTML.
- Keyboard navigation.
- Visible focus indicators.
- Accessible form labels.
- Appropriate ARIA attributes.
- Sufficient contrast.
- Screen-reader-friendly errors.
- Accessible dialogs.
- Reduced-motion support.
- Alternative text for meaningful images.

## 21.5 Responsive Layout

Test at:
- Small mobile screens.
- Standard mobile screens.
- Tablets.
- Laptops.
- Large desktop displays.

Avoid horizontal overflow.

Do not simply shrink desktop dashboards to fit mobile. Adapt tables, navigation, and layouts to the available space.

---

# 22. Documentation Requirements

Documentation is part of the implementation, not an optional final step.

## 22.1 AGENTS.md

This file contains the rules that an AI coding agent must follow.

It should instruct the agent to:
- Read `IDEA.md` before implementation.
- Read relevant documents in `docs/`.
- Respect architectural decisions.
- Use MongoDB exclusively for persistent application data.
- Use TypeScript.
- Avoid unnecessary dependencies.
- Validate input on the backend.
- Enforce authorization on the backend.
- Never store secrets in source control.
- Never introduce fake business logic merely to make a screen look functional.
- Never create decorative buttons without meaningful behavior.
- Write tests for business logic.
- Run linting, type checking, and tests.
- Update documentation when behavior changes.
- Update `docs/ROADMAP.md` after completing milestones.
- Review the Git diff before marking a milestone complete.
- Avoid unrelated refactoring.
- Stop at milestone boundaries when requested.

## 22.2 README.md

Include:
- Project overview.
- Features.
- Technology stack.
- Prerequisites.
- Installation instructions.
- Environment configuration.
- Database setup.
- Development commands.
- Testing commands.
- Demo account setup.
- Deployment overview.
- Links to documentation.

## 22.3 PRODUCT.md

Document:
- Product vision.
- Target audience.
- User roles.
- Core workflows.
- Product principles.
- Business assumptions.
- MVP scope.
- Explicit exclusions.

## 22.4 REQUIREMENTS.md

List functional and non-functional requirements.

Each requirement should have:
- Unique identifier.
- Description.
- Priority.
- Acceptance criteria.
- Test reference when implemented.

Example:

`FR-CHECKOUT-001`: The backend must calculate the final order amount from authoritative meal prices.

Acceptance criteria:
- Client-supplied totals are ignored.
- Current prices are loaded from MongoDB.
- Invalid quantities are rejected.
- The calculated total is persisted with the order.
- Automated tests cover price manipulation attempts.

## 22.5 ARCHITECTURE.md

Document:
- System architecture.
- Frontend/backend boundaries.
- Module responsibilities.
- Data flow.
- Authentication strategy.
- Payment abstraction.
- Error handling.
- Background jobs.
- External integrations.
- Deployment topology.

## 22.6 DATABASE.md

Document:
- Every collection.
- Schema fields.
- Validation rules.
- Relationships.
- Indexes.
- Data retention.
- Seed data.
- Transaction requirements.
- Concurrency considerations.
- Migration and schema evolution strategy.

MongoDB does not use relational migrations in the same way as SQL databases, but schema changes must still be planned, versioned, tested, and deployed safely.

## 22.7 API.md

Document:
- API conventions.
- Endpoint paths.
- Request schemas.
- Response schemas.
- Authentication requirements.
- Authorization requirements.
- Pagination.
- Filtering.
- Error codes.
- Idempotency requirements.

Maintain an OpenAPI specification as the API evolves.

## 22.8 AUTHENTICATION.md

Document:
- Login flow.
- Registration.
- Password hashing.
- Session management.
- Refresh behavior.
- Logout.
- Email verification.
- Password recovery.
- Account suspension.
- Session invalidation.

## 22.9 AUTHORIZATION.md

Document role permissions and resource ownership rules.

Include a permission matrix for customer, cook, and administrator actions.

## 22.10 SECURITY.md

Document:
- Threat model.
- Security controls.
- Secret handling.
- Authentication.
- Authorization.
- Input validation.
- File upload rules.
- Dependency scanning.
- Incident reporting.
- Production security review.

## 22.11 PRIVACY.md

Document:
- Personal data collected.
- Purpose of collection.
- Data visibility.
- Retention.
- Deletion requests.
- Access controls.
- Third-party processors.
- Customer privacy rights.

This is a technical planning document, not a substitute for legally reviewed privacy terms.

## 22.12 PAYMENTS.md

Document:
- Payment provider interface.
- Development adapter.
- Payment lifecycle.
- Order/payment consistency.
- Idempotency.
- Refund behavior.
- Webhook requirements.
- Failure scenarios.
- Requirements for switching to a real provider.

## 22.13 ORDER_LIFECYCLE.md

Document:
- Valid order states.
- Allowed transitions.
- Who can initiate each transition.
- Cancellation rules.
- Rejection behavior.
- Payment interactions.
- Inventory handling.
- Delivery and pickup differences.

## 22.14 SUBSCRIPTIONS.md

Document:
- Plan creation.
- Purchase.
- Scheduling.
- Meal occurrences.
- Pause/resume behavior.
- Cancellation.
- Failed payments.
- Capacity constraints.
- Duplicate job prevention.

## 22.15 UI_UX.md

Document:
- Navigation.
- Page layouts.
- Customer workflows.
- Cook workflows.
- Administrator workflows.
- Responsive behavior.
- Loading states.
- Empty states.
- Error states.

## 22.16 DESIGN_SYSTEM.md

Document:
- Color palette.
- Typography.
- Spacing.
- Components.
- Icons.
- Animation.
- Image treatment.
- Accessibility rules.

## 22.17 TESTING.md

Document:
- Test strategy.
- Unit testing.
- Integration testing.
- End-to-end testing.
- Test database setup.
- Seed fixtures.
- CI requirements.
- Required test scenarios.

## 22.18 DEPLOYMENT.md

Document:
- Build process.
- Hosting requirements.
- Environment configuration.
- Database connectivity.
- TLS.
- Domain configuration.
- Health checks.
- Rollback procedure.
- Production smoke tests.

## 22.19 ENVIRONMENT_VARIABLES.md

Document every environment variable, its purpose, whether it is required, and which environments use it.

Never include real secrets.

## 22.20 BACKUPS.md

Document:
- Database backup strategy.
- Backup encryption.
- Retention.
- Restore procedures.
- Restore testing.
- Recovery objectives.

## 22.21 MONITORING.md

Document:
- Application logs.
- Error tracking.
- Availability monitoring.
- Database health.
- Payment failures.
- Order-processing failures.
- Alerting.
- Incident response.

## 22.22 ROADMAP.md

Track milestones, tasks, acceptance criteria, and completion status.

Only mark tasks complete after their implementation and required validation are finished.

---

# 23. Environment Configuration

Provide an `.env.example` containing placeholders such as:

```dotenv
NODE_ENV=development

WEB_PORT=3000
API_PORT=4000

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

MONGODB_URI=mongodb://localhost:27017/tiffinmitra

SESSION_SECRET=
PASSWORD_RESET_SECRET=

PAYMENT_PROVIDER=mock
PAYMENT_WEBHOOK_SECRET=

STORAGE_PROVIDER=local
UPLOAD_DIRECTORY=./uploads

LOG_LEVEL=debug
```

This is an illustrative baseline. The final variables must match the selected implementations.

Additional secrets may be required depending on the chosen authentication and email systems.

Rules:
- Never commit `.env`.
- Validate configuration at application startup.
- Fail clearly when required variables are missing.
- Do not expose private environment variables through frontend bundles.
- Only variables intentionally prefixed for public frontend use may be exposed to the browser.
- Reject the mock payment provider when starting a production environment.
- Do not use development credentials in production.

---

# 24. Testing Strategy

Testing must be introduced alongside implementation.

## 24.1 Unit Tests

Test:
- Price calculations.
- Cart validation.
- Order state transitions.
- Subscription scheduling.
- Cancellation eligibility.
- Role permissions.
- Input schemas.
- Payment state transitions.
- Idempotency behavior.

## 24.2 Integration Tests

Test API routes against an isolated MongoDB test database.

Cover:
- Registration.
- Login.
- Cook application submission.
- Cook approval.
- Meal creation.
- Search.
- Cart operations.
- Checkout.
- Payment success.
- Payment failure.
- Order tracking.
- Subscription creation.
- Review eligibility.
- Administrator authorization.

## 24.3 End-to-End Tests

Use Playwright to test real browser workflows.

### Customer Workflow

1. Register.
2. Log in.
3. Browse meals.
4. Open a cook storefront.
5. Add a meal to the cart.
6. Complete checkout using the development payment adapter.
7. View the order.
8. Verify the order status.
9. Complete an eligible review.

### Cook Workflow

1. Register.
2. Submit a cook application.
3. Obtain approval through an authorized administrator workflow.
4. Create a meal.
5. Configure availability.
6. Receive an order.
7. Accept the order.
8. Update the preparation status.
9. Complete the order.

### Administrator Workflow

1. Log in with an authorized administrator account.
2. Review pending cook applications.
3. Approve or reject an application.
4. Inspect marketplace orders.
5. Inspect payment records.
6. Review audit logs.

## 24.4 Security Tests

Include tests for:
- Unauthorized dashboard access.
- Cross-customer order access.
- Cross-cook order access.
- Privilege escalation.
- Forged payment confirmation.
- Duplicate checkout requests.
- Duplicate payment callbacks.
- Price manipulation.
- Invalid MongoDB filters.
- Invalid status transitions.
- Excessive pagination limits.
- Malicious file uploads.
- Rate-limited authentication.

## 24.5 Quality Gates

Before a milestone is complete:
- TypeScript checks must pass.
- Linting must pass.
- Formatting must pass.
- Relevant unit tests must pass.
- Relevant integration tests must pass.
- Relevant end-to-end tests must pass.
- Documentation must be updated.
- The Git diff must be reviewed.

Do not claim the entire application is tested when only individual modules have been tested.

---

# 25. Seed Data and Demo Environment

Provide a deterministic seed script.

Seed data should include:
- Several approved home cooks.
- Multiple cuisines.
- Vegetarian and non-vegetarian meal listings where appropriate.
- Different meal categories.
- Various price points.
- Example delivery and pickup configurations.
- Subscription plans.
- Customer accounts.
- A small number of clearly designated demonstration orders.

Use fictional people and fictional contact information.

Use local assets or properly licensed imagery.

Do not invent verified credentials or represent demonstration data as real customer activity.

## 25.1 Development Accounts

Provide a documented process for creating:
- A customer account.
- A cook account.
- An administrator account.

For development convenience, the seed script may create predefined accounts using environment-configured credentials.

Rules:
- Never hardcode production administrator credentials.
- Never enable a default administrator password in production.
- Never allow public registration to create an administrator.
- Ensure seed scripts refuse to operate on production databases unless an explicit, separately reviewed administrative procedure permits the operation.

---

# 26. Deployment Architecture

The intended deployment topology is:

```text
                    Customers
                        |
                      HTTPS
                        |
                Next.js Web App
                        |
                    Versioned API
                        |
                  Express Backend
                        |
                  Application Logic
                        |
                     MongoDB
                        |
              Managed Database Service
```

Optional supporting services:
- Object storage.
- Email provider.
- Error monitoring.
- Background job scheduler.
- Real payment provider.
- CDN.

## 26.1 Deployment Requirements

The application should support:
- Separate development, test, staging, and production environments.
- Environment-specific configuration.
- HTTPS.
- Secure database connectivity.
- Restricted database network access.
- Health checks.
- Structured logging.
- Graceful shutdown.
- Database connection management.
- Automated testing in CI.
- Dependency security checks.
- Backup procedures.
- Rollback procedures.

## 26.2 Production Payment Guard

The application must refuse to start in production if the payment provider is configured as `mock`.

Do not rely only on hiding the mock payment option in the UI.

Enforce the restriction during backend startup.

Add a test proving that the production configuration rejects the development payment adapter.

## 26.3 Production Database Guard

Development seed scripts and destructive utilities must validate the target database before running.

Do not allow a local development cleanup command to delete production data accidentally.

---

# 27. Non-Functional Requirements

## 27.1 Performance

Aim for:
- Fast initial page rendering.
- Efficient API requests.
- Indexed database queries.
- Paginated results.
- Optimized images.
- Lazy loading where appropriate.
- Minimal unnecessary client-side JavaScript.

Set measurable performance targets before launch.

Do not promise a particular response time without testing under representative workloads.

## 27.2 Reliability

Implement:
- Graceful error handling.
- Retry-safe operations.
- Idempotent checkout and payment operations.
- Background task deduplication.
- Database connection recovery.
- Monitoring.
- Backups.
- Tested recovery procedures.

## 27.3 Scalability

Use modular services and stateless application instances where practical.

Avoid premature microservices.

Introduce queues, caches, or separate search infrastructure only when measured requirements justify them.

## 27.4 Maintainability

Use:
- TypeScript.
- Clear module boundaries.
- Shared validation schemas.
- Consistent naming.
- Small, focused functions.
- Centralized error handling.
- Automated tests.
- Architecture decision records.
- Up-to-date documentation.

## 27.5 Accessibility

Aim for WCAG 2.2 AA.

Accessibility must be tested rather than assumed from using a component library.

## 27.6 SEO

Public cook and meal pages should support:
- Search-friendly URLs.
- Page titles.
- Meta descriptions.
- Open Graph metadata.
- Sitemap generation.
- Robots directives.
- Appropriate structured data when eligible.

Do not index private dashboards, account pages, or sensitive application information.

---

# 28. Explicitly Out of Scope for the Initial Prototype

Avoid implementing these unless the core product is stable.

- Real-money payment processing.
- Automatic recurring payment collection.
- Live driver GPS tracking.
- An in-house delivery fleet management system.
- Complex route optimization.
- Multiple cooks in a single cart.
- Multi-vendor checkout.
- Advanced loyalty programs.
- Wallet balances.
- Cryptocurrency payments.
- AI-powered food recommendations.
- Native Android and iOS applications.
- Complex promotional campaign management.
- Microservices.
- Advanced business intelligence.
- Fully automated food compliance verification.

These features may be considered later based on user feedback and business requirements.

---

# 29. Implementation Milestones

Development must proceed incrementally.

Use a fresh AI coding session for each major milestone when practical.

At the start of every session, read `AGENTS.md`, `IDEA.md`, `docs/ROADMAP.md`, and the documentation relevant to the current task.

Review the implementation plan before allowing the coding agent to make broad changes.

## Milestone M0: Repository Foundation

Tasks:
- Initialize the monorepo.
- Configure the package manager and workspaces.
- Set up TypeScript.
- Configure ESLint and Prettier.
- Create the initial directory structure.
- Add environment templates.
- Add `AGENTS.md`.
- Create the documentation skeleton.
- Add Docker development configuration.
- Establish basic CI checks.

Acceptance criteria:
- Dependencies install reproducibly.
- The frontend starts.
- The backend starts.
- Type checking works.
- Linting works.
- Documentation describes the actual setup.

## Milestone M1: Backend Foundation and MongoDB

Tasks:
- Connect to MongoDB.
- Configure Mongoose.
- Implement environment validation.
- Add centralized error handling.
- Add request logging.
- Add request validation.
- Create initial models.
- Add indexes.
- Implement health endpoints.
- Create a safe seed script.

Acceptance criteria:
- Database connectivity is verified.
- Invalid configuration fails clearly.
- Database models are validated.
- Seed data is reproducible.
- Tests use an isolated database.
- No business data depends on browser local storage.

## Milestone M2: Authentication and Authorization

Tasks:
- Registration.
- Login.
- Logout.
- Session management.
- Password recovery.
- User profile.
- Role-based permissions.
- Protected routes.
- Account suspension.

Acceptance criteria:
- Passwords are securely hashed.
- Authentication state is handled securely.
- Unauthorized API access is rejected.
- Cross-user data access is blocked.
- Authentication tests pass.

## Milestone M3: Design System and Public Website

Tasks:
- Define design tokens.
- Build the responsive navigation.
- Create the homepage.
- Create marketing pages.
- Implement reusable UI components.
- Add responsive layouts.
- Add accessibility and reduced-motion support.

Acceptance criteria:
- All implemented links work.
- Layouts are responsive.
- Loading and error states are present.
- No primary CTA is decorative.
- The interface is visually consistent.

## Milestone M4: Cook Applications and Storefronts

Tasks:
- Build cook onboarding.
- Implement application submission.
- Implement administrator review.
- Build storefront management.
- Implement cook availability.
- Create public storefront pages.

Acceptance criteria:
- Applications persist in MongoDB.
- Pending cooks cannot publish meals.
- Only authorized administrators can approve applications.
- Public discovery shows only eligible cooks.

## Milestone M5: Menu Management and Discovery

Tasks:
- Create meal categories.
- Implement meal CRUD.
- Implement image management.
- Build search.
- Add filters.
- Add sorting.
- Implement pagination.
- Add meal details.

Acceptance criteria:
- Meals persist in MongoDB.
- Prices are validated.
- Unavailable meals cannot be ordered.
- Search and filters use backend queries.
- Database indexes support common queries.

## Milestone M6: Cart and Checkout

Tasks:
- Implement persistent carts.
- Enforce the single-cook cart rule.
- Implement server-side price calculation.
- Add checkout validation.
- Implement order creation.
- Snapshot meal and delivery information.
- Add idempotency.

Acceptance criteria:
- Cart operations are authorized.
- Client-supplied totals are ignored.
- Invalid orders are rejected.
- Duplicate checkout requests do not create duplicate orders.
- Order data is historically accurate.

## Milestone M7: Payment Workflow

Tasks:
- Define the payment provider interface.
- Implement the simulated development adapter.
- Create payment records.
- Implement success and failure flows.
- Implement payment confirmation.
- Add refund-state handling.
- Add retry behavior.
- Add payment audit events.

Acceptance criteria:
- The development adapter follows the same interface expected of a real provider.
- Success and failure cases are tested.
- Duplicate callbacks do not create duplicate effects.
- Payment status cannot be forged by customers.
- Production startup rejects the mock adapter.

## Milestone M8: Order Management

Tasks:
- Build the cook order dashboard.
- Implement order acceptance and rejection.
- Implement preparation status changes.
- Implement pickup and delivery flows.
- Build customer order history.
- Implement cancellation rules.
- Add in-app notifications.

Acceptance criteria:
- Order transitions are validated.
- Customers cannot update protected order states.
- Cooks can only manage their own orders.
- Cancelled and rejected orders follow the documented payment rules.

## Milestone M9: Subscriptions

Tasks:
- Create subscription plans.
- Implement subscription purchase.
- Generate scheduled meal occurrences.
- Add pause and resume.
- Add cancellation.
- Add cook subscription management.
- Add customer subscription views.

Acceptance criteria:
- Subscription data persists in MongoDB.
- Duplicate scheduled occurrences are prevented.
- Existing plans retain historical snapshots.
- Scheduling jobs are safe to retry.
- No real recurring payments are claimed.

## Milestone M10: Reviews, Favorites, and Support

Tasks:
- Implement favorites.
- Implement verified-order review eligibility.
- Implement review moderation.
- Add support tickets.
- Add reporting workflows.

Acceptance criteria:
- Users cannot review ineligible orders.
- Duplicate reviews are prevented.
- Users cannot access another customer's support information.
- Administrative actions are auditable.

## Milestone M11: Administrator Dashboard

Tasks:
- Marketplace overview.
- User management.
- Cook management.
- Application management.
- Order inspection.
- Payment inspection.
- Review moderation.
- Support and dispute management.
- Audit log viewer.

Acceptance criteria:
- Administrative APIs enforce permissions.
- Sensitive operations are audited.
- Dashboard metrics are derived from actual stored data.
- Empty and error states are handled.

## Milestone M12: Hardening and Release Preparation

Tasks:
- Complete unit tests.
- Complete integration tests.
- Complete end-to-end tests.
- Test responsive layouts.
- Perform accessibility checks.
- Review authentication and authorization.
- Check database indexes.
- Configure production logging.
- Configure monitoring.
- Document backup and recovery.
- Test staging deployment.
- Perform security review.
- Review all environment variables.
- Verify payment provider configuration.

Acceptance criteria:
- CI passes.
- Required workflows pass end-to-end tests.
- No known critical or high-severity security issue remains unresolved.
- Backup restoration has been tested.
- Staging deployment is reproducible.
- Production readiness gaps are documented.
- Commercial launch is blocked until genuine payment and operational requirements are satisfied.

---

# 30. Definition of Done

A feature is not complete merely because its page looks correct.

A feature is complete when:

1. The interface is implemented.
2. The backend behavior exists where required.
3. Data persists correctly in MongoDB.
4. Input is validated.
5. Authorization is enforced.
6. Loading, success, empty, and error states are implemented.
7. Relevant tests pass.
8. Documentation is updated.
9. No important action is represented by a nonfunctional button.
10. No hidden hardcoded dependency on demonstration data remains.
11. The feature works at supported screen sizes.
12. The Git diff has been reviewed.

For payment, checkout, and order workflows, the definition of done additionally includes idempotency, state consistency, and protection against unauthorized state changes.

---

# 31. Final Product Acceptance Criteria

The prototype is acceptable when a complete demonstration can be performed without manually editing MongoDB documents or bypassing application logic.

The demonstration should support the following:

### Customer

- Register and log in.
- Discover cooks and meals.
- Search and filter listings.
- Open a cook storefront.
- Add a meal to the cart.
- Complete checkout using the development payment adapter.
- View an order confirmation.
- Track the order.
- Review an eligible completed order.
- Manage a subscription.
- Manage saved addresses and favorites.

### Home Cook

- Apply to become a cook.
- Receive approval through the administrator workflow.
- Configure a storefront.
- Create and publish meals.
- Manage availability.
- Receive an order.
- Accept or reject an order.
- Update preparation status.
- View basic analytics.
- Manage subscription commitments.

### Administrator

- Log in securely.
- Review cook applications.
- Approve or reject applications.
- Manage users and listings.
- Inspect orders.
- Inspect payment records.
- Review reports.
- View audit logs.

### Engineering

- MongoDB is the only application database.
- Backend authorization protects every sensitive operation.
- The application has reproducible setup instructions.
- Environment variables are documented.
- Tests cover critical business workflows.
- CI validates code quality.
- The payment implementation is replaceable.
- The production environment cannot silently use the simulated payment provider.
- Deployment, monitoring, backups, and security procedures are documented.

---

# 32. Long-Term Roadmap

After the MVP is validated, consider:

### Phase A: Improve the Marketplace
- Better discovery.
- Personalized recommendations.
- More advanced search.
- Meal availability forecasting.
- Improved cook analytics.
- Customer retention features.

### Phase B: Improve Operations
- Real payment processing.
- Payment reconciliation.
- Cook payouts.
- Real notifications.
- Delivery coordination.
- Refund workflows.
- Verified onboarding.

### Phase C: Expand the Product
- Multiple service areas.
- Additional Indian cities.
- Regional language support.
- More flexible meal subscriptions.
- Business and office meal plans.
- Group ordering.
- Referral programs.
- Native applications if justified.

### Phase D: Scale Responsibly
- Load testing.
- Improved background processing.
- Dedicated search infrastructure if needed.
- Advanced monitoring.
- Operational reporting.
- Stronger disaster recovery.
- Carefully measured architectural changes.

---

# 33. Final Development Instruction

Build TiffinMitra as a complete, polished, responsive, and modular full-stack application.

Prioritize a reliable end-to-end customer journey over a large collection of disconnected screens.

Use MongoDB as the exclusive application database.

Implement real backend logic for authentication, permissions, cook onboarding, meal discovery, cart management, checkout, payments, order tracking, subscriptions, reviews, and administration.

Use simulated payment processing only through an isolated development payment adapter. Keep the checkout experience polished, but do not claim that simulated transactions transfer real money.

Use TypeScript consistently across the application.

Do not generate the entire application in one uncontrolled coding session.

Begin with the repository foundation, review the plan, implement one milestone at a time, run tests, inspect the changes, and update the documentation before proceeding.

Do not leave essential workflows as TODOs, hardcoded frontend demonstrations, or buttons without functionality.

Do not mark an integration complete until it has been implemented and tested.

Do not claim production readiness solely because the prototype runs locally.

The final deliverable must be a functional application with a reproducible development environment, documented architecture, reliable MongoDB persistence, automated tests, secure business workflows, and a clearly defined path from prototype to commercial launch.

**The ultimate goal is simple: make finding and ordering homemade food as convenient as ordering from any modern food marketplace, while making it easier for home cooks to build a business from their kitchens.**

**TiffinMitra — Homemade Food. Heartfelt Care.**