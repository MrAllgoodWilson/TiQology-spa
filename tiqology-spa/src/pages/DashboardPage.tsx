import HeroCard from '../components/dashboard/HeroCard';
import AskKikiCard from '../components/dashboard/AskKikiCard';
import MissionsCard from '../components/dashboard/MissionsCard';
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

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Hero Section - Full Width */}
      <HeroCard data={mockHeroData} />

      {/* Two Column Layout on Desktop, Stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <MoneySnapshotCard data={mockMoneySnapshot} />
          <QuickActionsCard data={mockQuickActionsData} />
          <MissionsCard data={mockMissionsData} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <AskKikiCard data={mockAskKikiData} />
          <UpcomingCard data={mockUpcomingData} />
          <AlertsCard data={mockAlertsData} />
        </div>
      </div>

      {/* Deals and Modules Section - Full Width */}
      <DealsAndModulesSection data={mockDealsAndModulesData} />
    </div>
  );
}
