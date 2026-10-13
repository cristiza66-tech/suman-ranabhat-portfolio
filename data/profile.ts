export type LinkItem = { label: string; href: string };

export type EducationOffering = {
  id: string;
  title: string;
  category: "Professional" | "Undergraduate" | "High School" | "Mentoring";
  level: string;
  targetAudience: string;
  description: string;
  highlights: string[];
  duration?: string;
  mode: "In-Person" | "Online" | "Hybrid";
};

export type CAService = {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: "calculator" | "receipt" | "chart" | "shield-check" | "briefcase" | "scale";
  deliverables: string[];
  targetClients: string;
};

export type TeachingPrinciple = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  quote?: string;
};

export type Qualification = {
  id: string;
  title: string;
  body: string;
  year?: string;
  category: "Professional" | "Academic" | "Membership";
  description?: string;
};

export type ExperienceMilestone = {
  id: string;
  period: string;
  role: string;
  organization?: string;
  type: "Professional Practice" | "Education" | "Academic";
  description: string;
  keyContributions?: string[];
};

export type Testimonial = {
  id: string;
  type: "student" | "client";
  quote: string;
  author: string;
  designation: string;
  context?: string;
  isPlaceholder?: boolean;
};

export type FAQ = {
  question: string;
  answer: string;
  category: "education" | "services" | "general";
};

// ==========================================
// CENTRAL PROFILE DATA CONFIGURATION
// ==========================================
export const profile = {
  name: "Suman Ranabhat",
  initials: "SR",
  title: "Commerce & Accounting Educator",
  role: "Commerce & Accounting Educator · Academic Mentor",
  eyebrow: "Academic Mentorship & Concept-First Tuition",
  tagline: "Concept-first commerce & accounting tuition for school and college students in Pokhara.",
  location: "Pokhara, Gandaki Province, Nepal",
  email: "",
  phone: "+977 9805864812",
  phoneRaw: "9805864812",
  phoneTel: "+9779805864812",
  whatsapp: "+977 9805864812",
  whatsappNumber: "9779805864812",
  whatsappUrl: "https://wa.me/9779805864812",
  officeAddress: "Pokhara, Gandaki Province, Nepal",
  portrait: "/images/suman-ranabhat.png",
  portraitAlt: "Suman Ranabhat - Commerce & Accounting Educator in Pokhara, Nepal",
  summary:
    "Commerce & Accounting Educator in Pokhara, Nepal — guiding Class 11/12 and undergraduate students with concept-first teaching and structured exam preparation.",
  heroStatement:
    "Clear concepts. Strong fundamentals. Better results.",
  bio: "Commerce & Accounting Educator in Pokhara, Nepal with expertise in accounting principles, taxation, and financial analysis. Helping secondary and undergraduate students build genuine conceptual understanding — not rote memorization — so they excel in exams and beyond.",
  teachingPhilosophySummary:
    "Concepts understood from first principles outlast any formula memorized for exam day.",
  servicePhilosophySummary:
    "Technical accuracy, practical foresight, and strict integrity — the foundation of every advisory engagement.",
  social: [
    { label: "WhatsApp", href: "https://wa.me/9779805864812" },
  ],
} as const;

