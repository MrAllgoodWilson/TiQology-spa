import type { Playbook } from '../../mocks/enterpriseMock';

interface EnterprisePlaybooksProps {
  playbooks: Playbook[];
}

export default function EnterprisePlaybooks({ playbooks }: EnterprisePlaybooksProps) {
  const getStatusBadge = (status: string) => {
    const badges = {
      published: 'badge-success',
      draft: 'badge-warning',
    };
    return badges[status as keyof typeof badges] || 'badge-ghost';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      HR: 'badge-primary',
      Security: 'badge-error',
      Technical: 'badge-info',
      Finance: 'badge-warning',
    };
    return colors[category as keyof typeof colors] || 'badge-ghost';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-2xl">Playbooks</h2>
          <button className="btn btn-primary btn-sm">Create New</button>
        </div>

        <div className="space-y-3">
          {playbooks.map((playbook) => (
            <div key={playbook.id} className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer">
              <div className="card-body p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{playbook.title}</h3>
                    <p className="text-sm text-base-content/70 mt-1">{playbook.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <div className={`badge badge-sm ${getCategoryColor(playbook.category)}`}>
                        {playbook.category}
                      </div>
                      <div className={`badge badge-sm ${getStatusBadge(playbook.status)}`}>
                        {playbook.status}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-base-content/70 sm:text-right">
                    Updated: {formatDate(playbook.lastUpdated)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {playbooks.length === 0 && (
          <div className="text-center py-8 text-base-content/50">
            No playbooks available
          </div>
        )}
      </div>
    </div>
  );
}
