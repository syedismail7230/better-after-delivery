import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Lightbulb, 
  ThumbsUp, 
  PlusCircle, 
  GraduationCap, 
  BarChart3, 
  HelpCircle, 
  Clock, 
  BookMarked,
  Layers,
  FileCheck
} from 'lucide-react';

export default function ProfessorDetailModal({
  professor,
  onClose,
  onToggleStar,
  onOpenAddReview,
  onUpvoteReview
}) {
  const [activeTab, setActiveTab] = useState('scorecard'); // 'scorecard' | 'survival' | 'reviews'
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('All');
  const [reviewsSort, setReviewsSort] = useState('helpful');

  if (!professor) return null;

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
    metrics = { clarity: 9.0, fairness: 9.0, approachability: 9.0, pacing: 9.0, examPredictability: 9.0 },
    gradeDistribution = { aGrade: 40, bGrade: 40, cGrade: 15, dfGrade: 5 },
    survivalGuide = {},
    reviews = []
  } = professor;

  const getScoreClass = (rating) => {
    if (rating >= 9.0) return 'score-high';
    if (rating >= 7.5) return 'score-med';
    if (rating >= 6.0) return 'score-mod';
    return 'score-low';
  };

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(r => selectedCourseFilter === 'All' || r.course === selectedCourseFilter)
    .sort((a, b) => {
      if (reviewsSort === 'helpful') return (b.upvotes || 0) - (a.upvotes || 0);
      if (reviewsSort === 'highest') return b.rating - a.rating;
      if (reviewsSort === 'lowest') return a.rating - b.rating;
      return 0;
    });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card prof-detail-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Header Profile Banner */}
        <div className="prof-modal-header">
          <div className="prof-modal-header-main">
            <div className="avatar-wrapper-lg">
              <img 
                src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`} 
                alt={name}
                className="prof-avatar-lg"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;
                }}
              />
              <div className="avatar-shield-badge-lg" title="Faculty Protected by Anti-Ragging Guard">
                <ShieldCheck size={16} className="text-emerald" />
              </div>
            </div>

            <div className="prof-header-text">
              <div className="prof-title-badge-row">
                <span className="prof-uni-pill">{university}</span>
                <span className="prof-dept-pill">{department}</span>
                <span className="anti-ragging-verified-pill">
                  <ShieldCheck size={13} className="text-emerald" /> Anti-Ragging Verified
                </span>
              </div>
              <h2 className="prof-detail-name">{name}</h2>
              <p className="prof-detail-title">{title}</p>
            </div>
          </div>

          {/* Top Score Box & Actions */}
          <div className="prof-modal-score-box">
            <div className={`score-badge-huge ${getScoreClass(overallRating)}`}>
              <div className="score-huge-val">{overallRating.toFixed(1)}</div>
              <div className="score-huge-sub">
                <span>out of 10.0</span>
                <span className="reviews-sub-count">({totalReviews} reviews)</span>
              </div>
            </div>

            <div className="header-action-buttons">
              <button
                className={`btn btn-secondary ${starred ? 'btn-starred-active' : ''}`}
                onClick={() => onToggleStar(id)}
              >
                <Bookmark size={16} className={starred ? "fill-amber text-amber" : ""} />
                <span>{starred ? 'Saved' : 'Save'}</span>
              </button>

              <button
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  onOpenAddReview(professor);
                }}
              >
                <PlusCircle size={16} />
                <span>Rate Prof</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-tabs-nav">
          <button
            className={`modal-tab-btn ${activeTab === 'scorecard' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('scorecard')}
          >
            <BarChart3 size={16} />
            <span>10-Point Scorecard & Grades</span>
          </button>

          <button
            className={`modal-tab-btn ${activeTab === 'survival' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('survival')}
          >
            <BookOpen size={16} />
            <span>Course Survival Blueprint</span>
          </button>

          <button
            className={`modal-tab-btn ${activeTab === 'reviews' ? 'active-tab' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <CheckCircle2 size={16} />
            <span>Student Reviews & Tips ({reviews.length})</span>
          </button>
        </div>

        {/* Modal Tab Contents */}
        <div className="modal-tab-body">
          {/* TAB 1: 10-Point Scorecard & Grade Distribution */}
          {activeTab === 'scorecard' && (
            <div className="tab-pane scorecard-pane">
              <div className="scorecard-two-col-grid">
                {/* Left: Detailed Metric Bars */}
                <div className="glass-panel metric-breakdown-panel">
                  <h4 className="panel-subheading">
                    <Award size={18} className="text-indigo" />
                    <span>Academic Performance Breakdown</span>
                  </h4>

                  <div className="detailed-metrics-list">
                    <div className="detailed-metric-row">
                      <div className="metric-info">
                        <span className="metric-title">Concept Clarity & Explanations</span>
                        <span className="metric-score-text">{metrics.clarity.toFixed(1)} / 10</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill fill-emerald" style={{ width: `${(metrics.clarity / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="detailed-metric-row">
                      <div className="metric-info">
                        <span className="metric-title">Grading Fairness & Transparency</span>
                        <span className="metric-score-text">{metrics.fairness.toFixed(1)} / 10</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill fill-blue" style={{ width: `${(metrics.fairness / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="detailed-metric-row">
                      <div className="metric-info">
                        <span className="metric-title">Approachability & Office Hours</span>
                        <span className="metric-score-text">{metrics.approachability.toFixed(1)} / 10</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill fill-violet" style={{ width: `${(metrics.approachability / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="detailed-metric-row">
                      <div className="metric-info">
                        <span className="metric-title">Course Pacing & Manageable Workload</span>
                        <span className="metric-score-text">{metrics.pacing.toFixed(1)} / 10</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill fill-cyan" style={{ width: `${(metrics.pacing / 10) * 100}%` }}></div>
                      </div>
                    </div>

                    <div className="detailed-metric-row">
                      <div className="metric-info">
                        <span className="metric-title">Exam Predictability (No Trick Surprises)</span>
                        <span className="metric-score-text">{(metrics.examPredictability || 9.0).toFixed(1)} / 10</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill fill-amber" style={{ width: `${((metrics.examPredictability || 9.0) / 10) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Highlights */}
                  <div className="quick-stats-row">
                    <div className="quick-stat-box">
                      <span className="stat-label">Course Difficulty</span>
                      <span className="stat-value text-amber">{difficulty.toFixed(1)} / 5</span>
                      <span className="stat-sub">{difficulty > 4 ? 'Rigorous' : difficulty > 3 ? 'Moderate' : 'Smooth'}</span>
                    </div>

                    <div className="quick-stat-box">
                      <span className="stat-label">Would Take Again</span>
                      <span className="stat-value text-emerald">{wouldTakeAgain}%</span>
                      <span className="stat-sub">Student Consensus</span>
                    </div>
                  </div>
                </div>

                {/* Right: Grade Distribution Graph */}
                <div className="glass-panel grade-dist-panel">
                  <h4 className="panel-subheading">
                    <GraduationCap size={18} className="text-emerald" />
                    <span>Estimated Grade Distribution</span>
                  </h4>

                  <div className="grade-bars-container">
                    <div className="grade-bar-column">
                      <div className="grade-bar-val">{gradeDistribution.aGrade}%</div>
                      <div className="grade-bar-visual-track">
                        <div 
                          className="grade-bar-visual-fill fill-grade-a" 
                          style={{ height: `${gradeDistribution.aGrade}%` }}
                        ></div>
                      </div>
                      <span className="grade-label">A / A-</span>
                    </div>

                    <div className="grade-bar-column">
                      <div className="grade-bar-val">{gradeDistribution.bGrade}%</div>
                      <div className="grade-bar-visual-track">
                        <div 
                          className="grade-bar-visual-fill fill-grade-b" 
                          style={{ height: `${gradeDistribution.bGrade}%` }}
                        ></div>
                      </div>
                      <span className="grade-label">B+ / B / B-</span>
                    </div>

                    <div className="grade-bar-column">
                      <div className="grade-bar-val">{gradeDistribution.cGrade}%</div>
                      <div className="grade-bar-visual-track">
                        <div 
                          className="grade-bar-visual-fill fill-grade-c" 
                          style={{ height: `${gradeDistribution.cGrade}%` }}
                        ></div>
                      </div>
                      <span className="grade-label">C Range</span>
                    </div>

                    <div className="grade-bar-column">
                      <div className="grade-bar-val">{gradeDistribution.dfGrade}%</div>
                      <div className="grade-bar-visual-track">
                        <div 
                          className="grade-bar-visual-fill fill-grade-df" 
                          style={{ height: `${gradeDistribution.dfGrade}%` }}
                        ></div>
                      </div>
                      <span className="grade-label">D / F</span>
                    </div>
                  </div>

                  {/* All Professor Tags */}
                  <div className="prof-tags-section">
                    <h5 className="tags-section-title">Community Tags:</h5>
                    <div className="tags-cloud-large">
                      {tags.map((tag, i) => (
                        <span key={i} className="large-tag-pill">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Courses Taught */}
                  <div className="courses-list-section">
                    <h5 className="tags-section-title">Courses Taught:</h5>
                    <div className="courses-tags-cloud">
                      {courses.map((c, i) => (
                        <span key={i} className="course-code-pill">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Course Survival Blueprint & Advice */}
          {activeTab === 'survival' && (
            <div className="tab-pane survival-pane">
              <div className="survival-hero-alert">
                <div className="alert-icon-wrap">
                  <Lightbulb size={24} className="text-amber" />
                </div>
                <div>
                  <h4 className="alert-title">Master Survival Tip for {name}:</h4>
                  <p className="alert-text">
                    "{survivalGuide.keySurvivalTip || 'Stay consistent with weekly problem sets and make use of discussion forums.'}"
                  </p>
                </div>
              </div>

              <div className="survival-grid">
                <div className="survival-card glass-panel">
                  <div className="survival-card-header">
                    <Clock size={18} className="text-indigo" />
                    <h4>Attendance Policy Reality</h4>
                  </div>
                  <p className="survival-card-body">
                    {survivalGuide.attendanceNote || 'Attendance is recommended for continuous understanding of problem sets.'}
                  </p>
                </div>

                <div className="survival-card glass-panel">
                  <div className="survival-card-header">
                    <BookMarked size={18} className="text-emerald" />
                    <h4>Textbook Necessity</h4>
                  </div>
                  <p className="survival-card-body">
                    {survivalGuide.textbookNeeded || 'Check syllabus for required vs optional reference texts.'}
                  </p>
                </div>

                <div className="survival-card glass-panel">
                  <div className="survival-card-header">
                    <FileCheck size={18} className="text-blue" />
                    <h4>Exam Style & Format</h4>
                  </div>
                  <p className="survival-card-body">
                    {survivalGuide.examStyle || 'Exams focus on conceptual application, lecture examples, and homework assignments.'}
                  </p>
                </div>

                <div className="survival-card glass-panel">
                  <div className="survival-card-header">
                    <Sparkles size={18} className="text-violet" />
                    <h4>Office Hours Effectiveness</h4>
                  </div>
                  <p className="survival-card-body">
                    {survivalGuide.officeHoursValue || 'Office hours are recommended for homework debugging and exam review.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Student Reviews & Pro-Tips Feed */}
          {activeTab === 'reviews' && (
            <div className="tab-pane reviews-pane">
              {/* Filter & Sort Bar for Reviews */}
              <div className="reviews-filter-bar">
                <div className="course-select-group">
                  <label>Filter by Course:</label>
                  <select 
                    value={selectedCourseFilter}
                    onChange={(e) => setSelectedCourseFilter(e.target.value)}
                    className="review-course-select"
                  >
                    <option value="All">All Courses ({reviews.length})</option>
                    {courses.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="reviews-sort-group">
                  <label>Sort by:</label>
                  <select 
                    value={reviewsSort}
                    onChange={(e) => setReviewsSort(e.target.value)}
                    className="review-course-select"
                  >
                    <option value="helpful">Most Helpful Upvotes</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>

                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    onClose();
                    onOpenAddReview(professor);
                  }}
                >
                  <PlusCircle size={14} />
                  <span>Write a Review</span>
                </button>
              </div>

              {/* Reviews List */}
              <div className="reviews-feed-list">
                {filteredReviews.length === 0 ? (
                  <div className="empty-reviews-state">
                    <p>No reviews found matching the current course filter.</p>
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <div key={rev.id} className="review-item-card glass-panel">
                      {/* Review Top Line */}
                      <div className="review-top-line">
                        <div className="review-author-meta">
                          <div className={`score-badge ${getScoreClass(rev.rating)}`}>
                            {rev.rating.toFixed(1)} / 10
                          </div>
                          <div>
                            <div className="review-author-name">{rev.authorMoniker || 'Verified Student'}</div>
                            <div className="review-course-date">
                              <span>{rev.course}</span> • <span>{rev.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Verified Badge */}
                        <div className="review-verified-badge" title="Verified Safe by Anti-Ragging Guard">
                          <ShieldCheck size={14} className="text-emerald" />
                          <span>Constructive Feedback Verified</span>
                        </div>
                      </div>

                      {/* Course Attributes Badges */}
                      <div className="review-meta-pills">
                        {rev.gradeEarned && (
                          <span className="review-meta-pill grade-earned-pill">
                            Grade: <strong>{rev.gradeEarned}</strong>
                          </span>
                        )}
                        <span className="review-meta-pill">
                          Attendance: {rev.attendanceMandatory ? 'Mandatory' : 'Flexible'}
                        </span>
                        <span className="review-meta-pill">
                          Textbook: {rev.textbookUsed ? 'Required' : 'Optional'}
                        </span>
                      </div>

                      {/* Tags */}
                      {rev.tags && rev.tags.length > 0 && (
                        <div className="review-tags-list">
                          {rev.tags.map((t, i) => (
                            <span key={i} className="review-tag-chip">{t}</span>
                          ))}
                        </div>
                      )}

                      {/* Main Comment */}
                      <p className="review-main-text">{rev.comment}</p>

                      {/* Highlighted Pro-Tip */}
                      {rev.proTip && (
                        <div className="review-protip-callout">
                          <Lightbulb size={16} className="text-amber" />
                          <div>
                            <strong>Student Survival Tip:</strong>
                            <p>{rev.proTip}</p>
                          </div>
                        </div>
                      )}

                      {/* Review Footer Upvote */}
                      <div className="review-item-footer">
                        <button
                          className={`btn-helpful ${rev.isHelpful ? 'btn-helpful-active' : ''}`}
                          onClick={() => onUpvoteReview(professor.id, rev.id)}
                        >
                          <ThumbsUp size={14} />
                          <span>Helpful ({rev.upvotes || 0})</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
