import type { Snapshot } from '../../stores/snapshotStore';

interface Props {
  data: Snapshot;
}

export default function PostsCard({ data }: Props) {
  const { posts } = data;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl font-extrabold">
          Posts 🎯
        </h2>

        <div className="space-y-4 mt-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-base-300 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-base-content/70">{post.content}</p>
                </div>
                <div className="badge badge-accent">{post.post_type}</div>
              </div>
              
              {/* <div className="flex items-center gap-2">
                <progress
                  className="progress progress-primary w-full"
                  value={mission.progress}
                  max="100"
                ></progress>
                <span className="text-sm font-semibold">{mission.progress}%</span>
              </div> */}
              
              {post.published_at && (
                <p className="text-xs text-base-content/60 mt-2">
                  Due: {new Date(post.published_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">View All Missions</button>
        </div> */}
      </div>
    </div>
  );
}
