# TiQology SuperApp SPA

A modern, responsive single-page application built with Vite, React, TypeScript, TailwindCSS, DaisyUI, React Router, and Zustand.

## Features

- 🚀 **Vite** - Fast development and optimized production builds
- ⚛️ **React 19** - Latest React features
- 📘 **TypeScript** - Type-safe development
- 🎨 **TailwindCSS + DaisyUI** - Beautiful, responsive UI components
- 🧭 **React Router** - Client-side routing
- 🗃️ **Zustand** - Lightweight state management
- 🔐 **Protected Routes** - Authentication-based navigation
- 🛡️ **Role-Based Access Control** - Role-protected routes and features
- 🔔 **Alerts & Notifications Center** - Centralized notification management
- 🔒 **TrustShield Lite** - Security monitoring and threat management
- 👤 **User Profile Management** - Profile and preferences configuration
- 📦 **Multiple Modules** - BookIt marketplace, Dashboard, Organizations, and more

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 3.4 with DaisyUI 5.5
- **Routing**: React Router 7
- **State Management**: Zustand 5
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. Navigate to the project directory:
   ```bash
   cd tiqology-spa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application for production:

```bash
npm run build
```

The optimized production files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

This will serve the production build at `http://localhost:4173`

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Application Structure

```
tiqology-spa/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── alerts/       # Alerts module components
│   │   │   ├── AlertCard.tsx
│   │   │   ├── AlertList.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── bookit/       # BookIt module components
│   │   │   ├── BookItFilters.tsx
│   │   │   ├── BookItServiceCard.tsx
│   │   │   └── BookItServiceList.tsx
│   │   ├── profile/      # Profile module components
│   │   │   ├── PreferencesCard.tsx
│   │   │   └── SummaryCard.tsx
│   │   ├── trustshield/  # TrustShield module components
│   │   │   ├── InsightsCard.tsx
│   │   │   ├── SummaryCard.tsx
│   │   │   └── ThreatList.tsx
│   │   ├── dashboard/    # Dashboard-specific components
│   │   │   ├── HeroCard.tsx
│   │   │   ├── AskKikiCard.tsx
│   │   │   ├── MissionsCard.tsx
│   │   │   ├── MoneySnapshotCard.tsx
│   │   │   ├── QuickActionsCard.tsx
│   │   │   ├── UpcomingCard.tsx
│   │   │   ├── AlertsCard.tsx
│   │   │   └── DealsAndModulesSection.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── RoleProtectedRoute.tsx
│   ├── layouts/          # Layout components
│   │   └── MainLayout.tsx
│   ├── mocks/            # Mock data for demonstration
│   │   ├── alertsMock.ts
│   │   ├── bookItMock.ts
│   │   ├── consumerDashboardMock.ts
│   │   ├── profileMock.ts
│   │   └── trustShieldMock.ts
│   ├── pages/            # Page components (routes)
│   │   ├── AlertsPage.tsx
│   │   ├── BookItPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── OrganizationsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── TrustShieldPage.tsx
│   ├── stores/           # Zustand state stores
│   │   ├── authStore.ts
│   │   └── organizationStore.ts
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles with Tailwind
├── public/               # Static assets
├── dist/                 # Production build output
└── package.json
```

## Routes

The application includes the following routes:

- `/login` - Login page (public)
- `/dashboard` - TiQology Consumer Home Dashboard (protected)
- `/alerts` - Alerts & Notifications Center (protected)
- `/trustshield` - TrustShield Lite security module (protected, requires 'security' role)
- `/profile` - User profile and preferences (protected)
- `/organizations` - Organizations management page (protected)
- `/bookit` - BookIt services marketplace page (protected)
- `/` - Redirects to `/dashboard` if authenticated, otherwise to `/login`

## Consumer Home Dashboard

The `/dashboard` route features the TiQology Consumer Home Dashboard v1, a comprehensive financial wellness interface designed to provide users with:

### Dashboard Components

- **Hero Card** - Welcome message and personalized greeting
- **Ask Kiki** - AI-powered financial assistant with quick suggestions
- **Missions Card** - Track active missions, progress, and rewards
- **Money Snapshot** - View total balance, rewards earned, and monthly spending
- **Quick Actions** - Fast access to common tasks (Pay Bills, Transfer, Invest, etc.)
- **Upcoming Events** - Calendar of upcoming tasks, reminders, and events
- **Alerts** - Important notifications and actionable alerts
- **Deals & Modules** - Special offers and toggleable feature modules

