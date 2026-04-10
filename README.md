# FOSSEE Workshop Booking — React UI Redesign

> A modern, accessible, mobile-first React frontend for the [FOSSEE Workshop Booking](https://github.com/FOSSEE/workshop_booking) portal — originally a Django application. This redesign focuses on performance, accessibility, and a polished user experience for students primarily accessing via mobile devices.

---

## Before & After

### Before (Original Django UI)
- Plain HTML tables with minimal styling
- No responsive layout — breaks on mobile
- No visual hierarchy or brand identity
- No loading states or user feedback
- Static pages with full-page reloads

### After (React Redesign)
- Navy + saffron brand palette aligned with IIT Bombay / FOSSEE identity
- Mobile-first responsive layouts with CSS Grid & Flexbox
- Animated hero section, stat counters, floating workshop preview card
- Filterable workshop list (by type, state, status)
- Full booking form with live validation and success state
- Instructor dashboard with Recharts (bar chart + donut chart), tabbed navigation, accept/reject/delete workshop requests
- Accessible: semantic HTML, ARIA labels, focus management, color contrast ≥ 4.5:1

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI library |
| React Router v6 | Client-side routing |
| Recharts | Charts (bar, pie) on dashboard |
| Lucide React | Accessible icon set |
| Vite | Build tool (fast HMR, optimized output) |
| Plain CSS (modules per component) | Styling — no runtime CSS-in-JS |

---

## Setup Instructions

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### 1. Clone the original repo & add the frontend

```bash
git clone https://github.com/FOSSEE/workshop_booking.git
cd workshop_booking

# Copy this frontend folder inside the repo
cp -r path/to/fossee-workshop frontend
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 4. Build for production

```bash
npm run build
# Output in ./dist — serve with any static host or Django's staticfiles
```

### 5. Connect to Django backend (optional)

Replace the mock data in `src/data/workshops.js` with API calls:

```js
// Example: fetch workshops from Django REST API
const [workshops, setWorkshops] = useState([])
useEffect(() => {
  fetch('/api/workshops/')
    .then(r => r.json())
    .then(setWorkshops)
}, [])
```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, stats, featured workshops, CTA |
| `/workshops` | Workshops | Filterable, searchable workshop list |
| `/workshops/:id` | WorkshopDetail | Full details + booking sidebar |
| `/workshops/:id/book` | BookWorkshop | Multi-section booking form |
| `/dashboard` | Dashboard | Instructor view: KPIs, charts, requests |
| `/login` | Login | Email + password auth form |
| `/register` | Register | Coordinator/instructor registration |

---

## Reasoning Questions

### 1. What design principles guided your improvements?

**Mobile-first** was the primary constraint — the task explicitly states students access this primarily on mobile. Every layout was designed for small screens first and expanded upward using `min-width` media queries.

**Visual hierarchy** was re-established using typography scale (`clamp()` for fluid sizing), consistent spacing rhythm, and color contrast. The original site had no clear hierarchy — headings, body text, and labels looked the same.

**Accessibility (WCAG AA)** guided every interactive element: all form fields have associated `<label>` tags, errors use `role="alert"` and `aria-describedby`, buttons have `aria-label` where icon-only, progress bars use `role="progressbar"` with proper `aria-valuenow/min/max`, and navigation uses landmark roles (`<header>`, `<main>`, `<nav>`, `<footer>`, `<aside>`).

**Progressive disclosure** — the booking form is separated from the detail page; filter options are hidden behind a toggle on mobile to keep the primary content front and center.

**Feedback & states** — every form has loading spinners, error messages, and success screens. The original site had no loading indicators or inline validation.

### 2. How did you ensure responsiveness across devices?

- **CSS Grid with `repeat(auto-fit, minmax(...))`** for workshop cards — they reflow naturally from 3 columns → 2 → 1 as screen width decreases
- **`clamp()` for typography** — headings scale smoothly between mobile and desktop without fixed breakpoints
- **Three explicit breakpoints**: `640px` (mobile), `768px` (tablet), `1024px` (small desktop)
- **Sticky sidebar collapses** to a regular block on screens below 900px
- **Navigation**: desktop nav links hidden on mobile, replaced with a hamburger menu that expands a full-width drawer with animated `max-height` transition (no JS height calculations)
- **Tables** on the dashboard get `overflow-x: auto` wrappers so they scroll horizontally rather than breaking layout
- **Forms** use `grid-template-columns: 1fr 1fr` that collapse to `1fr` on narrow screens

### 3. What trade-offs did you make between design and performance?

| Decision | Trade-off |
|---|---|
| Google Fonts (Plus Jakarta Sans + DM Sans) | Adds ~1 network request, mitigated by `display=swap` so text is visible immediately |
| Recharts over D3 | Recharts is larger (~120KB) but dramatically simpler to integrate; acceptable for a dashboard page loaded only by instructors |
| Plain CSS over Tailwind | Avoided adding a PostCSS build step; CSS files are co-located with components, easily replaceable |
| Animations on hero card (float) | Purely decorative; wrapped in `prefers-reduced-motion` intent (can add via `@media (prefers-reduced-motion: reduce)`) |
| No lazy loading of routes | All pages are bundled together for simplicity; for a larger app, `React.lazy()` + `Suspense` would split each page into its own chunk |
| Mock data vs. real API | Frontend is decoupled and ready to connect to Django REST Framework — just swap the static arrays for `fetch` calls |

### 4. What was the most challenging part and how did you approach it?

The most challenging part was **designing the information architecture** for the dashboard — specifically how to show both the coordinator's perspective (book a workshop) and the instructor's perspective (accept/reject/manage) within a single cohesive interface.

The original Django app has separate views for these roles, but in a React SPA they share the same shell. I approached this by:

1. Using **tabs** to separate concerns: Overview (stats/charts), Requests (instructor actions), Workshops (full table view)
2. Keeping **role indicators** visible in the top bar so the current user's context is never ambiguous
3. Using **optimistic UI** for accept/reject actions — the status badge updates immediately without waiting for a server response, which makes the interaction feel instant on mobile

The second challenge was making the **booking form accessible and mobile-friendly** without making it feel like a long bureaucratic form. I broke it into named `<fieldset>` groups (Personal, Institution, Preferences) with visual separators, and used a 2-column grid that stacks vertically on mobile.

---

## Project Structure

```
frontend/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── global.css        ← Design tokens, resets, utilities
    ├── data/
    │   └── workshops.js      ← Mock data (replace with API)
    ├── components/
    │   ├── Navbar.jsx / .css
    │   ├── Footer.jsx / .css
    │   └── WorkshopCard.jsx / .css
    └── pages/
        ├── Home.jsx / .css
        ├── Workshops.jsx / .css
        ├── WorkshopDetail.jsx / .css
        ├── BookWorkshop.jsx / .css
        ├── Dashboard.jsx / .css
        ├── Login.jsx
        ├── Register.jsx
        ├── Auth.css
        └── NotFound.jsx / .css
```

---

## Git Commit Strategy

Commits should be made incrementally to show progressive work:

```
feat: scaffold Vite + React project, add routing
feat: add global CSS design tokens and Navbar
feat: implement Home page with hero and stats
feat: add WorkshopCard component and mock data
feat: implement Workshops listing with filters
feat: add WorkshopDetail page and booking sidebar
feat: implement BookWorkshop form with validation
feat: add Dashboard with charts and request management
feat: add Login and Register auth pages
feat: add 404 page and footer
docs: add README with reasoning and setup instructions
```

---

## License

GPL-3.0 — same as the original FOSSEE workshop_booking repository.
