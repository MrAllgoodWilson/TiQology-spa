import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useOrganizationStore } from "../stores/organizationStore";


export default function OrganizationDetailPage() {
  const { id } = useParams();
  const { organization, fetchOrganization, isLoading, error } = useOrganizationStore();


  useEffect(() => {
    fetchOrganization(Number(id));
  }, [id, fetchOrganization])
<<<<<<< HEAD

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600">Loading organization details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-bold">Failed to load organization</h3>
            <div className="text-sm">{error}</div>
          </div>
          <button className="btn btn-sm" onClick={() => fetchOrganization(Number(id))}>Retry</button>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="p-6">
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Organization not found</span>
        </div>
      </div>
    );
  }

=======
>>>>>>> origin/main
  return <div className="card bg-base-100 shadow-xl mt-10">
      <div className="card-body">
        <h2 className="card-title text-4xl font-extrabold">
          {organization?.name}
        </h2>

        <div className="stats stats-vertical shadow mt-4">
          <div className="stat">
            <div className="stat-title text-2xl font-extrabold">Organization Type</div>
            <div className="stat-value text-primary text-xl">{organization?.organization_type}</div>
          </div>

          <div className="stat">
            <div className="stat-title text-2xl font-extrabold">Description</div>
            <div className="stat-value text-secondary text-xl">
              {organization?.description}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-2xl font-extrabold">Website</div>
            <div className="stat-value text-accent text-xl">
              {organization?.website}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-2xl font-extrabold">Email</div>
            <div className="stat-value text-accent text-xl">
              {organization?.email}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title text-2xl font-extrabold">Phone</div>
            <div className="stat-value text-accent text-xl">
              {organization?.phone}
            </div>
          </div>

        </div>
      
      </div>
    </div>
}