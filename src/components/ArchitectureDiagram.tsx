"use client";

import { motion } from "framer-motion";

export default function ArchitectureDiagram({
  projectIndex,
  project,
}: {
  projectIndex: number;
  project?: { id?: string; title?: string };
}) {
  const identifier = `${project?.id || ""} ${project?.title || ""}`.toLowerCase();

  if (identifier.includes("dinesync")) {
    return <DineSyncDiagram />;
  }
  if (identifier.includes("roadbook")) {
    return <RoadbookDiagram />;
  }

  switch (projectIndex % 10) {
    case 0:
      return <EcommerceDiagram />;
    case 1:
      return <DineSyncDiagram />;
    case 2:
      return <GymSaasDiagram />;
    case 3:
      return <SecurityEngineDiagram />;
    case 4:
      return <CMSDiagram />;
    case 5:
      return <RoadbookDiagram />;
    case 6:
      return <AthrMobileDiagram />;
    case 7:
      return <OncoAppDiagram />;
    case 8:
      return <GymWorkoutDiagram />;
    case 9:
      return <EventBooksDiagram />;
    default:
      return <EcommerceDiagram />;
  }
}

// ---------------------------------------------------------
// Diagram 0: Premium E-Commerce (Clean Architecture & DDD)
// ---------------------------------------------------------
function EcommerceDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[11px] select-none">
        <defs>
          <linearGradient id="grad-emerald" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="grad-pulse" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer DDD Domain Boundary */}
        <rect x="20" y="20" width="360" height="360" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="6 6" rx="16" opacity="0.4" />
        <text x="35" y="42" fill="#10b981" fontSize="10" fontWeight="bold" letterSpacing="1">DOMAIN-DRIVEN DESIGN BOUNDARY</text>

        {/* Clean Architecture Rings */}
        <circle cx="200" cy="210" r="140" fill="none" stroke="var(--border)" opacity="0.3" strokeWidth="1" />
        <circle cx="200" cy="210" r="95" fill="none" stroke="#10b981" opacity="0.25" strokeWidth="1" />
        <circle cx="200" cy="210" r="50" fill="url(#grad-emerald)" stroke="#10b981" strokeWidth="2" />

        {/* Core Domain Center */}
        <text x="200" y="206" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="12">CORE DOMAIN</text>
        <text x="200" y="222" fill="#a7f3d0" textAnchor="middle" fontSize="9" fontWeight="bold">Business Logic</text>

        {/* Outer Infrastructure Nodes */}
        {/* API Gateway */}
        <g transform="translate(140, 60)">
          <rect width="120" height="32" fill="var(--surface-1)" stroke="#10b981" strokeWidth="1.5" rx="6" />
          <text x="60" y="17" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="10">API Gateway</text>
          <text x="60" y="27" fill="#059669" textAnchor="middle" fontSize="8" fontWeight="bold">4-Level RBAC</text>
        </g>

        {/* Catalog Subdomain */}
        <g transform="translate(35, 190)">
          <rect width="90" height="36" fill="var(--surface-1)" stroke="var(--border)" rx="6" />
          <text x="45" y="18" fill="var(--text-primary)" textAnchor="middle" fontSize="10">Catalog Subdomain</text>
          <text x="45" y="29" fill="var(--text-secondary)" textAnchor="middle" fontSize="8">Product Bounded Context</text>
        </g>

        {/* Order Subdomain */}
        <g transform="translate(275, 190)">
          <rect width="90" height="36" fill="var(--surface-1)" stroke="var(--border)" rx="6" />
          <text x="45" y="18" fill="var(--text-primary)" textAnchor="middle" fontSize="10">Order Subdomain</text>
          <text x="45" y="29" fill="var(--text-secondary)" textAnchor="middle" fontSize="8">Checkout & Inventory</text>
        </g>

        {/* MySQL Persistence */}
        <g transform="translate(140, 320)">
          <rect width="120" height="32" fill="var(--surface-1)" stroke="#10b981" strokeWidth="1.5" rx="6" />
          <text x="60" y="17" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="10">MySQL Relational DB</text>
          <text x="60" y="27" fill="#059669" textAnchor="middle" fontSize="8" fontWeight="bold">Strict Relational Schema</text>
        </g>

        {/* Connecting Lines & Data Particles */}
        <line x1="200" y1="92" x2="200" y2="160" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="200" y1="260" x2="200" y2="320" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="125" y1="208" x2="150" y2="208" stroke="var(--border)" />
        <line x1="250" y1="208" x2="275" y2="208" stroke="var(--border)" />

        {/* Animated Particles */}
        <motion.circle cx="200" cy="92" r="3" fill="#34d399" animate={{ cy: [92, 160] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
        <motion.circle cx="200" cy="260" r="3" fill="#34d399" animate={{ cy: [260, 320] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.7 }} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// Diagram 1: DineSync — Local Restaurant Operating System (LAN / Offline-First POS & KDS)
// ---------------------------------------------------------
function DineSyncDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[10px] select-none">
        <defs>
          <linearGradient id="dinesync-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Outer Air-Gapped Local LAN Perimeter */}
        <rect
          x="15"
          y="15"
          width="370"
          height="370"
          fill="var(--surface-1)"
          stroke="#10b981"
          strokeWidth="1.2"
          strokeDasharray="5 5"
          rx="14"
          opacity="0.9"
        />
        <g transform="translate(24, 30)">
          <circle cx="5" cy="5" r="3" fill="#10b981" />
          <text x="14" y="9" fill="#10b981" fontSize="9" fontWeight="bold" letterSpacing="1">
            AIR-GAPPED LAN PERIMETER // ZERO CLOUD DEPENDENCY
          </text>
        </g>

        {/* 1. TOP-LEFT: Waiter PWA (Mobile Touch Client) */}
        <g transform="translate(24, 48)">
          <rect width="162" height="60" fill="var(--surface-2)" stroke="#06b6d4" strokeWidth="1.5" rx="8" />
          <text x="81" y="19" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="10.5">
            📱 Waiter PWA (Touch)
          </text>
          <rect x="15" y="26" width="132" height="15" fill="#06b6d4" fillOpacity="0.15" rx="4" />
          <text x="81" y="37" fill="#0284c7" textAnchor="middle" fontSize="8" fontWeight="bold">
            IndexedDB Outbox Queue
          </text>
          <text x="81" y="52" fill="var(--text-secondary)" textAnchor="middle" fontSize="7.5">
            Idempotency UUIDs · Offline First
          </text>
        </g>

        {/* 2. TOP-RIGHT: Kitchen Display System (KDS Stations) */}
        <g transform="translate(214, 48)">
          <rect width="162" height="60" fill="var(--surface-2)" stroke="#f59e0b" strokeWidth="1.5" rx="8" />
          <text x="81" y="19" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="10.5">
            🍳 KDS Kitchen Screen
          </text>
          <rect x="15" y="26" width="132" height="15" fill="#f59e0b" fillOpacity="0.15" rx="4" />
          <text x="81" y="37" fill="#d97706" textAnchor="middle" fontSize="8" fontWeight="bold">
            Kitchen · Bar · Grill Channels
          </text>
          <text x="81" y="52" fill="var(--text-secondary)" textAnchor="middle" fontSize="7.5">
            Realtime SLA Prep Timers
          </text>
        </g>

        {/* 3. CENTRAL: Laravel 12 Server Core */}
        <g transform="translate(50, 142)">
          <rect width="300" height="114" fill="url(#dinesync-grad)" stroke="#10b981" strokeWidth="2" rx="10" />
          <text x="150" y="23" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="11.5">
            Laravel 12 On-Premises Server Core
          </text>
          <text x="150" y="37" fill="#059669" textAnchor="middle" fontSize="8.5" fontWeight="bold">
            Local Source of Truth · &lt;1.2ms LAN Response
          </text>

          {/* Engine Pillars */}
          <g transform="translate(15, 46)">
            <rect width="128" height="26" fill="var(--surface-1)" stroke="var(--border)" rx="5" />
            <text x="64" y="16" fill="var(--text-primary)" textAnchor="middle" fontSize="8" fontWeight="bold">
              State Machine Engine
            </text>
          </g>
          <g transform="translate(157, 46)">
            <rect width="128" height="26" fill="var(--surface-1)" stroke="#06b6d4" strokeOpacity="0.4" rx="5" />
            <text x="64" y="16" fill="#0284c7" textAnchor="middle" fontSize="8" fontWeight="bold">
              Laravel Reverb WebSockets
            </text>
          </g>

          <g transform="translate(15, 78)">
            <rect width="270" height="24" fill="var(--surface-1)" stroke="#10b981" strokeOpacity="0.4" rx="4" />
            <text x="135" y="15" fill="var(--text-secondary)" textAnchor="middle" fontSize="7.5">
              MySQL InnoDB Transactions · Concurrency Row Locking · Full Audit Ledger
            </text>
          </g>
        </g>

        {/* 4. BOTTOM-LEFT: Cashier / POS Terminal */}
        <g transform="translate(24, 290)">
          <rect width="162" height="60" fill="var(--surface-2)" stroke="#10b981" strokeWidth="1.5" rx="8" />
          <text x="81" y="19" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="10.5">
            💳 Cashier POS Terminal
          </text>
          <rect x="15" y="26" width="132" height="15" fill="#10b981" fillOpacity="0.15" rx="4" />
          <text x="81" y="37" fill="#059669" textAnchor="middle" fontSize="8" fontWeight="bold">
            Cashier Shift &amp; Drawer Audit
          </text>
          <text x="81" y="52" fill="var(--text-secondary)" textAnchor="middle" fontSize="7.5">
            Split/Merge · Idempotent Pay
          </text>
        </g>

        {/* 5. BOTTOM-RIGHT: Hardware Thermal Printing (QZ Tray Bridge) */}
        <g transform="translate(214, 290)">
          <rect width="162" height="60" fill="var(--surface-2)" stroke="var(--border)" strokeWidth="1.5" rx="8" />
          <text x="81" y="19" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="10.5">
            🖨️ QZ Tray Print Bridge
          </text>
          <rect x="15" y="26" width="132" height="15" fill="var(--surface-3)" fillOpacity="0.5" rx="4" />
          <text x="81" y="37" fill="var(--text-primary)" textAnchor="middle" fontSize="8" fontWeight="bold">
            58mm / 80mm ESC/POS
          </text>
          <text x="81" y="52" fill="#10b981" textAnchor="middle" fontSize="7.5">
            Isolated Failure Resilience
          </text>
        </g>

        {/* BUS PATHS */}
        <path d="M 105 108 L 105 142" stroke="#06b6d4" strokeWidth="1.8" />
        <path d="M 295 142 L 295 108" stroke="#f59e0b" strokeWidth="1.8" />
        <path d="M 105 290 L 105 256" stroke="#10b981" strokeWidth="1.8" />
        <path d="M 295 256 L 295 290" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.8" strokeDasharray="3 3" />

        {/* Real-time Moving Particles */}
        <motion.circle
          cx="105"
          cy="108"
          r="3.5"
          fill="#06b6d4"
          animate={{ cy: [108, 142] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="295"
          cy="142"
          r="3.5"
          fill="#f59e0b"
          animate={{ cy: [142, 108] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.3 }}
        />
        <motion.circle
          cx="105"
          cy="290"
          r="3.5"
          fill="#34d399"
          animate={{ cy: [290, 256] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
        />
        <motion.circle
          cx="295"
          cy="256"
          r="3"
          fill="#ffffff"
          animate={{ cy: [256, 290] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.8 }}
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// Diagram 2: GYM-SAAS (SaaS Multi-Tenant Architecture)
// ---------------------------------------------------------
function GymSaasDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[11px] select-none">
        {/* Central Core Circle */}
        <circle cx="200" cy="200" r="75" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />
        <circle cx="200" cy="200" r="115" fill="none" stroke="#10b981" strokeOpacity="0.3" strokeDasharray="4 4" />

        <text x="200" y="196" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="13">GYM-SAAS</text>
        <text x="200" y="212" fill="#34d399" textAnchor="middle" fontSize="9">Laravel Core</text>

        {/* Satellite Modules */}
        {/* Members */}
        <g transform="translate(145, 30)">
          <rect width="110" height="35" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="6" />
          <text x="55" y="21" fill="#ffffff" textAnchor="middle" fontSize="10">Members Module</text>
        </g>
        {/* Subscriptions */}
        <g transform="translate(270, 182)">
          <rect width="115" height="35" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="6" />
          <text x="57" y="21" fill="#ffffff" textAnchor="middle" fontSize="10">Subscriptions Engine</text>
        </g>
        {/* Payroll */}
        <g transform="translate(145, 335)">
          <rect width="110" height="35" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="6" />
          <text x="55" y="21" fill="#ffffff" textAnchor="middle" fontSize="10">Automated Payroll</text>
        </g>
        {/* Attendance */}
        <g transform="translate(15, 182)">
          <rect width="115" height="35" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="6" />
          <text x="57" y="21" fill="#ffffff" textAnchor="middle" fontSize="10">Attendance Audit</text>
        </g>

        {/* Connectors */}
        <line x1="200" y1="65" x2="200" y2="125" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="270" y1="200" x2="275" y2="200" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="200" y1="275" x2="200" y2="335" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="130" y1="200" x2="125" y2="200" stroke="#10b981" strokeOpacity="0.4" strokeWidth="1.5" />

        {/* Pulse Animations */}
        <motion.circle cx="200" cy="65" r="3" fill="#34d399" animate={{ cy: [65, 125] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <motion.circle cx="270" cy="200" r="3" fill="#34d399" animate={{ cx: [270, 275] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} />
        <motion.circle cx="200" cy="275" r="3" fill="#34d399" animate={{ cy: [275, 335] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }} />
        <motion.circle cx="130" cy="200" r="3" fill="#34d399" animate={{ cx: [130, 125] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// Diagram 3: PHP Secure Authentication Engine
// ---------------------------------------------------------
function SecurityEngineDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[11px] select-none">
        {/* Shield Frame */}
        <path d="M 200 40 L 320 80 L 320 220 C 320 300 200 360 200 360 C 200 360 80 300 80 220 L 80 80 Z" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="2" />

        <text x="200" y="90" fill="#10b981" textAnchor="middle" fontWeight="bold" fontSize="12" letterSpacing="1">SECURE AUTH SHIELD</text>

        {/* 2FA OTP Gateway */}
        <g transform="translate(130, 115)">
          <rect width="140" height="36" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="6" />
          <text x="70" y="18" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="10">2FA OTP Gateway</text>
          <text x="70" y="29" fill="#34d399" textAnchor="middle" fontSize="8">Rate-Limited Throttling</text>
        </g>

        {/* Cryptographic Vault */}
        <g transform="translate(120, 185)">
          <rect width="160" height="42" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" rx="8" />
          <text x="80" y="20" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="11">Salted Hashing Vault</text>
          <text x="80" y="33" fill="#34d399" textAnchor="middle" fontSize="9">Anti-Hijacking Sessions</text>
        </g>

        {/* PDO Prepared Statements */}
        <g transform="translate(130, 260)">
          <rect width="140" height="36" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="6" />
          <text x="70" y="18" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="10">Prepared PDO Engine</text>
          <text x="70" y="29" fill="#9ca3af" textAnchor="middle" fontSize="8">SQL Injection Shield</text>
        </g>

        {/* Shield Lock Icon */}
        <motion.circle cx="200" cy="320" r="12" fill="#10b981" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// Diagram 4: Custom CMS (Vue.js & PHP Admin)
// ---------------------------------------------------------
function CMSDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[11px] select-none">
        <rect x="40" y="40" width="320" height="320" fill="#0d1117" stroke="#ffffff" strokeOpacity="0.1" rx="12" />

        {/* Vue.js Frontend */}
        <g transform="translate(70, 70)">
          <rect width="260" height="50" fill="#41b883" fillOpacity="0.15" stroke="#41b883" strokeWidth="2" rx="8" />
          <text x="130" y="25" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="12">Vue.js Reactive Admin SPA</text>
          <text x="130" y="39" fill="#41b883" textAnchor="middle" fontSize="9">Dynamic UI & State Management</text>
        </g>

        {/* REST Barrier */}
        <line x1="60" y1="170" x2="340" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" />
        <text x="200" y="163" fill="#10b981" textAnchor="middle" fontSize="9">JSON REST API GATEWAY</text>

        {/* PHP CMS Core */}
        <g transform="translate(100, 200)">
          <rect width="200" height="45" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="8" />
          <text x="100" y="22" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="11">PHP CMS Core Engine</text>
          <text x="100" y="35" fill="#9ca3af" textAnchor="middle" fontSize="9">Role-Based Content Authorization</text>
        </g>

        {/* Database */}
        <g transform="translate(120, 290)">
          <rect width="160" height="40" fill="#141720" stroke="#10b981" strokeWidth="1.5" rx="6" />
          <text x="80" y="24" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="10">MySQL Content Store</text>
        </g>

        <motion.circle cx="200" cy="120" r="4" fill="#41b883" animate={{ cy: [120, 200] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// Diagram 5: Athr (أَثَر) - Flutter Islamic Mobile App
// ---------------------------------------------------------
function AthrMobileDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[11px] select-none">
        {/* Mobile Frame */}
        <rect x="110" y="30" width="180" height="340" fill="#0b131e" stroke="#06b6d4" strokeWidth="2" rx="24" />
        <rect x="165" y="42" width="70" height="12" fill="#06b6d4" fillOpacity="0.3" rx="6" />

        {/* Athr Geometric Circles */}
        <circle cx="200" cy="180" r="55" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx="200" cy="180" r="35" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="200" cy="180" r="16" fill="#06b6d4" fillOpacity="0.3" stroke="#06b6d4" strokeWidth="2" />

        <text x="200" y="184" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="11">أَثَر</text>

        {/* Flutter Provider Stack */}
        <g transform="translate(130, 260)">
          <rect width="140" height="30" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="1" rx="6" />
          <text x="70" y="19" fill="#ffffff" textAnchor="middle" fontSize="9">Flutter Provider State</text>
        </g>

        <g transform="translate(130, 302)">
          <rect width="140" height="30" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="6" />
          <text x="70" y="19" fill="#9ca3af" textAnchor="middle" fontSize="9">Offline Hive/SQLite Store</text>
        </g>

        {/* Ripple Effect Animation */}
        <motion.circle cx="200" cy="180" r="55" fill="none" stroke="#38bdf8" strokeWidth="2" animate={{ r: [35, 75], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// Diagram 6: OncoApp - Medical Healthcare Mobile App
// ---------------------------------------------------------
function OncoAppDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[11px] select-none">
        {/* Mobile Outer Frame */}
        <rect x="110" y="30" width="180" height="340" fill="#0c1821" stroke="#06b6d4" strokeWidth="2" rx="24" />

        {/* Heartbeat pulse wave */}
        <path d="M 130 160 L 160 160 L 175 120 L 195 200 L 210 140 L 225 170 L 270 160" fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />

        {/* Patient Dashboard Card */}
        <g transform="translate(130, 210)">
          <rect width="140" height="40" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="6" />
          <text x="70" y="18" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="10">Treatment Tracker</text>
          <text x="70" y="30" fill="#06b6d4" textAnchor="middle" fontSize="8">Dosage Reminders</text>
        </g>

        <g transform="translate(130, 265)">
          <rect width="140" height="40" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="1" rx="6" />
          <text x="70" y="18" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="10">Medical REST API</text>
          <text x="70" y="30" fill="#38bdf8" textAnchor="middle" fontSize="8">Encrypted Patient Reports</text>
        </g>

        {/* Glowing Pulse Dot */}
        <motion.circle cx="210" cy="140" r="4" fill="#38bdf8" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// Diagram 7: Gym Workout Mobile Companion
// ---------------------------------------------------------
function GymWorkoutDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[11px] select-none">
        <rect x="110" y="30" width="180" height="340" fill="#0c161c" stroke="#06b6d4" strokeWidth="2" rx="24" />

        <text x="200" y="70" fill="#06b6d4" textAnchor="middle" fontWeight="bold" fontSize="11">WORKOUT TRACKER</text>

        {/* Set Logger Card */}
        <g transform="translate(130, 95)">
          <rect width="140" height="45" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="6" />
          <text x="70" y="20" fill="#ffffff" textAnchor="middle" fontSize="10">Fast Set Logger</text>
          <text x="70" y="33" fill="#38bdf8" textAnchor="middle" fontSize="8">Touch-Optimized Input</text>
        </g>

        {/* Local Performance Cache */}
        <g transform="translate(130, 160)">
          <rect width="140" height="45" fill="#06b6d4" fillOpacity="0.15" stroke="#06b6d4" strokeWidth="1.5" rx="6" />
          <text x="70" y="20" fill="#ffffff" textAnchor="middle" fontSize="10">Local Progress Cache</text>
          <text x="70" y="33" fill="#06b6d4" textAnchor="middle" fontSize="8">Instant Loading</text>
        </g>

        {/* Dynamic Charts */}
        <g transform="translate(130, 230)">
          <rect width="140" height="100" fill="#141720" stroke="#ffffff" strokeOpacity="0.2" rx="8" />
          <text x="70" y="20" fill="#9ca3af" textAnchor="middle" fontSize="9">Progress Analytics</text>
          {/* Chart bars */}
          <rect x="30" y="40" width="12" height="40" fill="#06b6d4" rx="2" />
          <rect x="50" y="30" width="12" height="50" fill="#38bdf8" rx="2" />
          <rect x="70" y="50" width="12" height="30" fill="#06b6d4" rx="2" />
          <rect x="90" y="25" width="12" height="55" fill="#38bdf8" rx="2" />
        </g>
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// Diagram 8: Event & Books Guide (Angular & REST)
// ---------------------------------------------------------
function EventBooksDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[11px] select-none">
        <rect x="40" y="40" width="320" height="320" fill="#0f172a" stroke="#ffffff" strokeOpacity="0.1" rx="12" />

        {/* Angular SPA */}
        <g transform="translate(70, 70)">
          <rect width="260" height="50" fill="#dd1b16" fillOpacity="0.15" stroke="#dd1b16" strokeWidth="2" rx="8" />
          <text x="130" y="25" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="12">Angular SPA Frontend</text>
          <text x="130" y="39" fill="#ef4444" textAnchor="middle" fontSize="9">TypeScript Component Hierarchy</text>
        </g>

        {/* RxJS Data Flow */}
        <line x1="200" y1="120" x2="200" y2="210" stroke="#dd1b16" strokeWidth="2" strokeDasharray="4 4" />
        <text x="210" y="165" fill="#ef4444" fontSize="9">RxJS Event Streams</text>

        {/* REST Backend Services */}
        <g transform="translate(90, 210)">
          <rect width="220" height="50" fill="#1e293b" stroke="#ffffff" strokeOpacity="0.2" rx="8" />
          <text x="110" y="25" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="11">RESTful API Endpoints</text>
          <text x="110" y="38" fill="#94a3b8" textAnchor="middle" fontSize="9">Book Catalog & Event Sync</text>
        </g>

        {/* Data Particle */}
        <motion.circle cx="200" cy="120" r="4" fill="#ef4444" animate={{ cy: [120, 210] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------
// Diagram 9: RoadBook — 360° Automotive Digital Showroom (React 19 & Canvas)
// ---------------------------------------------------------
function RoadbookDiagram() {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-2">
      <svg viewBox="0 0 400 400" className="w-full h-full font-mono text-[10px] select-none">
        <defs>
          <linearGradient id="roadbook-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Outer Frame */}
        <rect x="25" y="25" width="350" height="350" fill="var(--surface-1)" stroke="#06b6d4" strokeWidth="1.5" rx="16" />
        <text x="40" y="50" fill="#06b6d4" fontSize="10" fontWeight="bold" letterSpacing="1">
          360° INTERACTIVE CANVASCAM // REACT 19
        </text>

        {/* 360 Degree Dial Center */}
        <circle cx="200" cy="180" r="85" fill="url(#roadbook-glow)" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="200" cy="180" r="50" fill="var(--surface-2)" stroke="#38bdf8" strokeWidth="2" />

        {/* Vehicle Wireframe Icon / Center */}
        <path d="M 175 185 L 182 173 L 218 173 L 225 185 L 228 190 L 172 190 Z" fill="none" stroke="#0284c7" strokeWidth="2" />
        <circle cx="180" cy="192" r="4" fill="#06b6d4" />
        <circle cx="220" cy="192" r="4" fill="#06b6d4" />

        <text x="200" y="166" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="10">
          CANVAS 360°
        </text>
        <text x="200" y="210" fill="#0284c7" textAnchor="middle" fontSize="8" fontWeight="bold">
          60 FPS Frame Buffer
        </text>

        {/* Angle Indicator Markers */}
        <text x="200" y="85" fill="var(--text-tertiary)" textAnchor="middle" fontSize="8">0° / 360°</text>
        <text x="295" y="184" fill="var(--text-tertiary)" fontSize="8">90°</text>
        <text x="200" y="278" fill="var(--text-tertiary)" textAnchor="middle" fontSize="8">180°</text>
        <text x="95" y="184" fill="var(--text-tertiary)" textAnchor="end" fontSize="8">270°</text>

        {/* Telemetry Hotspot Node */}
        <g transform="translate(48, 290)">
          <rect width="144" height="42" fill="var(--surface-2)" stroke="#06b6d4" strokeWidth="1" rx="6" />
          <text x="72" y="18" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="9">
            Telemetry Hotspots
          </text>
          <text x="72" y="30" fill="#0284c7" textAnchor="middle" fontSize="7.5" fontWeight="bold">
            Engine · Aero · Cockpit Spec
          </text>
        </g>

        {/* Acoustic Sound Engine Node */}
        <g transform="translate(208, 290)">
          <rect width="144" height="42" fill="var(--surface-2)" stroke="var(--border)" rx="6" />
          <text x="72" y="18" fill="var(--text-primary)" textAnchor="middle" fontWeight="bold" fontSize="9">
            Acoustic FX System
          </text>
          <text x="72" y="30" fill="var(--text-secondary)" textAnchor="middle" fontSize="7.5">
            Interactive Audio Feedback
          </text>
        </g>

        {/* Rotating Radar Line */}
        <motion.line
          x1="200"
          y1="180"
          x2="275"
          y2="180"
          stroke="#00ffff"
          strokeWidth="2"
          style={{ originX: "200px", originY: "180px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
