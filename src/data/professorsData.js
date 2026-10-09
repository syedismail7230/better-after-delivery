/**
 * Seed dataset of top professors, ratings, survival guides, and student reviews.
 */

export const INITIAL_UNIVERSITIES = [
  'All Universities',
  'Stanford University',
  'Massachusetts Institute of Technology (MIT)',
  'UC Berkeley',
  'Carnegie Mellon University',
  'Harvard University',
  'IIT Bombay',
  'National University of Singapore (NUS)',
  'University of Toronto',
  'Georgia Tech',
  'University of Washington'
];

export const INITIAL_DEPARTMENTS = [
  'All Departments',
  'Computer Science & AI',
  'Electrical & Computer Engineering',
  'Mathematics & Statistics',
  'Physics & Quantum Science',
  'Economics & Business',
  'Biological Sciences & Pre-Med',
  'Mechanical & Aerospace Engineering',
  'Humanities & Social Sciences'
];

export const AVAILABLE_TAGS = [
  'Clear Explanations',
  'Incredible Lectures',
  'Tough Grader',
  'Fair Grader',
  'Gives Extra Credit',
  'Pop Quizzes',
  'Attendance Not Mandatory',
  'Attendance Mandatory',
  'Heavy Problem Sets',
  'Great Slides Provided',
  'Approachable in Office Hours',
  'Practical Projects',
  'Heavy Theoretical Math',
  'Lenient Deadlines',
  'Inspiring Mentor',
  'Fast Paced'
];

