import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout, isSecurity, isEnterpriseAdmin } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost text-xl">
          TiQology SuperApp
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/dashboard"
              className={isActive('/dashboard') ? 'active' : ''}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/war-room"
              className={isActive('/war-room') ? 'active' : ''}
            >
              War Room
            </Link>
          </li>
          <li>
            <Link
              to="/ghost-lab"
              className={isActive('/ghost-lab') ? 'active' : ''}
            >
              👻 Ghost Lab
            </Link>
          </li>
          <li>
            <Link
              to="/alerts"
              className={isActive('/alerts') ? 'active' : ''}
            >
              Alerts
            </Link>
          </li>
          {isSecurity() && (
            <li>
              <Link
                to="/trustshield"
                className={isActive('/trustshield') ? 'active' : ''}
              >
                TrustShield
              </Link>
            </li>
          )}
          {isEnterpriseAdmin() && (
            <li>
              <Link
                to="/enterprise"
                className={isActive('/enterprise') ? 'active' : ''}
              >
                Enterprise
              </Link>
            </li>
          )}
          <li>
            <details>
              <summary>
                {user?.name || user?.email}
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
