import type { QuickActionsData } from '../../mocks/consumerDashboardMock';

interface QuickActionsCardProps {
  data: QuickActionsData;
}

export default function QuickActionsCard({ data }: QuickActionsCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Quick Actions ⚡
        </h2>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {data.actions.map((action) => (
            <button
              key={action.id}
              className="btn btn-outline flex flex-col h-auto py-4 relative"
            >
              {action.badge && (
                <div className="badge badge-secondary badge-sm absolute top-1 right-1">
                  {action.badge}
                </div>
              )}
              <span className="text-3xl mb-2">{action.icon}</span>
              <span className="text-xs">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
