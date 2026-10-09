/**
 * Anti-Ragging & Constructive Feedback Guard Engine
 * Protects faculty from abusive language, harassment, cyber-bullying, and derogatory attacks,
 * while encouraging constructive, actionable academic feedback and survival tips for students.
 */

// Severe harassment / ragging / abusive words that immediately block submission
const SEVERE_RAGGING_TERMS = [
  'idiot', 'moron', 'loser', 'stupid', 'dumb', 'clown', 'garbage', 'trash', 'scum', 
  'bastard', 'bitch', 'asshole', 'dick', 'piss', 'retarded', 'retard', 'ugly', 'fat',
  'die', 'kill', 'burn', 'punch', 'slap', 'hate this person', 'waste of life',
  'worst human', 'horrible human', 'scam', 'fraud', 'evil', 'corrupt', 'psychopath',
  'insane', 'mental', 'creepy', 'creep', 'pedophile', 'pervert', 'shut up', 'fuck',
  'fucking', 'shit', 'shitty', 'crap', 'useless piece', 'hell'
];

// Moderately negative emotional phrases that trigger a constructive warning
const EMOTIONAL_WARNING_TERMS = [
  'ruined my life', 'nightmare', 'worst ever', 'pure agony', 'torture', 'sucks',
  'lazy', 'useless', 'unfair person', 'terrible', 'pathetic', 'blind', 'deaf',
  'dreadful', 'disaster', 'painful', 'clueless'
];

// Academic constructive keywords that indicate high-quality, helpful review content
const CONSTRUCTIVE_ACADEMIC_TERMS = [
  'syllabus', 'exam', 'midterm', 'final', 'homework', 'assignment', 'lecture',
  'slides', 'office hours', 'grading', 'rubric', 'textbook', 'problem set',
  'lab', 'curve', 'practice', 'quiz', 'clarity', 'feedback', 'project',
  'concept', 'study', 'readings', 'formula', 'coding', 'proof', 'theory',
  'attendance', 'pacing', 'explanation', 'ta', 'teaching assistant', 'tips', 'prepare'
];

/**
 * Analyzes comment text for ragging / harassment and constructive academic value.
 * @param {string} text - Review text or pro-tip text
 * @returns {Object} Analysis result with status, score, detected issues, and suggestions
 */
export function analyzeReviewQuality(text = '') {
  if (!text || text.trim().length < 15) {
    return {
      status: 'too_short',
      score: 50,
      isAllowed: false,
      message: 'Please provide at least 15 characters of constructive feedback to help fellow students.',
      detectedIssues: [],
      suggestions: ['Mention the course workload, exam style, or helpful study tips.'],
      highlightTerms: []
    };
  }

  const cleanText = text.toLowerCase();
  const detectedSevere = [];
  const detectedEmotional = [];

  // 1. Check severe ragging / abuse terms
  for (const term of SEVERE_RAGGING_TERMS) {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(cleanText)) {
      detectedSevere.push(term);
    }
  }

  // 2. Check moderate emotional venting terms
  for (const term of EMOTIONAL_WARNING_TERMS) {
    if (cleanText.includes(term)) {
      detectedEmotional.push(term);
    }
  }

  // 3. Count constructive academic terms
  let constructiveMatches = 0;
  for (const term of CONSTRUCTIVE_ACADEMIC_TERMS) {
    if (cleanText.includes(term)) {
      constructiveMatches++;
    }
  }

  // Determine review score (0 to 100)
  let score = 70;
  if (detectedSevere.length > 0) {
    score -= detectedSevere.length * 40;
  }
  if (detectedEmotional.length > 0) {
    score -= detectedEmotional.length * 20;
  }
  score += Math.min(30, constructiveMatches * 8);
  if (text.trim().length >= 80) score += 10;
  score = Math.max(0, Math.min(100, score));

  // Determine final status
  if (detectedSevere.length > 0) {
    return {
      status: 'blocked',
      score: Math.max(10, score),
      isAllowed: false,
      message: 'Blocked by Anti-Ragging Guard: Feedback contains offensive or personal derogatory language.',
      detectedIssues: detectedSevere.map(t => `Derogatory/abusive term: "${t}"`),
      suggestions: [
        'Focus on course structure, difficulty, and teaching style instead of personal comments.',
        'Describe specific challenges (e.g. "Exams are theoretical with strict time limits") rather than attacking the professor.',
        'Share actionable survival tips for future students.'
      ],
      highlightTerms: detectedSevere
    };
  }

  if (detectedEmotional.length > 0 || score < 60) {
    return {
      status: 'warning',
      score: score,
      isAllowed: true,
      message: 'Constructive Tone Notice: Your review contains subjective emotional venting.',
      detectedIssues: detectedEmotional.map(t => `Venting phrase: "${t}"`),
      suggestions: [
        'Consider refining emotional words into specific advice (e.g., "Grading rubric was strict on formatting").',
        'Add tips on how students can prepare for quizzes or labs to make this review more helpful!'
      ],
      highlightTerms: detectedEmotional
    };
  }

  return {
    status: 'approved',
    score: score,
    isAllowed: true,
    message: 'Excellent! Your review is constructive, respectful, and meets Student Community Anti-Ragging guidelines.',
    detectedIssues: [],
    suggestions: ['Looks great! Fellow students will benefit from your genuine academic insight.'],
    highlightTerms: []
  };
}

export const ANTI_RAGGING_POLICY = {
  title: 'ProfPulse Anti-Ragging & Faculty Respect Policy',
  tagline: 'Empowering Student Success Through Honest, Constructive & Respectful Insights',
  rules: [
    {
      title: 'Zero Tolerance for Personal Ragging & Harassment',
      desc: 'Do not comment on a professor\'s appearance, voice, personal life, accent, race, gender, or background. Comments must strictly relate to teaching efficacy, course organization, grading, and coursework.'
    },
    {
      title: 'Actionable Advice Over Emotional Venting',
      desc: 'Instead of posting "This class was awful", explain WHY and HOW to succeed: "Midterms test proof mechanics rather than calculations; practice Chapter 4-6 supplementary problems."'
    },
    {
      title: 'Protected Student Anonymity',
      desc: 'Reviews are posted discreetly with custom academic year monikers (e.g., "Senior CS Major"). We do not index profiles on public professional networks (e.g., LinkedIn).'
    },
    {
      title: 'Fair & Transparent 10-Point Scorecard',
      desc: 'Multi-dimensional ratings (Clarity, Fairness, Approachability, Course Pacing, Exam Predictability) prevent biased one-star knee-jerk reactions and provide a balanced picture.'
    }
  ],
  examples: [
    {
      bad: '❌ "This professor is a complete idiot and ruined my GPA with garbage tests."',
      good: '✅ "Exams are significantly tougher than the lecture slides. Make sure to work through past exam archives and attend the weekly TA review sessions."'
    },
    {
      bad: '❌ "Hate this class. The professor never talks properly and is annoying."',
      good: '✅ "Lectures are fast-paced with dense theoretical content. Taking notes before class and utilizing office hours makes a massive difference."'
    }
  ]
};
