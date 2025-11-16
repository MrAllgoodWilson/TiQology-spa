import type { HeroData } from '../../mocks/consumerDashboardMock';

interface HeroCardProps {
  data: HeroData;
}

export default function HeroCard({ data }: HeroCardProps) {
  return (
    <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-3xl font-bold">
          {data.greeting}, {data.userName}! 👋
        </h2>
        <p className="text-lg opacity-90">{data.subtitle}</p>
      </div>
    </div>
  );
}
