"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IDENTITY, INTRO } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects — move text UP out of view and fade quickly
  const yText = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityText = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Massive subtle background typography for texture */}
      <motion.div
        style={{ y: yBg, opacity: useTransform(scrollYProgress, [0, 0.5], [0.03, 0]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[25vw] font-bold tracking-tighter leading-none text-white whitespace-nowrap">
          SYSTEMS
        </span>
      </motion.div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="max-w-5xl mx-auto w-full relative z-10"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] mb-6 flex items-center gap-4"
        >
          <span className="w-8 h-px bg-[var(--accent)]" />
          {IDENTITY.title} · {IDENTITY.focus}
        </motion.p>

        {/* Name with character reveal */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tight leading-[0.9] uppercase overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="text-[var(--text-primary)]"
          >
            {IDENTITY.name.split(" ")[0]}
          </motion.div>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="text-[var(--text-tertiary)]"
          >
            {IDENTITY.name.split(" ")[1]}
          </motion.div>
        </h1>

        {/* Philosophy statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          className="mt-8 md:mt-12 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed"
        >
          {INTRO.subline}
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center px-8 py-4 bg-[var(--accent)] text-[var(--background)] text-xs font-bold uppercase tracking-widest hover:bg-[var(--text-primary)] transition-colors"
          >
            Explore Architecture
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 border border-[var(--border)] text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
          >
            Initialize Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-widest text-[var(--text-tertiary)] uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[var(--text-tertiary)] to-transparent" />
      </motion.div>
    </section>
  );
}
