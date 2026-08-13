"use client";

import { motion } from "framer-motion";
import { EDUCATION } from "@/lib/data";

export default function EducationSection() {
  return (
    <section id="education" className="py-24 md:py-32 px-6 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] block mb-3">
            Foundation
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Education
          </h2>
        </motion.div>

        {/* Education items */}
        <div className="space-y-12">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-8"
            >
              {/* Year */}
              <div className="text-xl font-bold text-[var(--accent)]">
                {edu.year}
              </div>

              {/* Details */}
              <div>
                <h3 className="text-lg font-bold tracking-tight mb-1">
                  {edu.institution}
                </h3>
                <p className="text-sm font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
                  {edu.program}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
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
