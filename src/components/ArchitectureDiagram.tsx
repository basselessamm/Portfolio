"use client";

import { motion } from "framer-motion";

export default function ArchitectureDiagram({ projectIndex }: { projectIndex: number }) {
  // Render a different diagram based on the project index
  switch (projectIndex) {
    case 0:
      return <EcommerceDiagram />;
    case 1:
      return <POSDiagram />;
    case 2:
      return <GymDiagram />;
    case 3:
      return <CMSDiagram />;
    case 4:
      return <EventDiagram />;
    default:
      return <FallbackDiagram />;
  }
}

// ---------------------------------------------------------
// Project 0: Premium E-Commerce (DDD, 4-Level RBAC, Laravel)
// ---------------------------------------------------------
function EcommerceDiagram() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[10px]">
      <defs>
        <linearGradient id="flow-grad-0" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Nodes */}
      {/* Client Layer */}
      <rect x="150" y="40" width="100" height="30" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="200" y="58" fill="var(--text-primary)" textAnchor="middle">Client Requests</text>

      {/* API Gateway / Auth Layer */}
      <rect x="130" y="120" width="140" height="40" fill="var(--surface-2)" stroke="var(--accent)" rx="4" strokeWidth="2" />
      <text x="200" y="140" fill="var(--accent)" textAnchor="middle" fontWeight="bold">API Gateway</text>
      <text x="200" y="152" fill="var(--text-tertiary)" textAnchor="middle">4-Level RBAC</text>

      {/* DDD Domains */}
      <rect x="40" y="220" width="90" height="40" fill="var(--surface-1)" stroke="var(--border)" rx="4" />
      <text x="85" y="243" fill="var(--text-secondary)" textAnchor="middle">Catalog Domain</text>

      <rect x="155" y="220" width="90" height="40" fill="var(--surface-1)" stroke="var(--border)" rx="4" />
      <text x="200" y="243" fill="var(--text-secondary)" textAnchor="middle">Order Domain</text>

      <rect x="270" y="220" width="90" height="40" fill="var(--surface-1)" stroke="var(--border)" rx="4" />
      <text x="315" y="243" fill="var(--text-secondary)" textAnchor="middle">User Domain</text>

      {/* DB Layer */}
      <rect x="150" y="320" width="100" height="40" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="200" y="343" fill="var(--text-primary)" textAnchor="middle">MySQL Cluster</text>

      {/* Static connections */}
      <path d="M 200 70 L 200 120" stroke="var(--border)" fill="none" />
      <path d="M 200 160 L 85 220" stroke="var(--border)" fill="none" />
      <path d="M 200 160 L 200 220" stroke="var(--border)" fill="none" />
      <path d="M 200 160 L 315 220" stroke="var(--border)" fill="none" />
      <path d="M 85 260 L 200 320" stroke="var(--border)" fill="none" />
      <path d="M 200 260 L 200 320" stroke="var(--border)" fill="none" />
      <path d="M 315 260 L 200 320" stroke="var(--border)" fill="none" />

      {/* Animated Flow Lines */}
      <motion.line 
        x1="200" y1="70" x2="200" y2="120" stroke="url(#flow-grad-0)" strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.line 
        x1="200" y1="160" x2="200" y2="220" stroke="url(#flow-grad-0)" strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
      />
    </svg>
  );
}

// ---------------------------------------------------------
// Project 1: POS & Inventory (High Perf, Relational DB)
// ---------------------------------------------------------
function POSDiagram() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[10px]">
      <defs>
        <linearGradient id="flow-grad-1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Fast Execution Pipeline */}
      <rect x="50" y="180" width="300" height="40" fill="var(--surface-2)" stroke="var(--accent)" rx="20" strokeWidth="2" />
      <text x="200" y="203" fill="var(--accent)" textAnchor="middle" fontWeight="bold">Native PHP Execution Pipeline</text>

      {/* Inputs */}
      <rect x="60" y="80" width="80" height="30" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="100" y="98" fill="var(--text-primary)" textAnchor="middle">POS Terminal</text>
      
      <rect x="260" y="80" width="80" height="30" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="300" y="98" fill="var(--text-primary)" textAnchor="middle">Inventory Sync</text>

      {/* DB output */}
      <rect x="120" y="280" width="160" height="40" fill="var(--surface-1)" stroke="var(--border)" rx="4" />
      <text x="200" y="303" fill="var(--text-secondary)" textAnchor="middle">Optimized Relational DB</text>

      {/* Connections */}
      <path d="M 100 110 L 100 180" stroke="var(--border)" fill="none" />
      <path d="M 300 110 L 300 180" stroke="var(--border)" fill="none" />
      <path d="M 200 220 L 200 280" stroke="var(--border)" fill="none" />

      {/* Animated Flows */}
      <motion.line 
        x1="100" y1="110" x2="100" y2="180" stroke="var(--accent)" strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
      <motion.line 
        x1="200" y1="220" x2="200" y2="280" stroke="var(--accent)" strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.4 }}
      />
    </svg>
  );
}