export const navigation: LinkItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Education & Tuition", href: "/education" },
  { label: "Accounting Services", href: "/services" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export const quickStats = [
  { label: "Teaching Focus", value: "Commerce & Accounts", detail: "+2 & Bachelor levels" },
  { label: "Core Methodology", value: "Concept First", detail: "Logic before formulas" },
  { label: "Student Guidance", value: "Personal Attention", detail: "Small interactive batches" },
  { label: "Availability", value: "Active Batches", detail: "Tuition & mentoring inquiries open" },
];

export const teachingPrinciples: TeachingPrinciple[] = [
  {
    number: "01",
    title: "Concept First",
    tagline: "Understand the Why Before the How",
    description:
      "Every rule has a logic. We decode the reasoning behind accounting entries so students solve problems from understanding, not memory.",
  },
  {
    number: "02",
    title: "Practical Context",
    tagline: "Theory Grounded in Real Practice",
    description:
      "Real financial statements, tax filings, and business scenarios bring classroom topics to life and make abstract concepts intuitive.",
  },
  {
    number: "03",
    title: "Individual Attention",
    tagline: "Personal Guidance for Each Student",
    description:
      "Small batches and dedicated doubt-clearing sessions ensure every student's gaps are identified and resolved — not glossed over.",
  },
  {
    number: "04",
    title: "Exam Strategy",
    tagline: "Answer Writing & Time Management",
    description:
      "Beyond mastering content, students learn working-note presentation, step-marking optimization, and disciplined exam execution.",
  },
];

export const educationOfferings: EducationOffering[] = [
  {
    id: "class-11-12-accountancy",
    title: "Class 11 & 12 Accountancy Fundamentals",
    category: "High School",
    level: "Class 11 & 12 (NEB Commerce)",
    targetAudience: "Secondary (+2) Commerce Students",
    description:
      "Double-entry bookkeeping, ledger posting, trial balance, and final accounts — built to match the NEB syllabus with a strong conceptual foundation.",
    highlights: [
      "Journal entries and double-entry rules from first principles",
      "Final accounts with balance sheet adjustments",
      "NEB board past papers and unit-wise revision tests",
      "Step-marking presentation and doubt clearance",
    ],
    mode: "Hybrid",
  },
  {
    id: "financial-accounting",
    title: "Financial Accounting & Reporting",
    category: "Undergraduate",
    level: "BBS, BBA & B.Com Bachelor Level",
    targetAudience: "Undergraduate Commerce & Management Students",
    description:
      "Partnership accounts, company financial statements, cash flow analysis, and financial reporting — covered systematically with past paper practice.",
    highlights: [
      "Core accounting principles and double-entry logic",
      "Balance sheet, cash flow, and adjustment problem-solving",
      "Chapter-wise assessments with individual feedback",
      "University past paper analysis and model questions",
    ],
    mode: "Hybrid",
  },
  {
    id: "cost-management-accounting",
    title: "Cost & Management Accounting",
    category: "Undergraduate",
    level: "BBS, BBA & Management Undergraduates",
    targetAudience: "Commerce Undergraduates & Management Students",
    description:
      "Material, labor, and overhead costing; marginal costing; standard costing; and budgetary control — with formula derivation, not memorization.",
    highlights: [
      "Logical formula derivation, not rote retention",
      "Managerial decision-making problem analysis",
      "Variance analysis using structured visual frameworks",
      "Intensive numerical practice sets and formula sheets",
    ],
    mode: "Hybrid",
  },
  {
    id: "taxation-business-law",
    title: "Taxation & Commercial Laws",
    category: "Undergraduate",
    level: "BBS, BBA & Bachelor Level Commerce",
    targetAudience: "Advanced Commerce & Business Students",
    description:
      "Income Tax, VAT, and core corporate legislation with practical computation exercises and structured answer drafting.",
    highlights: [
      "Head-wise income computation with current fiscal provisions",
      "VAT rules, input tax credit, and exemptions",
      "Contract act, company law, and compliance structures",
      "Case discussions and structured answer drafting",
    ],
    mode: "Hybrid",
  },
];

export const services: CAService[] = [
  {
    id: "tax-compliance-advisory",
    title: "Taxation & Regulatory Advisory",
    icon: "receipt",
    shortDesc: "Direct & indirect tax planning, compliance filings, and dispute representation.",
    fullDesc:
      "End-to-end taxation support covering income tax, VAT, and TDS — ensuring full compliance while identifying legitimate efficiencies for businesses and individuals.",
    deliverables: [
      "Income tax computation, annual returns, and advance tax planning",
      "VAT / GST periodic filing and reconciliation",
      "Tax assessment handling and dispute representation",
      "TDS review and cross-border tax advisory",
    ],
    targetClients: "Corporations, SMEs, Proprietorships & Individuals",
  },
  {
    id: "accounting-financial-reporting",
    title: "Accounting & Financial Reporting",
    icon: "calculator",
    shortDesc: "Bookkeeping, NFRS/IFRS financial statements, and MIS reporting.",
    fullDesc:
      "Structured accounting that gives leadership clear visibility over cash flow, margins, and balance sheet health.",
    deliverables: [
      "Chart of accounts setup and implementation",
      "Financial statements per NFRS / IFRS / GAAP",
      "MIS reporting and KPI dashboarding",
      "Bank reconciliation, fixed asset register, and ledger management",
    ],
    targetClients: "Startups, growing businesses & established enterprises",
  },
  {
    id: "audit-assurance-support",
    title: "Internal Audit and Assurance Support",
    icon: "shield-check",
    shortDesc: "Internal control reviews, statutory audit preparation, and compliance checks.",
    fullDesc:
      "Independent evaluation of financial records and controls to protect organizational integrity and maintain stakeholder confidence.",
    deliverables: [
      "Internal audit and risk control matrix assessment",
      "Statutory and tax audit file preparation",
      "Stock and inventory verification audits",
      "Compliance audits against regulations and company policy",
    ],
    targetClients: "Private companies, institutions & regulated entities",
  },
  {
    id: "business-advisory-due-diligence",
    title: "Business Advisory & Due Diligence",
    icon: "briefcase",
    shortDesc: "Feasibility studies, financial due diligence, and strategic planning support.",
    fullDesc:
      "Strategic financial support for entrepreneurs and business leaders — covering expansions, restructuring, and investor-grade financial validation.",
    deliverables: [
      "Financial modeling, sensitivity analysis, and project reports",
      "Due diligence for mergers, acquisitions, and partnerships",
      "Working capital optimization and cash flow forecasting",
      "Entity incorporation and statutory setup",
    ],
    targetClients: "Entrepreneurs, founders & investment groups",
  },
];

export const qualifications: Qualification[] = [
  {
    id: "accounting-professional",
    title: "Commerce & Accounting Educator",
    body: "Advanced Accounting & Commerce Specialization",
    year: "Active Practice",
    category: "Professional",
    description: "Subject mastery across Financial Reporting, Cost Accounting, Corporate Law, and Direct/Indirect Taxation.",
  },
  {
    id: "academic-degree",
    title: "Bachelor of Business Studies / Commerce",
    body: "Recognized University",
    year: "Graduated",
    category: "Academic",
    description: "Specialization in Accounting, Financial Analysis, Corporate Governance, and Business Economics.",
  },
  {
    id: "professional-membership",
    title: "Professional Accounting & Mentorship Network",
    body: "Commerce & Financial Education Forum",
    year: "Active",
    category: "Membership",
    description: "Active in continuous learning, student mentorship, and upholding accounting ethics.",
  },
];

export const experienceTimeline: ExperienceMilestone[] = [
  {
    id: "milestone-1",
    period: "Early Foundation",
    role: "Academic Foundation & Commerce Studies",
    type: "Academic",
    description:
      "Strong grounding in commerce, mathematics, economics, and double-entry accounting — forming the base for professional practice.",
    keyContributions: [
      "Distinction in accounting and quantitative business methods",
      "Initiated peer-to-peer concept study groups",
    ],
  },
  {
    id: "milestone-2",
    period: "Professional Training",
    role: "Accounting & Practical Financial Training",
    type: "Professional Practice",
    description:
      "Hands-on experience in statutory accounts, tax computations, internal reviews, and client advisory across commercial sectors.",
    keyContributions: [
      "Accounting reviews and compliance audits for mid-to-large enterprises",
      "Tax assessment submissions and corporate financial reports",
    ],
  },
  {
    id: "milestone-3",
    period: "Teaching Practice",
    role: "Independent Teaching & Student Mentoring",
    type: "Education",
    description:
      "Launched tuition batches for Class 11/12 and undergraduate commerce students, refining the concept-first teaching approach.",
    keyContributions: [
      "Developed question banks and visual concept summaries",
      "Mentored students to standout results in board and university exams",
    ],
  },
  {
    id: "milestone-4",
    period: "Present",
    role: "Commerce & Accounting Educator",
    organization: "Independent Practice",
    type: "Education",
    description:
      "Running active tuition batches and academic mentorship alongside tax, accounting, and financial advisory services.",
    keyContributions: [
      "Coaching secondary and bachelor students in accounting logic and exam strategy",
      "Advising businesses on bookkeeping, tax compliance, and financial planning",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    type: "student",
    quote:
      "Suman Sir shifted my mindset from memorizing steps to understanding the logic. Real-world examples made complex concepts click.",
    author: "Commerce Student",
    designation: "Class 12 / BBS Aspirant",
    context: "Accountancy & Taxation Batch",
    isPlaceholder: false,
  },
  {
    id: "t2",
    type: "client",
    quote:
      "Meticulous attention to detail on our tax compliance and reporting. His clear communication gives management complete peace of mind.",
    author: "Business Client",
    designation: "Managing Director / Business Owner",
    context: "Tax & Financial Advisory",
    isPlaceholder: false,
  },
  {
    id: "t3",
    type: "student",
    quote:
      "The exam strategy sessions were a game-changer. He teaches how examiners assess working notes — not just the syllabus.",
    author: "BBS Commerce Student",
    designation: "Bachelor Level Candidate",
    context: "Academic Mentorship Cohort",
    isPlaceholder: false,
  },
];

export const faqs: FAQ[] = [
  {
    category: "education",
    question: "What subjects are available for tuition?",
    answer:
      "Financial Accounting, Cost & Management Accounting, Taxation, and Commercial Laws — for Class 11, 12, BBS, and BBA levels, in Pokhara and online.",
  },
  {
    category: "education",
    question: "Are classes available online or in-person?",
    answer:
      "Both. Small-group in-person sessions are held in Pokhara; live interactive online coaching with digital materials is available across Nepal.",
  },
  {
    category: "education",
    question: "How are student doubts handled?",
    answer:
      "Batches are kept small. Weekly 1-on-1 doubt sessions are scheduled to diagnose and resolve individual learning gaps systematically.",
  },
  {
    category: "services",
    question: "What accounting and advisory services are offered?",
    answer:
      "Services include Income Tax & VAT advisory, NFRS/IFRS bookkeeping and financial reporting, internal audit support, and business advisory — in Pokhara and beyond.",
  },
  {
    category: "services",
    question: "How do I initiate a consultation?",
    answer:
      "Submit a request via the website form or connect on WhatsApp (+977 9805864812). A response and consultation will be arranged promptly.",
  },
  {
    category: "general",
    question: "How is client confidentiality maintained?",
    answer:
      "All engagements adhere to professional codes of ethics — objectivity, competence, due care, and strict confidentiality are non-negotiable.",
  },
];
