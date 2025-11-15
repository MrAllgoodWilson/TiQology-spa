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
│   │   └── ProtectedRoute.tsx
│   ├── layouts/          # Layout components
│   │   └── MainLayout.tsx
│   ├── pages/            # Page components (routes)
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── OrganizationsPage.tsx
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
- `/dashboard` - Dashboard page (protected)
- `/organizations` - Organizations management page (protected)
- `/` - Redirects to `/dashboard` if authenticated, otherwise to `/login`

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
- Dashboard displays static statistics

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
