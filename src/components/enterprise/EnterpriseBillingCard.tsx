interface EnterpriseBillingCardProps {
  billing: {
    currentPlan: string;
    billingCycle: string;
    nextBillingDate: string;
    amount: number;
    paymentMethod: string;
    status: 'active' | 'overdue' | 'pending';
  };
}

export default function EnterpriseBillingCard({ billing }: EnterpriseBillingCardProps) {
  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'badge-success',
      overdue: 'badge-error',
      pending: 'badge-warning',
    };
    return badges[status as keyof typeof badges] || 'badge-ghost';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start mb-4">
          <h2 className="card-title text-2xl">Billing</h2>
          <div className={`badge ${getStatusBadge(billing.status)}`}>
            {billing.status}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-base-content/70">Current Plan</span>
            <span className="font-semibold">{billing.currentPlan}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base-content/70">Billing Cycle</span>
            <span className="font-semibold">{billing.billingCycle}</span>
          </div>

          <div className="divider"></div>

          <div className="bg-primary/10 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-base-content/70">Next Billing Date</span>
              <span className="font-semibold">{formatDate(billing.nextBillingDate)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold">Amount Due</span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(billing.amount)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-base-content/70">Payment Method</span>
            <span className="font-semibold">{billing.paymentMethod}</span>
          </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-outline btn-sm">View Invoices</button>
            <button className="btn btn-primary btn-sm">Update Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}
