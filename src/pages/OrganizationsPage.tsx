import { useEffect } from 'react';
import { useOrganizationStore } from '../stores/organizationStore';
import { Link } from 'react-router-dom';

export default function OrganizationsPage() {
  const { organizations, selectedOrganization, selectOrganization, fetchOrganizations } = useOrganizationStore();

  useEffect(() => {
    fetchOrganizations();
  }, [])
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Organizations</h1>
        <p className="text-gray-600 mt-2">Manage your organizations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer ${
              selectedOrganization?.id === org.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => selectOrganization(org)}
          >
            <div className="card-body">
              <h2 className="card-title">{org.name}</h2>
              <p>{org.description}</p>
              <div className="card-actions justify-between items-center mt-4">
                <div className="badge badge-outline">{org.memberCount} members</div>
                <button
                  className={`btn btn-sm ${
                    selectedOrganization?.id === org.id ? 'btn-primary' : 'btn-ghost'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOrganization(org);
                  }}
                >
                  {selectedOrganization?.id === org.id ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Organization
        </button>
      </div>

      {selectedOrganization && (
        <div className="mt-6">
          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              You have selected <strong>{selectedOrganization.name}</strong>&nbsp;&nbsp;<span className='text-white underline'><Link to={`/organizations/${selectedOrganization.id}`}>view details</Link></span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
