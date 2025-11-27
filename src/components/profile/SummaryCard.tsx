import type { ProfileSummary } from '../../mocks/profileMock';

interface SummaryCardProps {
  summary: ProfileSummary;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Profile Information</h2>

        {/* Avatar and Basic Info */}
        <div className="flex items-center gap-4 mt-4">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-24 h-24">
              <span className="text-4xl font-bold">
                {summary.name.split(' ').filter(n => n.length > 0).map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">{summary.name}</h3>
            <p className="text-base-content/70">{summary.email}</p>
            <div className="badge badge-primary mt-2">{summary.accountType}</div>
          </div>
        </div>

        {/* Contact & Stats */}
        <div className="divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold">Phone</span>
            </label>
            <p className="text-base-content">{summary.phone}</p>
          </div>
          <div>
            <label className="label">
              <span className="label-text font-semibold">Member Since</span>
            </label>
            <p className="text-base-content">
              {new Date(summary.memberSince).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Gamification Stats */}
        <div className="divider">Achievements</div>

        <div className="grid grid-cols-2 gap-4">
          <div className="stat bg-base-200 rounded-lg p-4">
            <div className="stat-title text-xs">TiQ Points</div>
            <div className="stat-value text-2xl text-primary">{summary.tiQPoints.toLocaleString()}</div>
          </div>
          <div className="stat bg-base-200 rounded-lg p-4">
            <div className="stat-title text-xs">Level</div>
            <div className="stat-value text-2xl text-success">{summary.level}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-ghost btn-sm">Cancel</button>
          <button className="btn btn-primary btn-sm">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
