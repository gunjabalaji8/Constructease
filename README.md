# Constructease – Build Your Dream Home

**Constructease** is a full-featured, modern construction and home improvement marketplace platform connecting homeowners with verified local construction workers, building material suppliers, licensed civil contractors, and professional interior designers.

---

## 🌟 Key Features

### 1. Find Skilled Workers
- Discover masons, electricians, plumbers, carpenters, painters, tile workers, welders, and general laborers.
- Filter by trade category, hourly/daily wage rates, experience, and immediate availability.
- Transparent worker rate disclosures with zero hidden broker markups.
- Direct booking modal with upfront platform coordination fee calculations.

### 2. Construction Materials Marketplace
- Product catalog spanning Cement, TMT Steel Rebar, Bricks & AAC Blocks, Sand, Blue Metal Aggregates, Tiles, Paints, and Plumbing supplies.
- **Specification Comparison Engine**: Side-by-side comparison of up to 3 materials (e.g. UltraTech PPC vs Ambuja Roof Special, Tata Tiscon 550D vs JSW Neosteel) with compressive strength, ductile elongation, and factory certifications.
- **Quotation Requisition Basket**: Add items, adjust load quantities, view depot freight fees, and request competitive wholesale depot quotes.

### 3. Licensed Civil Contractors
- Profiles of residential villa builders and renovation specialists with verified license numbers and municipal registration credentials.
- Estimated project budget ranges and past completed project portfolios.
- Contractor comparison tool and on-site inspection scheduling.

### 4. Architectural Interior Design Studio
- Curated design concepts across Living Rooms, Modular Kitchens, Master Bedrooms, Bathrooms, and False Ceilings.
- Filter by aesthetic style: Modern, Japandi Minimalist, Traditional Chettinad, Luxury, and Budget-Friendly.
- Interactive Consultation Request Form with room configuration selector and transparent fee policy (₹999 consultation fee credited back into the project upon execution).

### 5. Multi-Role Architecture & Dashboards
- **Customer Dashboard**: Track live status of bookings (`Requested`, `Awaiting Provider Response`, `Quotation Received`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`), view itemized platform charges, submit cancellations, and directly **Confirm Contractor Bookings & Interior Consultations** with dates and project notes.
- **Provider Portal**: Workers, contractors, and suppliers can view incoming inquiries, provide customized quotations, lock scheduled execution dates, confirm projects, manage inventory, and manage **Provider Membership Subscriptions**.
- **Admin Control Room & Subscription Engine**:
  - **Subscriptions Engine**: Configurable subscription tiers (`Starter Artisan`, `Pro Contractor & Architect`, `Enterprise Depot & Master Builder`) with monthly & annual pricing, lead quotas, and commission rates. Manage subscribed providers, assign plans, and monitor monthly recurring subscription revenue (MRR).
  - **Contractor & Interior Confirmations**: Interactive operational desks to confirm contractor projects with structural values and schedule dates, and confirm interior consultation appointments with assigned lead architects and slot times.
  - **Credential Audits**: Review pending provider trade licenses and approve or revoke the "Verified" badge.
  - **Platform Fee Engine**: Dynamically configure transaction coordination fees.


---

## 🎨 Brand Identity & Design System

- **Deep Navy Blue:** `#142B4A`
- **Construction Orange:** `#F28C28`
- **Light Grey Canvas:** `#F4F6F8`
- **Charcoal Text:** `#252B33`
- **Typography:** Plus Jakarta Sans with refined hierarchy and zero-pill metadata discipline.
- **Honest Compliance:** No fake reviews, no fabricated discount tickers, and genuine verification workflow distinction.

---

## 🚀 Setup & Execution

### Prerequisites
- Node.js (v18+)
- npm

### Development
```bash
npm install
npm run dev
```
The dev server starts on port `3000`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Environment Variables
Defined in `.env.example`:
- `GEMINI_API_KEY`: For optional AI-assisted quotation and design recommendations.
- `APP_URL`: App host URL.
