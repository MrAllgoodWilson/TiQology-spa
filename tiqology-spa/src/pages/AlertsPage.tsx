import { useState } from 'react';
import FilterBar from '../components/alerts/FilterBar';
import AlertList from '../components/alerts/AlertList';
import { mockAlerts } from '../mocks/alertsMock';
import type { Alert } from '../mocks/alertsMock';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    readStatus: 'all',
  });

  const handleFilterChange = (newFilters: {
    category: string;
    type: string;
    readStatus: string;
  }) => {
    setFilters(newFilters);
  };

  const handleMarkRead = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  // Apply filters
  const filteredAlerts = alerts.filter(alert => {
    if (filters.category !== 'all' && alert.category !== filters.category) {
      return false;
    }
    if (filters.type !== 'all' && alert.type !== filters.type) {
      return false;
    }
    if (filters.readStatus === 'unread' && alert.read) {
      return false;
    }
    if (filters.readStatus === 'read' && !alert.read) {
      return false;
    }
    return true;
  });

  const unreadCount = alerts.filter(a => !a.read).length;
  
  // Calculate this week's alerts count - using a simple approximation
  const recentAlerts = alerts.slice(0, 5).length;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
          <p className="text-base-content/70 mt-1">
            Manage your notifications and stay updated
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-primary badge-lg">
            {unreadCount} Unread
          </span>
          <button className="btn btn-sm btn-ghost">Mark All Read</button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
        <div className="stat">
          <div className="stat-title">Total Alerts</div>
          <div className="stat-value text-primary">{alerts.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Unread</div>
          <div className="stat-value text-warning">{unreadCount}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Recent</div>
          <div className="stat-value text-success">{recentAlerts}</div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* Alerts List */}
      <AlertList alerts={filteredAlerts} onMarkRead={handleMarkRead} />
    </div>
  );
}
