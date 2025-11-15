import { useAuthStore } from '../stores/authStore';
import { useOrganizationStore } from '../stores/organizationStore';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const selectedOrganization = useOrganizationStore((state) => state.selectedOrganization);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Organizations</div>
            <div className="stat-value text-primary">3</div>
            <div className="stat-desc">Active organizations</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Active Projects</div>
            <div className="stat-value text-secondary">12</div>
            <div className="stat-desc">In progress</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Team Members</div>
            <div className="stat-value text-accent">425</div>
            <div className="stat-desc">Total across organizations</div>
          </div>
        </div>
      </div>

      {selectedOrganization && (
        <div className="mt-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Selected Organization</h2>
              <p className="font-semibold">{selectedOrganization.name}</p>
              <p>{selectedOrganization.description}</p>
              <div className="badge badge-primary">
                {selectedOrganization.memberCount} members
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="badge badge-success">New</div>
                <span>Project Alpha was created</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="badge badge-info">Update</div>
                <span>Team meeting scheduled for tomorrow</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="badge badge-warning">Pending</div>
                <span>Review pending for Project Beta</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
