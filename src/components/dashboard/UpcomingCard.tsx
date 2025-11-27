import type { Snapshot } from '../../stores/snapshotStore';

interface Props {
  data: Snapshot;
}

export default function UpcomingCard({ data }: Props) {
  const { events } = data;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return '📅';
      case 'training':
        return '✅';
      case 'game':
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
        <h2 className="card-title text-2xl font-extrabold">
          Events 📆
        </h2>

        <div className="space-y-3 mt-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-start gap-3 p-3 border border-base-300 rounded-lg hover:bg-base-200 transition-colors"
            >
              <span className="text-2xl">{getEventIcon(event.event_type)}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm">{event.title}</h3>
                  <div className={`badge badge-sm ${getEventBadgeColor(event.event_type)}`}>
                    {event.event_type}
                  </div>
                </div>
                <p className="text-xs text-base-content/70">
                  {new Date(event.start_time).toLocaleDateString()}
                  {event.start_time && ` at ${event.start_time}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">View Calendar</button>
        </div> */}
      </div>
    </div>
  );
}
