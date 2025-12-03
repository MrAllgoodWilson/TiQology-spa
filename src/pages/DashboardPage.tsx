import HeroCard from '../components/dashboard/HeroCard';
import MoneySnapshotCard from '../components/dashboard/MoneySnapshotCard';
import UpcomingCard from '../components/dashboard/UpcomingCard';
import AlertsCard from '../components/dashboard/AlertsCard';
import {
  mockHeroData,
} from '../mocks/consumerDashboardMock';
import { useSnapshotStore } from '../stores/snapshotStore';
import { useEffect } from 'react';
import PostsCard from '../components/dashboard/PostsCard';

export default function DashboardPage() {
  const { fetchSnapshot, snapshot, loading, error }  = useSnapshotStore();

  useEffect(() => {
    fetchSnapshot();
  }, [fetchSnapshot])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!snapshot) {
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
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
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
      </div>

      {/* Deals and Modules Section - Full Width */}
      {/* <DealsAndModulesSection data={mockDealsAndModulesData} /> */}
    </div>
  );
}
