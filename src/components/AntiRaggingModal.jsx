import React from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  HeartHandshake, 
  Lock, 
  Sparkles,
  AlertOctagon,
  HelpCircle,
  Award
} from 'lucide-react';
import { ANTI_RAGGING_POLICY } from '../data/antiRaggingFilter';

export default function AntiRaggingModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card anti-ragging-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* Modal Banner */}
        <div className="anti-ragging-modal-header">
          <div className="shield-icon-giant">
            <ShieldCheck size={36} className="text-emerald" />
          </div>
          <div className="header-info">
            <span className="safe-policy-tag">Student Safety & Faculty Respect Protocol</span>
            <h2 className="anti-ragging-modal-title">{ANTI_RAGGING_POLICY.title}</h2>
            <p className="anti-ragging-modal-tagline">{ANTI_RAGGING_POLICY.tagline}</p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="anti-ragging-body">
          {/* Mission Statement */}
          <div className="policy-mission-card glass-panel">
            <HeartHandshake size={20} className="text-indigo" />
            <div>
              <h4>Why Anti-Ragging Content Filtering?</h4>
              <p>
                Our community is built to help students survive and excel in difficult courses without resorting to online cyber-bullying, insults, or defamatory personal attacks against professors. Constructive criticism empowers your peers, while toxic ragging destroys academic dialogue.
              </p>
            </div>
          </div>

          {/* 4 Core Pillars */}
          <div className="policy-pillars-grid">
            {ANTI_RAGGING_POLICY.rules.map((rule, idx) => (
              <div key={idx} className="pillar-card glass-panel">
                <div className="pillar-num">{idx + 1}</div>
                <div className="pillar-content">
                  <h5>{rule.title}</h5>
                  <p>{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bad vs Good Comparison Examples */}
          <div className="comparison-box-section">
            <h4 className="section-title">
              <Award size={18} className="text-emerald" />
              <span>Real Examples: Unconstructive Ragging vs Constructive Insight</span>
            </h4>

            <div className="examples-comparison-list">
              {ANTI_RAGGING_POLICY.examples.map((ex, i) => (
                <div key={i} className="example-duo-card glass-panel">
                  <div className="example-bad">
                    <div className="example-bad-label">
                      <XCircle size={15} className="text-red" />
                      <span>Blocked (Personal Ragging / Insult)</span>
                    </div>
                    <p className="example-text">{ex.bad}</p>
                  </div>

                  <div className="example-divider"></div>

                  <div className="example-good">
                    <div className="example-good-label">
                      <CheckCircle2 size={15} className="text-emerald" />
                      <span>Approved (Constructive & Actionable)</span>
                    </div>
                    <p className="example-text">{ex.good}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Privacy & Discreet Sanctuary Assurance */}
          <div className="privacy-assurance-card">
            <Lock size={18} className="text-cyan" />
            <div>
              <h5>Student Privacy & Discreet Access</h5>
              <p>
                ProfPulse is designed exclusively for student peers. Reviews are not syndicated or indexed on search engines or public professional sites like LinkedIn. Anonymous peer monikers protect student identities.
              </p>
            </div>
          </div>

          {/* Close Action */}
          <div className="modal-bottom-action">
            <button className="btn btn-primary" onClick={onClose}>
              <CheckCircle2 size={16} />
              <span>I Understand & Agree to the Code of Conduct</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
