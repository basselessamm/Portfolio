"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS, IDENTITY as DEFAULT_IDENTITY, IdentityData } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ identity = DEFAULT_IDENTITY }: { identity?: IdentityData }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pt-4 pb-2 pointer-events-none">
      <nav
        aria-label="Main navigation"
        className={`pointer-events-auto max-w-5xl w-full flex items-center justify-between px-5 sm:px-7 py-3 rounded-2xl transition-all duration-300 ${
          scrolled
            ? "bg-[var(--nav-bg)] backdrop-blur-xl border border-[var(--nav-border)] shadow-[var(--nav-shadow)]"
            : "bg-[var(--nav-bg)]/60 backdrop-blur-md border border-[var(--nav-border)]"
        }`}
      >
        {/* Brand / Name */}
        <a
          href="#about"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] group-hover:border-[var(--accent)] flex items-center justify-center font-mono font-bold text-xs text-[var(--accent)] transition-all shadow-sm">
            BE
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm tracking-wider uppercase text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              {identity.name}
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[var(--text-tertiary)] uppercase -mt-0.5">
              Backend Architect
            </span>
          </div>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-xs font-mono tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors uppercase relative py-1"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="px-4 py-1.5 rounded-lg border border-[var(--accent)]/40 bg-[var(--accent-dim)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#080a0f] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            style={{ touchAction: "manipulation" }}
            className="min-h-[40px] min-w-[40px] flex flex-col justify-center items-center gap-1.5 p-2 rounded-xl focus:outline-none border border-transparent active:border-[var(--border)] active:bg-[var(--surface-2)] transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[2px] bg-[var(--text-primary)] rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[2px] bg-[var(--text-primary)] rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[2px] bg-[var(--text-primary)] rounded-full"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 inset-x-4 max-w-lg mx-auto bg-[var(--nav-bg)] backdrop-blur-2xl border border-[var(--border)] rounded-2xl p-6 shadow-2xl md:hidden"
          >
            <ul className="space-y-4">
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
              <li className="pt-2 border-t border-[var(--border)]">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center py-2.5 rounded-xl bg-[var(--accent)] text-[#080a0f] font-mono font-bold text-xs uppercase tracking-wider"
                >
                  Contact Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
