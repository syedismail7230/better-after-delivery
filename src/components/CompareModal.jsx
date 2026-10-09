import React from 'react';
import { 
  X, 
  Scale, 
  Trash2, 
  PlusCircle, 
  CheckCircle2, 
  Lightbulb, 
  Award, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function CompareModal({
  comparedProfessors = [],
  onClose,
  onRemoveFromCompare,
  onSelectProfessor,
  onOpenAddReview
}) {
  const getScoreClass = (rating) => {
    if (rating >= 9.0) return 'score-high';
    if (rating >= 7.5) return 'score-med';
    if (rating >= 6.0) return 'score-mod';
    return 'score-low';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card compare-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Header */}
        <div className="compare-header">
          <div className="compare-title-row">
            <Scale size={24} className="text-indigo" />
            <div>
              <h2 className="compare-title">Faculty Course Comparison</h2>
              <p className="compare-subtitle">
                Side-by-side scorecard evaluation to help you pick the best instructor for your schedule.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="compare-grid-container">
          {comparedProfessors.map((prof) => {
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
              metrics = { clarity: 9.0, fairness: 9.0, approachability: 9.0, pacing: 9.0, examPredictability: 9.0 },
              gradeDistribution = { aGrade: 40, bGrade: 40, cGrade: 15, dfGrade: 5 },
              survivalGuide = {}
            } = prof;

            return (
              <div key={id} className="compare-prof-column glass-panel">
                {/* Column Header */}
                <div className="column-top-action">
                  <button 
                    className="btn-remove-compare"
                    onClick={() => onRemoveFromCompare(id)}
                    title="Remove from comparison"
                  >
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                </div>

                <div className="compare-prof-identity">
                  <img 
                    src={avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`} 
                    alt={name}
                    className="compare-avatar"
                  />
                  <h3 className="compare-prof-name">{name}</h3>
                  <p className="compare-prof-uni">{university}</p>
                  <p className="compare-prof-dept">{department}</p>
                </div>

                {/* Score Big Display */}
                <div className="compare-score-box">
                  <div className={`score-badge ${getScoreClass(overallRating)}`}>
                    <span className="score-val">{overallRating.toFixed(1)}</span>
                    <span className="score-out">/ 10</span>
                  </div>
                  <span className="compare-reviews-sub">Based on {totalReviews} reviews</span>
                </div>

                {/* Metric Bars Comparison */}
                <div className="compare-metrics-section">
                  <div className="compare-metric-item">
                    <div className="metric-header-row">
                      <span>Concept Clarity</span>
                      <strong>{metrics.clarity.toFixed(1)}/10</strong>
                    </div>
                    <div className="progress-track-sm">
                      <div className="progress-fill-sm fill-emerald" style={{ width: `${(metrics.clarity / 10) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="compare-metric-item">
                    <div className="metric-header-row">
                      <span>Grading Fairness</span>
                      <strong>{metrics.fairness.toFixed(1)}/10</strong>
                    </div>
                    <div className="progress-track-sm">
                      <div className="progress-fill-sm fill-blue" style={{ width: `${(metrics.fairness / 10) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="compare-metric-item">
                    <div className="metric-header-row">
                      <span>Approachability</span>
                      <strong>{metrics.approachability.toFixed(1)}/10</strong>
                    </div>
                    <div className="progress-track-sm">
                      <div className="progress-fill-sm fill-violet" style={{ width: `${(metrics.approachability / 10) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="compare-metric-item">
                    <div className="metric-header-row">
                      <span>Difficulty (1-5)</span>
                      <strong>{difficulty.toFixed(1)} / 5</strong>
                    </div>
                    <div className="progress-track-sm">
                      <div className="progress-fill-sm fill-amber" style={{ width: `${(difficulty / 5) * 100}%` }}></div>
                    </div>
                  </div>

                  <div className="compare-metric-item">
                    <div className="metric-header-row">
                      <span>Would Take Again</span>
                      <strong>{wouldTakeAgain}%</strong>
                    </div>
                    <div className="progress-track-sm">
                      <div className="progress-fill-sm fill-cyan" style={{ width: `${wouldTakeAgain}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Grade Distribution Bar */}
                <div className="compare-grades-box">
                  <span className="compare-grades-title">Grade Est. (A / B / C / DF)</span>
                  <div className="stacked-grade-bar">
                    <div className="stacked-segment seg-a" style={{ width: `${gradeDistribution.aGrade}%` }} title={`A: ${gradeDistribution.aGrade}%`}>
                      {gradeDistribution.aGrade}%
                    </div>
                    <div className="stacked-segment seg-b" style={{ width: `${gradeDistribution.bGrade}%` }} title={`B: ${gradeDistribution.bGrade}%`}>
                      {gradeDistribution.bGrade}%
                    </div>
                    <div className="stacked-segment seg-c" style={{ width: `${gradeDistribution.cGrade}%` }} title={`C: ${gradeDistribution.cGrade}%`}>
                      {gradeDistribution.cGrade}%
                    </div>
                  </div>
                </div>

                {/* Survival Advice Preview */}
                <div className="compare-advice-box">
                  <div className="advice-label">
                    <Lightbulb size={14} className="text-amber" />
                    <span>Survival Strategy:</span>
                  </div>
                  <p className="advice-text">
                    "{survivalGuide.keySurvivalTip || 'Complete problem sets early and attend recitations.'}"
                  </p>
                </div>

                {/* Column Action */}
                <div className="compare-column-footer">
                  <button 
                    className="btn btn-primary btn-sm btn-full"
                    onClick={() => {
                      onClose();
                      onSelectProfessor(prof);
                    }}
                  >
                    <span>View Profile</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
