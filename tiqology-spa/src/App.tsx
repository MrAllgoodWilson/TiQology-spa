import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OrganizationsPage from './pages/OrganizationsPage';
import BookItPage from './pages/BookItPage';
import AlertsPage from './pages/AlertsPage';
import TrustShieldPage from './pages/TrustShieldPage';
import ProfilePage from './pages/ProfilePage';
import EnterprisePage from './pages/EnterprisePage';
import WarRoomPage from './pages/WarRoomPage';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="organizations" element={<OrganizationsPage />} />
          <Route path="bookit" element={<BookItPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="war-room" element={<WarRoomPage />} />
          <Route 
            path="trustshield" 
            element={
              <RoleProtectedRoute requiredRole="security">
                <TrustShieldPage />
              </RoleProtectedRoute>
            } 
          />
          <Route 
            path="enterprise" 
            element={
              <RoleProtectedRoute requiredRoles={["owner", "admin"]}>
                <EnterprisePage />
              </RoleProtectedRoute>
            } 
          />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
