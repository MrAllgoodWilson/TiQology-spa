import { Link } from 'react-router-dom';

interface OrganizationsOverviewCardProps {
  snapshot: any;
  isLoading: boolean;
  error: string | null;
}

export default function OrganizationsOverviewCard({ snapshot, isLoading, error }: OrganizationsOverviewCardProps) {
  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Organizations Overview</h2>
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
          <h2 className="card-title">Organizations Overview</h2>
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm">Unable to load organizations</span>
          </div>
        </div>
      </div>
    );
  }

  const organization = snapshot?.organization;
  const hasOrg = organization && organization.id;
  const orgCount = hasOrg ? 1 : 0; // Currently single org from snapshot

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex items-center justify-between">
          Organizations Overview
          <div className="badge badge-primary">{orgCount}</div>
        </h2>
        
        {!hasOrg ? (
          <div className="space-y-3">
            <p className="text-sm opacity-60">No organizations found</p>
            <Link to="/organizations" className="btn btn-primary btn-sm">
              View All Organizations
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Link 
                to={`/organizations/${organization.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-base-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-10">
                      <span className="text-xl">{organization.name?.charAt(0) || 'O'}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{organization.name}</p>
                    <p className="text-xs opacity-60">{organization.organization_type}</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-40">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>

            <div className="divider my-2"></div>

            <Link to="/organizations" className="btn btn-outline btn-sm w-full">
              View All Organizations
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
