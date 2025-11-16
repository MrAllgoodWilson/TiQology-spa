import type { ServiceProvider } from '../../mocks/bookItMock';
import BookItServiceCard from './BookItServiceCard';

interface BookItServiceListProps {
  providers: ServiceProvider[];
}

export default function BookItServiceList({ providers }: BookItServiceListProps) {
  if (providers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-base-content/60">No service providers found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <BookItServiceCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
