import type { ServiceProvider } from '../../mocks/bookItMock';

interface BookItServiceCardProps {
  provider: ServiceProvider;
}

export default function BookItServiceCard({ provider }: BookItServiceCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="card-body">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-16 h-16 rounded-full">
              <img src={provider.imageUrl} alt={provider.name} />
            </div>
          </div>

          {/* Provider Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="card-title text-lg">{provider.name}</h3>
              {provider.verified && (
                <div className="badge badge-primary badge-sm">Verified</div>
              )}
            </div>
            <p className="text-sm text-base-content/70 mb-2">{provider.category}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="rating rating-sm">
                {[...Array(5)].map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    name={`rating-${provider.id}`}
                    className="mask mask-star-2 bg-orange-400"
                    checked={i < Math.floor(provider.rating)}
                    readOnly
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{provider.rating}</span>
              <span className="text-sm text-base-content/60">
                ({provider.reviewCount} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-sm mb-3">{provider.description}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {provider.skills.map((skill) => (
                <span key={skill} className="badge badge-outline badge-sm">
                  {skill}
                </span>
              ))}
            </div>

            {/* Footer Info */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-base-300">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="text-base-content/60">Location:</span>{' '}
                  <span className="font-medium">{provider.location}</span>
                </div>
                <div className={`badge ${
                  provider.availability === 'Available' 
                    ? 'badge-success' 
                    : 'badge-warning'
                }`}>
                  {provider.availability}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  ${provider.hourlyRate}
                  <span className="text-sm font-normal text-base-content/60">/hr</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary btn-sm">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
