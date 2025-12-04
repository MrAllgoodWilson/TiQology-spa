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

### Environment Variables

Create a `.env` file in the root directory and configure the following:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

For production (Vercel), set this environment variable in your Vercel dashboard to point to your Rails API.

### Installation

1. Navigate to the project directory:
   ```bash
   cd tiqology-spa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API base URL (see Environment Variables above)

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
│   │   ├── trustShieldMock.ts
│   │   └── warRoomMock.ts
│   ├── pages/            # Page components (routes)
│   │   ├── AlertsPage.tsx
│   │   ├── BookItPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── OrganizationsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── TrustShieldPage.tsx
│   │   └── WarRoomPage.tsx
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
- `/war-room` - War Room deployment tracker dashboard (protected)
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

### War Room - Phase 3 Deployment Tracker

The War Room (`/war-room`) provides a real-time deployment tracker dashboard for monitoring the status of all TiQology SuperApp modules and features. This is a frontend-only implementation for demonstration purposes.

**Features:**
- View deployment status of all main packs and modules (Consumer Dashboard, BookIt, Money Engine 2.0, Voice Engine, TQTV, Creator Studio, Quad-Core, etc.)
- Dashboard statistics showing total modules, live deployments, in-progress work, planned features, and modules needing backend
- Status badges for each module (Live, In Progress, Planned, Needs Backend)
- Category classification (Core, Marketplace, Finance, AI, Media, Content, Infrastructure, Security, Enterprise, Gamification, Social)
- Direct navigation to live modules via route links
- Responsive grid layout (1 column on mobile, 2-3 columns on desktop)

**Components:**
- `WarRoomPage.tsx` - Main War Room dashboard page component

**Mock Data:**
The module uses mock data defined in `/src/mocks/warRoomMock.ts` containing 15 sample modules with fields including:
- Module name and description
- SPA route (if exists)
- Deployment status (Live, In Progress, Planned, Needs Backend)
- Category classification
- Helper functions for filtering and status counts

**Note:**
This dashboard is currently frontend-only and uses mock status entries. It can be wired to backend APIs or GitHub signals for real-time deployment tracking in the future.

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
- `token` - JWT authentication token
- `isAuthenticated` - Authentication status
- `login()` - Login function (calls backend API)
- `logout()` - Logout function
- `hasRole(role: string)` - Check if user has a specific role
- `isSecurity()` - Selector to check if user has security role

### Organization Store (`organizationStore.ts`)

Manages organization data with backend integration:
- `organizations` - List of organizations
- `organization` - Single organization details
- `selectedOrganization` - Currently selected organization
- `isLoading` - Loading state for API calls
- `error` - Error message from failed API calls
- `fetchOrganizations()` - Fetch organizations from backend API
- `fetchOrganization(id)` - Fetch single organization details
- `selectOrganization()` - Select an organization
- `addOrganization()` - Add a new organization
- `setOrganizations()` - Update organizations list

### Snapshot Store (`snapshotStore.ts`)

Manages dashboard snapshot data with backend integration:
- `snapshot` - Dashboard snapshot data (organization, posts, events, tasks)
- `isLoading` - Loading state for API calls
- `error` - Error message from failed API calls
- `fetchSnapshot()` - Fetch dashboard snapshot from backend API
- `setSnapshot()` - Update snapshot data

## API Integration

The application integrates with a Rails backend API through a centralized API client (`src/services/apiClient.ts`):

### Centralized API Client

All API calls go through the centralized client which handles:
- Base URL configuration via `VITE_API_BASE_URL` environment variable
- Authentication headers (JWT Bearer tokens)
- Response parsing and error handling
- Consistent error messages

### API Endpoints

The following endpoints are currently integrated:

**Authentication:**
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

**Organizations:**
- `GET /api/v1/organizations` - Fetch all organizations
- `GET /api/v1/organizations/:id` - Fetch single organization

**Dashboard:**
- `GET /api/v1/dashboard/snapshot` - Fetch dashboard snapshot (organization, posts, events, tasks)

### Error Handling

All API calls include proper error handling:
- Loading states displayed during API calls
- User-friendly error messages shown on failures
- Retry buttons available for failed requests
- Console logging for debugging
- No infinite loading states

### Pages with API Integration

The following pages connect to the backend API:

1. **LoginPage** - Authenticates users via `/api/v1/auth/login`
2. **DashboardPage** - Fetches snapshot data via `/api/v1/dashboard/snapshot`
3. **OrganizationsPage** - Fetches organizations via `/api/v1/organizations`
4. **OrganizationDetailPage** - Fetches single organization via `/api/v1/organizations/:id`

### Pages Using Mock Data

The following pages still use mock data and do not make API calls:
- **War Room** - Uses `/src/mocks/warRoomMock.ts`
- **Alerts** - Uses `/src/mocks/alertsMock.ts`
- **BookIt** - Uses `/src/mocks/bookItMock.ts`
- **TrustShield** - Uses `/src/mocks/trustShieldMock.ts`
- **Profile** - Uses `/src/mocks/profileMock.ts`

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

Some pages in the application still use mock data for demonstration purposes:

- **War Room**: 15 mock modules from `/src/mocks/warRoomMock.ts` with deployment status tracking
- **Alerts Center**: 9 sample alerts from `/src/mocks/alertsMock.ts` across multiple categories
- **TrustShield**: Security data from `/src/mocks/trustShieldMock.ts` including threats and insights
- **Profile**: User profile and preferences from `/src/mocks/profileMock.ts`
- **BookIt**: 12 mock service providers from `/src/mocks/bookItMock.ts`

**Backend Integration:**

The following features are connected to the Rails backend API:
- **Login/Registration**: Real authentication with JWT tokens
- **Dashboard**: Fetches organization, posts, events, and tasks from `/api/v1/dashboard/snapshot`
- **Organizations**: Fetches organization list and details from `/api/v1/organizations`

All backend-connected pages include:
- Proper loading states
- Error handling with user-friendly messages
- Retry functionality on failures

### Future Enhancements

- Connect remaining pages to backend APIs (War Room, Alerts, BookIt, TrustShield, Profile)
- Add form validation for login and registration
- Expand organization management features (create, update, delete)
- Implement real-time notifications via WebSockets
- Add functional filtering and search to BookIt marketplace
- Implement real booking functionality for BookIt
- Enhance TrustShield with real security scanning
- Add two-factor authentication
- Implement data persistence for user preferences
- Add pagination for large datasets
- Implement caching strategies for better performance

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
