import type { Alert } from '../../mocks/alertsMock';

interface AlertCardProps {
  alert: Alert;
  onMarkRead?: (id: string) => void;
}

export default function AlertCard({ alert, onMarkRead }: AlertCardProps) {
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

  const getCategoryBadge = (category: string) => {
    const badgeColors: Record<string, string> = {
      system: 'badge-neutral',
      payment: 'badge-primary',
      security: 'badge-error',
      mission: 'badge-success',
      social: 'badge-accent',
    };
    return badgeColors[category] || 'badge-ghost';
  };

  return (
    <div className={`alert ${getAlertClass(alert.type)} ${alert.read ? 'opacity-60' : ''}`}>
      <span className="text-xl">{getAlertIcon(alert.type)}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold">{alert.title}</h4>
          <span className={`badge badge-sm ${getCategoryBadge(alert.category)}`}>
            {alert.category}
          </span>
          {!alert.read && (
            <span className="badge badge-sm badge-warning">New</span>
          )}
        </div>
        <p className="text-sm">{alert.message}</p>
        <p className="text-xs opacity-70 mt-1">
          {new Date(alert.timestamp).toLocaleString()}
        </p>
      </div>
      <div className="flex gap-2">
        {alert.actionLabel && (
          <button className="btn btn-sm btn-ghost">
            {alert.actionLabel}
          </button>
        )}
        {!alert.read && onMarkRead && (
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => onMarkRead(alert.id)}
          >
            Mark Read
          </button>
        )}
      </div>
    </div>
  );
}
