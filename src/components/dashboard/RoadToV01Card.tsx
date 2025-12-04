export default function RoadToV01Card() {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex items-center justify-between">
          Road to v0.1
          <div className="badge badge-accent">In Progress</div>
        </h2>
        
        <p className="text-sm opacity-70 mb-4">
          We're building TiQology in phases. Here's where we are:
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-success">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Dashboard core ready</p>
              <p className="text-xs opacity-60">Control center with system health and overview</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-success">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">Organizations path online</p>
              <p className="text-xs opacity-60">View and manage your organizations</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-warning">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">War Room & TrustShield: Coming Soon</p>
              <p className="text-xs opacity-60">Advanced modules in development (Q1 2026)</p>
            </div>
          </div>
        </div>

        <div className="divider my-2"></div>

        <div className="flex items-center justify-between text-xs">
          <span className="opacity-60">Version 0.1.0</span>
          <span className="opacity-60">December 2025</span>
        </div>
      </div>
    </div>
  );
}
