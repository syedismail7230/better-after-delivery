import React from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Tag as TagIcon, 
  RotateCcw, 
  Check, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function FilterBar({
  departments,
  selectedDepartment,
  setSelectedDepartment,
  sortBy,
  setSortBy,
  selectedTags,
  toggleTag,
  availableTags,
  totalResults,
  onResetFilters,
  isFiltered
}) {
  return (
    <div className="filter-section-container">
      {/* Top Bar: Department Horizontal Chips & Sort */}
      <div className="filter-header-row">
        <div className="filter-title-group">
          <div className="filter-indicator">
            <Layers size={16} className="text-indigo" />
            <span className="filter-count-text">
              Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'Professor' : 'Professors'}
            </span>
          </div>

          {isFiltered && (
            <button 
              className="btn btn-ghost btn-sm reset-filter-btn"
              onClick={onResetFilters}
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="sort-controls-box">
          <ArrowUpDown size={15} className="sort-icon" />
          <span className="sort-label">Sort:</span>
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="highest_rating">Highest Rated (10/10 Score)</option>
            <option value="take_again">Highest "Take Again" %</option>
            <option value="easiest">Easiest Difficulty (Low Stress)</option>
            <option value="hardest">Most Rigorous / Challenging</option>
            <option value="most_reviews">Most Reviewed & Discussed</option>
            <option value="clarity">Best Teaching Clarity</option>
            <option value="fairness">Highest Grading Fairness</option>
          </select>
        </div>
      </div>

      {/* Department Tabs */}
      <div className="department-chips-wrapper">
        <div className="department-chips-scroll">
          {departments.map((dept) => {
            const isSelected = selectedDepartment === dept;
            return (
              <button
                key={dept}
                className={`dept-chip ${isSelected ? 'dept-chip-active' : ''}`}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Tag Badges Filter */}
      <div className="tags-filter-row">
        <div className="tags-label-group">
          <TagIcon size={14} className="text-muted" />
          <span className="tags-label">Filter by student tags:</span>
        </div>
        
        <div className="tags-chips-list">
          {availableTags.slice(0, 8).map((tag) => {
            const isTagActive = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                className={`tag-filter-chip ${isTagActive ? 'tag-filter-chip-active' : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {isTagActive && <Check size={12} />}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
