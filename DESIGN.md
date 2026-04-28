# Design Brief — Water Can Distribution Dashboard

**Tone & Purpose**: Professional B2B logistics dashboard. Clean, efficient, trustworthy. Users are managers tracking inventory, customers, and payments in real-time. Emphasis on data clarity and actionable information.

**Color Palette**

| Token | OKLCH (L C H) | Intent |
|-------|---------------|--------|
| Primary (Teal) | `0.52 0.14 186` | Water/trust, primary CTA |
| Accent (Amber) | `0.65 0.22 56` | Payment actions, alerts |
| Destructive (Red) | `0.57 0.25 22` | Dangerous actions |
| Success (Green) | `0.62 0.19 99` | Confirmed deliveries |
| Neutral (Slate) | `0.88 0.01 260` | Borders, dividers |

**Typography**

| Layer | Font | Usage |
|-------|------|-------|
| Display | General Sans | Navigation, page titles, card headers (500–600 weight) |
| Body | DM Sans | Descriptions, form inputs, table content (400 weight) |
| Mono | Geist Mono | Prices, phone numbers, delivery IDs |

**Structural Zones**

| Zone | Treatment |
|------|-----------|
| Header/Nav | `bg-card border-b border-border` — fixed, holds logo + quick nav |
| Sidebar | `bg-sidebar` — persistent navigation for Customer, Delivery, Payment sections |
| Main content | `bg-background` — grid layout for dashboard cards and tables |
| Cards | `bg-card border border-border shadow-sm` — elevated, distinct from background |
| Tables | Alternating `bg-secondary/40` rows, `border-b border-border` |
| Footer | `bg-muted/20 border-t border-border` — optional status bar |

**Component Patterns**

- **Buttons**: Teal primary (`bg-primary text-primary-foreground`), amber secondary for payments, slate ghost for cancel/secondary actions
- **Forms**: Light grey inputs (`bg-input border border-border`), minimal labels, error text in red
- **Badges**: Customer status (Active/Inactive), delivery status (Pending/Completed), payment status (Paid/Unpaid)
- **Data display**: Tables with clean borders, monospace for numbers, explicit column alignment (right-aligned for currency/quantities)

**Elevation & Depth**

- `shadow-sm` on cards to create subtle separation from background
- No drop shadows on text; use color contrast for hierarchy
- Borders (`border-border`) instead of shadows for form inputs and secondary surfaces

**Spacing & Rhythm**

- Grid: 12-column layout on desktop, 6-column on tablet, 4-column on mobile
- Gutter: 1.5rem (24px) between cards
- Interior padding: cards use `p-4` or `p-6`, forms use `p-4`
- Line height: 1.6 for body, 1.3 for display

**Motion**

- `transition-smooth` (0.3s ease) on interactive elements: buttons, form focus, hover states
- No auto-play animations; entrance animations only on page load (fade-in, slide-up)
- Avoid bouncing or elastic effects

**Semantic Colors in Context**

- **Payment actions**: `bg-accent` (amber) buttons for "Record Payment", "View Invoices"
- **Delivery status**: `text-chart-3` for completed (green), `text-muted-foreground` for pending
- **Customer balance due**: `text-destructive` if negative, `text-foreground` if paid
- **Success feedback**: Toast/notification in `bg-chart-3` with `text-white`

**Differentiation**

Intentional color hierarchy — teal reserved for primary navigation and CTAs, amber for payment workflows, no generic greys. Strategic use of visible borders and shadows to create depth without noise. Tables favor data density over whitespace; cards favor breathing room. Monospace typography for financial data (prices, customer IDs) reinforces precision.