### Dashboard Features

- **Responsive Layout**: Mobile-first design with cards stacked on mobile devices and a 2-column grid on desktop
- **Interactive Elements**: Progress bars, badges, toggles, and action buttons
- **Mock Data**: All dashboard data is powered by mock data from `/src/mocks/consumerDashboardMock.ts`
- **DaisyUI Styling**: Consistent design using DaisyUI components and TailwindCSS utilities

### Dashboard Layout

The dashboard uses a responsive grid layout:
- **Mobile**: Single column, all cards stacked vertically
- **Desktop**: 2-column layout with balanced content distribution
- **Full-width sections**: Hero card and Deals/Modules section span the full width

### Protected Routes

Protected routes require authentication. If a user tries to access a protected route without being authenticated, they will be redirected to the login page.

#### Role-Based Protection

The application supports role-based access control for specific routes:

- **RoleProtectedRoute Component**: Wraps routes that require specific user roles
- **Role Checking**: Users must have the required role to access certain pages
- **Access Restriction**: Users without the required role see a friendly restriction message
- **Demo Behavior**: In the mock login, users with "security" in their email address receive the security role

**Role-Protected Routes:**
- `/trustshield` - Requires the `security` role to access TrustShield security features

**User Roles:**
- `user` - Default role for all authenticated users
- `security` - Access to security modules and features
- `admin` - Administrative privileges (available in mock data)

To test role-based protection:
- Login with an email containing "security" (e.g., `security@example.com`) to get security role access
- Login with any other email to see the access restriction message when attempting to access `/trustshield`

## Modules

### BookIt Services Marketplace

The BookIt module (`/bookit`) provides a marketplace for browsing and booking professional services from verified providers. This is a mock-only implementation for demonstration purposes.

**Features:**
- Browse service providers across multiple categories (Web Development, Mobile Development, UI/UX Design, Data Science, etc.)
- Filter providers by category, availability, price range, and verification status
- View detailed provider profiles including ratings, reviews, skills, and hourly rates
- Responsive grid layout (1 column on mobile, 2-3 columns on desktop)

**Components:**
- `BookItPage.tsx` - Main page component wrapped in MainLayout
- `BookItFilters.tsx` - Filter UI using DaisyUI components (filters are UI-only, no real filtering logic)
- `BookItServiceCard.tsx` - Individual service provider card displaying provider information
- `BookItServiceList.tsx` - Grid layout component that renders the list of service providers

**Mock Data:**
The module uses mock data defined in `/src/mocks/bookItMock.ts` containing an array of 12 sample service providers with fields including:
- Basic info (name, category, description)
- Rating and review metrics
- Pricing (hourly rate)
- Location and availability
- Skills/expertise tags
- Verification status

### Alerts & Notifications Center

The Alerts & Notifications Center (`/alerts`) provides a centralized hub for viewing and managing all user notifications. This is a mock-only implementation for demonstration purposes.

**Features:**
- View all alerts and notifications in one place
- Filter alerts by category (system, payment, security, mission, social)
- Filter alerts by type (info, success, warning, error)
- Filter alerts by read/unread status
- View alert statistics (total, unread, recent)
- Mark individual alerts as read
- Navigate to relevant sections via action buttons
- Responsive layout with mobile-friendly design

**Components:**
- `AlertsPage.tsx` - Main page component with filtering and stats
- `FilterBar.tsx` - Filter controls for category, type, and read status
- `AlertList.tsx` - Renders the list of filtered alerts with empty state
- `AlertCard.tsx` - Individual alert card with badges, icons, and actions

**Mock Data:**
The module uses mock data defined in `/src/mocks/alertsMock.ts` containing 9 sample alerts with fields including:
- Alert metadata (id, title, message, timestamp)
- Type classification (info, success, warning, error)
- Category (system, payment, security, mission, social)
- Read status
- Optional action buttons with labels and URLs

### TrustShield Lite Security Module

The TrustShield Lite module (`/trustshield`) provides security monitoring and threat management features. This module is **role-protected** and requires the `security` role to access. This is a mock-only implementation for demonstration purposes.

