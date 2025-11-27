import { Link } from 'react-router-dom';
import { mockWarRoomModules, getStatusCounts, type ModuleStatus } from '../mocks/warRoomMock';

export default function WarRoomPage() {
  const statusCounts = getStatusCounts();

  const getStatusBadgeClass = (status: ModuleStatus): string => {
    switch (status) {
      case 'Live':
        return 'badge-success';
      case 'In Progress':
        return 'badge-warning';
      case 'Planned':
        return 'badge-info';
      case 'Needs Backend':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl">🎯 War Room - Phase 3 Deployment Tracker</h1>
          <p className="text-base-content/70">
            Real-time status dashboard for tracking all TiQology SuperApp modules and features.
            This dashboard provides visibility into the deployment status of all packs and modules.
          </p>
          
          {/* Status Summary Stats */}
          <div className="stats stats-vertical lg:stats-horizontal shadow mt-4">
            <div className="stat">
              <div className="stat-title">Total Modules</div>
              <div className="stat-value text-primary">{statusCounts.total}</div>
              <div className="stat-desc">Across all categories</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Live</div>
              <div className="stat-value text-success">{statusCounts.live}</div>
              <div className="stat-desc">In production</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">In Progress</div>
              <div className="stat-value text-warning">{statusCounts.inProgress}</div>
              <div className="stat-desc">Under development</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Planned</div>
              <div className="stat-value text-info">{statusCounts.planned}</div>
              <div className="stat-desc">On roadmap</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Needs Backend</div>
              <div className="stat-value text-error">{statusCounts.needsBackend}</div>
              <div className="stat-desc">Awaiting API</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockWarRoomModules.map((module) => (
          <div key={module.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <h2 className="card-title text-lg">{module.name}</h2>
                <span className={`badge ${getStatusBadgeClass(module.status)}`}>
                  {module.status}
                </span>
              </div>
              
              <p className="text-sm text-base-content/70 flex-grow">
                {module.description}
              </p>
              
              <div className="divider my-2"></div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">Category:</span>
                  <span className="badge badge-outline badge-sm">{module.category}</span>
                </div>
                
                {module.route ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">Route:</span>
                    <Link 
                      to={module.route} 
                      className="link link-primary link-hover text-sm"
                    >
                      {module.route}
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-base-content/50">
                    <span className="font-semibold">Route:</span>
                    <span className="italic">Not available yet</span>
                  </div>
                )}
              </div>
              
              {module.route && (
                <div className="card-actions justify-end mt-2">
                  <Link to={module.route} className="btn btn-primary btn-sm">
                    Visit Module
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 className="font-bold">Frontend-Only Dashboard</h3>
          <div className="text-sm">
            This War Room dashboard is currently frontend-only and uses mock data. 
            It can be wired to backend APIs or GitHub signals for real-time deployment tracking in the future.
          </div>
        </div>
      </div>
    </div>
  );
}
