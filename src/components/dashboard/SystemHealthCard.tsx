interface SystemHealthCardProps {
  snapshot: any;
  isLoading: boolean;
  error: string | null;
}

export default function SystemHealthCard({ snapshot, isLoading, error }: SystemHealthCardProps) {
  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">System Health</h2>
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
          <h2 className="card-title">System Health</h2>
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm">Unable to load system data</span>
          </div>
        </div>
      </div>
    );
  }

  // Determine system status
  const hasData = snapshot && snapshot.organization;
  const alertsCount = snapshot?.tasks?.filter((t: any) => t.status !== 'completed').length || 0;
  const systemStatus = hasData && alertsCount === 0 ? 'OK' : hasData && alertsCount > 0 ? 'Issues Detected' : 'No Data';
  const statusColor = systemStatus === 'OK' ? 'badge-success' : systemStatus === 'Issues Detected' ? 'badge-warning' : 'badge-ghost';

  const totalOrgs = hasData ? 1 : 0; // Currently showing single org from snapshot
  const activeTasks = snapshot?.tasks?.filter((t: any) => t.status !== 'completed').length || 0;
  const lastSync = new Date().toLocaleTimeString();

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex items-center justify-between">
          System Health
          <div className={`badge ${statusColor}`}>{systemStatus}</div>
        </h2>
        
        {!hasData ? (
          <div className="space-y-2 text-sm opacity-60">
            <p>No data yet – backend not wired</p>
            <p className="text-xs">Connect to your organization to see system metrics</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="stats stats-vertical shadow w-full">
              <div className="stat py-3">
                <div className="stat-title text-xs">Total Organizations</div>
                <div className="stat-value text-2xl">{totalOrgs}</div>
              </div>
              
              <div className="stat py-3">
                <div className="stat-title text-xs">Active Tasks</div>
                <div className="stat-value text-2xl">{activeTasks}</div>
              </div>
              
              <div className="stat py-3">
                <div className="stat-title text-xs">Last Sync</div>
                <div className="stat-value text-lg">{lastSync}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
