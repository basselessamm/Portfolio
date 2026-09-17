"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function WordReveal({ word, index, scrollYProgress }: { word: string; index: number; scrollYProgress: any }) {
  const start = index * 0.05;
  const end = start + 0.2;
  const wordOpacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const wordY = useTransform(scrollYProgress, [start, end], [24, 0]);

  const isSpecial = word === "SURVIVE" || word === "SCALE.";

  return (
    <motion.span
      style={{ opacity: wordOpacity, y: wordY }}
      className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none ${
        isSpecial
          ? "bg-gradient-to-r from-[var(--accent)] to-[var(--accent-cyan)] bg-clip-text text-transparent"
          : "text-[var(--text-primary)]"
      }`}
    >
      {word}
    </motion.span>
  );
}

import { PHILOSOPHY as DEFAULT_PHILOSOPHY, PhilosophyData } from "@/lib/data";

export default function PhilosophySection({
  philosophy = DEFAULT_PHILOSOPHY,
}: {
  philosophy?: PhilosophyData;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  // Fade and slide the main manifesto text
  const y = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  const words = philosophy.headlineWords || DEFAULT_PHILOSOPHY.headlineWords;
  const cards = philosophy.cards || DEFAULT_PHILOSOPHY.cards;

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-32 px-4 sm:px-6 overflow-hidden bg-[var(--background)] z-10"
    >
      <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col items-center">
        
        {/* Massive Editorial Headline */}
        <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 sm:gap-x-4 sm:gap-y-2 md:gap-x-8 md:gap-y-4 mb-14 sm:mb-24 max-w-5xl">
          {words.map((word, i) => (
            <WordReveal key={i} word={word} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Manifesto Columns */}
        <motion.div 
          style={{ y, opacity }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 w-full"
        >
          {cards.map((card, idx) => (
            <div
              key={card.title}
              className={`p-6 sm:p-8 rounded-2xl bg-[var(--surface-1)] border border-[var(--border)] backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-[var(--accent)]/40 transition-all duration-300 ${
                idx % 2 === 1 ? "md:mt-12" : ""
              }`}
            >
              <div className={`w-1.5 h-10 rounded-full mb-6 ${idx % 2 === 0 ? "bg-[var(--accent)]" : "bg-[var(--accent-cyan)]"}`} />
              <h3 className="text-xl font-bold text-[var(--accent)] uppercase tracking-widest border-b border-[var(--border)] pb-4">
                {card.title} //
              </h3>
              <p className="text-lg text-[var(--text-primary)] leading-relaxed font-mono italic my-4">
                &ldquo;{card.quote.replace(/"/g, "")}&rdquo;
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background typographic noise */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0, 0.03]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none"
      >
        <span className="text-[20vw] font-bold tracking-tighter leading-none text-[var(--text-primary)] opacity-30 whitespace-nowrap">
          ARCHITECTURE
        </span>
      </motion.div>
    </section>
  );
}
