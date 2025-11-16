import type { MissionsData } from '../../mocks/consumerDashboardMock';

interface MissionsCardProps {
  data: MissionsData;
}

export default function MissionsCard({ data }: MissionsCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Your Missions 🎯
        </h2>
        <p className="text-sm text-base-content/70">
          {data.completedCount} missions completed
        </p>

        <div className="space-y-4 mt-4">
          {data.activeMissions.map((mission) => (
            <div key={mission.id} className="border border-base-300 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{mission.title}</h3>
                  <p className="text-sm text-base-content/70">{mission.description}</p>
                </div>
                <div className="badge badge-accent">{mission.reward}</div>
              </div>
              
              <div className="flex items-center gap-2">
                <progress
                  className="progress progress-primary w-full"
                  value={mission.progress}
                  max="100"
                ></progress>
                <span className="text-sm font-semibold">{mission.progress}%</span>
              </div>
              
              {mission.deadline && (
                <p className="text-xs text-base-content/60 mt-2">
                  Due: {new Date(mission.deadline).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">View All Missions</button>
        </div>
      </div>
    </div>
  );
}
