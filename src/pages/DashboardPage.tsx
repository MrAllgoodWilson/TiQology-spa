import { useSnapshotStore } from '../stores/snapshotStore';
import { useEffect } from 'react';
import SystemHealthCard from '../components/dashboard/SystemHealthCard';
import OrganizationsOverviewCard from '../components/dashboard/OrganizationsOverviewCard';
import AlertsActivityCard from '../components/dashboard/AlertsActivityCard';
import RoadToV01Card from '../components/dashboard/RoadToV01Card';

const isDevelopment = import.meta.env.MODE === 'development';

function logDev(...args: any[]) {
  if (isDevelopment) {
    console.log('[DashboardPage]', ...args);
  }
}

export default function DashboardPage() {
<<<<<<< HEAD
  const { fetchSnapshot, snapshot, isLoading, error }  = useSnapshotStore();
=======
  const { fetchSnapshot, snapshot, loading, error }  = useSnapshotStore();
>>>>>>> origin/main

  useEffect(() => {
    logDev('Component mounted, fetching dashboard data...');
    fetchSnapshot();
  }, [fetchSnapshot])

<<<<<<< HEAD
  if (isLoading) {
    logDev('Rendering loading state');
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    logDev('Rendering error state:', error);
    return (
      <div className="p-6">
        <div className="alert alert-error shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Failed to load dashboard</h3>
            <div className="text-sm mt-1">{error}</div>
            <div className="text-xs mt-2 opacity-75">
              Check the browser console for more details. If this persists, verify your API connection.
            </div>
          </div>
          <button 
            className="btn btn-sm btn-outline" 
            onClick={() => {
              logDev('Retry button clicked');
              fetchSnapshot();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Retrying...
              </>
            ) : (
              'Retry'
            )}
          </button>
=======
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
>>>>>>> origin/main
        </div>
      </div>
    );
  }

  if (!snapshot) {
<<<<<<< HEAD
    logDev('Rendering empty state (no snapshot data)');
    return (
      <div className="p-6">
        <div className="alert alert-warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>No dashboard data available</span>
=======
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-600">
          <p>Failed to load dashboard data</p>
          {error && <p className="text-sm mt-2">{error}</p>}
          <button 
            onClick={() => fetchSnapshot()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
>>>>>>> origin/main
        </div>
      </div>
    );
  }

  logDev('Rendering dashboard with data:', {
    organization: snapshot.organization?.name,
    posts: snapshot.posts?.length,
    events: snapshot.events?.length,
    tasks: snapshot.tasks?.length
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
<<<<<<< HEAD
      {/* Top Section - Title & Subtitle */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-base-content">
          TiQology Control Center
        </h1>
        <p className="text-base-content/70 mt-2">
          High-level view of your organizations, alerts, and system status.
        </p>
=======
      {/* Error Banner - Show when using fallback data */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-yellow-700">
                {error}
              </p>
            </div>
            <button 
              onClick={() => fetchSnapshot()} 
              className="ml-3 text-sm font-medium text-yellow-700 hover:text-yellow-600"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Hero Section - Full Width */}
      <HeroCard data={mockHeroData} />

      {/* Two Column Layout on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <MoneySnapshotCard data={snapshot} />
          {/* <QuickActionsCard data={mockQuickActionsData} /> */}
          <PostsCard data={snapshot} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* <AskKikiCard data={mockAskKikiData} /> */}
          <UpcomingCard data={snapshot} />
          <AlertsCard data={snapshot} />
        </div>
>>>>>>> origin/main
      </div>

      {/* Main Grid - 2x2 on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health Card */}
        <SystemHealthCard 
          snapshot={snapshot}
          isLoading={isLoading}
          error={error}
        />

        {/* Organizations Overview Card */}
        <OrganizationsOverviewCard 
          snapshot={snapshot}
          isLoading={isLoading}
          error={error}
        />

        {/* Alerts & Activity Card */}
        <AlertsActivityCard 
          snapshot={snapshot}
          isLoading={isLoading}
          error={error}
        />

        {/* Road to v0.1 Card */}
        <RoadToV01Card />
      </div>
    </div>
  );
}
