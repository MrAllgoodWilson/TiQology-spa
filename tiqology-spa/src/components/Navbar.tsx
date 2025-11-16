import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

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
              to="/organizations"
              className={isActive('/organizations') ? 'active' : ''}
            >
              Organizations
            </Link>
          </li>
          <li>
            <Link
              to="/bookit"
              className={isActive('/bookit') ? 'active' : ''}
            >
              BookIt
            </Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
              <span className="text-lg font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="menu-title">
              <span>{user?.email}</span>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
