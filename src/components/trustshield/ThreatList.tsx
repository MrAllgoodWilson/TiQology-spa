import type { Threat } from '../../mocks/trustShieldMock';

interface ThreatListProps {
  threats: Threat[];
}

export default function ThreatList({ threats }: ThreatListProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'badge-error';
      case 'high':
        return 'badge-warning';
      case 'medium':
        return 'badge-info';
      case 'low':
        return 'badge-success';
      default:
        return 'badge-ghost';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-error';
      case 'investigating':
        return 'badge-warning';
      case 'resolved':
        return 'badge-success';
      default:
        return 'badge-ghost';
    }
  };

  const activeThreatsList = threats.filter((t) => t.status !== 'resolved');
  const resolvedThreatsList = threats.filter((t) => t.status === 'resolved');

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Security Threats</h2>

        {/* Active Threats */}
        {activeThreatsList.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-3">Active Threats</h3>
            <div className="space-y-3">
              {activeThreatsList.map((threat) => (
                <div key={threat.id} className="card bg-base-200">
                  <div className="card-body p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold">{threat.title}</h4>
                          <span className={`badge badge-sm ${getSeverityBadge(threat.severity)}`}>
                            {threat.severity}
                          </span>
                          <span className={`badge badge-sm ${getStatusBadge(threat.status)}`}>
                            {threat.status}
                          </span>
                        </div>
                        <p className="text-sm text-base-content/80 mb-2">
                          {threat.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-base-content/60">
                          <span>📍 {threat.affectedArea}</span>
                          <span>🕒 {new Date(threat.detectedAt).toLocaleString()}</span>
                        </div>
                      </div>
                      {threat.actionLabel && (
                        <button className="btn btn-sm btn-primary ml-4">
                          {threat.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resolved Threats */}
        {resolvedThreatsList.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Recently Resolved</h3>
            <div className="space-y-2">
              {resolvedThreatsList.map((threat) => (
                <div key={threat.id} className="card bg-base-200 opacity-60">
                  <div className="card-body p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm">{threat.title}</h4>
                          <span className={`badge badge-xs ${getSeverityBadge(threat.severity)}`}>
                            {threat.severity}
                          </span>
                          <span className={`badge badge-xs ${getStatusBadge(threat.status)}`}>
                            {threat.status}
                          </span>
                        </div>
                        <p className="text-xs text-base-content/60 mt-1">
                          {new Date(threat.detectedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {threats.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-base-content/70">No threats detected</p>
          </div>
        )}
      </div>
    </div>
  );
}
