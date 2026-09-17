"use client";

import { motion } from "framer-motion";
import { EDUCATION as DEFAULT_EDUCATION, Education } from "@/lib/data";

export default function EducationSection({ education = DEFAULT_EDUCATION }: { education?: Education[] }) {
  return (
    <section id="education" className="py-24 md:py-32 px-6 border-t border-[var(--border)] relative overflow-hidden bg-[var(--background)]">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] block mb-3">
            Academic & Professional Background //
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Education & Certifications
          </h2>
        </motion.div>

        {/* Education items */}
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 sm:p-8 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] backdrop-blur-xl shadow-xl hover:border-[var(--accent)]/30 transition-all duration-300 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 sm:gap-4 md:gap-8 items-start"
            >
              {/* Year */}
              <div className="px-3.5 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--accent)] font-mono font-bold text-sm inline-block self-start shadow-sm">
                {edu.year}
              </div>

              {/* Details */}
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] mb-1">
                  {edu.institution}
                </h3>
                <p className="text-xs font-mono text-[var(--accent-cyan)] uppercase tracking-wider mb-3">
                  {edu.program}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
