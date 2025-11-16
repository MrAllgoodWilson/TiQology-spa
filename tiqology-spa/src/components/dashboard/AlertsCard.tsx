import { Link } from 'react-router-dom';
import type { AlertsData } from '../../mocks/consumerDashboardMock';

interface AlertsCardProps {
  data: AlertsData;
}

export default function AlertsCard({ data }: AlertsCardProps) {
  const getAlertClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'warning':
        return 'alert-warning';
      case 'error':
        return 'alert-error';
      case 'info':
      default:
        return 'alert-info';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'error':
        return '❌';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Alerts 🔔
        </h2>

        <div className="space-y-3 mt-4">
          {data.alerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert ${getAlertClass(alert.type)}`}
            >
              <span className="text-xl">{getAlertIcon(alert.type)}</span>
              <div className="flex-1">
                <p className="text-sm">{alert.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(alert.timestamp).toLocaleString()}
                </p>
              </div>
              {alert.actionLabel && (
                <button className="btn btn-sm btn-ghost">
                  {alert.actionLabel}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="card-actions justify-end mt-4">
          <Link to="/alerts" className="btn btn-primary btn-sm">
            View All Alerts
          </Link>
        </div>
      </div>
    </div>
  );
}
