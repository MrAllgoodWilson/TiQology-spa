interface AlertsActivityCardProps {
  snapshot: any;
  isLoading: boolean;
  error: string | null;
}

export default function AlertsActivityCard({ snapshot, isLoading, error }: AlertsActivityCardProps) {
  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Alerts & Activity</h2>
          <div className="flex items-center justify-center h-32">
            <div className="loading loading-spinner loading-md"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Alerts & Activity</h2>
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm">Unable to load alerts</span>
          </div>
        </div>
      </div>
    );
  }

  // Get active tasks as "alerts" from snapshot
  const tasks = snapshot?.tasks || [];
  const activeTasks = tasks.filter((t: any) => t.status !== 'completed');
  const recentTasks = activeTasks.slice(0, 3);
  const alertCount = activeTasks.length;

  // Determine priority styling
  const getPriorityBadge = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'badge-error';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-info';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex items-center justify-between">
          Alerts & Activity
          <div className={`badge ${alertCount > 0 ? 'badge-warning' : 'badge-success'}`}>
            {alertCount} active
          </div>
        </h2>
        
        {alertCount === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 space-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 opacity-20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm opacity-60">No recent alerts</p>
            <p className="text-xs opacity-40">All tasks are up to date</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task: any, index: number) => (
              <div key={task.id || index} className="flex items-start gap-3 p-3 rounded-lg bg-base-200">
                <div className="flex-shrink-0 mt-1">
                  <div className={`badge ${getPriorityBadge(task.priority)} badge-sm`}>
                    {task.priority || 'normal'}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{task.title}</p>
                  <p className="text-xs opacity-60 truncate">{task.description}</p>
                  {task.due_date && (
                    <p className="text-xs opacity-40 mt-1">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
            
            {activeTasks.length > 3 && (
              <p className="text-xs text-center opacity-60">
                +{activeTasks.length - 3} more active tasks
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
