/* --------------------------------------------------
   Data layer: Single source of truth for all CV content.
   Every component imports from here — no hardcoded strings.
   -------------------------------------------------- */

export const IDENTITY = {
  name: "Bassel Essam",
  fullName: "Bassel Essam Kamal Mohamed",
  title: "Full Stack Developer",
  focus: "Back-End Focus",
  email: "baselessam550@gmail.com",
  linkedin: "https://linkedin.com/in/bassel-essam-5a66b6252",
  github: "https://github.com/basselessamm",
  phone: "+20 1212301635",
  location: "Cairo, Egypt",
} as const;

export const INTRO = {
  headline: "I architect the systems behind the interface.",
  subline:
    "Full Stack Developer with a back-end focus. I design scalable, maintainable software grounded in Clean Architecture, Domain-Driven Design, and the SOLID principles.",
} as const;

export const SKILLS = {
  languages: ["PHP", "JavaScript", "TypeScript", "SQL"],
  backend: ["Laravel", "RESTful APIs", "MVC", "DDD", "Clean Architecture", "SOLID"],
  frontend: ["Vue.js", "Angular", "Tailwind CSS", "Bootstrap", "HTML/CSS"],
  databases: ["MySQL", "SQLite"],
  devops: ["Docker", "Git", "GitHub"],
  other: ["RBAC", "Web Security", "Performance Optimization", "OOP"],
} as const;

export type Project = {
  title: string;
  role: string;
  stack: readonly string[];
  problem: string;
  solution: string;
  keyDecisions: readonly string[];
};

export const PROJECTS: readonly Project[] = [
  {
    title: "Premium E-Commerce Platform",
    role: "Full Stack Developer",
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
    title: "POS & Inventory Management System",
    role: "Back-End Developer",
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
    title: "Gym Management System",
    role: "Full Stack Developer",
    stack: ["PHP", "MySQL", "Bootstrap"],
    problem:
      "Manage gym members, subscriptions, payroll, and attendance in a unified system.",
    solution:
      "Developed a complete management platform with member tracking, subscription management, payroll processing, and attendance monitoring with strict data integrity.",
    keyDecisions: [
      "Modular CRUD operations with validation layers",
      "Payroll and attendance tracking with audit trails",
      "Data integrity enforcement at the schema level",
    ],
  },
  {
    title: "Custom CMS Platform",
    role: "Full Stack Developer",
    stack: ["PHP", "Vue.js", "MySQL", "Web Security"],
    problem: "Build a secure, flexible content management system with robust authentication.",
    solution:
      "Architected a CMS with a hardened authentication layer, role-based content control, and a Vue.js-powered admin dashboard.",
    keyDecisions: [
      "Secure authentication with session management",
      "Role-based content access control",
      "Vue.js reactive admin interface",
    ],
  },
  {
    title: "Event Planning System",
    role: "Frontend Developer",
    stack: ["Angular", "TypeScript", "RESTful APIs"],
    problem: "Create an interactive event planning interface consuming external APIs.",
    solution:
      "Built an Angular SPA with TypeScript for event creation, scheduling, and management, integrating with RESTful backends.",
    keyDecisions: [
      "Angular component architecture for reusability",
      "TypeScript for type-safe API integration",
      "Responsive layouts for cross-device usage",
    ],
  },
] as const;

export type Education = {
  year: string;
  institution: string;
  program: string;
  description: string;
};

export const EDUCATION: readonly Education[] = [
  {
    year: "2025",
    institution: "Information Technology Institute (ITI)",
    program: "Full Stack PHP Development Track",
    description:
      "Intensive professional training program focused on enterprise PHP development, Laravel, databases, and modern frontend frameworks.",
  },
  {
    year: "2024",
    institution: "Faculty of Commerce",
    program: "Business Information Systems (BIS)",
    description:
      "Bachelor's degree covering information systems, database management, business process modeling, and data analysis.",
  },
] as const;

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;
