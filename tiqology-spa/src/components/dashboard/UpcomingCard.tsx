import type { UpcomingData } from '../../mocks/consumerDashboardMock';

interface UpcomingCardProps {
  data: UpcomingData;
}

export default function UpcomingCard({ data }: UpcomingCardProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'event':
        return '📅';
      case 'task':
        return '✅';
      case 'reminder':
        return '🔔';
      default:
        return '📌';
    }
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'event':
        return 'badge-primary';
      case 'task':
        return 'badge-warning';
      case 'reminder':
        return 'badge-info';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Upcoming 📆
        </h2>

        <div className="space-y-3 mt-4">
          {data.events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 p-3 border border-base-300 rounded-lg hover:bg-base-200 transition-colors"
            >
              <span className="text-2xl">{getEventIcon(event.type)}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{event.title}</h3>
                  <div className={`badge badge-sm ${getEventBadgeColor(event.type)}`}>
                    {event.type}
                  </div>
                </div>
                <p className="text-xs text-base-content/70">
                  {new Date(event.date).toLocaleDateString()}
                  {event.time && ` at ${event.time}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">View Calendar</button>
        </div>
      </div>
    </div>
  );
}
