"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }

    // Notify any listening canvas or components
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: nextTheme } }));
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] opacity-0 pointer-events-none" />
    );
  }

  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      style={{ touchAction: "manipulation" }}
      aria-label={`Switch to ${isLight ? "Dark" : "Light"} theme`}
      title={`Switch to ${isLight ? "Dark" : "Light"} Mode`}
      className="relative p-2 min-w-[40px] min-h-[40px] sm:w-9 sm:h-9 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--accent)] hover:bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm group active:scale-95"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {isLight ? (
          // Sun Icon (Crisp, engineering style)
          <svg className="w-4 h-4 text-amber-600 group-hover:text-amber-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        ) : (
          // Moon Icon (Electric cyan crescent)
          <svg className="w-4 h-4 text-[var(--accent-cyan)] group-hover:text-[var(--accent)] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </motion.div>
    </button>
  );
}
