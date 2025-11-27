import { useState } from 'react';

interface FilterBarProps {
  onFilterChange: (filters: {
    category: string;
    type: string;
    readStatus: string;
  }) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [category, setCategory] = useState('all');
  const [type, setType] = useState('all');
  const [readStatus, setReadStatus] = useState('all');

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    onFilterChange({ category: newCategory, type, readStatus });
  };

  const handleTypeChange = (newType: string) => {
    setType(newType);
    onFilterChange({ category, type: newType, readStatus });
  };

  const handleReadStatusChange = (newReadStatus: string) => {
    setReadStatus(newReadStatus);
    onFilterChange({ category, type, readStatus: newReadStatus });
  };

  return (
    <div className="card bg-base-100 shadow-xl mb-6">
      <div className="card-body">
        <h3 className="card-title text-lg">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Category Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="system">System</option>
              <option value="payment">Payment</option>
              <option value="security">Security</option>
              <option value="mission">Mission</option>
              <option value="social">Social</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Type</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={type}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          {/* Read Status Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Status</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={readStatus}
              onChange={(e) => handleReadStatusChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
