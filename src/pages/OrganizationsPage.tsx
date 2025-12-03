import { useEffect } from 'react';
import { useOrganizationStore } from '../stores/organizationStore';
import { Link } from 'react-router-dom';

export default function OrganizationsPage() {
  const { organizations, selectedOrganization, selectOrganization, fetchOrganizations, loading, error } = useOrganizationStore();

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations])
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Organizations</h1>
        <p className="text-gray-600 mt-2">Manage your organizations</p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button 
              onClick={() => fetchOrganizations()} 
              className="ml-3 text-sm font-medium text-red-700 hover:text-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading organizations...</p>
          </div>
        </div>
      )}

      {/* Organizations Grid */}
      {!loading && (
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
      )}

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
