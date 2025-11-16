interface EnterpriseOrgSummaryProps {
  orgSummary: {
    name: string;
    plan: string;
    totalSeats: number;
    usedSeats: number;
    activeUsers: number;
    departments: number;
  };
}

export default function EnterpriseOrgSummary({ orgSummary }: EnterpriseOrgSummaryProps) {
  const seatUsagePercentage = Math.round((orgSummary.usedSeats / orgSummary.totalSeats) * 100);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">
          Organization Overview
        </h2>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-base-content/70">Organization</p>
            <p className="text-xl font-semibold">{orgSummary.name}</p>
          </div>

          <div>
            <p className="text-sm text-base-content/70">Plan</p>
            <div className="badge badge-primary badge-lg">{orgSummary.plan}</div>
          </div>

          <div className="divider"></div>

          <div className="grid grid-cols-2 gap-4">
            <div className="stat bg-base-200 rounded-lg p-4">
              <div className="stat-title text-xs">Total Seats</div>
              <div className="stat-value text-2xl">{orgSummary.totalSeats}</div>
            </div>
            <div className="stat bg-base-200 rounded-lg p-4">
              <div className="stat-title text-xs">Used Seats</div>
              <div className="stat-value text-2xl">{orgSummary.usedSeats}</div>
            </div>
            <div className="stat bg-base-200 rounded-lg p-4">
              <div className="stat-title text-xs">Active Users</div>
              <div className="stat-value text-2xl">{orgSummary.activeUsers}</div>
            </div>
            <div className="stat bg-base-200 rounded-lg p-4">
              <div className="stat-title text-xs">Departments</div>
              <div className="stat-value text-2xl">{orgSummary.departments}</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Seat Usage</span>
              <span className="font-semibold">{seatUsagePercentage}%</span>
            </div>
            <progress 
              className="progress progress-primary w-full" 
              value={seatUsagePercentage} 
              max="100"
            ></progress>
          </div>
        </div>
      </div>
    </div>
  );
}
