import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Building, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { INITIAL_UNIVERSITIES, INITIAL_DEPARTMENTS, AVAILABLE_TAGS } from '../data/professorsData';

export default function AddProfessorModal({
  onClose,
  onAddProfessor
}) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('Assistant Professor');
  const [university, setUniversity] = useState(INITIAL_UNIVERSITIES[1] || 'Stanford University');
  const [department, setDepartment] = useState(INITIAL_DEPARTMENTS[1] || 'Computer Science & AI');
  const [coursesInput, setCoursesInput] = useState('');
  const [keySurvivalTip, setKeySurvivalTip] = useState('');
  const [selectedTags, setSelectedTags] = useState(['Clear Explanations', 'Fair Grader']);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 4) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedCourses = coursesInput
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const newProfessor = {
      id: `prof-${Date.now()}`,
      name: name.trim(),
      title: title.trim(),
      university,
      department,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80`,
      overallRating: 9.0,
      difficulty: 3.2,
      wouldTakeAgain: 90,
      totalReviews: 1,
      starred: false,
      courses: parsedCourses.length > 0 ? parsedCourses : ['CS 101 (Introductory Course)'],
      tags: selectedTags.length > 0 ? selectedTags : ['Clear Explanations'],
      metrics: {
        clarity: 9.0,
        fairness: 9.0,
        approachability: 9.0,
        pacing: 9.0,
        examPredictability: 9.0
      },
      gradeDistribution: {
        aGrade: 40,
        bGrade: 40,
        cGrade: 15,
        dfGrade: 5
      },
      survivalGuide: {
        attendanceNote: 'Consult course syllabus for attendance details.',
        textbookNeeded: 'Course lecture notes and slides recommended.',
        examStyle: 'Focuses on core concepts taught in class.',
        officeHoursValue: '⭐⭐⭐⭐ Office hours recommended for doubt clearing.',
        keySurvivalTip: keySurvivalTip.trim() || 'Review lecture slides and complete all problem sets early.'
      },
      reviews: [
        {
          id: `rev-${Date.now()}`,
          authorMoniker: 'Founding Student Reviewer',
          course: parsedCourses[0] || 'Core Course',
          date: 'Current Term',
          rating: 9.0,
          gradeEarned: 'A',
          attendanceMandatory: false,
          textbookUsed: false,
          upvotes: 3,
          isHelpful: false,
          tags: selectedTags,
          comment: `Added ${name.trim()} to the student directory with initial positive teaching feedback.`,
          proTip: keySurvivalTip.trim() || 'Focus on problem sets and discussion forums.',
          antiRaggingVerified: true
        }
      ]
    };

    onAddProfessor(newProfessor);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card add-prof-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="add-review-header">
          <div className="header-badge-row">
            <span className="anti-ragging-live-tag">
              <ShieldCheck size={14} className="text-emerald" /> Safe Directory Addition
            </span>
          </div>
          <h2 className="add-review-title">
            Add a New <span className="gradient-text">Faculty Member</span>
          </h2>
          <p className="add-review-subtitle">
            Can't find your professor? Add them to the discreet student database so classmates can share survival advice.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="add-prof-form">
          <div className="form-row-2col">
            <div className="form-field">
              <label>Professor Full Name:</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Dr. Robert Langdon"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Academic Title / Rank:</label>
              <select
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor">Professor / Chair</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Lecturer / Instructor">Lecturer / Instructor</option>
                <option value="Visiting Faculty">Visiting Faculty</option>
              </select>
            </div>
          </div>

          <div className="form-row-2col">
            <div className="form-field">
              <label>University / College:</label>
              <select
                className="form-input"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              >
                {INITIAL_UNIVERSITIES.filter(u => u !== 'All Universities').map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Department / Discipline:</label>
              <select
                className="form-input"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {INITIAL_DEPARTMENTS.filter(d => d !== 'All Departments').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label>Courses Taught (comma-separated):</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. CS106A (Programming Methodologies), CS107 (Computer Systems)"
              value={coursesInput}
              onChange={(e) => setCoursesInput(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label className="flex-center-gap">
              <Lightbulb size={15} className="text-amber" />
              <span>Initial Survival Tip for Juniors:</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Attend live lectures for assignment hints and past exam patterns."
              value={keySurvivalTip}
              onChange={(e) => setKeySurvivalTip(e.target.value)}
            />
          </div>

          <div className="form-group-section">
            <label className="form-section-label">Select Initial Tags:</label>
            <div className="tags-selector-cloud">
              {AVAILABLE_TAGS.slice(0, 10).map((tag) => {
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

          <div className="form-submit-row">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={16} />
              <span>Create Professor Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
