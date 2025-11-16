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
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── dashboard/    # Dashboard-specific components
│   │       ├── HeroCard.tsx
│   │       ├── AskKikiCard.tsx
│   │       ├── MissionsCard.tsx
│   │       ├── MoneySnapshotCard.tsx
│   │       ├── QuickActionsCard.tsx
│   │       ├── UpcomingCard.tsx
│   │       ├── AlertsCard.tsx
│   │       └── DealsAndModulesSection.tsx
│   ├── layouts/          # Layout components
│   │   └── MainLayout.tsx
│   ├── pages/            # Page components (routes)
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── OrganizationsPage.tsx
│   ├── stores/           # Zustand state stores
│   │   ├── authStore.ts
│   │   └── organizationStore.ts
│   ├── mocks/            # Mock data for development
│   │   └── consumerDashboardMock.ts
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
- `/organizations` - Organizations management page (protected)
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

## State Management

### Auth Store (`authStore.ts`)

Manages user authentication state:
- `user` - Current user object
- `isAuthenticated` - Authentication status
- `login()` - Login function
- `logout()` - Logout function

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
- **Consumer Dashboard**: All dashboard data is sourced from `/src/mocks/consumerDashboardMock.ts` including:
  - Hero greeting and user information
  - Kiki AI assistant suggestions
  - Active missions with progress tracking
  - Financial snapshot (balance, rewards, spending)
  - Quick action shortcuts
  - Upcoming events and tasks
  - System alerts and notifications
  - Special deals and feature modules

**Note**: The dashboard uses 100% mock data and does not make any API calls.

### Future Enhancements

- Connect to real backend APIs
- Implement actual authentication
- Add form validation
- Expand organization management features
- Add user profile management
- Implement role-based access control

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
