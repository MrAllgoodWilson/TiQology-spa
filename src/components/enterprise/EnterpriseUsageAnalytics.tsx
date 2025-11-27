interface EnterpriseUsageAnalyticsProps {
  usage: {
    apiCalls: {
      current: number;
      limit: number;
      percentage: number;
    };
    storage: {
      current: number;
      limit: number;
      percentage: number;
      unit: string;
    };
    bandwidth: {
      current: number;
      limit: number;
      percentage: number;
      unit: string;
    };
  };
}

export default function EnterpriseUsageAnalytics({ usage }: EnterpriseUsageAnalyticsProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'progress-error';
    if (percentage >= 75) return 'progress-warning';
    return 'progress-success';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Usage Analytics</h2>

        <div className="space-y-6">
          {/* API Calls */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold">API Calls</h3>
                <p className="text-sm text-base-content/70">
                  {formatNumber(usage.apiCalls.current)} / {formatNumber(usage.apiCalls.limit)}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{usage.apiCalls.percentage}%</span>
              </div>
            </div>
            <progress 
              className={`progress ${getProgressColor(usage.apiCalls.percentage)} w-full`}
              value={usage.apiCalls.percentage} 
              max="100"
            ></progress>
          </div>

          {/* Storage */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold">Storage</h3>
                <p className="text-sm text-base-content/70">
                  {usage.storage.current} {usage.storage.unit} / {usage.storage.limit} {usage.storage.unit}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{usage.storage.percentage}%</span>
              </div>
            </div>
            <progress 
              className={`progress ${getProgressColor(usage.storage.percentage)} w-full`}
              value={usage.storage.percentage} 
              max="100"
            ></progress>
          </div>

          {/* Bandwidth */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-semibold">Bandwidth</h3>
                <p className="text-sm text-base-content/70">
                  {formatNumber(usage.bandwidth.current)} {usage.bandwidth.unit} / {formatNumber(usage.bandwidth.limit)} {usage.bandwidth.unit}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">{usage.bandwidth.percentage}%</span>
              </div>
            </div>
            <progress 
              className={`progress ${getProgressColor(usage.bandwidth.percentage)} w-full`}
              value={usage.bandwidth.percentage} 
              max="100"
            ></progress>
          </div>
        </div>

        <div className="alert alert-info mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-sm">Usage data refreshes every hour</span>
        </div>
      </div>
    </div>
  );
}
