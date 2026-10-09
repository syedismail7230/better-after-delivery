import React from 'react';
import { 
  Star, 
  Bookmark, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Award, 
  ArrowRight,
  PlusCircle,
  Scale,
  Lightbulb
} from 'lucide-react';

export default function ProfessorCard({
  professor,
  onSelect,
  onToggleStar,
  onOpenAddReview,
  onToggleCompare,
  isCompared
}) {
  const {
    id,
    name,
    title,
    university,
    department,
    avatar,
    overallRating,
    difficulty,
    wouldTakeAgain,
    totalReviews,
    starred,
    courses = [],
    tags = [],
    metrics = { clarity: 9.0, fairness: 9.0, approachability: 9.0, pacing: 9.0 },
    survivalGuide = {},
    reviews = []
  } = professor;

  // Determine color theme based on 10-point overall rating
  const getScoreClass = (rating) => {
    if (rating >= 9.0) return 'score-high';
    if (rating >= 7.5) return 'score-med';
    if (rating >= 6.0) return 'score-mod';
    return 'score-low';
  };

  // Extract a featured pro-tip from reviews or survival guide
  const featuredProTip = survivalGuide.keySurvivalTip || (reviews[0]?.proTip) || "Attend regular lectures and review past homework problems.";

  return (
    <div className="professor-card glass-panel stagger-in">
      {/* Top Header Row */}
      <div className="card-top-row">
        {/* Score Badge */}
        <div className={`score-badge ${getScoreClass(overallRating)}`}>
          <span className="score-number">{overallRating.toFixed(1)}</span>
          <span className="score-max">/ 10</span>
        </div>

        {/* Action icons: Star & Compare */}
        <div className="card-actions-top">
          <button
            className={`compare-checkbox-btn ${isCompared ? 'compared-active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(professor);
            }}
            title={isCompared ? "Remove from comparison" : "Add to comparison"}
          >
            <Scale size={15} />
            <span className="compare-text">{isCompared ? 'Compared' : 'Compare'}</span>
          </button>

          <button
            className={`star-icon-btn ${starred ? 'starred' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(id);
            }}
            title={starred ? "Remove from starred" : "Save / Star professor"}
          >
            <Bookmark size={18} className={starred ? "fill-amber" : ""} />
          </button>
        </div>
      </div>

      {/* Professor Identity */}
      <div className="prof-identity-section" onClick={() => onSelect(professor)}>
        <div className="avatar-wrapper">
          <img 
            src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`} 
            alt={name} 
            className="prof-avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;
            }}
          />
          <div className="avatar-shield-badge" title="Protected by Anti-Ragging Guard">
            <ShieldCheck size={12} className="text-emerald" />
          </div>
        </div>

        <div className="prof-meta-info">
          <h3 className="prof-name">{name}</h3>
          <p className="prof-title">{title}</p>
          <div className="prof-affiliations">
            <span className="prof-uni">{university}</span>
            <span className="meta-dot">•</span>
            <span className="prof-dept">{department}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Breakdown Matrix */}
      <div className="metrics-compact-grid" onClick={() => onSelect(professor)}>
        <div className="metric-cell">
          <span className="metric-cell-label">Teaching Clarity</span>
          <div className="metric-bar-track">
            <div 
              className="metric-bar-fill fill-emerald" 
              style={{ width: `${(metrics.clarity / 10) * 100}%` }}
            ></div>
          </div>
          <span className="metric-cell-value">{metrics.clarity.toFixed(1)}/10</span>
        </div>

        <div className="metric-cell">
          <span className="metric-cell-label">Grading Fairness</span>
          <div className="metric-bar-track">
            <div 
              className="metric-bar-fill fill-blue" 
              style={{ width: `${(metrics.fairness / 10) * 100}%` }}
            ></div>
          </div>
          <span className="metric-cell-value">{metrics.fairness.toFixed(1)}/10</span>
        </div>

        <div className="metric-cell">
          <span className="metric-cell-label">Difficulty</span>
          <div className="metric-bar-track">
            <div 
              className="metric-bar-fill fill-amber" 
              style={{ width: `${(difficulty / 5) * 100}%` }}
            ></div>
          </div>
          <span className="metric-cell-value">{difficulty.toFixed(1)} / 5</span>
        </div>

        <div className="metric-cell">
          <span className="metric-cell-label">Would Take Again</span>
          <div className="metric-bar-track">
            <div 
              className="metric-bar-fill fill-indigo" 
              style={{ width: `${wouldTakeAgain}%` }}
            ></div>
          </div>
          <span className="metric-cell-value">{wouldTakeAgain}%</span>
        </div>
      </div>

      {/* Courses Taught Preview */}
      <div className="card-courses-strip" onClick={() => onSelect(professor)}>
        <span className="courses-label">Courses:</span>
        <div className="courses-chips-list">
          {courses.slice(0, 2).map((c, i) => (
            <span key={i} className="course-chip">
              {c.split('(')[0].trim()}
            </span>
          ))}
          {courses.length > 2 && (
            <span className="course-more-chip">+{courses.length - 2} more</span>
          )}
        </div>
      </div>

      {/* Highlight Tags */}
      <div className="card-tags-cloud" onClick={() => onSelect(professor)}>
        {tags.slice(0, 3).map((tag, i) => (
          <span key={i} className="card-tag-badge">
            {tag}
          </span>
        ))}
      </div>

      {/* Featured Student Pro-Tip Snippet */}
      <div className="card-protip-box" onClick={() => onSelect(professor)}>
        <div className="protip-header">
          <Lightbulb size={14} className="text-amber" />
          <span className="protip-title">Student Survival Tip:</span>
        </div>
        <p className="protip-text">"{featuredProTip}"</p>
      </div>

      {/* Card Footer Actions */}
      <div className="card-footer">
        <div className="reviews-count-tag" onClick={() => onSelect(professor)}>
          <CheckCircle2 size={13} className="text-emerald" />
          <span>{totalReviews} Anti-Ragging Verified Reviews</span>
        </div>

        <div className="card-footer-btns">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onOpenAddReview(professor);
            }}
            title="Add a 10-point review"
          >
            <PlusCircle size={14} />
            <span>Rate</span>
          </button>

          <button 
            className="btn btn-primary btn-sm view-profile-btn"
            onClick={() => onSelect(professor)}
          >
            <span>Full Profile</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
