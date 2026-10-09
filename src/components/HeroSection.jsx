import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Sliders, 
  CheckCircle2, 
  GraduationCap, 
  Flame,
  Award,
  Users
} from 'lucide-react';

export default function HeroSection({ 
  totalProfessors, 
  totalReviews, 
  onOpenAntiRagging,
  onOpenAddReview,
  activeUniversity
}) {
  return (
    <section className="hero-section">
      <div className="hero-glow-sphere hero-glow-1"></div>
      <div className="hero-glow-sphere hero-glow-2"></div>

      <div className="hero-content">
        {/* Anti-Ragging Banner Tag */}
        <div className="hero-pill-badge" onClick={onOpenAntiRagging}>
          <ShieldCheck size={15} className="text-emerald" />
          <span>Faculty Anti-Ragging Guard & Student Success Sanctuary</span>
          <span className="hero-pill-action">Learn Policy →</span>
        </div>

        <h1 className="hero-headline">
          Real Professor Ratings & <br />
          <span className="gradient-text">Course Survival Guides</span>
        </h1>

        <p className="hero-description">
          Unfiltered, honest academic insights from students who have been there. 
          Discover teaching clarity, exam patterns, attendance expectations, and genuine study tips—guaranteed 
          <strong> 100% free of cyber-harassment & personal attacks</strong> through our live Anti-Ragging Shield.
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-group">
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => onOpenAddReview(null)}
          >
            <Sparkles size={18} />
            <span>Rate a Professor (10-Point Scorecard)</span>
          </button>

          <button 
            className="btn btn-secondary btn-lg"
            onClick={onOpenAntiRagging}
          >
            <ShieldCheck size={18} className="text-emerald" />
            <span>How Anti-Ragging Works</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="hero-features-strip">
          <div className="feature-item">
            <div className="feature-icon-box">
              <Award size={18} className="text-indigo" />
            </div>
            <div className="feature-text">
              <h4>10-Point Scorecards</h4>
              <p>Clarity, fairness, pacing, & exam predictability</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <BookOpen size={18} className="text-emerald" />
            </div>
            <div className="feature-text">
              <h4>Course Survival Tips</h4>
              <p>Real tips on how to pass & study effectively</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <ShieldCheck size={18} className="text-amber" />
            </div>
            <div className="feature-text">
              <h4>Anti-Ragging Guard</h4>
              <p>Blocks harassment; verifies constructive feedback</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <Users size={18} className="text-violet" />
            </div>
            <div className="feature-text">
              <h4>Discreet & Student-First</h4>
              <p>Private student community with peer monikers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
