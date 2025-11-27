import HeroCard from '../components/dashboard/HeroCard';
import AskKikiCard from '../components/dashboard/AskKikiCard';
import MissionsCard from '../components/dashboard/PostsCard';
import MoneySnapshotCard from '../components/dashboard/MoneySnapshotCard';
import QuickActionsCard from '../components/dashboard/QuickActionsCard';
import UpcomingCard from '../components/dashboard/UpcomingCard';
import AlertsCard from '../components/dashboard/AlertsCard';
import DealsAndModulesSection from '../components/dashboard/DealsAndModulesSection';
import {
  mockHeroData,
  mockAskKikiData,
  mockMissionsData,
  mockMoneySnapshot,
  mockQuickActionsData,
  mockUpcomingData,
  mockAlertsData,
  mockDealsAndModulesData,
} from '../mocks/consumerDashboardMock';
import { useSnapshotStore } from '../stores/snapshotStore';
import { useEffect } from 'react';
import PostsCard from '../components/dashboard/PostsCard';

export default function DashboardPage() {
  const { fetchSnapshot, snapshot }  = useSnapshotStore();

  useEffect(() => {
    fetchSnapshot();
    console.log(snapshot);
  }, [fetchSnapshot])

  useEffect(() => {
    console.log("Snapshot updated:", snapshot);
  }, [snapshot]);

  if (!snapshot) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
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
