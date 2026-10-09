import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import ProfessorCard from './components/ProfessorCard';
import ProfessorDetailModal from './components/ProfessorDetailModal';
import AddReviewModal from './components/AddReviewModal';
import AddProfessorModal from './components/AddProfessorModal';
import AntiRaggingModal from './components/AntiRaggingModal';
import CompareModal from './components/CompareModal';
import StarredProfessorsDrawer from './components/StarredProfessorsDrawer';
import { 
  INITIAL_PROFESSORS, 
  INITIAL_UNIVERSITIES, 
  INITIAL_DEPARTMENTS, 
  AVAILABLE_TAGS 
} from './data/professorsData';
import { 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  HeartHandshake, 
  PlusCircle, 
  Search, 
  Award,
  FilterX
} from 'lucide-react';

const STORAGE_KEY_PROFS = 'profpulse_professors_v1';
const STORAGE_KEY_STARRED = 'profpulse_starred_ids_v1';
const STORAGE_KEY_THEME = 'profpulse_theme_mode_v1';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_THEME) || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Professors Data State
  const [professors, setProfessors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load saved professors", e);
    }
    return INITIAL_PROFESSORS;
  });

  // Starred IDs State
  const [starredIds, setStarredIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STARRED);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return [];
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFS, JSON.stringify(professors));
    } catch (e) {}
  }, [professors]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STARRED, JSON.stringify(starredIds));
    } catch (e) {}
  }, [starredIds]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('All Universities');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [sortBy, setSortBy] = useState('highest_rating');
  const [selectedTags, setSelectedTags] = useState([]);

  // Comparison State (list of professor objects)
  const [comparedProfessors, setComparedProfessors] = useState([]);

  // Modals & Drawers States
  const [activeProfessorDetail, setActiveProfessorDetail] = useState(null);
  const [reviewModalProf, setReviewModalProf] = useState(null); // null if general rate or prof object
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [isAddProfOpen, setIsAddProfOpen] = useState(false);
  const [isAntiRaggingOpen, setIsAntiRaggingOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isStarredDrawerOpen, setIsStarredDrawerOpen] = useState(false);

  // Dynamic Universities and Departments list
  const universities = useMemo(() => {
    const unis = new Set(INITIAL_UNIVERSITIES);
    professors.forEach(p => {
      if (p.university) unis.add(p.university);
    });
    return Array.from(unis);
  }, [professors]);

  const departments = useMemo(() => {
    const depts = new Set(INITIAL_DEPARTMENTS);
    professors.forEach(p => {
      if (p.department) depts.add(p.department);
    });
    return Array.from(depts);
  }, [professors]);

  // Toggle Starred
  const handleToggleStar = (profId) => {
    setStarredIds(prev => {
      if (prev.includes(profId)) {
        return prev.filter(id => id !== profId);
      } else {
        return [...prev, profId];
      }
    });

    setProfessors(prev => prev.map(p => {
      if (p.id === profId) {
        return { ...p, starred: !p.starred };
      }
      return p;
    }));

    if (activeProfessorDetail && activeProfessorDetail.id === profId) {
      setActiveProfessorDetail(prev => ({ ...prev, starred: !prev.starred }));
    }
  };

  // Toggle Compare
  const handleToggleCompare = (prof) => {
    setComparedProfessors(prev => {
      const exists = prev.some(p => p.id === prof.id);
      if (exists) {
        return prev.filter(p => p.id !== prof.id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare up to 3 professors simultaneously.");
          return prev;
        }
        return [...prev, prof];
      }
    });
  };

  const handleRemoveFromCompare = (profId) => {
    setComparedProfessors(prev => prev.filter(p => p.id !== profId));
  };

  // Toggle Tag in FilterBar
  const handleToggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedUniversity('All Universities');
    setSelectedDepartment('All Departments');
    setSortBy('highest_rating');
    setSelectedTags([]);
  };

  // Add New Professor
  const handleAddProfessor = (newProf) => {
    setProfessors(prev => [newProf, ...prev]);
    setActiveProfessorDetail(newProf);
  };

  // Submit Review Handler
  const handleSubmitReview = (profId, newReview, metrics) => {
    setProfessors(prev => prev.map(prof => {
      if (prof.id === profId) {
        const updatedReviews = [newReview, ...(prof.reviews || [])];
        const newCount = (prof.totalReviews || 0) + 1;

        // Recalculate rolling average for metrics
        const newClarity = ((prof.metrics.clarity * (newCount - 1)) + metrics.clarity) / newCount;
        const newFairness = ((prof.metrics.fairness * (newCount - 1)) + metrics.fairness) / newCount;
        const newApproachability = ((prof.metrics.approachability * (newCount - 1)) + metrics.approachability) / newCount;
        const newPacing = ((prof.metrics.pacing * (newCount - 1)) + metrics.pacing) / newCount;
        const newDifficulty = ((prof.difficulty * (newCount - 1)) + metrics.difficulty) / newCount;
        const newOverall = ((prof.overallRating * (newCount - 1)) + metrics.overallRating) / newCount;

        // Update tags if new tags were added
        const combinedTags = Array.from(new Set([...(prof.tags || []), ...(newReview.tags || [])]));

        const updatedProf = {
          ...prof,
          totalReviews: newCount,
          overallRating: parseFloat(newOverall.toFixed(1)),
          difficulty: parseFloat(newDifficulty.toFixed(1)),
          tags: combinedTags,
          metrics: {
            ...prof.metrics,
            clarity: parseFloat(newClarity.toFixed(1)),
            fairness: parseFloat(newFairness.toFixed(1)),
            approachability: parseFloat(newApproachability.toFixed(1)),
            pacing: parseFloat(newPacing.toFixed(1))
          },
          reviews: updatedReviews
        };

        if (activeProfessorDetail && activeProfessorDetail.id === profId) {
          setActiveProfessorDetail(updatedProf);
        }

        return updatedProf;
      }
      return prof;
    }));
  };

  // Upvote Review Handler
  const handleUpvoteReview = (profId, reviewId) => {
    setProfessors(prev => prev.map(prof => {
      if (prof.id === profId) {
        const updatedReviews = prof.reviews.map(r => {
          if (r.id === reviewId) {
            const nextHelpful = !r.isHelpful;
            return {
              ...r,
              isHelpful: nextHelpful,
              upvotes: nextHelpful ? (r.upvotes || 0) + 1 : Math.max(0, (r.upvotes || 1) - 1)
            };
          }
          return r;
        });

        const updatedProf = { ...prof, reviews: updatedReviews };
        if (activeProfessorDetail && activeProfessorDetail.id === profId) {
          setActiveProfessorDetail(updatedProf);
        }
        return updatedProf;
      }
      return prof;
    }));
  };

  // Filtered & Sorted Professors List
  const filteredProfessors = useMemo(() => {
    return professors
      .filter(prof => {
        // University filter
        if (selectedUniversity !== 'All Universities' && prof.university !== selectedUniversity) {
          return false;
        }
        // Department filter
        if (selectedDepartment !== 'All Departments' && prof.department !== selectedDepartment) {
          return false;
        }
        // Tag filter (must contain all selected tags)
        if (selectedTags.length > 0) {
          const hasAllTags = selectedTags.every(t => prof.tags && prof.tags.includes(t));
          if (!hasAllTags) return false;
        }
        // Search query (name, course, dept, uni, or keywords)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = prof.name.toLowerCase().includes(q);
          const matchUni = prof.university.toLowerCase().includes(q);
          const matchDept = prof.department.toLowerCase().includes(q);
          const matchCourses = prof.courses && prof.courses.some(c => c.toLowerCase().includes(q));
          const matchTags = prof.tags && prof.tags.some(t => t.toLowerCase().includes(q));
          return matchName || matchUni || matchDept || matchCourses || matchTags;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'highest_rating') return b.overallRating - a.overallRating;
        if (sortBy === 'take_again') return b.wouldTakeAgain - a.wouldTakeAgain;
        if (sortBy === 'easiest') return a.difficulty - b.difficulty;
        if (sortBy === 'hardest') return b.difficulty - a.difficulty;
        if (sortBy === 'most_reviews') return b.totalReviews - a.totalReviews;
        if (sortBy === 'clarity') return b.metrics.clarity - a.metrics.clarity;
        if (sortBy === 'fairness') return b.metrics.fairness - a.metrics.fairness;
        return 0;
      });
  }, [professors, searchQuery, selectedUniversity, selectedDepartment, selectedTags, sortBy]);

  // Starred professors full list
  const starredProfessorsList = useMemo(() => {
    return professors.filter(p => starredIds.includes(p.id) || p.starred);
  }, [professors, starredIds]);

  const isFiltered = searchQuery !== '' || selectedUniversity !== 'All Universities' || selectedDepartment !== 'All Departments' || selectedTags.length > 0;

  const totalReviewsCount = useMemo(() => {
    return professors.reduce((acc, p) => acc + (p.totalReviews || 0), 0);
  }, [professors]);

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedUniversity={selectedUniversity}
        setSelectedUniversity={setSelectedUniversity}
        universities={universities}
        starredCount={starredProfessorsList.length}
        onOpenStarred={() => setIsStarredDrawerOpen(true)}
        onOpenAntiRagging={() => setIsAntiRaggingOpen(true)}
        onOpenAddProfessor={() => setIsAddProfOpen(true)}
        onOpenAddReview={(prof) => {
          setReviewModalProf(prof);
          setIsAddReviewOpen(true);
        }}
        onOpenCompare={() => setIsCompareOpen(true)}
        compareCount={comparedProfessors.length}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="main-content">
        {/* Hero Showcase Section */}
        <HeroSection
          totalProfessors={professors.length}
          totalReviews={totalReviewsCount}
          onOpenAntiRagging={() => setIsAntiRaggingOpen(true)}
          onOpenAddReview={(prof) => {
            setReviewModalProf(prof);
            setIsAddReviewOpen(true);
          }}
          activeUniversity={selectedUniversity}
        />

        {/* Filter & Sort Bar */}
        <div className="main-container">
          <FilterBar
            departments={departments}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedTags={selectedTags}
            toggleTag={handleToggleTag}
            availableTags={AVAILABLE_TAGS}
            totalResults={filteredProfessors.length}
            onResetFilters={handleResetFilters}
            isFiltered={isFiltered}
          />

          {/* Professors Grid */}
          {filteredProfessors.length === 0 ? (
            <div className="empty-results-box glass-panel">
              <div className="empty-icon-wrap">
                <FilterX size={42} className="text-muted" />
              </div>
              <h3 className="empty-title">No Professors Found</h3>
              <p className="empty-desc">
                We couldn't find any professors matching your current search or filter criteria.
              </p>
              <div className="empty-actions-row">
                <button className="btn btn-secondary" onClick={handleResetFilters}>
                  Clear All Filters
                </button>
                <button className="btn btn-primary" onClick={() => setIsAddProfOpen(true)}>
                  <PlusCircle size={16} />
                  <span>Add Professor to Directory</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="professors-grid">
              {filteredProfessors.map(prof => (
                <ProfessorCard
                  key={prof.id}
                  professor={prof}
                  onSelect={(p) => setActiveProfessorDetail(p)}
                  onToggleStar={handleToggleStar}
                  onOpenAddReview={(p) => {
                    setReviewModalProf(p);
                    setIsAddReviewOpen(true);
                  }}
                  onToggleCompare={handleToggleCompare}
                  isCompared={comparedProfessors.some(cp => cp.id === prof.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer-container">
        <div className="footer-inner main-container">
          <div className="footer-brand-side">
            <div className="footer-logo">
              <GraduationCap size={22} className="text-indigo" />
              <span>ProfPulse</span>
            </div>
            <p className="footer-tagline">
              The discrete, student-only professor ratings & survival guide. 
              Protected by automated real-time anti-ragging content filtering.
            </p>
          </div>

          <div className="footer-links-side">
            <div className="footer-col">
              <h5>Community & Safety</h5>
              <button onClick={() => setIsAntiRaggingOpen(true)} className="footer-link-btn">
                <ShieldCheck size={14} className="text-emerald" /> Anti-Ragging Policy
              </button>
              <button onClick={() => setIsAddProfOpen(true)} className="footer-link-btn">
                Add New Faculty
              </button>
              <button onClick={() => setIsAddReviewOpen(true)} className="footer-link-btn">
                Submit 10-Point Scorecard
              </button>
            </div>

            <div className="footer-col">
              <h5>Key Features</h5>
              <span className="footer-item">10-Point Multi-Metric Rating</span>
              <span className="footer-item">Course Survival Guides & Pro-Tips</span>
              <span className="footer-item">Exam Predictability Matrix</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom-bar">
          <p>© 2026 ProfPulse Student Collective • For Student Eyes Only • Constructive Academic Insights</p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {activeProfessorDetail && (
        <ProfessorDetailModal
          professor={activeProfessorDetail}
          onClose={() => setActiveProfessorDetail(null)}
          onToggleStar={handleToggleStar}
          onOpenAddReview={(p) => {
            setReviewModalProf(p);
            setIsAddReviewOpen(true);
          }}
          onUpvoteReview={handleUpvoteReview}
        />
      )}

      {isAddReviewOpen && (
        <AddReviewModal
          professors={professors}
          selectedProfessor={reviewModalProf}
          onClose={() => {
            setIsAddReviewOpen(false);
            setReviewModalProf(null);
          }}
          onSubmitReview={handleSubmitReview}
        />
      )}

      {isAddProfOpen && (
        <AddProfessorModal
          onClose={() => setIsAddProfOpen(false)}
          onAddProfessor={handleAddProfessor}
        />
      )}

      {isAntiRaggingOpen && (
        <AntiRaggingModal
          onClose={() => setIsAntiRaggingOpen(false)}
        />
      )}

      {isCompareOpen && (
        <CompareModal
          comparedProfessors={comparedProfessors.length > 0 ? comparedProfessors : starredProfessorsList.slice(0, 3)}
          onClose={() => setIsCompareOpen(false)}
          onRemoveFromCompare={handleRemoveFromCompare}
          onSelectProfessor={(p) => {
            setActiveProfessorDetail(p);
          }}
          onOpenAddReview={(p) => {
            setReviewModalProf(p);
            setIsAddReviewOpen(true);
          }}
        />
      )}

      <StarredProfessorsDrawer
        isOpen={isStarredDrawerOpen}
        onClose={() => setIsStarredDrawerOpen(false)}
        starredProfessors={starredProfessorsList}
        onSelectProfessor={(p) => {
          setActiveProfessorDetail(p);
        }}
        onUnstarProfessor={handleToggleStar}
        onOpenCompare={() => {
          setComparedProfessors(starredProfessorsList.slice(0, 3));
          setIsCompareOpen(true);
        }}
      />
    </div>
  );
}