**Features:**
- Security score overview with visual indicators
- Active threat monitoring and management
- Security insights and recommendations
- Threat categorization by severity (critical, high, medium, low)
- Threat status tracking (active, investigating, resolved)
- Security categories (authentication, data-protection, network, device)
- Statistics on active and resolved threats
- Responsive layout with sidebar summary and main content area

**Components:**
- `TrustShieldPage.tsx` - Main page component with security overview
- `SummaryCard.tsx` - Security score and statistics summary
- `ThreatList.tsx` - Display of active and resolved security threats
- `InsightsCard.tsx` - Security recommendations and best practices

**Mock Data:**
The module uses mock data defined in `/src/mocks/trustShieldMock.ts` containing:
- Security summary (overall score, scan time, threat counts)
- 5 sample threats with varying severity levels and statuses
- 5 security insights with recommendations across different categories

**Access Control:**
- Requires `security` role to access
- Users without the role see a friendly access restriction message
- Demo: Add "security" to your email when logging in to gain access (e.g., `security@example.com`)

### User Profile & Preferences

The Profile module (`/profile`) allows users to view and manage their profile information and account preferences. This is a mock-only implementation for demonstration purposes.

**Features:**
- View profile summary with avatar, contact info, and account details
- Display TiQ Points and user level (gamification)
- Manage notification preferences (email, push, SMS)
- Control privacy settings (profile visibility, activity sharing)
- Customize appearance (theme selection)
- Configure localization (language, currency, timezone)
- Responsive two-column layout

**Components:**
- `ProfilePage.tsx` - Main page component with profile and preferences
- `SummaryCard.tsx` - Profile information and statistics
- `PreferencesCard.tsx` - User preferences with toggles and dropdowns

**Mock Data:**
The module uses mock data defined in `/src/mocks/profileMock.ts` containing:
- Profile summary (name, email, phone, member since, account type)
- Gamification data (TiQ points, level)
- Notification preferences (email, push, SMS toggles)
- Privacy settings (visibility, activity, data sharing)
- Appearance and localization settings (theme, language, currency, timezone)

## State Management

### Auth Store (`authStore.ts`)

Manages user authentication state and role-based access control:
- `user` - Current user object with roles array
- `isAuthenticated` - Authentication status
- `login()` - Login function (assigns roles based on email)
- `logout()` - Logout function
- `hasRole(role: string)` - Check if user has a specific role
- `isSecurity()` - Selector to check if user has security role

**Role Assignment (Mock):**
- Users with "security" in their email receive: `['user', 'security', 'admin']`
- All other users receive: `['user']`

### Organization Store (`organizationStore.ts`)

Manages organization data:
- `organizations` - List of organizations
- `selectedOrganization` - Currently selected organization
- `setOrganizations()` - Update organizations list
- `selectOrganization()` - Select an organization
- `addOrganization()` - Add a new organization

## Styling

The application uses:
- **TailwindCSS** for utility-first styling
- **DaisyUI** for pre-built component themes

Available DaisyUI themes:
- light
- dark
- cupcake

## Development Notes

### Mock Data

The application currently uses mock data for demonstration purposes:
- Login accepts any email/password combination
- Organizations are pre-populated with sample data
- **Role Assignment**: Users with "security" in their email get security role access
- **Consumer Dashboard**: All dashboard data is sourced from `/src/mocks/consumerDashboardMock.ts` including:
  - Hero greeting and user information
  - Kiki AI assistant suggestions
  - Active missions with progress tracking
  - Financial snapshot (balance, rewards, spending)
  - Quick action shortcuts
  - Upcoming events and tasks
  - System alerts and notifications
  - Special deals and feature modules
- **Alerts Center**: 9 sample alerts from `/src/mocks/alertsMock.ts` across multiple categories
- **TrustShield**: Security data from `/src/mocks/trustShieldMock.ts` including threats and insights
- **Profile**: User profile and preferences from `/src/mocks/profileMock.ts`
- **BookIt**: 12 mock service providers from `/src/mocks/bookItMock.ts`

**Note**: All modules use 100% mock data and do not make any API calls.

### Future Enhancements

- Connect to real backend APIs
- Implement actual authentication with JWT tokens
- Add form validation
- Expand organization management features
- Implement real-time notifications
- Add functional filtering and search to BookIt marketplace
- Implement real booking functionality
- Enhance TrustShield with real security scanning
- Add two-factor authentication
- Implement data persistence for user preferences

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of the TiQology SuperApp ecosystem.
