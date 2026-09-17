"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SKILLS as DEFAULT_SKILLS, PROJECTS as DEFAULT_PROJECTS, SkillsData, Project } from "@/lib/data";

export default function SkillsSection({
  skills = DEFAULT_SKILLS,
  projects = DEFAULT_PROJECTS,
}: {
  skills?: SkillsData;
  projects?: Project[];
}) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = [
    { label: "Back-End & Architecture", items: skills.backend },
    { label: "Languages", items: skills.languages },
    { label: "Databases & Storage", items: skills.databases },
    { label: "DevOps & Infrastructure", items: skills.devops },
    { label: "Front-End", items: skills.frontend },
    { label: "Architecture & Security", items: skills.other },
  ];

  // Helper to check if a project uses the hovered skill
  const isProjectActive = (projectStack: readonly string[]) => {
    if (!hoveredSkill) return false;
    return projectStack.some(tech => 
      tech.toLowerCase() === hoveredSkill.toLowerCase() ||
      (hoveredSkill === "PHP" && tech === "Native PHP") ||
      (hoveredSkill === "SQL" && tech.includes("SQL"))
    );
  };

  return (
    <section id="skills" className="py-24 md:py-32 px-6 border-t border-[var(--border)] relative overflow-hidden bg-[var(--background)]">
      
      {/* Background interaction glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)]/10 rounded-full blur-[140px] pointer-events-none transition-opacity duration-700"
        style={{ opacity: hoveredSkill ? 0.8 : 0.2 }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: The Skills (The Matrix) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] block mb-3">
              Technical DNA & Competencies //
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Interactive Matrix
            </h2>
            <p className="mt-4 text-xs sm:text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-wider">
              <span className="hidden sm:inline">Hover over</span>
              <span className="inline sm:hidden">Tap</span> a technology to trace its real-world production application
            </p>
          </motion.div>

          {/* Mobile Instant Trace Feedback HUD */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden mb-8 p-3.5 rounded-xl bg-[var(--surface-1)] border border-[var(--accent)] shadow-xl flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shrink-0 shadow-[0_0_10px_var(--accent)]" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-[var(--text-tertiary)]">
                      Active Filter:
                    </span>
                    <span className="text-xs font-mono font-bold text-[var(--accent)] truncate">
                      {hoveredSkill}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                    Applied in {projects.filter((p) => isProjectActive(p.stack)).length} core production systems
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHoveredSkill(null)}
                className="px-2.5 py-1 text-[10px] font-mono text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-[var(--border)] rounded-md cursor-pointer"
              >
                Clear ✕
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 sm:gap-y-10">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <h3 className="text-xs font-mono tracking-widest uppercase text-[var(--accent-cyan)] mb-3 sm:mb-4 pb-2 border-b border-[var(--border)] flex items-center justify-between">
                  <span>{cat.label}</span>
                  <span className="text-[10px] text-[var(--text-tertiary)]">{cat.items.length}</span>
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => {
                    const isHovered = hoveredSkill === skill;
                    return (
                      <li key={skill}>
                        <button
                          type="button"
                          onClick={() => setHoveredSkill(hoveredSkill === skill ? null : skill)}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          onFocus={() => setHoveredSkill(skill)}
                          onBlur={() => setHoveredSkill(null)}
                          style={{ touchAction: "manipulation" }}
                          className={`text-xs font-mono tracking-wider px-3 sm:px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer active:scale-95 ${
                            isHovered
                              ? "border-[var(--accent)] bg-[var(--accent)] text-[#080a0f] font-bold scale-105 shadow-[0_0_20px_rgba(0,245,160,0.4)]"
                              : hoveredSkill
                              ? "border-[var(--border)] text-[var(--text-tertiary)] opacity-35"
                              : "border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-secondary)] hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)] shadow-sm"
                          }`}
                        >
                          {skill}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: The Projects Graph (The Proof) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 p-6 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-[var(--border)] pb-3">
              <h3 className="text-xs font-mono tracking-widest uppercase text-[var(--text-primary)] font-bold">
                Live System Trace //
              </h3>
              {hoveredSkill && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30 font-bold">
                  MATCHING: {hoveredSkill}
                </span>
              )}
            </div>
            
            <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
              {projects.map((project, i) => {
                const active = isProjectActive(project.stack);
                
                return (
                  <div 
                    key={i}
                    className={`p-3.5 rounded-xl border transition-all duration-300 ${
                      active 
                        ? "border-[var(--accent)] bg-[var(--surface-2)] shadow-[0_0_25px_rgba(0,245,160,0.15)] scale-[1.02]" 
                        : hoveredSkill
                        ? "border-[var(--border)] bg-[var(--surface-1)]/40 opacity-30"
                        : "border-[var(--border)] bg-[var(--surface-2)]/60 opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-2 h-2 rounded-full transition-colors duration-300 shrink-0 ${active ? "bg-[var(--accent)] shadow-[0_0_8px_#00f5a0]" : "bg-[var(--border)]"}`} />
                        <h4 className={`text-xs font-bold truncate transition-colors duration-300 ${active ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}>
                          {project.title}
                        </h4>
                      </div>
                      <span className="text-[9px] font-mono text-[var(--text-tertiary)] uppercase shrink-0">
                        {project.category === "secondary" ? "Mobile/Frontend" : "Core Backend"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
