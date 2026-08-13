"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SKILLS, PROJECTS } from "@/lib/data";

const categories = [
  { label: "Back-End & Architecture", items: SKILLS.backend },
  { label: "Languages", items: SKILLS.languages },
  { label: "Front-End", items: SKILLS.frontend },
  { label: "Databases", items: SKILLS.databases },
  { label: "DevOps & Tools", items: SKILLS.devops },
  { label: "Other", items: SKILLS.other },
];

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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
    <section id="skills" className="py-24 md:py-32 px-6 border-t border-[var(--border)] relative overflow-hidden">
      
      {/* Background interaction glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] rounded-full blur-[120px] opacity-0 transition-opacity duration-700 pointer-events-none"
        style={{ opacity: hoveredSkill ? 0.03 : 0 }}
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
              Technical DNA
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              Interactive Matrix
            </h2>
            <p className="mt-4 text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-widest">
              Hover over a skill to trace its application
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <h3 className="text-xs font-mono tracking-widest uppercase text-[var(--text-tertiary)] mb-4 pb-2 border-b border-[var(--border)]">
                  {cat.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <li key={skill}>
                      <button
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onFocus={() => setHoveredSkill(skill)}
                        onBlur={() => setHoveredSkill(null)}
                        className={`text-xs font-mono tracking-wider px-3 py-1.5 border transition-all duration-300 ${
                          hoveredSkill === skill 
                            ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent)] scale-105" 
                            : hoveredSkill 
                              ? "border-[var(--border)] text-[var(--text-tertiary)] opacity-30"
                              : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                        }`}
                      >
                        {skill}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: The Projects Graph (The Proof) */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32">
            <h3 className="text-xs font-mono tracking-widest uppercase text-[var(--text-tertiary)] mb-8 border-b border-[var(--border)] pb-2">
              System Applications
            </h3>
            
            <div className="space-y-4">
              {PROJECTS.map((project, i) => {
                const active = isProjectActive(project.stack);
                
                return (
                  <div 
                    key={i}
                    className={`p-4 border transition-all duration-500 ${
                      active 
                        ? "border-[var(--accent)] bg-[var(--surface-2)]" 
                        : "border-[var(--border)] bg-[var(--surface-1)] opacity-50 grayscale"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${active ? "bg-[var(--accent)]" : "bg-[var(--surface-3)]"}`} />
                      <h4 className={`text-sm font-bold tracking-tight transition-colors duration-500 ${active ? "text-[var(--text-primary)]" : "text-[var(--text-tertiary)]"}`}>
                        {project.title}
                      </h4>
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
