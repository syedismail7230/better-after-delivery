import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Lightbulb, 
  Sliders, 
  GraduationCap, 
  HeartHandshake,
  Info,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { analyzeReviewQuality } from '../data/antiRaggingFilter';
import { AVAILABLE_TAGS } from '../data/professorsData';

export default function AddReviewModal({
  professors = [],
  selectedProfessor,
  onClose,
  onSubmitReview
}) {
  const [targetProfId, setTargetProfId] = useState(selectedProfessor ? selectedProfessor.id : (professors[0]?.id || ''));
  const currentProf = professors.find(p => p.id === targetProfId) || professors[0];

  // Form Fields
  const [course, setCourse] = useState(currentProf?.courses[0] || 'CS101 (Intro to CS)');
  const [customCourse, setCustomCourse] = useState('');
  const [authorMoniker, setAuthorMoniker] = useState('Sophomore Student');
  const [gradeEarned, setGradeEarned] = useState('A');
  const [attendanceMandatory, setAttendanceMandatory] = useState(false);
  const [textbookUsed, setTextbookUsed] = useState(false);
  const [wouldTakeAgain, setWouldTakeAgain] = useState(true);

  // 10-Point Scorecard Sliders
  const [overallRating, setOverallRating] = useState(9.0);
  const [clarity, setClarity] = useState(9.0);
  const [fairness, setFairness] = useState(9.0);
  const [approachability, setApproachability] = useState(9.0);
  const [pacing, setPacing] = useState(8.5);
  const [difficulty, setDifficulty] = useState(3.5);

  // Comments and Survival Pro-Tip
  const [comment, setComment] = useState('');
  const [proTip, setProTip] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Clear Explanations']);

  // Real-time Anti-Ragging Guard Analysis State
  const [analysis, setAnalysis] = useState(() => analyzeReviewQuality(''));

  useEffect(() => {
    const combinedText = `${comment} ${proTip}`;
    const result = analyzeReviewQuality(combinedText);
    setAnalysis(result);
  }, [comment, proTip]);

  // Update default course when professor changes
  useEffect(() => {
    if (currentProf?.courses?.length > 0) {
      setCourse(currentProf.courses[0]);
    }
  }, [targetProfId]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!analysis.isAllowed) return;

    const finalCourseName = course === 'OTHER' ? (customCourse || 'General Coursework') : course;

    const newReview = {
      id: `rev-${Date.now()}`,
      authorMoniker: authorMoniker || 'Verified Student',
      course: finalCourseName,
      date: 'Current Term',
      rating: parseFloat(overallRating),
      gradeEarned,
      attendanceMandatory,
      textbookUsed,
      upvotes: 1,
      isHelpful: false,
      tags: selectedTags,
      comment: comment.trim(),
      proTip: proTip.trim(),
      antiRaggingVerified: true
    };

    const reviewMetrics = {
      overallRating: parseFloat(overallRating),
      clarity: parseFloat(clarity),
      fairness: parseFloat(fairness),
      approachability: parseFloat(approachability),
      pacing: parseFloat(pacing),
      difficulty: parseFloat(difficulty),
      wouldTakeAgain: wouldTakeAgain ? 100 : 0
    };

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    onSubmitReview(targetProfId, newReview, reviewMetrics);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card add-review-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="add-review-header">
          <div className="header-badge-row">
            <span className="anti-ragging-live-tag">
              <ShieldCheck size={14} className="text-emerald" /> Live Anti-Ragging Active
            </span>
            <span className="safe-space-pill">100% Student-Safe Space</span>
          </div>

          <h2 className="add-review-title">
            Rate Professor <span className="gradient-text">{currentProf?.name || 'Faculty Member'}</span>
          </h2>
          <p className="add-review-subtitle">
            Share balanced 10-point ratings and actionable survival advice for upcoming students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="add-review-form">
          {/* Target Professor Selection */}
          <div className="form-group-section">
            <label className="form-section-label">Select Professor:</label>
            <select
              className="form-select-lg"
              value={targetProfId}
              onChange={(e) => setTargetProfId(e.target.value)}
            >
              {professors.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.university} ({p.department})
                </option>
              ))}
            </select>
          </div>

          {/* 10-Point Scorecard Sliders */}
          <div className="form-group-section sliders-section">
            <div className="section-title-with-badge">
              <Sliders size={18} className="text-indigo" />
              <h4>10-Point Multi-Metric Scorecard</h4>
            </div>

            <div className="sliders-grid">
              {/* Overall Score */}
              <div className="slider-item slider-item-highlight">
                <div className="slider-label-row">
                  <span className="slider-label-name">Overall Rating</span>
                  <span className="slider-value-display text-emerald">{overallRating} / 10</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={overallRating}
                  onChange={(e) => setOverallRating(e.target.value)}
                  className="custom-range range-emerald"
                />
              </div>

              {/* Teaching Clarity */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span className="slider-label-name">Teaching & Explanation Clarity</span>
                  <span className="slider-value-display">{clarity} / 10</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={clarity}
                  onChange={(e) => setClarity(e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Grading Fairness */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span className="slider-label-name">Grading Fairness & Transparency</span>
                  <span className="slider-value-display">{fairness} / 10</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={fairness}
                  onChange={(e) => setFairness(e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Approachability */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span className="slider-label-name">Approachability in Office Hours</span>
                  <span className="slider-value-display">{approachability} / 10</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={approachability}
                  onChange={(e) => setApproachability(e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Course Pacing */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span className="slider-label-name">Pacing & Workload Balance</span>
                  <span className="slider-value-display">{pacing} / 10</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={pacing}
                  onChange={(e) => setPacing(e.target.value)}
                  className="custom-range"
                />
              </div>

              {/* Difficulty */}
              <div className="slider-item">
                <div className="slider-label-row">
                  <span className="slider-label-name">Course Difficulty (1 easy to 5 brutal)</span>
                  <span className="slider-value-display text-amber">{difficulty} / 5</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="custom-range range-amber"
                />
              </div>
            </div>
          </div>

          {/* Course Experience Details */}
          <div className="form-group-section">
            <h4 className="form-sub-title">Course Experience Details</h4>
            <div className="form-row-3col">
              <div className="form-field">
                <label>Course Taken:</label>
                <select 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="form-input"
                >
                  {currentProf?.courses?.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                  <option value="OTHER">Other / Custom Course</option>
                </select>
                {course === 'OTHER' && (
                  <input
                    type="text"
                    placeholder="Enter Course Code (e.g. CS250)"
                    value={customCourse}
                    onChange={(e) => setCustomCourse(e.target.value)}
                    className="form-input mt-2"
                  />
                )}
              </div>

              <div className="form-field">
                <label>Grade Earned:</label>
                <select 
                  value={gradeEarned}
                  onChange={(e) => setGradeEarned(e.target.value)}
                  className="form-input"
                >
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="Pass">Pass / Credit</option>
                  <option value="Drop">Dropped</option>
                </select>
              </div>

              <div className="form-field">
                <label>Student Moniker:</label>
                <select 
                  value={authorMoniker}
                  onChange={(e) => setAuthorMoniker(e.target.value)}
                  className="form-input"
                >
                  <option value="Freshman Student">Freshman Student</option>
                  <option value="Sophomore Student">Sophomore Student</option>
                  <option value="Junior Student">Junior Student</option>
                  <option value="Senior Major">Senior Major</option>
                  <option value="Graduate Student">Graduate Student</option>
                  <option value="Alumni Reviewer">Alumni Reviewer</option>
                </select>
              </div>
            </div>

            {/* Quick Toggle Checks */}
            <div className="toggles-row">
              <label className="checkbox-toggle">
                <input
                  type="checkbox"
                  checked={attendanceMandatory}
                  onChange={(e) => setAttendanceMandatory(e.target.checked)}
                />
                <span>Attendance was Mandatory</span>
              </label>

              <label className="checkbox-toggle">
                <input
                  type="checkbox"
                  checked={textbookUsed}
                  onChange={(e) => setTextbookUsed(e.target.checked)}
                />
                <span>Textbook was Required</span>
              </label>

              <label className="checkbox-toggle">
                <input
                  type="checkbox"
                  checked={wouldTakeAgain}
                  onChange={(e) => setWouldTakeAgain(e.target.checked)}
                />
                <span>Would Take this Professor Again</span>
              </label>
            </div>
          </div>

          {/* Select Tags */}
          <div className="form-group-section">
            <label className="form-section-label">Select Tags (up to 5):</label>
            <div className="tags-selector-cloud">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-select-pill ${isSelected ? 'tag-select-pill-active' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Constructive Review Text with Live Anti-Ragging Analyzer */}
          <div className="form-group-section review-text-section">
            <div className="section-title-with-badge">
              <HeartHandshake size={18} className="text-emerald" />
              <h4>Constructive Course Review & Insights</h4>
            </div>

            <p className="textarea-help-text">
              Explain teaching methodology, homework structure, exam fairness, and classroom atmosphere. 
              Avoid personal insults or physical commentary.
            </p>

            <textarea
              className={`review-textarea ${analysis.status === 'blocked' ? 'textarea-blocked' : analysis.status === 'warning' ? 'textarea-warning' : ''}`}
              rows={4}
              placeholder="e.g. Dr. Rostova explains algorithms with clear intuition. The problem sets require 10-15 hours per week, but the exam questions mirror the lecture examples closely..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>

            {/* Dedicated Pro-Tip / Survival Advice Field */}
            <div className="protip-input-group mt-3">
              <div className="protip-input-label">
                <Lightbulb size={16} className="text-amber" />
                <span>Student Survival Tip (How should juniors prepare/succeed with this prof?):</span>
              </div>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Re-solve recitation quizzes before the midterm; that guarantees an A on Section 2!"
                value={proTip}
                onChange={(e) => setProTip(e.target.value)}
              />
            </div>

            {/* LIVE ANTI-RAGGING STATUS BAR */}
            <div className={`anti-ragging-live-panel status-${analysis.status}`}>
              <div className="analyzer-header">
                <div className="analyzer-status-icon">
                  {analysis.status === 'approved' && <CheckCircle2 size={18} className="text-emerald" />}
                  {analysis.status === 'warning' && <AlertTriangle size={18} className="text-amber" />}
                  {analysis.status === 'blocked' && <X size={18} className="text-red" />}
                  {analysis.status === 'too_short' && <Info size={18} className="text-muted" />}
                </div>

                <div className="analyzer-title-box">
                  <span className="analyzer-status-badge">
                    {analysis.status === 'approved' && 'Shield Status: 100% Constructive & Safe'}
                    {analysis.status === 'warning' && 'Shield Notice: Contains Subjective Venting'}
                    {analysis.status === 'blocked' && 'Shield Alert: Violates Anti-Ragging Policy'}
                    {analysis.status === 'too_short' && 'Shield Status: Awaiting Details'}
                  </span>
                  <p className="analyzer-msg">{analysis.message}</p>
                </div>

                <div className="analyzer-score-meter">
                  <span className="meter-label">Quality Score:</span>
                  <span className="meter-val">{analysis.score}%</span>
                </div>
              </div>

              {/* Detected issues if any */}
              {analysis.detectedIssues && analysis.detectedIssues.length > 0 && (
                <div className="analyzer-flags-box">
                  <span className="flags-title">Flags detected:</span>
                  <div className="flags-list">
                    {analysis.detectedIssues.map((issue, idx) => (
                      <span key={idx} className="flag-chip">{issue}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Constructive suggestions */}
              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <div className="analyzer-suggestions-box">
                  <span className="suggestions-title">How to improve:</span>
                  <ul className="suggestions-list">
                    {analysis.suggestions.map((sug, idx) => (
                      <li key={idx}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-submit-row">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>

            <button 
              type="submit" 
              className="btn btn-primary btn-submit-review"
              disabled={!analysis.isAllowed}
              title={!analysis.isAllowed ? "Please adjust review according to Anti-Ragging guidelines to submit" : "Submit Review"}
            >
              <Sparkles size={16} />
              <span>Submit Verified Review</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
