import type { Seat } from '../../mocks/enterpriseMock';

interface EnterpriseSeatsTableProps {
  seats: Seat[];
}

export default function EnterpriseSeatsTable({ seats }: EnterpriseSeatsTableProps) {
  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'badge-success',
      pending: 'badge-warning',
      inactive: 'badge-error',
    };
    return badges[status as keyof typeof badges] || 'badge-ghost';
  };

  const getRoleBadge = (role: string) => {
    const badges = {
      owner: 'badge-error',
      admin: 'badge-warning',
      user: 'badge-info',
    };
    return badges[role as keyof typeof badges] || 'badge-ghost';
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-2xl">Seats & Roles</h2>
          <button className="btn btn-primary btn-sm">Add User</button>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="hidden md:table-cell">Department</th>
                <th>Status</th>
                <th className="hidden lg:table-cell">Last Active</th>
              </tr>
            </thead>
            <tbody>
              {seats.map((seat) => (
                <tr key={seat.id}>
                  <td className="font-semibold">{seat.name}</td>
                  <td className="text-sm">{seat.email}</td>
                  <td>
                    <div className={`badge badge-sm ${getRoleBadge(seat.role)}`}>
                      {seat.role}
                    </div>
                  </td>
                  <td className="hidden md:table-cell text-sm">{seat.department}</td>
                  <td>
                    <div className={`badge badge-sm ${getStatusBadge(seat.status)}`}>
                      {seat.status}
                    </div>
                  </td>
                  <td className="hidden lg:table-cell text-sm text-base-content/70">
                    {seat.lastActive}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
