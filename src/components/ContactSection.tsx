"use client";

import { motion } from "framer-motion";
import { IDENTITY } from "@/lib/data";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 border-t border-[var(--border)]">
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
            Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Available for full-time positions and collaborative opportunities.
            Reach out through any channel below.
          </p>
        </motion.div>

        {/* Contact grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl"
        >
          <a
            href={`mailto:${IDENTITY.email}`}
            className="group p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
              Email
            </span>
            <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors break-all">
              {IDENTITY.email}
            </span>
          </a>

          <a
            href={IDENTITY.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
              LinkedIn
            </span>
            <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
              Bassel Essam
            </span>
          </a>

          <a
            href={IDENTITY.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
              GitHub
            </span>
            <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
              basselessamm
            </span>
          </a>

          <a
            href={`tel:${IDENTITY.phone.replace(/\s/g, "")}`}
            className="group p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
              Phone
            </span>
            <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
              {IDENTITY.phone}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
