import { serviceProviders } from '../mocks/bookItMock';
import BookItFilters from '../components/bookit/BookItFilters';
import BookItServiceList from '../components/bookit/BookItServiceList';

export default function BookItPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">BookIt Services Marketplace</h1>
        <p className="text-gray-600 mt-2">
          Browse and book professional services from verified providers
        </p>
      </div>

      {/* Filters Section */}
      <BookItFilters />

      {/* Services List */}
      <BookItServiceList providers={serviceProviders} />
    </div>
  );
}
