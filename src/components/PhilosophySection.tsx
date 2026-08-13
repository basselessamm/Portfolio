"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function WordReveal({ word, index, scrollYProgress }: { word: string; index: number; scrollYProgress: any }) {
  const start = index * 0.05;
  const end = start + 0.2;
  const wordOpacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
  const wordY = useTransform(scrollYProgress, [start, end], [20, 0]);

  return (
    <motion.span
      style={{ opacity: wordOpacity, y: wordY }}
      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none"
    >
      {word}
    </motion.span>
  );
}

export default function PhilosophySection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  // Fade and slide the main manifesto text
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Staggered word reveal for the giant headline
  const words = [
    "I", "DON'T", "JUST", "WRITE", "CODE.", 
    "I", "ENGINEER", "SYSTEMS", "THAT", "SURVIVE", "SCALE."
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] flex items-center justify-center py-32 px-6 overflow-hidden bg-[var(--background)] z-10"
    >
      <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* Massive Editorial Headline */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-8 md:gap-y-4 mb-24 max-w-5xl">
          {words.map((word, i) => (
            <WordReveal key={i} word={word} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Manifesto Columns */}
        <motion.div 
          style={{ y, opacity }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 w-full"
        >
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[var(--accent)] uppercase tracking-widest border-b border-[var(--border)] pb-4">
              Domain-Driven Design
            </h3>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-serif italic">
              "The logic lives independently of the framework."
            </p>
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
              Frameworks change. Databases migrate. UI trends fade. True architecture means insulating the core business logic from external volatility. I build systems where the domain rules supreme, untouched by the noise of the delivery mechanism.
            </p>
          </div>

          <div className="space-y-6 md:mt-24">
            <h3 className="text-xl font-bold text-[var(--accent)] uppercase tracking-widest border-b border-[var(--border)] pb-4">
              Clean Architecture & SOLID
            </h3>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-serif italic">
              "Rigidity is the enemy of scale."
            </p>
            <p className="text-sm text-[var(--text-tertiary)] leading-relaxed">
              Every class has a single reason to change. Every dependency points inward. I don't build features just to ship them fast; I engineer them to be dismantled, extended, and tested without breaking the ecosystem.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background typographic noise */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.03]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none"
      >
        <span className="text-[20vw] font-bold tracking-tighter leading-none text-white whitespace-nowrap">
          ARCHITECTURE
        </span>
      </motion.div>
    </section>
  );
}
