// import type { MoneySnapshot } from '../../mocks/consumerDashboardMock';
import type {Snapshot} from "../../stores/snapshotStore"

interface Props {
  data: Snapshot;
}

export default function MoneySnapshotCard({ data }: Props) {
  const { organization } = data;
  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat('en-US', {
  //     style: 'currency',
  //     currency: data.currency,
  //   }).format(amount);
  // };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-extrabold">
          Organization
        </h2>

        <div className="stats stats-vertical shadow mt-4">
          <div className="stat">
            <div className="stat-title text-xl font-bold">Name</div>
            <div className="stat-value text-primary text-lg">{organization.name}</div>
          </div>

          <div className="stat">
            <div className="stat-title text-xl font-bold">Description</div>
            <div className="stat-value text-secondary text-lg">
              {organization.description}
            </div>
            {/* <div className="stat-desc">+{data.pendingRewards} pending</div> */}
          </div>

          <div className="stat">
            <div className="stat-title text-xl font-bold">Phone</div>
            <div className="stat-value text-accent text-2xl">
              {organization.phone}
            </div>
          </div>
        </div>

        {/* <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">View Details</button>
        </div> */}
      </div>
    </div>
  );
}
