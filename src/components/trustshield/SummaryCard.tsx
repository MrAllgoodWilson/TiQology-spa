import type { SecuritySummary } from '../../mocks/trustShieldMock';

interface SummaryCardProps {
  summary: SecuritySummary;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'badge-success';
    if (score >= 70) return 'badge-warning';
    return 'badge-error';
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Security Overview
          <span className={`badge ${getScoreBadge(summary.overallScore)}`}>
            {summary.overallScore >= 90 ? 'Excellent' : summary.overallScore >= 70 ? 'Good' : 'Needs Attention'}
          </span>
        </h2>

        {/* Security Score */}
        <div className="flex items-center justify-center py-6">
          <div className="text-center">
            <div className={`text-6xl font-bold ${getScoreColor(summary.overallScore)}`}>
              {summary.overallScore}
            </div>
            <p className="text-sm text-base-content/70 mt-2">Security Score</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="stat bg-base-200 rounded-lg p-4">
            <div className="stat-title text-xs">Active Threats</div>
            <div className="stat-value text-2xl text-error">{summary.activeThreats}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-4">
            <div className="stat-title text-xs">Resolved</div>
            <div className="stat-value text-2xl text-success">{summary.resolvedThreats}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-4">
            <div className="stat-title text-xs">Recommendations</div>
            <div className="stat-value text-2xl text-warning">{summary.recommendations}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-4">
            <div className="stat-title text-xs">Last Scan</div>
            <div className="stat-value text-xs">
              {new Date(summary.lastScan).toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">Run Scan</button>
        </div>
      </div>
    </div>
  );
}
