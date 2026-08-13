"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PROJECTS } from "@/lib/data";
import ArchitectureDiagram from "./ArchitectureDiagram";

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="projects" className="relative z-10 bg-[var(--background)] pt-32">
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] block mb-3">
          Architecture Blueprints
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          Selected Systems
        </h2>
      </div>

      <div className="relative" ref={containerRef}>
        {PROJECTS.map((project, idx) => (
          <ProjectCard 
            key={project.title} 
            project={project} 
            idx={idx} 
            total={PROJECTS.length} 
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, idx, total }: { project: typeof PROJECTS[0]; idx: number; total: number }) {
  const spacerRef = useRef<HTMLDivElement>(null);
  
  // Track the spacer div to know how much the user has scrolled WHILE this card is sticky
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "start start"]
  });

  // Scale for the stacking depth effect as the next card comes up (keep 100% opacity to prevent text overlap bleed)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <>
      <motion.div
        style={{ scale, zIndex: idx }}
        className="sticky top-0 h-[100vh] w-full flex items-center justify-center py-12 px-6"
      >
        <div className="absolute inset-4 md:inset-8 bg-[var(--surface-1)] border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Card Header */}
          <div className="absolute top-0 left-0 right-0 h-20 flex justify-between items-center px-8 lg:px-16 z-20 pointer-events-none bg-gradient-to-b from-[var(--surface-1)] to-transparent">
            <span className="text-sm font-mono text-[var(--accent)]">
              SYS.{String(idx + 1).padStart(3, "0")}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] hidden sm:block">
              {project.role}
            </span>
          </div>

          {/* Content Grid */}
          <div className="absolute inset-0 pt-20 grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side: Native Scroll Window */}
            <div className="relative overflow-y-auto overscroll-contain p-6 sm:p-8 lg:p-12 h-full">
              <div className="flex flex-col min-h-full justify-between pb-12">
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                    {project.title}
                  </h3>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-1">
                      The Problem
                    </span>
                    <p className="text-xs sm:text-sm lg:text-base text-[var(--text-secondary)] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-1">
                      The Architecture
                    </span>
                    <p className="text-xs sm:text-sm lg:text-base text-[var(--text-primary)] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block 1.5">
                      Key Decisions
                    </span>
                    <ul className="space-y-1.5">
                      {project.keyDecisions.map((decision, i) => (
                        <li key={i} className="text-xs sm:text-sm text-[var(--text-secondary)] pl-3 border-l border-[var(--border)]">
                          {decision}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
                    Stack & Ecosystem
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="text-[10px] font-mono tracking-wider px-3 py-1 border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Visual Diagram */}
            <div className="relative border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[var(--surface-2)] h-full flex items-center justify-center p-8 lg:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
              
              <div className="w-full max-w-md aspect-square relative z-10">
                <ArchitectureDiagram projectIndex={idx} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spacer tracked for animation. Last card gets a smaller spacer to ensure the ref is always hydrated. */}
      <div 
        ref={spacerRef} 
        className={idx === total - 1 ? "h-[50vh] w-full pointer-events-none" : "h-[100vh] w-full pointer-events-none"} 
      />
    </>
  );
}
