"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PROJECTS, Project } from "@/lib/data";
import ArchitectureDiagram from "./ArchitectureDiagram";

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "core" | "secondary">("all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "core") return p.category === "core" || !p.category;
    if (filter === "secondary") return p.category === "secondary";
    return true;
  });

  return (
    <section id="projects" className="relative z-10 bg-[var(--background)] pt-32">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] block mb-3">
            Architecture & Engineering Showcase
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Selected Systems
          </h2>
          <p className="mt-4 text-sm text-[var(--text-secondary)] max-w-xl">
            Primary focus on high-performance PHP & Laravel back-end architectures, alongside secondary exploratory projects.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[var(--surface-1)] border border-[var(--border)] rounded-xl font-mono text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "all"
                ? "bg-[var(--accent)] text-[var(--background)] font-bold shadow-md"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            All Projects ({PROJECTS.length})
          </button>
          <button
            onClick={() => setFilter("core")}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "core"
                ? "bg-emerald-500 text-black font-bold shadow-md"
                : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
            }`}
          >
            🟢 Core Specialization ({PROJECTS.filter((p) => p.category === "core" || !p.category).length})
          </button>
          <button
            onClick={() => setFilter("secondary")}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === "secondary"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-md"
                : "text-[var(--text-secondary)] hover:text-cyan-300"
            }`}
          >
            ⚡ Secondary Track ({PROJECTS.filter((p) => p.category === "secondary").length})
          </button>
        </div>
      </div>

      <div className="relative" ref={containerRef}>
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            idx={idx}
            total={filteredProjects.length}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, idx, total }: { project: Project; idx: number; total: number }) {
  const spacerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const isSecondary = project.category === "secondary";

  return (
    <>
      <motion.div
        style={{ scale, zIndex: idx }}
        className="sticky top-0 h-[100vh] w-full flex items-center justify-center py-12 px-6"
      >
        <div
          className={`absolute inset-4 md:inset-8 bg-[var(--surface-1)] border rounded-3xl shadow-2xl overflow-hidden ${
            isSecondary
              ? "border-cyan-500/30 bg-[#0d1219]"
              : "border-[var(--border)]"
          }`}
        >
          {/* Card Header */}
          <div className="absolute top-0 left-0 right-0 h-20 flex justify-between items-center px-8 lg:px-16 z-20 pointer-events-none bg-gradient-to-b from-[var(--surface-1)] to-transparent">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-[var(--accent)]">
                SYS.{String(idx + 1).padStart(3, "0")}
              </span>

              {/* Specialization Distinction Badge */}
              {isSecondary ? (
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono tracking-wider rounded-full uppercase">
                  ⚡ Secondary Track / Exploratory
                </span>
              ) : (
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono tracking-wider rounded-full uppercase">
                  🟢 Core Specialization (PHP & Laravel)
                </span>
              )}
            </div>

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
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                      {project.title}
                    </h3>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-1">
                      The Problem / Challenge
                    </span>
                    <p className="text-xs sm:text-sm lg:text-base text-[var(--text-secondary)] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-1">
                      The Architecture & Solution
                    </span>
                    <p className="text-xs sm:text-sm lg:text-base text-[var(--text-primary)] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-1.5">
                      Key Decisions
                    </span>
                    <ul className="space-y-1.5">
                      {project.keyDecisions.map((decision, i) => (
                        <li
                          key={i}
                          className="text-xs sm:text-sm text-[var(--text-secondary)] pl-3 border-l border-[var(--border)]"
                        >
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
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[10px] font-mono tracking-wider px-3 py-1 border rounded ${
                          isSecondary
                            ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                            : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)]"
                        }`}
                      >
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

      <div
        ref={spacerRef}
        className={
          idx === total - 1
            ? "h-[50vh] w-full pointer-events-none"
            : "h-[100vh] w-full pointer-events-none"
        }
      />
    </>
  );
}
