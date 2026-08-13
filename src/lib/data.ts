export interface IdentityData {
  name: string;
  fullName: string;
  title: string;
  focus: string;
  email: string;
  linkedin: string;
  github: string;
  phone: string;
  location: string;
}

export interface IntroData {
  headline: string;
  subline: string;
}

export interface PhilosophyCard {
  title: string;
  quote: string;
  description: string;
}

export interface PhilosophyData {
  headlineWords: string[];
  cards: PhilosophyCard[];
}

export interface SkillsData {
  languages: string[];
  backend: string[];
  frontend: string[];
  databases: string[];
  devops: string[];
  other: string[];
}

export interface Project {
  id?: string;
  title: string;
  role: string;
  category?: "core" | "secondary";
  categoryLabel?: string;
  stack: string[];
  problem: string;
  solution: string;
  keyDecisions: string[];
}

export interface Education {
  id?: string;
  year: string;
  institution: string;
  program: string;
  description: string;
}

export interface PortfolioData {
  identity: IdentityData;
  intro: IntroData;
  philosophy: PhilosophyData;
  skills: SkillsData;
  projects: Project[];
  education: Education[];
}

export const IDENTITY: IdentityData = {
  name: "Bassel Essam",
  fullName: "Bassel Essam Kamal Mohamed",
  title: "Full Stack Developer",
  focus: "Back-End Focus (PHP & Laravel)",
  email: "baselessam550@gmail.com",
  linkedin: "https://linkedin.com/in/bassel-essam-5a66b6252",
  github: "https://github.com/basselessamm",
  phone: "+20 1212301635",
  location: "Cairo, Egypt",
};

export const INTRO: IntroData = {
  headline: "I architect the systems behind the interface.",
  subline:
    "Full Stack Developer specializing in Back-End Architecture (PHP, Laravel, Clean Architecture, DDD). Experienced in building high-performance APIs and scalable database systems, alongside secondary exploratory work in Mobile & Cross-Platform apps.",
};

export const PHILOSOPHY: PhilosophyData = {
  headlineWords: [
    "I", "DON'T", "JUST", "WRITE", "CODE.",
    "I", "ENGINEER", "SYSTEMS", "THAT", "SURVIVE", "SCALE."
  ],
  cards: [
    {
      title: "Domain-Driven Design",
      quote: '"The logic lives independently of the framework."',
      description:
        "Frameworks change. Databases migrate. UI trends fade. True architecture means insulating the core business logic from external volatility. I build systems where the domain rules supreme, untouched by the noise of the delivery mechanism.",
    },
    {
      title: "Clean Architecture & SOLID",
      quote: '"Rigidity is the enemy of scale."',
      description:
        "Every class has a single reason to change. Every dependency points inward. I don't build features just to ship them fast; I engineer them to be dismantled, extended, and tested without breaking the ecosystem.",
    },
  ],
};

