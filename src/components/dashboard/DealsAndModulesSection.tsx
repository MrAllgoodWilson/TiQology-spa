import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import type { DealsAndModulesData } from '../../mocks/consumerDashboardMock';

interface DealsAndModulesSectionProps {
  data: DealsAndModulesData;
}

export default function DealsAndModulesSection({ data }: DealsAndModulesSectionProps) {
  const isSecurity = useAuthStore((state) => state.isSecurity());

  return (
    <div className="space-y-6">
      {/* Deals Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            Special Deals 🎁
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {data.deals.map((deal) => (
              <div
                key={deal.id}
                className="card bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
              >
                <div className="card-body p-4">
                  <div className="badge badge-primary">{deal.discount}</div>
                  <h3 className="card-title text-base mt-2">{deal.title}</h3>
                  <p className="text-sm text-base-content/70">{deal.description}</p>
                  <p className="text-xs text-base-content/60 mt-2">
                    Expires: {new Date(deal.expiresAt).toLocaleDateString()}
                  </p>
                  <div className="card-actions justify-end mt-2">
                    <button className="btn btn-primary btn-sm">Claim Deal</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            Your Modules 🧩
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {data.modules.map((module) => (
              <div
                key={module.id}
                className={`card border-2 ${
                  module.isActive
                    ? 'border-primary bg-primary/5'
                    : 'border-base-300 bg-base-200'
                }`}
              >
                <div className="card-body p-4 text-center">
                  <span className="text-4xl mb-2">{module.icon}</span>
                  <h3 className="font-semibold text-sm">{module.title}</h3>
                  <p className="text-xs text-base-content/70">{module.description}</p>
                  <div className="form-control mt-2">
                    <label className="label cursor-pointer justify-center">
                      <input
                        type="checkbox"
                        className="toggle toggle-primary toggle-sm"
                        checked={module.isActive}
                        readOnly
                      />
                      <span className="label-text ml-2 text-xs">
                        {module.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
            
            {/* TrustShield Module Card */}
            {isSecurity && (
              <Link to="/trustshield" className="card border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors">
                <div className="card-body p-4 text-center">
                  <span className="text-4xl mb-2">🛡️</span>
                  <h3 className="font-semibold text-sm">TrustShield</h3>
                  <p className="text-xs text-base-content/70">Security monitoring</p>
                  <div className="form-control mt-2">
                    <div className="badge badge-success badge-sm">Active</div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
