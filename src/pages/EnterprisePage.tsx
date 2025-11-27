import EnterpriseHero from '../components/enterprise/EnterpriseHero';
import EnterpriseOrgSummary from '../components/enterprise/EnterpriseOrgSummary';
import EnterpriseSeatsTable from '../components/enterprise/EnterpriseSeatsTable';
import EnterpriseBillingCard from '../components/enterprise/EnterpriseBillingCard';
import EnterpriseUsageAnalytics from '../components/enterprise/EnterpriseUsageAnalytics';
import EnterprisePlaybooks from '../components/enterprise/EnterprisePlaybooks';
import EnterpriseSupportPanel from '../components/enterprise/EnterpriseSupportPanel';
import { enterpriseMockData } from '../mocks/enterpriseMock';

export default function EnterprisePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      {/* Hero Section - Full Width */}
      <EnterpriseHero />

      {/* Main Content Grid - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Org Summary & Billing */}
        <div className="space-y-6">
          <EnterpriseOrgSummary orgSummary={enterpriseMockData.orgSummary} />
          <EnterpriseBillingCard billing={enterpriseMockData.billing} />
        </div>

        {/* Middle Column - Seats Table & Usage */}
        <div className="lg:col-span-2 space-y-6">
          <EnterpriseSeatsTable seats={enterpriseMockData.seats} />
          <EnterpriseUsageAnalytics usage={enterpriseMockData.usage} />
        </div>
      </div>

      {/* Bottom Section - Playbooks & Support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <EnterprisePlaybooks playbooks={enterpriseMockData.playbooks} />
        <EnterpriseSupportPanel support={enterpriseMockData.support} />
      </div>
    </div>
  );
}
