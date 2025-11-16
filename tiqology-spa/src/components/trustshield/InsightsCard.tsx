import type { SecurityInsight } from '../../mocks/trustShieldMock';

interface InsightsCardProps {
  insights: SecurityInsight[];
}

export default function InsightsCard({ insights }: InsightsCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'authentication':
        return 'bg-primary/10 text-primary';
      case 'data-protection':
        return 'bg-success/10 text-success';
      case 'network':
        return 'bg-info/10 text-info';
      case 'device':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-base-200 text-base-content';
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Security Insights & Recommendations</h2>

        <div className="space-y-3 mt-4">
          {insights.map((insight) => (
            <div key={insight.id} className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${getCategoryColor(insight.category)}`}>
                    <span className="text-2xl">{insight.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold mb-1">{insight.title}</h4>
                    <p className="text-sm text-base-content/80 mb-2">
                      {insight.description}
                    </p>
                    <div className="alert alert-info py-2 px-3 mt-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-current shrink-0 w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="text-xs">{insight.recommendation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {insights.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">✨</div>
            <p className="text-base-content/70">All security recommendations addressed</p>
          </div>
        )}
      </div>
    </div>
  );
}