// ---------------------------------------------------------
// Project 2: Gym Management (Modular, Integrity)
// ---------------------------------------------------------
function GymDiagram() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[10px]">
      <circle cx="200" cy="200" r="80" fill="none" stroke="var(--border)" strokeDasharray="4 4" />
      
      {/* Central Hub */}
      <rect x="160" y="160" width="80" height="80" fill="var(--surface-2)" stroke="var(--accent)" rx="40" strokeWidth="2" />
      <text x="200" y="203" fill="var(--accent)" textAnchor="middle" fontWeight="bold">CORE</text>

      {/* Modules */}
      <rect x="160" y="40" width="80" height="30" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="200" y="58" fill="var(--text-secondary)" textAnchor="middle">Members</text>

      <rect x="300" y="185" width="80" height="30" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="340" y="203" fill="var(--text-secondary)" textAnchor="middle">Payroll</text>

      <rect x="160" y="330" width="80" height="30" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="200" y="348" fill="var(--text-secondary)" textAnchor="middle">Attendance</text>

      <rect x="20" y="185" width="80" height="30" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="60" y="203" fill="var(--text-secondary)" textAnchor="middle">Subscriptions</text>

      {/* Animated connections syncing to core */}
      {[
        { x1: 200, y1: 70, x2: 200, y2: 160 },
        { x1: 300, y1: 200, x2: 240, y2: 200 },
        { x1: 200, y1: 330, x2: 200, y2: 240 },
        { x1: 100, y1: 200, x2: 160, y2: 200 }
      ].map((line, i) => (
        <g key={i}>
          <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="var(--border)" />
          <motion.line
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="var(--accent)" strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------
// Project 3: CMS (Security, Vue Admin)
// ---------------------------------------------------------
function CMSDiagram() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[10px]">
      {/* Front-end */}
      <rect x="140" y="60" width="120" height="40" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="200" y="83" fill="var(--text-primary)" textAnchor="middle">Vue.js Admin UI</text>

      {/* Security Barrier */}
      <path d="M 80 150 L 320 150" stroke="var(--accent)" strokeWidth="2" strokeDasharray="8 4" />
      <text x="200" y="145" fill="var(--accent)" textAnchor="middle">Authentication / Session Barrier</text>

      {/* CMS Core */}
      <rect x="140" y="200" width="120" height="60" fill="var(--surface-2)" stroke="var(--border)" rx="4" />
      <text x="200" y="225" fill="var(--text-secondary)" textAnchor="middle">PHP Core</text>
      <text x="200" y="240" fill="var(--text-tertiary)" textAnchor="middle">Role Validation</text>

      {/* DB */}
      <rect x="140" y="300" width="120" height="40" fill="var(--surface-1)" stroke="var(--border)" rx="4" />
      <text x="200" y="323" fill="var(--text-secondary)" textAnchor="middle">Content DB</text>

      {/* Links */}
      <line x1="200" y1="100" x2="200" y2="200" stroke="var(--border)" />
      <line x1="200" y1="260" x2="200" y2="300" stroke="var(--border)" />

      {/* Lock icon representing security */}
      <motion.rect 
        x="190" y="130" width="20" height="20" fill="var(--background)" stroke="var(--accent)" rx="2"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  );
}

// ---------------------------------------------------------
// Project 4: Event Planning (Angular, REST)
// ---------------------------------------------------------
function EventDiagram() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[10px]">
      <rect x="100" y="80" width="200" height="60" fill="var(--surface-3)" stroke="var(--border)" rx="4" />
      <text x="200" y="110" fill="var(--text-primary)" textAnchor="middle">Angular SPA (TypeScript)</text>

      <path d="M 200 140 L 200 240" stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />
      <text x="210" y="190" fill="var(--accent)" textAnchor="start">REST API</text>

      <rect x="100" y="240" width="200" height="60" fill="var(--surface-2)" stroke="var(--accent)" rx="4" />
      <text x="200" y="270" fill="var(--accent)" textAnchor="middle" fontWeight="bold">Backend Services</text>
      
      {/* Bidirectional data flow */}
      <motion.circle cx="200" cy="140" r="4" fill="var(--accent)" 
        animate={{ cy: [140, 240, 140] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

// ---------------------------------------------------------
// Fallback
// ---------------------------------------------------------
function FallbackDiagram() {
  return (
    <div className="w-full h-full flex items-center justify-center border border-[var(--border)] bg-[var(--surface-1)]">
      <span className="text-[10px] font-mono text-[var(--text-tertiary)]">SYS.NO_DIAGRAM</span>
    </div>
  );
}
