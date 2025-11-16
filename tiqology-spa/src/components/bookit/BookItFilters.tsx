export default function BookItFilters() {
  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        <h2 className="card-title text-lg mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select className="select select-bordered w-full">
              <option value="">All Categories</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="design">UI/UX Design</option>
              <option value="data">Data Science</option>
              <option value="content">Content Writing</option>
              <option value="devops">DevOps</option>
              <option value="marketing">Digital Marketing</option>
              <option value="security">Cybersecurity</option>
              <option value="graphic">Graphic Design</option>
              <option value="pm">Project Management</option>
              <option value="video">Video Production</option>
              <option value="backend">Backend Development</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Availability</span>
            </label>
            <select className="select select-bordered w-full">
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price Range ($/hr)</span>
            </label>
            <select className="select select-bordered w-full">
              <option value="">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-75">$51 - $75</option>
              <option value="76-100">$76 - $100</option>
              <option value="100+">$100+</option>
            </select>
          </div>
        </div>

        {/* Verified Only Checkbox */}
        <div className="form-control mt-4">
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text">Verified providers only</span>
          </label>
        </div>
      </div>
    </div>
  );
}
