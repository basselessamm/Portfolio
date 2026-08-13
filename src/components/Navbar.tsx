"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, IDENTITY } from "@/lib/data";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between"
      >
        {/* Logo / Name */}
        <a
          href="#about"
          className="font-bold text-sm tracking-widest uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
        >
          {IDENTITY.name}
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-xs font-mono tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors uppercase"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1.5px] bg-[var(--text-primary)]"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[1.5px] bg-[var(--text-primary)]"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[1.5px] bg-[var(--text-primary)]"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--surface-1)] border-b border-[var(--border)] overflow-hidden"
          >
            <ul className="px-6 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm font-mono tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors uppercase"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
