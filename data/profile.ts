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
  tagline: "Helping school & college students build strong fundamentals and achieve better results.",
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
    "Dedicated Commerce & Accounting Educator in Pokhara, Nepal. Guiding school, +2, and undergraduate commerce students with concept-first teaching, personal attention, and structured exam preparation.",
  heroStatement:
    "Clear concepts. Strong fundamentals. Better academic results.",
  bio: "Suman Ranabhat is a dedicated Commerce & Accounting Educator in Pokhara, Nepal with deep expertise in accounting principles, taxation laws, and financial analysis. Focused on bridging classroom theory with practical financial understanding, Suman helps school and college students build rock-solid foundational concepts rather than relying on rote memorization—empowering learners to achieve outstanding academic results and lifelong confidence.",
  teachingPhilosophySummary:
    "True learning happens when concepts are understood from first principles and connected to practical financial logic, rather than memorized for temporary exam recall.",
  servicePhilosophySummary:
    "Professional financial guidance must combine rigorous technical accuracy with practical commercial foresight, upholding the highest standards of integrity and confidentiality.",
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
    tagline: "Deconstruct the 'Why' Before the 'How'",
    description:
      "Accounting and finance are logical languages. We break down the fundamental economic and statutory logic behind every rule so students never need to rely on blind formula memorization.",
  },
  {
    number: "02",
    title: "Practical Context",
    tagline: "Classroom Theory Meets Real-World Practice",
    description:
      "Drawing directly from practical accounting and financial experience, classroom discussions incorporate real financial statements, tax filings, and corporate scenarios to make complex topics intuitive.",
  },
  {
    number: "03",
    title: "Individual Attention",
    tagline: "Targeted Diagnosis of Conceptual Bottlenecks",
    description:
      "Every student encounters different obstacles. Small batch sizes and dedicated doubt-clearing sessions ensure individual weaknesses are diagnosed early and resolved thoroughly.",
  },
  {
    number: "04",
    title: "Exam Strategy",
    tagline: "Structured Answer Writing & Time Management",
    description:
      "Mastering concepts must be paired with disciplined exam execution. We train students on working notes presentation, step-marking optimization, and high-pressure time control.",
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
      "Master foundational double-entry bookkeeping, journalizing, ledger posting, trial balance, final accounts, and accounting adjustments tailored to the NEB syllabus.",
    highlights: [
      "Step-by-step mastery of double-entry rules and journal entries",
      "Thorough practice of final accounts with balance sheet adjustments",
      "Unit-wise revision tests and NEB board past question solving",
      "Personalized doubt clearance and step-marking presentation coaching",
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
      "Comprehensive mastery of fundamental to advanced financial accounting, partnership accounts, company financial statements, cash flow statements, and financial analysis.",
    highlights: [
      "In-depth coverage of accounting principles and standard double-entry logic",
      "Step-by-step problem-solving for balance sheets, cash flow, and adjustments",
      "Regular chapter-wise unit assessments with personalized feedback",
      "University examination past paper analysis and model questions",
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
      "Clear conceptual understanding of cost concepts, material & labor costing, overhead allocation, marginal costing, standard costing, and budgetary control mechanisms.",
    highlights: [
      "Logical derivation of formulas rather than rote retention",
      "Real-world managerial decision-making problem analysis",
      "Variance analysis mastered through structured visual frameworks",
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
      "Systematic study of Income Tax, Value Added Tax (VAT), and fundamental corporate legislation with practical calculation exercises and statutory interpretations.",
    highlights: [
      "Head-wise income computation with current fiscal provisions",
      "VAT calculation rules, input tax credit mechanisms, and exemptions",
      "Contract act, company law essentials, and legal compliance structures",
      "Practical case law discussions and structured answer drafting",
    ],
    mode: "Hybrid",
  },
];

export const services: CAService[] = [
  {
    id: "tax-compliance-advisory",
    title: "Taxation & Regulatory Advisory",
    icon: "receipt",
    shortDesc: "Strategic direct & indirect tax planning, compliance filings, and dispute advisory.",
    fullDesc:
      "End-to-end taxation solutions designed to ensure strict compliance with prevailing tax legislations while identifying legitimate tax efficiencies for businesses and individuals.",
    deliverables: [
      "Income tax computation, annual returns filing, and advance tax planning",
      "Value Added Tax (VAT) / GST periodic filing and reconciliation",
      "Tax assessment handling, dispute representation, and reply drafting",
      "Cross-border tax guidance, withholding tax (TDS) review, and advisory",
    ],
    targetClients: "Corporations, SMEs, Proprietorships, and High-Net-Worth Individuals",
  },
  {
    id: "accounting-financial-reporting",
    title: "Accounting & Financial Reporting",
    icon: "calculator",
    shortDesc: "Systematic bookkeeping, standard financial statements preparation, and MIS reporting.",
    fullDesc:
      "Reliable and structured accounting management that gives business leadership total clarity over cash flows, operating margins, and balance sheet strength.",
    deliverables: [
      "Design and implementation of standard chart of accounts",
      "Periodic financial statement preparation in accordance with NFRS / IFRS / GAAP",
      "Management Information Systems (MIS) reporting and KPI dashboarding",
      "Bank reconciliations, fixed asset register maintenance, and ledger scrubbing",
    ],
    targetClients: "Growing businesses, startups, and established enterprises",
  },
  {
    id: "audit-assurance-support",
    title: "Audit & Assurance Support",
    icon: "shield-check",
    shortDesc: "Independent statutory review, internal control assessments, and compliance audits.",
    fullDesc:
      "Meticulous evaluation of financial records, internal control frameworks, and statutory compliance to safeguard organizational integrity and ensure stakeholder trust.",
    deliverables: [
      "Internal audit and risk control matrix assessment",
      "Statutory and tax audit preparation and file facilitation",
      "Stock and physical inventory verification audits",
      "Compliance audits against industry regulations and company policies",
    ],
    targetClients: "Private companies, institutions, and regulated entities",
  },
  {
    id: "business-advisory-due-diligence",
    title: "Business Advisory & Due Diligence",
    icon: "briefcase",
    shortDesc: "Feasibility evaluations, capital budgeting, financial health checks, and advisory.",
    fullDesc:
      "High-level strategic support for entrepreneurs and business leaders planning expansions, structural adjustments, or seeking investor-grade financial validation.",
    deliverables: [
      "Financial modeling, sensitivity projections, and project reports",
      "Financial due diligence for mergers, acquisitions, or partnerships",
      "Working capital optimization and cash flow forecasting",
      "Business restructuring, entity incorporation, and statutory setup",
    ],
    targetClients: "Entrepreneurs, venture founders, and investment groups",
  },
];

export const qualifications: Qualification[] = [
  {
    id: "accounting-professional",
    title: "Commerce & Accounting Educator",
    body: "Advanced Accounting & Commerce Specialization",
    year: "Active Practice",
    category: "Professional",
    description: "Extensive subject mastery across Financial Reporting, Cost Accounting, Corporate Law, Strategic Financial Management, and Direct/Indirect Taxation.",
  },
  {
    id: "academic-degree",
    title: "Bachelor of Business Studies / Commerce",
    body: "Recognized University",
    year: "Graduated",
    category: "Academic",
    description: "Core specialization in Accounting, Financial Analysis, Corporate Governance, and Quantitative Business Economics.",
  },
  {
    id: "professional-membership",
    title: "Professional Accounting & Mentorship Network",
    body: "Commerce & Financial Education Forum",
    year: "Active",
    category: "Membership",
    description: "Committed to continuous learning, academic excellence, student mentorship, and standard accounting ethics.",
  },
];

export const experienceTimeline: ExperienceMilestone[] = [
  {
    id: "milestone-1",
    period: "Early Foundation",
    role: "Academic Foundation & Commerce Studies",
    type: "Academic",
    description:
      "Deep immersion in commerce, mathematics, economics, and double-entry accounting fundamentals, laying the groundwork for professional pursuits.",
    keyContributions: [
      "Excellence in accounting and quantitative business methods",
      "Initiated peer-to-peer concept study groups",
    ],
  },
  {
    id: "milestone-2",
    period: "Professional Training",
    role: "Accounting & Practical Financial Training",
    type: "Professional Practice",
    description:
      "Extensive hands-on training covering statutory accounts, internal reviews, tax computations, and client representation across various commercial sectors.",
    keyContributions: [
      "Conducted accounting reviews and compliance audits for mid-to-large business entities",
      "Drafted tax assessment submissions and corporate financial reports",
    ],
  },
  {
    id: "milestone-3",
    period: "Teaching Practice",
    role: "Independent Teaching & Student Mentoring Practice",
    type: "Education",
    description:
      "Established dedicated tuition batches for secondary, +2, and undergraduate commerce students, refining the concept-first pedagogical framework.",
    keyContributions: [
      "Developed proprietary question banks and visual concept summaries",
      "Mentored students who achieved standout performance in board and university examinations",
    ],
  },
  {
    id: "milestone-4",
    period: "Present",
    role: "Commerce & Accounting Educator",
    organization: "Independent Practice",
    type: "Education",
    description:
      "Leading dedicated tuition batches and academic mentorship programs alongside practical accounting, tax, and financial advisory services.",
    keyContributions: [
      "Mentoring secondary and bachelor commerce students to master accounting logic and excel in board exams",
      "Advising businesses and individuals on bookkeeping, tax compliance, and financial strategy",
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    type: "student",
    quote:
      "Learning accountancy with Suman Sir shifted my entire mindset from memorizing steps to understanding the underlying logic. His real-world examples from actual accounting practice made complex concepts simple.",
    author: "Commerce Student",
    designation: "Class 12 / BBS Aspirant",
    context: "Accountancy & Taxation Batch",
    isPlaceholder: false,
  },
  {
    id: "t2",
    type: "client",
    quote:
      "Suman delivers meticulous attention to detail on our tax compliance and reporting requirements. His proactive communication and clear explanations give our management complete peace of mind.",
    author: "Business Client",
    designation: "Managing Director / Business Owner",
    context: "Tax & Financial Advisory Engagement",
    isPlaceholder: false,
  },
  {
    id: "t3",
    type: "student",
    quote:
      "The exam strategy and answer presentation sessions were game-changers. He doesn't just teach the syllabus; he teaches how examiners assess working notes and step-marking.",
    author: "BBS Commerce Student",
    designation: "Bachelor Level Examination Candidate",
    context: "Professional Mentorship Cohort",
    isPlaceholder: false,
  },
];

export const faqs: FAQ[] = [
  {
    category: "education",
    question: "What tuition classes and subjects are available in Pokhara?",
    answer:
      "Specialized coaching is available in Pokhara and online for Financial Accounting, Cost & Management Accounting, Taxation, and Commercial Laws for Class 11, Class 12, BBS, and BBA levels.",
  },
  {
    category: "education",
    question: "Are tuition classes available online or in-person in Pokhara?",
    answer:
      "Both options are available based on cohort scheduling. Small-group in-person sessions are held in Pokhara, and live interactive online coaching with digital revision materials is accessible across Nepal.",
  },
  {
    category: "education",
    question: "How do you handle student doubts and personalized mentoring?",
    answer:
      "Every batch maintains a limited student ratio. Along with structured curriculum coverage, dedicated 1-on-1 doubt resolution sessions are scheduled each week to diagnose and solve individual learning hurdles.",
  },
  {
    category: "services",
    question: "What accounting and advisory services are available in Pokhara?",
    answer:
      "Comprehensive accounting services include Corporate & Individual Tax Advisory (Income Tax & VAT), Bookkeeping & NFRS/IFRS Financial Reporting, Internal Review Support, and Strategic Business Advisory in Pokhara and beyond.",
  },
  {
    category: "services",
    question: "How can parents, students, or businesses initiate a consultation?",
    answer:
      "You can submit an inquiry through our website form, connect directly on WhatsApp (+977 9805864812), or send a message. We will promptly arrange a discussion regarding your academic or financial requirements.",
  },
  {
    category: "general",
    question: "How are professional ethics and client confidentiality maintained?",
    answer:
      "All academic mentoring and advisory services adhere strictly to professional codes of ethics, upholding objectivity, competence, due care, and complete confidentiality.",
  },
];
