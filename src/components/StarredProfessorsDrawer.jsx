import React from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Scale, 
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

export default function StarredProfessorsDrawer({
  isOpen,
  onClose,
  starredProfessors = [],
  onSelectProfessor,
  onUnstarProfessor,
  onOpenCompare
}) {
  if (!isOpen) return null;

  const getScoreClass = (rating) => {
    if (rating >= 9.0) return 'score-high';
    if (rating >= 7.5) return 'score-med';
    if (rating >= 6.0) return 'score-mod';
    return 'score-low';
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Bookmark size={20} className="fill-amber text-amber" />
            <div>
              <h3 className="drawer-title">Saved Professors</h3>
              <p className="drawer-subtitle">{starredProfessors.length} faculty members saved for enrollment planning</p>
            </div>
          </div>

          <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="drawer-body">
          {starredProfessors.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-icon-wrap">
                <Bookmark size={32} className="text-muted" />
              </div>
              <h4>No Saved Professors Yet</h4>
              <p>Click the bookmark star icon on any professor card to bookmark them for quick access during registration.</p>
            </div>
          ) : (
            <div className="starred-list">
              {starredProfessors.map((prof) => (
                <div key={prof.id} className="starred-item-card glass-panel">
                  <div className="starred-item-main" onClick={() => {
                    onClose();
                    onSelectProfessor(prof);
                  }}>
                    <img 
                      src={prof.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=6366f1&color=fff`} 
                      alt={prof.name}
                      className="starred-avatar"
                    />

                    <div className="starred-info">
                      <div className="starred-name-row">
                        <h4 className="starred-name">{prof.name}</h4>
                        <span className={`score-badge score-badge-sm ${getScoreClass(prof.overallRating)}`}>
                          {prof.overallRating.toFixed(1)}/10
                        </span>
                      </div>
                      <p className="starred-uni">{prof.university}</p>
                      <span className="starred-dept">{prof.department}</span>
                    </div>
                  </div>

                  <div className="starred-item-actions">
                    <button 
                      className="btn-unstar"
                      onClick={() => onUnstarProfessor(prof.id)}
                      title="Remove from saved"
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>

                    <button 
                      className="btn btn-primary btn-xs"
                      onClick={() => {
                        onClose();
                        onSelectProfessor(prof);
                      }}
                    >
                      <span>Profile</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {starredProfessors.length >= 2 && (
          <div className="drawer-footer">
            <button 
              className="btn btn-primary btn-full"
              onClick={() => {
                onClose();
                onOpenCompare();
              }}
            >
              <Scale size={16} />
              <span>Compare All Saved ({starredProfessors.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
