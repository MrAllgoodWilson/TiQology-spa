import SummaryCard from '../components/trustshield/SummaryCard';
import ThreatList from '../components/trustshield/ThreatList';
import InsightsCard from '../components/trustshield/InsightsCard';
import { mockTrustShieldData } from '../mocks/trustShieldMock';

export default function TrustShieldPage() {
  const { summary, threats, insights } = mockTrustShieldData;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🛡️</span>
          <div>
            <h1 className="text-3xl font-bold">TrustShield Lite</h1>
            <p className="text-base-content/70 mt-1">
              Monitor and protect your account security
            </p>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
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
          <strong>Security Module Active:</strong> TrustShield is continuously monitoring your account for threats.
        </span>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Summary */}
        <div className="lg:col-span-1">
          <SummaryCard summary={summary} />
        </div>

        {/* Right Column - Threats and Insights */}
        <div className="lg:col-span-2 space-y-6">
          <ThreatList threats={threats} />
          <InsightsCard insights={insights} />
        </div>
      </div>
    </div>
  );
}