export const INITIAL_PROFESSORS = [
  {
    id: 'prof-1',
    name: 'Dr. Elena Rostova',
    title: 'Associate Professor of Computer Science',
    university: 'Stanford University',
    department: 'Computer Science & AI',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80',
    overallRating: 9.6,
    difficulty: 3.8, // out of 5
    wouldTakeAgain: 94, // %
    totalReviews: 48,
    starred: false,
    courses: ['CS106B (Programming Abstractions)', 'CS161 (Design and Analysis of Algorithms)', 'CS221 (Artificial Intelligence)'],
    tags: ['Clear Explanations', 'Great Slides Provided', 'Approachable in Office Hours', 'Practical Projects', 'Fair Grader'],
    metrics: {
      clarity: 9.8,
      fairness: 9.4,
      approachability: 9.7,
      pacing: 9.2,
      examPredictability: 9.0
    },
    gradeDistribution: {
      aGrade: 44,
      bGrade: 40,
      cGrade: 12,
      dfGrade: 4
    },
    survivalGuide: {
      attendanceNote: 'Lectures are recorded, but live demo sessions include live debugging clues that show up directly in assignments.',
      textbookNeeded: 'Optional (Her custom course notes and interactive notebooks are 100% sufficient).',
      examStyle: 'Algorithm design proofs and trace problems. Half coding logic, half asymptotic analysis. No surprise trick questions.',
      officeHoursValue: '⭐⭐⭐⭐⭐ Extremely helpful. She personally sits with students during Tuesday office hours to debug recursive backtrackers.',
      keySurvivalTip: 'Start Assignment 4 (Priority Queues & Graph Algorithms) the day it releases. It requires at least 15-20 hours of thought.'
    },
    reviews: [
      {
        id: 'rev-101',
        authorMoniker: 'Junior CS Major',
        course: 'CS161 (Design and Analysis of Algorithms)',
        date: 'Fall 2025',
        rating: 9.8,
        gradeEarned: 'A',
        attendanceMandatory: false,
        textbookUsed: false,
        upvotes: 34,
        isHelpful: false,
        tags: ['Clear Explanations', 'Great Slides Provided', 'Fair Grader'],
        comment: 'Dr. Rostova is easily one of the best algorithm professors I have ever had. She breaks down dynamic programming with clear visual trees that make intuitive sense. Her homework sets are challenging but rewarding.',
        proTip: 'For the midterm, re-do all lecture recitation exercises without looking at the solutions first. The exam questions follow the exact same structural patterns.',
        antiRaggingVerified: true
      },
      {
        id: 'rev-102',
        authorMoniker: 'Sophomore EECS Student',
        course: 'CS106B (Programming Abstractions)',
        date: 'Spring 2025',
        rating: 9.4,
        gradeEarned: 'A-',
        attendanceMandatory: false,
        textbookUsed: false,
        upvotes: 19,
        isHelpful: false,
        tags: ['Approachable in Office Hours', 'Practical Projects'],
        comment: 'Super structured course! Memory management and pointer recursion can be intimidating, but her visual diagrams saved me. She really cares that every student understands the core concepts.',
        proTip: 'Use Valgrind / AddressSanitizer early on assignments to catch memory leaks before the midnight submission deadline.',
        antiRaggingVerified: true
      }
    ]
  },
  {
    id: 'prof-2',
    name: 'Prof. Marcus Vance',
    title: 'Professor of Mathematics & Statistics',
    university: 'MIT',
    department: 'Mathematics & Statistics',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=240&auto=format&fit=crop&q=80',
    overallRating: 8.8,
    difficulty: 4.4, // out of 5
    wouldTakeAgain: 85,
    totalReviews: 36,
    starred: false,
    courses: ['18.06 (Linear Algebra)', '18.650 (Fundamentals of Statistics)', '18.03 (Differential Equations)'],
    tags: ['Tough Grader', 'Heavy Theoretical Math', 'Inspiring Mentor', 'Clear Explanations'],
    metrics: {
      clarity: 9.1,
      fairness: 8.5,
      approachability: 8.6,
      pacing: 8.4,
      examPredictability: 8.0
    },
    gradeDistribution: {
      aGrade: 28,
      bGrade: 46,
      cGrade: 20,
      dfGrade: 6
    },
    survivalGuide: {
      attendanceNote: 'Mandatory in spirit — blackboard proofs are not fully captured in the PDF notes.',
      textbookNeeded: 'Yes: Strang Linear Algebra 5th edition (he assigns specific problem numbers from it).',
      examStyle: 'Theoretical and proof-heavy with geometric interpretations of eigenvalues and nullspaces.',
      officeHoursValue: '⭐⭐⭐⭐ Great for deep conceptual questions. The graduate TAs are also phenomenal.',
      keySurvivalTip: 'Do not just memorize formulas. Prof. Vance tests fundamental vector space properties from first principles.'
    },
    reviews: [
      {
        id: 'rev-201',
        authorMoniker: 'Math & Physics Double Major',
        course: '18.06 (Linear Algebra)',
        date: 'Fall 2025',
        rating: 9.0,
        gradeEarned: 'A',
        attendanceMandatory: true,
        textbookUsed: true,
        upvotes: 27,
        isHelpful: false,
        tags: ['Clear Explanations', 'Inspiring Mentor', 'Tough Grader'],
        comment: 'Prof. Vance has a rare gift for making abstract vector projections feel vivid and natural. The exams are definitely tough and curved carefully, but you will emerge understanding linear algebra at a master level.',
        proTip: 'Focus on understanding SVD and Orthogonal Projections inside out — they accounted for 40% of the final exam.',
        antiRaggingVerified: true
      },
      {
        id: 'rev-202',
        authorMoniker: 'Data Science Senior',
        course: '18.650 (Fundamentals of Statistics)',
        date: 'Spring 2025',
        rating: 8.6,
        gradeEarned: 'B+',
        attendanceMandatory: false,
        textbookUsed: true,
        upvotes: 14,
        isHelpful: false,
        tags: ['Heavy Theoretical Math', 'Heavy Problem Sets'],
        comment: 'P-sets take around 12-15 hours per week. Form a study group by week 2. He is very fair with partial credit if your reasoning is sound.',
        proTip: 'Go to the Friday TA recitations without fail. They solve problem set variants that mirror the quiz questions.',
        antiRaggingVerified: true
      }
    ]
  },
  {
    id: 'prof-3',
    name: 'Dr. Aarav Mehta',
    title: 'Assistant Professor of Electrical Engineering',
    university: 'IIT Bombay',
    department: 'Electrical & Computer Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80',
    overallRating: 9.3,
    difficulty: 3.5,
    wouldTakeAgain: 92,
    totalReviews: 52,
    starred: false,
    courses: ['EE224 (Digital Systems)', 'EE309 (Microprocessors & Embedded Systems)', 'EE616 (Electronic Systems Design)'],
    tags: ['Practical Projects', 'Clear Explanations', 'Gives Extra Credit', 'Approachable in Office Hours', 'Fair Grader'],
    metrics: {
      clarity: 9.5,
      fairness: 9.2,
      approachability: 9.8,
      pacing: 9.0,
      examPredictability: 9.2
    },
    gradeDistribution: {
      aGrade: 40,
      bGrade: 44,
      cGrade: 14,
      dfGrade: 2
    },
    survivalGuide: {
      attendanceNote: 'Very friendly attendance policy. He values project demos and lab execution over rigid sign-in sheets.',
      textbookNeeded: 'No: He uploads custom Verilog hardware design manuals and simulation walkthroughs.',
      examStyle: 'Application oriented. You will be asked to design state machines and timing diagrams for real-world devices.',
      officeHoursValue: '⭐⭐⭐⭐⭐ Always available in the hardware lab. Very encouraging with student hobbyist hardware builds.',
      keySurvivalTip: 'Test your FPGA state machines in simulation testbenches before burning to hardware to avoid synthesizer headaches.'
    },
    reviews: [
      {
        id: 'rev-301',
        authorMoniker: '3rd Year Electrical Eng Student',
        course: 'EE309 (Microprocessors & Embedded Systems)',
        date: 'Autumn 2025',
        rating: 9.5,
        gradeEarned: 'A',
        attendanceMandatory: false,
        textbookUsed: false,
        upvotes: 41,
        isHelpful: false,
        tags: ['Practical Projects', 'Approachable in Office Hours', 'Clear Explanations'],
        comment: 'Dr. Mehta is exceptional. He brought in actual RISC-V development boards for our term project. Grading is transparent and rewarding for effort.',
        proTip: 'For the embedded audio project, choose the DMA buffer design pattern early. Dr. Mehta offers 5% bonus marks for clean timing constraints.',
        antiRaggingVerified: true
      }
    ]
  },
  {
    id: 'prof-4',
    name: 'Prof. Sarah Jenkins',
    title: 'Professor of Economics & Finance',
    university: 'Harvard University',
    department: 'Economics & Business',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80',
    overallRating: 9.1,
    difficulty: 3.2,
    wouldTakeAgain: 89,
    totalReviews: 41,
    starred: false,
    courses: ['ECON 1010A (Intermediate Microeconomics)', 'ECON 1723 (Capital Markets & FinTech)', 'ECON 2010 (Graduate Macro Theory)'],
    tags: ['Incredible Lectures', 'Attendance Not Mandatory', 'Fair Grader', 'Lenient Deadlines'],
    metrics: {
      clarity: 9.3,
      fairness: 9.0,
      approachability: 8.9,
      pacing: 9.1,
      examPredictability: 8.8
    },
    gradeDistribution: {
      aGrade: 48,
      bGrade: 38,
      cGrade: 12,
      dfGrade: 2
    },
    survivalGuide: {
      attendanceNote: 'Recorded lectures available on Canvas with full interactive transcripts.',
      textbookNeeded: 'Optional: Varian Microeconomic Analysis is recommended for reference.',
      examStyle: 'Case studies and market equilibrium calculus. Clear past exam archives with step-by-step rubrics.',
      officeHoursValue: '⭐⭐⭐⭐ Great for career discussions in investment banking, venture capital, and economic research.',
      keySurvivalTip: 'Master Lagrange multiplier optimization in week 3. It will appear on both midterms and the final exam.'
    },
    reviews: [
      {
        id: 'rev-401',
        authorMoniker: 'Econ Senior',
        course: 'ECON 1723 (Capital Markets & FinTech)',
        date: 'Fall 2025',
        rating: 9.2,
        gradeEarned: 'A',
        attendanceMandatory: false,
        textbookUsed: false,
        upvotes: 22,
        isHelpful: false,
        tags: ['Incredible Lectures', 'Fair Grader'],
        comment: 'Engaging real-world case studies on central bank liquidity, algorithmic trading, and startup valuation. She brings top industry guest speakers.',
        proTip: 'The final group project on portfolio stress testing carries 35% of the total grade. Pick a quantitative teammate early.',
        antiRaggingVerified: true
      }
    ]
  },
  {
    id: 'prof-5',
    name: 'Dr. Wei Zhang',
    title: 'Associate Professor of Quantum Physics',
    university: 'UC Berkeley',
    department: 'Physics & Quantum Science',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
    overallRating: 8.9,
    difficulty: 4.6,
    wouldTakeAgain: 82,
    totalReviews: 29,
    starred: false,
    courses: ['PHYS 137A (Quantum Mechanics I)', 'PHYS 137B (Quantum Mechanics II)', 'PHYS 221 (Quantum Information Theory)'],
    tags: ['Tough Grader', 'Heavy Theoretical Math', 'Pop Quizzes', 'Clear Explanations'],
    metrics: {
      clarity: 9.2,
      fairness: 8.4,
      approachability: 8.7,
      pacing: 8.1,
      examPredictability: 7.9
    },
    gradeDistribution: {
      aGrade: 24,
      bGrade: 48,
      cGrade: 22,
      dfGrade: 6
    },
    survivalGuide: {
      attendanceNote: 'Has unannounced 5-minute warm-up quizzes at the start of class (drops lowest 2).',
      textbookNeeded: 'Yes: Griffiths Quantum Mechanics 3rd edition is actively referenced.',
      examStyle: 'Deep analytical problems on Hilbert spaces, perturbation theory, and spin matrices.',
      officeHoursValue: '⭐⭐⭐⭐⭐ Highly recommended to attend before weekly homework deadlines.',
      keySurvivalTip: 'Review Dirac Bra-Ket notation thoroughly in the first week. Don\'t fall behind on problem sets.'
    },
    reviews: [
      {
        id: 'rev-501',
        authorMoniker: 'Physics Junior',
        course: 'PHYS 137A (Quantum Mechanics I)',
        date: 'Spring 2025',
        rating: 8.8,
        gradeEarned: 'B+',
        attendanceMandatory: true,
        textbookUsed: true,
        upvotes: 18,
        isHelpful: false,
        tags: ['Pop Quizzes', 'Tough Grader', 'Clear Explanations'],
        comment: 'Dr. Zhang has unmatched clarity when explaining wave function collapse and harmonic oscillators. Tough grading curve, but you learn an immense amount.',
        proTip: 'Show all intermediate algebraic steps on homework. Even if the final eigenfunction is slightly off, you get 80% partial credit.',
        antiRaggingVerified: true
      }
    ]
  },
  {
    id: 'prof-6',
    name: 'Dr. Priya Nair',
    title: 'Assistant Professor of Bioinformatics',
    university: 'Carnegie Mellon University',
    department: 'Biological Sciences & Pre-Med',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&auto=format&fit=crop&q=80',
    overallRating: 9.7,
    difficulty: 3.1,
    wouldTakeAgain: 96,
    totalReviews: 38,
    starred: false,
    courses: ['02-251 (Great Ideas in Computational Biology)', '02-601 (Programming for Scientists)', '02-710 (Computational Genomics)'],
    tags: ['Clear Explanations', 'Great Slides Provided', 'Practical Projects', 'Fair Grader', 'Inspiring Mentor'],
    metrics: {
      clarity: 9.9,
      fairness: 9.6,
      approachability: 9.9,
      pacing: 9.4,
      examPredictability: 9.5
    },
    gradeDistribution: {
      aGrade: 52,
      bGrade: 38,
      cGrade: 8,
      dfGrade: 2
    },
    survivalGuide: {
      attendanceNote: 'Flexible attendance. Lab sessions have interactive Jupyter notebooks with autograders.',
      textbookNeeded: 'No: All course notes and research papers provided free online.',
      examStyle: 'Take-home coding challenges and open-book concept checks.',
      officeHoursValue: '⭐⭐⭐⭐⭐ She answers Piazza / Discord questions within 30 minutes regularly!',
      keySurvivalTip: 'Utilize her provided Python skeleton code and test edge cases on small sequence alignments.'
    },
    reviews: [
      {
        id: 'rev-601',
        authorMoniker: 'CompBio Sophomore',
        course: '02-251 (Great Ideas in Computational Biology)',
        date: 'Fall 2025',
        rating: 9.9,
        gradeEarned: 'A',
        attendanceMandatory: false,
        textbookUsed: false,
        upvotes: 31,
        isHelpful: false,
        tags: ['Clear Explanations', 'Inspiring Mentor', 'Practical Projects'],
        comment: 'Dr. Nair is an absolute gem! She bridges biology and computer algorithms with effortless clarity. The genome sequence alignment project was the highlight of my semester.',
        proTip: 'For the BLAST algorithm assignment, optimize your hash-table lookups to get the speedup bonus.',
        antiRaggingVerified: true
      }
    ]
  },
  {
    id: 'prof-7',
    name: 'Prof. David Chen',
    title: 'Professor of Computer Systems & Networks',
    university: 'University of Washington',
    department: 'Computer Science & AI',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80',
    overallRating: 9.2,
    difficulty: 4.1,
    wouldTakeAgain: 88,
    totalReviews: 44,
    starred: false,
    courses: ['CSE 333 (Systems Programming)', 'CSE 451 (Operating Systems)', 'CSE 461 (Computer Networks)'],
    tags: ['Practical Projects', 'Clear Explanations', 'Tough Grader', 'Approachable in Office Hours'],
    metrics: {
      clarity: 9.4,
      fairness: 8.9,
      approachability: 9.1,
      pacing: 8.8,
      examPredictability: 8.9
    },
    gradeDistribution: {
      aGrade: 32,
      bGrade: 48,
      cGrade: 16,
      dfGrade: 4
    },
    survivalGuide: {
      attendanceNote: 'Live attendance highly recommended for operating systems concurrency & lock demos.',
      textbookNeeded: 'OSTEP (Operating Systems: Three Easy Pieces) — free online.',
      examStyle: 'Design concurrency race-condition fixes and virtual memory page table translations.',
      officeHoursValue: '⭐⭐⭐⭐ Exceptionally patient with students working through difficult C memory bugs.',
      keySurvivalTip: 'In CSE 451, write thread synchronization logic on paper before writing a single line of C code.'
    },
    reviews: [
      {
        id: 'rev-701',
        authorMoniker: 'Senior Software Engineering Student',
        course: 'CSE 451 (Operating Systems)',
        date: 'Winter 2025',
        rating: 9.3,
        gradeEarned: 'A-',
        attendanceMandatory: false,
        textbookUsed: true,
        upvotes: 29,
        isHelpful: false,
        tags: ['Practical Projects', 'Clear Explanations'],
        comment: 'Building our own filesystem and scheduler was demanding, but Dr. Chen is an incredible systems architect who explains low-level OS internals flawlessly.',
        proTip: 'Start Lab 2 (virtual memory) at least 10 days in advance. Debugging kernel panics takes serious patience.',
        antiRaggingVerified: true
      }
    ]
  },
  {
    id: 'prof-8',
    name: 'Dr. Hannah Al-Mansoor',
    title: 'Associate Professor of Mechanical & Aerospace Engineering',
    university: 'Georgia Tech',
    department: 'Mechanical & Aerospace Engineering',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=240&auto=format&fit=crop&q=80',
    overallRating: 9.5,
    difficulty: 3.7,
    wouldTakeAgain: 93,
    totalReviews: 31,
    starred: false,
    courses: ['ME 3017 (System Dynamics & Controls)', 'AE 4451 (Jet Propulsion)', 'ME 2110 (Creative Decisions & Design)'],
    tags: ['Practical Projects', 'Fair Grader', 'Clear Explanations', 'Inspiring Mentor'],
    metrics: {
      clarity: 9.7,
      fairness: 9.3,
      approachability: 9.6,
      pacing: 9.2,
      examPredictability: 9.1
    },
    gradeDistribution: {
      aGrade: 42,
      bGrade: 42,
      cGrade: 13,
      dfGrade: 3
    },
    survivalGuide: {
      attendanceNote: 'Interactive MATLAB/Simulink demos done live during class hours.',
      textbookNeeded: 'Optional — lecture slides contain all necessary transfer function derivations.',
      examStyle: 'Block diagram reductions, Bode plots, and Root Locus stability criteria.',
      officeHoursValue: '⭐⭐⭐⭐⭐ Dr. Al-Mansoor holds extended review sessions before every exam.',
      keySurvivalTip: 'Become fluent in drawing asymptotic Bode plots by hand for rapid exam solution verification.'
    },
    reviews: [
      {
        id: 'rev-801',
        authorMoniker: 'Aerospace Senior',
        course: 'ME 3017 (System Dynamics & Controls)',
        date: 'Fall 2025',
        rating: 9.6,
        gradeEarned: 'A',
        attendanceMandatory: false,
        textbookUsed: false,
        upvotes: 21,
        isHelpful: false,
        tags: ['Clear Explanations', 'Inspiring Mentor', 'Fair Grader'],
        comment: 'Dr. Al-Mansoor makes control theory intuitive. She connects differential equations directly to aircraft stability and automotive cruise control.',
        proTip: 'Practice the state-space matrix conversion method she teaches in week 6 — it appears guaranteed on the midterm.',
        antiRaggingVerified: true
      }
    ]
  }
];
