import type { MoneySnapshot } from '../../mocks/consumerDashboardMock';

interface MoneySnapshotCardProps {
  data: MoneySnapshot;
}

export default function MoneySnapshotCard({ data }: MoneySnapshotCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: data.currency,
    }).format(amount);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Money Snapshot 💰
        </h2>

        <div className="stats stats-vertical shadow mt-4">
          <div className="stat">
            <div className="stat-title">Total Balance</div>
            <div className="stat-value text-primary">{formatCurrency(data.totalBalance)}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Rewards Earned</div>
            <div className="stat-value text-secondary text-2xl">
              {data.rewardsEarned} points
            </div>
            <div className="stat-desc">+{data.pendingRewards} pending</div>
          </div>

          <div className="stat">
            <div className="stat-title">Monthly Spending</div>
            <div className="stat-value text-accent text-2xl">
              {formatCurrency(data.monthlySpending)}
            </div>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">View Details</button>
        </div>
      </div>
    </div>
  );
}
