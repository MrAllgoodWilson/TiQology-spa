import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useOrganizationStore } from "../stores/organizationStore";


export default function OrganizationDetailPage() {
  const { id } = useParams();
  const { organization, fetchOrganization } = useOrganizationStore();


  useEffect(() => {
    fetchOrganization(Number(id));
  }, [id, fetchOrganization])
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