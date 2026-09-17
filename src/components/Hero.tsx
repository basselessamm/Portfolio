"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { IDENTITY as DEFAULT_IDENTITY, INTRO as DEFAULT_INTRO, IdentityData, IntroData } from "@/lib/data";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({
  identity = DEFAULT_IDENTITY,
  intro = DEFAULT_INTRO,
}: {
  identity?: IdentityData;
  intro?: IntroData;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [activeStep, setActiveStep] = useState(0);

  // Parallax effects
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityText = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const pipelineSteps = [
    { name: "HTTP Request", detail: "POST /api/v1/orders", latency: "0.12ms", tag: "GATEWAY" },
    { name: "RBAC & Validation", detail: "FormRequest & JWT Guard", latency: "0.24ms", tag: "SECURITY" },
    { name: "Application Service", detail: "CreateOrderUseCase (Clean Layer)", latency: "0.41ms", tag: "APPLICATION" },
    { name: "Domain Aggregate", detail: "OrderEntity::calculateTotal()", latency: "0.15ms", tag: "DOMAIN" },
    { name: "MySQL Persistence", detail: "PDO Prepared Transaction", latency: "0.62ms", tag: "INFRASTRUCTURE" },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 overflow-hidden"
    >
      {/* Massive ambient background typography */}
      <motion.div
        style={{ y: yBg, opacity: useTransform(scrollYProgress, [0, 0.5], [0.03, 0]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[26vw] font-bold tracking-tighter leading-none text-[var(--text-primary)] opacity-40 whitespace-nowrap">
          SYSTEMS
        </span>
      </motion.div>

      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="max-w-6xl mx-auto w-full relative z-10"
      >
        {/* Eyebrow / Technical Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="px-3 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)] text-[var(--accent)] font-mono text-xs font-semibold tracking-wider uppercase shadow-sm">
            {identity.title}
          </span>
          <span className="text-xs font-mono text-[var(--text-tertiary)] hidden sm:inline">
            //
          </span>
          <span className="text-xs font-mono text-[var(--text-secondary)] tracking-wider">
            {identity.focus} · Clean Architecture & DDD
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.02] uppercase text-[var(--text-primary)]">
            I Architect The Systems <br />
            <span className="bg-gradient-to-r from-[var(--accent)] via-[#00e5bf] to-[var(--accent-cyan)] bg-clip-text text-transparent">
              Behind The Interface.
            </span>
          </h1>
        </motion.div>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="mt-6 md:mt-8 text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed font-normal"
        >
          {intro.subline}
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
          className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
        >
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-4">
            <a
              href="#projects"
              style={{ touchAction: "manipulation" }}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[var(--accent)] text-[#080a0f] text-xs font-mono font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              <span>Explore</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="#architecture-live"
              style={{ touchAction: "manipulation" }}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface-1)] text-[var(--text-primary)] text-xs font-mono font-semibold uppercase tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all shadow-sm truncate"
            >
              Schemas & Core
            </a>
          </div>
          <a
            href="#contact"
            style={{ touchAction: "manipulation" }}
            className="inline-flex items-center justify-center sm:justify-start px-4 py-2 sm:py-3.5 text-[var(--text-secondary)] hover:text-[var(--accent)] text-xs font-mono tracking-wider uppercase transition-colors"
          >
            Initialize Contact →
          </a>
        </motion.div>

        {/* Authentic Engineering Artifact: Live Clean Architecture Request Flow Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.7 }}
          className="mt-12 sm:mt-14 p-4 sm:p-6 rounded-2xl bg-[var(--surface-1)]/90 border border-[var(--border)] backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-xs font-bold text-[var(--text-primary)] tracking-wider">
                EXECUTION PIPELINE //
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-[var(--text-tertiary)]">
                Clean DDD Flow
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-[11px] font-mono">
              <span className="text-[var(--accent)] font-semibold">
                ~1.54ms Latency
              </span>
              <span className="text-[var(--border)]">|</span>
              <span className="text-[var(--accent-cyan)]">
                Zero Framework Leak
              </span>
            </div>
          </div>

          {/* Interactive Step Navigator - Horizontal Swipe on Mobile */}
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 mt-3 sm:mt-4">
            <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-2.5 min-w-[560px] sm:min-w-0">
              {pipelineSteps.map((step, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={step.name}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    style={{ touchAction: "manipulation" }}
                    className={`flex-1 min-w-[130px] sm:min-w-0 p-2.5 sm:p-3 rounded-xl text-left border transition-all duration-200 cursor-pointer active:scale-95 ${
                      isSelected
                        ? "bg-[var(--surface-2)] border-[var(--accent)] shadow-[0_0_15px_rgba(0,245,160,0.15)]"
                        : "bg-[var(--surface-2)]/40 border-[var(--border)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono tracking-widest text-[var(--accent)] uppercase">
                        L.{idx + 1} // {step.tag}
                      </span>
                      <span className="text-[9px] font-mono text-[var(--text-tertiary)]">
                        {step.latency}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">
                      {step.name}
                    </h4>
                    <p className="text-[10px] font-mono text-[var(--text-secondary)] truncate mt-0.5">
                      {step.detail}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Details Bar */}
          <div className="mt-4 px-4 py-2.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex flex-wrap items-center justify-between text-xs font-mono">
            <span className="text-[var(--text-secondary)]">
              Active Layer: <strong className="text-[var(--text-primary)]">{pipelineSteps[activeStep].name}</strong> — <span className="text-[var(--accent)]">{pipelineSteps[activeStep].detail}</span>
            </span>
            <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">
              Enforcing Strict Dependency Rule
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-widest text-[var(--text-tertiary)] uppercase">
          Scroll To Inspect Systems
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </motion.div>
    </section>
  );
}