export const SKILLS: SkillsData = {
  languages: ["PHP", "JavaScript", "TypeScript", "SQL", "Dart (Secondary)"],
  backend: ["Laravel", "RESTful APIs", "MVC", "DDD", "Clean Architecture", "SOLID"],
  frontend: ["Vue.js", "Angular", "Tailwind CSS", "Bootstrap", "HTML/CSS"],
  databases: ["MySQL", "SQLite"],
  devops: ["Docker", "Git", "GitHub"],
  other: ["RBAC", "Web Security", "Performance Optimization", "OOP"],
};

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Premium E-Commerce Platform",
    role: "Full Stack Developer",
    category: "core",
    categoryLabel: "Core Back-End (PHP / Laravel)",
    stack: ["Laravel", "Tailwind CSS", "MySQL", "DDD", "Clean Architecture"],
    problem:
      "Build a scalable e-commerce backend that supports multiple authorization levels and dynamic configuration without code changes.",
    solution:
      "Engineered a DDD & Clean Architecture backend with a 4-level RBAC system (User, Employee, Admin, Super Admin) and a dynamic settings engine controllable from the admin panel.",
    keyDecisions: [
      "Strict separation of concerns via Clean Architecture layers",
      "Role-Based Access Control with 4 authorization tiers",
      "Dynamic backend settings logic for runtime configuration",
      "SOLID principles enforced across all service layers",
    ],
  },
  {
    id: "proj-2",
    title: "POS & Inventory Management System",
    role: "Back-End Developer",
    category: "core",
    categoryLabel: "Core Back-End (PHP / Laravel)",
    stack: ["Native PHP", "MySQL", "Performance Optimization"],
    problem:
      "Create a cashier and sales management system that handles real-time daily transactions with minimal resource usage.",
    solution:
      "Built a high-performance system in native PHP focused on execution speed and resource optimization, featuring a scalable relational schema for transactions and financial reporting.",
    keyDecisions: [
      "Native PHP for maximum execution speed and minimal overhead",
      "Optimized relational schema for high-throughput transactions",
      "Resource-efficient query patterns for financial reports",
    ],
  },
  {
    id: "proj-3",
    title: "GYM-SAAS Management Platform",
    role: "Full Stack Developer",
    category: "core",
    categoryLabel: "Core Back-End (PHP / Laravel)",
    stack: ["PHP", "Laravel", "MySQL", "Bootstrap"],
    problem:
      "Manage gym members, multi-tier subscriptions, payroll processing, and member attendance in a unified SaaS architecture.",
    solution:
      "Developed a complete SaaS management platform with member tracking, subscription lifecycle management, automated payroll, and attendance auditing.",
    keyDecisions: [
      "Modular CRUD operations with custom validation layers",
      "Payroll and attendance tracking with audit trails",
      "Data integrity enforcement at the relational schema level",
    ],
  },
  {
    id: "proj-4",
    title: "PHP Secure Authentication Engine",
    role: "Back-End Security Developer",
    category: "core",
    categoryLabel: "Core Back-End (PHP / Laravel)",
    stack: ["Native PHP", "MySQL", "Web Security", "OTP"],
    problem:
      "Architect a hardened authentication engine supporting two-factor OTP verification and secure session management.",
    solution:
      "Engineered a secure login, registration, OTP verification, and password recovery system in native PHP with anti-brute force throttling and CSRF protection.",
    keyDecisions: [
      "Salted password hashing and OTP verification flow",
      "Session hijacking prevention & CSRF tokens",
      "SQL injection mitigation via prepared PDO statements",
    ],
  },
  {
    id: "proj-5",
    title: "Custom Content Management System",
    role: "Full Stack Developer",
    category: "core",
    categoryLabel: "Core Back-End (PHP / Laravel)",
    stack: ["PHP", "Vue.js", "MySQL", "Web Security"],
    problem: "Build a secure, flexible content management system with dynamic page building and role-based access.",
    solution:
      "Architected a CMS with a hardened authentication layer, role-based content control, and a Vue.js-powered reactive admin dashboard.",
    keyDecisions: [
      "Secure authentication with session management",
      "Role-based content access control",
      "Vue.js reactive admin interface",
    ],
  },
  {
    id: "proj-6",
    title: "Athr (أَثَر) - Islamic Productivity App",
    role: "Mobile Developer (Secondary Track)",
    category: "secondary",
    categoryLabel: "Secondary Track (Flutter / Mobile)",
    stack: ["Dart", "Flutter", "Cross-Platform UI"],
    problem:
      "Design a minimalist, distraction-free Islamic productivity companion app centered around daily habits and positive impact.",
    solution:
      "Built a clean Flutter mobile app featuring custom circular progress widgets, habit tracking, and responsive Arabic typography.",
    keyDecisions: [
      "Minimalist UX/UI inspired by concentric ripple geometry",
      "State management using Flutter Provider",
      "Offline-first local storage persistence",
    ],
  },
  {
    id: "proj-7",
    title: "OncoApp - Healthcare & Medical Mobile App",
    role: "Mobile Developer (Secondary Track)",
    category: "secondary",
    categoryLabel: "Secondary Track (Flutter / Mobile)",
    stack: ["Dart", "Flutter", "REST APIs"],
    problem:
      "Create a patient-facing oncology mobile application to assist with treatment tracking and appointment reminders.",
    solution:
      "Developed a Flutter cross-platform mobile application providing intuitive healthcare tracking, dosage schedules, and medical reports.",
    keyDecisions: [
      "Clean mobile interface tailored for patient accessibility",
      "Integration with medical REST API endpoints",
      "Local notification reminders for treatment schedules",
    ],
  },
  {
    id: "proj-8",
    title: "Gym Workout & Routine Tracker",
    role: "Mobile Developer (Secondary Track)",
    category: "secondary",
    categoryLabel: "Secondary Track (Flutter / Mobile)",
    stack: ["Dart", "Flutter", "Mobile UI"],
    problem:
      "Build a lightweight mobile companion for gym-goers to log workout sets, track progress, and monitor exercise routines.",
    solution:
      "Engineered a Flutter mobile application focusing on quick touch inputs during workouts and dynamic progress visualizations.",
    keyDecisions: [
      "Custom fitness set logging interface",
      "Fast local caching for instant workout loading",
      "Responsive cross-device layout",
    ],
  },
  {
    id: "proj-9",
    title: "Interactive Event & Books Guide",
    role: "Frontend Developer (Secondary Track)",
    category: "secondary",
    categoryLabel: "Secondary Track (Frontend / Academic)",
    stack: ["Angular", "TypeScript", "HTML/CSS"],
    problem: "Build an interactive web SPA guide for event scheduling and book catalogs.",
    solution:
      "Built an Angular frontend application with component modularity and type-safe API integration.",
    keyDecisions: [
      "Angular component hierarchy",
      "TypeScript type safety across interfaces",
      "Responsive grid styling",
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    id: "edu-1",
    year: "2025",
    institution: "Information Technology Institute (ITI)",
    program: "Full Stack PHP Development Track",
    description:
      "Intensive professional training program focused on enterprise PHP development, Laravel, databases, and modern frontend frameworks.",
  },
  {
    id: "edu-2",
    year: "2024",
    institution: "Faculty of Commerce",
    program: "Business Information Systems (BIS)",
    description:
      "Bachelor's degree covering information systems, database management, business process modeling, and data analysis.",
  },
];

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;
