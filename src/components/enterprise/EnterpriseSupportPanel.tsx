interface EnterpriseSupportPanelProps {
  support: {
    plan: string;
    responseTime: string;
    email: string;
    phone: string;
    availableHours: string;
    accountManager: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

export default function EnterpriseSupportPanel({ support }: EnterpriseSupportPanelProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Enterprise Support</h2>

        <div className="space-y-4">
          <div className="bg-success/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold">{support.plan}</span>
            </div>
            <p className="text-sm text-base-content/70">
              Response Time: <span className="font-semibold">{support.responseTime}</span>
            </p>
            <p className="text-sm text-base-content/70">
              Available: <span className="font-semibold">{support.availableHours}</span>
            </p>
          </div>

          <div className="divider">Contact Support</div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm text-base-content/70">Email</p>
                <a href={`mailto:${support.email}`} className="link link-primary">
                  {support.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="text-sm text-base-content/70">Phone</p>
                <a href={`tel:${support.phone}`} className="link link-primary">
                  {support.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="divider">Account Manager</div>

          <div className="bg-base-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-12">
                  <span className="text-lg">{support.accountManager.name.charAt(0)}</span>
                </div>
              </div>
              <div>
                <p className="font-semibold">{support.accountManager.name}</p>
                <p className="text-sm text-base-content/70">Your Account Manager</p>
              </div>
            </div>
            <div className="space-y-2">
              <a href={`mailto:${support.accountManager.email}`} className="text-sm link link-primary block">
                {support.accountManager.email}
              </a>
              <a href={`tel:${support.accountManager.phone}`} className="text-sm link link-primary block">
                {support.accountManager.phone}
              </a>
            </div>
          </div>

          <button className="btn btn-primary w-full">Open Support Ticket</button>
        </div>
      </div>
    </div>
  );
}
