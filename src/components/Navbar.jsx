import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Bookmark, 
  PlusCircle, 
  Sun, 
  Moon, 
  Search, 
  Scale, 
  Sparkles,
  UserPlus
} from 'lucide-react';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  selectedUniversity,
  setSelectedUniversity,
  universities,
  starredCount,
  onOpenStarred,
  onOpenAntiRagging,
  onOpenAddProfessor,
  onOpenAddReview,
  onOpenCompare,
  compareCount,
  theme,
  toggleTheme
}) {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <div className="brand-logo-icon">
            <GraduationCap className="icon-graduation" size={24} />
            <span className="pulse-dot" title="Live Anti-Ragging Active"></span>
          </div>
          <div className="brand-titles">
            <div className="brand-main-row">
              <h1 className="brand-title">Prof<span>Pulse</span></h1>
              <span className="student-badge">
                <Sparkles size={11} /> Student Safe Space
              </span>
            </div>
            <p className="brand-subtitle">Constructive Ratings & Survival Guide</p>
          </div>
        </div>

        {/* Quick Search & University Filter */}
        <div className="navbar-search-wrapper">
          <div className="search-input-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search professor, course (e.g. CS161), department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <select 
            className="navbar-uni-select"
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
          >
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Anti-Ragging Shield Badge */}
          <button 
            className="anti-ragging-btn anti-ragging-pulse"
            onClick={onOpenAntiRagging}
            title="View Anti-Ragging Community Standards"
          >
            <ShieldCheck size={16} className="text-emerald" />
            <span className="anti-ragging-text">Anti-Ragging Guard</span>
            <span className="shield-status-dot"></span>
          </button>

          {/* Compare Button */}
          {compareCount > 0 && (
            <button 
              className="btn btn-secondary compare-nav-btn"
              onClick={onOpenCompare}
              title="Compare selected professors"
            >
              <Scale size={16} />
              <span>Compare</span>
              <span className="compare-badge">{compareCount}</span>
            </button>
          )}

          {/* Starred Drawer Toggle */}
          <button 
            className="btn btn-ghost starred-nav-btn"
            onClick={onOpenStarred}
            title="Saved / Starred Professors"
          >
            <Bookmark size={18} className={starredCount > 0 ? "fill-amber" : ""} />
            <span className="desktop-only">Starred</span>
            {starredCount > 0 && <span className="starred-badge">{starredCount}</span>}
          </button>

          {/* Add Professor */}
          <button 
            className="btn btn-secondary add-prof-btn"
            onClick={onOpenAddProfessor}
            title="Add a new professor to directory"
          >
            <UserPlus size={16} />
            <span className="desktop-only">Add Prof</span>
          </button>

          {/* Rate Professor Button */}
          <button 
            className="btn btn-primary rate-nav-btn"
            onClick={() => onOpenAddReview(null)}
          >
            <PlusCircle size={16} />
            <span>Rate Prof</span>
          </button>

          {/* Theme Toggle */}
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
