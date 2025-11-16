import type { AskKikiData } from '../../mocks/consumerDashboardMock';

interface AskKikiCardProps {
  data: AskKikiData;
}

export default function AskKikiCard({ data }: AskKikiCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          {data.title} ✨
        </h2>
        <p className="text-sm text-base-content/70">{data.description}</p>
        
        <div className="form-control mt-4">
          <input
            type="text"
            placeholder={data.placeholder}
            className="input input-bordered w-full"
          />
          <button className="btn btn-primary mt-2">Ask Kiki</button>
        </div>

        <div className="divider">Quick Suggestions</div>
        
        <div className="flex flex-wrap gap-2">
          {data.suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="btn btn-sm btn-outline btn-primary"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
