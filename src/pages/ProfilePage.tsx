import SummaryCard from '../components/profile/SummaryCard';
import PreferencesCard from '../components/profile/PreferencesCard';
import { mockProfileData } from '../mocks/profileMock';

export default function ProfilePage() {
  const { summary, preferences } = mockProfileData;

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-base-content/70 mt-1">
          View and manage your profile information and preferences
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Profile Summary */}
        <div>
          <SummaryCard summary={summary} />
        </div>

        {/* Right Column - Preferences */}
        <div>
          <PreferencesCard preferences={preferences} />
        </div>
      </div>
    </div>
  );
}
