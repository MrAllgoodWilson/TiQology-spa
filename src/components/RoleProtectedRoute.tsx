import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredRoles?: string[];
}

export default function RoleProtectedRoute({ children, requiredRole, requiredRoles }: RoleProtectedRouteProps) {
  const { isAuthenticated, hasRole } = useAuthStore();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Determine which roles to check
  const rolesToCheck = requiredRoles || (requiredRole ? [requiredRole] : []);
  
  // Check if user has any of the required roles
  const hasRequiredRole = rolesToCheck.some(role => hasRole(role));

  // Show restriction message if user doesn't have required role
  if (!hasRequiredRole) {
    const rolesList = rolesToCheck.join(' or ');
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="card-title text-2xl">Access Restricted</h2>
            <p className="text-base-content/70 mt-2">
              You don't have permission to access this page. This page requires the <strong>{rolesList}</strong> role{rolesToCheck.length > 1 ? 's' : ''}.
            </p>
            <div className="card-actions justify-center mt-6">
              <button 
                className="btn btn-primary"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
