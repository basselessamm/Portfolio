"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PROJECTS as DEFAULT_PROJECTS, Project } from "@/lib/data";
import ArchitectureDiagram from "./ArchitectureDiagram";

export default function ProjectsSection({ projects = DEFAULT_PROJECTS }: { projects?: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "core" | "secondary">("all");

  const filteredProjects = projects.filter((p) => {
    if (filter === "core") return p.category === "core" || !p.category;
    if (filter === "secondary") return p.category === "secondary";
    return true;
  });

  return (
    <section id="projects" className="relative z-10 bg-[var(--background)] pt-32">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] block mb-3">
            Architecture & Engineering Showcase //
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Selected Systems
          </h2>
          <p className="mt-4 text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Primary focus on high-performance PHP & Laravel back-end architectures, strictly enforcing Clean Architecture & Domain-Driven Design, alongside secondary exploratory tracks.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex flex-nowrap gap-2 p-1.5 bg-[var(--surface-1)] border border-[var(--border)] rounded-xl font-mono text-xs shadow-lg min-w-full sm:min-w-0">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === "all"
                  ? "bg-[var(--accent)] text-[#080a0f] font-bold shadow-md"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              All Systems ({projects.length})
            </button>
            <button
              onClick={() => setFilter("core")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === "core"
                  ? "bg-emerald-500 text-[#080a0f] font-bold shadow-md"
                  : "text-[var(--text-secondary)] hover:text-emerald-400"
              }`}
            >
              Core PHP / Laravel ({projects.filter((p) => p.category === "core" || !p.category).length})
            </button>
            <button
              onClick={() => setFilter("secondary")}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === "secondary"
                  ? "bg-cyan-500 text-[#080a0f] font-bold shadow-md"
                  : "text-[var(--text-secondary)] hover:text-cyan-300"
              }`}
            >
              Secondary Track ({projects.filter((p) => p.category === "secondary").length})
            </button>
          </div>
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
  const [mobileView, setMobileView] = useState<"spec" | "diagram">("spec");

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const isSecondary = project.category === "secondary";

  return (
    <>
      {/* Mobile Flow Card (< lg) & Desktop Sticky Scrollytelling Card (>= lg) */}
      <motion.div
        style={{ zIndex: idx }}
        className="relative lg:sticky lg:top-0 w-full mb-8 sm:mb-12 lg:mb-0 lg:h-[100vh] lg:flex lg:items-center lg:justify-center lg:py-8 lg:px-6"
      >
        <div
          className={`w-full bg-[var(--surface-1)] border rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl backdrop-blur-xl lg:absolute lg:inset-4 md:lg:inset-8 lg:overflow-hidden ${
            isSecondary
              ? "border-cyan-500/25 shadow-[0_20px_50px_rgba(0,217,245,0.08)]"
              : "border-[var(--border)] hover:border-[var(--accent)]/40 shadow-[var(--card-shadow)]"
          }`}
        >
          {/* Card Header */}
          <div className="flex justify-between items-center px-4 py-3.5 sm:px-8 sm:py-5 border-b border-[var(--border)] lg:border-b-0 lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:h-20 lg:px-12 lg:z-20 lg:pointer-events-none lg:bg-gradient-to-b lg:from-[var(--surface-1)] lg:via-[var(--surface-1)]/95 lg:to-transparent">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-mono font-bold text-[var(--accent)]">
                SYS.{String(idx + 1).padStart(3, "0")}
              </span>

              {/* Specialization Distinction Badge */}
              {isSecondary ? (
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[9px] sm:text-[10px] font-mono tracking-wider rounded-full uppercase font-medium">
                  Secondary Track
                </span>
              ) : (
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] sm:text-[10px] font-mono tracking-wider rounded-full uppercase font-medium">
                  Core PHP / Laravel
                </span>
              )}
            </div>

            {/* Mobile View Switcher (Specs vs Architecture Diagram) */}
            <div className="flex lg:hidden items-center p-0.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] pointer-events-auto shadow-sm">
              <button
                type="button"
                onClick={() => setMobileView("spec")}
                className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  mobileView === "spec"
                    ? "bg-[var(--accent)] text-[#080a0f] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Specs
              </button>
              <button
                type="button"
                onClick={() => setMobileView("diagram")}
                className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  mobileView === "diagram"
                    ? "bg-[var(--accent-cyan)] text-[#080a0f] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Diagram
              </button>
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--text-tertiary)] hidden lg:block">
              {project.role}
            </span>
          </div>

          {/* Content Grid */}
          <div className="p-5 sm:p-8 lg:p-0 lg:absolute lg:inset-0 lg:pt-20 grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side: Specs Window (Natural Flow on Mobile, Native Scroll on Desktop) */}
            <div className={`lg:relative lg:overflow-y-auto lg:overscroll-contain lg:p-12 lg:h-full ${
              mobileView === "spec" ? "block" : "hidden lg:block"
            }`}>
              <div className="flex flex-col justify-between pb-4 lg:pb-8">
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--accent)] block mb-1">
                      The Problem / Challenge //
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--accent-cyan)] block mb-1">
                      The Architecture & Solution //
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
                      Key Architectural Decisions //
                    </span>
                    <ul className="space-y-2">
                      {project.keyDecisions.map((decision, i) => (
                        <li
                          key={i}
                          className="text-xs text-[var(--text-secondary)] pl-3 border-l-2 border-[var(--accent)]/40 flex items-start gap-2"
                        >
                          <span>{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[var(--border)] mt-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
                      Ecosystem & Technologies //
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className={`text-[10px] font-mono tracking-wider px-3 py-1 rounded-md border ${
                            isSecondary
                              ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                              : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)]"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* External Project Links (GitHub & Live Demo) */}
                  {(project.githubUrl || project.liveUrl) && (
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-all shadow-sm group"
                        >
                          <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                          </svg>
                          <span>GitHub Repo ↗</span>
                        </a>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all shadow-sm shadow-cyan-500/10"
                        >
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          <span>Live Demo ↗</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side: Visual Diagram */}
            <div className={`relative border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[var(--surface-2)]/60 min-h-[380px] lg:min-h-0 lg:h-full items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden ${
              mobileView === "diagram" ? "flex" : "hidden lg:flex"
            }`}>
              <div className="absolute inset-0 bg-[linear-gradient(var(--grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-color)_1px,transparent_1px)] bg-[size:32px_32px]" />

              <div className="w-full max-w-md aspect-square relative z-10">
                <ArchitectureDiagram projectIndex={idx} project={project} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop spacer only: Hidden on mobile so cards flow naturally without giant empty gaps */}
      <div
        ref={spacerRef}
        className={
          idx === total - 1
            ? "hidden lg:block h-[40vh] w-full pointer-events-none"
            : "hidden lg:block h-[100vh] w-full pointer-events-none"
        }
      />
    </>
  );
}
