import AlertCard from './AlertCard';
import type { Alert } from '../../mocks/alertsMock';

interface AlertListProps {
  alerts: Alert[];
  onMarkRead?: (id: string) => void;
}

export default function AlertList({ alerts, onMarkRead }: AlertListProps) {
  if (alerts.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold">No Alerts Found</h3>
          <p className="text-base-content/70 mt-2">
            There are no alerts matching your current filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <AlertCard key={alert.id} alert={alert} onMarkRead={onMarkRead} />
      ))}
    </div>
  );
}
