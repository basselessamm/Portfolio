"use client";

import { useEffect, useState } from "react";

interface Project {
  id: string;
  title: string;
  role: string;
  category?: "core" | "secondary";
  categoryLabel?: string;
  stack: string[];
  problem: string;
  solution: string;
  keyDecisions: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function AdminProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fullPortfolio, setFullPortfolio] = useState<any>(null);

  // Modal / Form State for Add / Edit
  const [formState, setFormState] = useState<Project>({
    id: "",
    title: "",
    role: "",
    category: "core",
    stack: [],
    problem: "",
    solution: "",
    keyDecisions: [],
    githubUrl: "",
    liveUrl: "",
  });
  const [stackInput, setStackInput] = useState("");
  const [decisionsInput, setDecisionsInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setFullPortfolio(res.data);
          setProjects(res.data.projects || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const openNewProjectModal = () => {
    setFormState({
      id: "proj-" + Date.now(),
      title: "",
      role: "Full Stack Developer",
      category: "core",
      stack: [],
      problem: "",
      solution: "",
      keyDecisions: [],
      githubUrl: "",
      liveUrl: "",
    });
    setStackInput("");
    setDecisionsInput("");
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setFormState({
      ...proj,
      category: proj.category || "core",
      githubUrl: proj.githubUrl || "",
      liveUrl: proj.liveUrl || "",
    });
    setStackInput((proj.stack || []).join(", "));
    setDecisionsInput((proj.keyDecisions || []).join("\n"));
    setEditingId(proj.id);
    setIsModalOpen(true);
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedStack = stackInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const parsedDecisions = decisionsInput
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean);

    const projectToSave: Project = {
      ...formState,
      categoryLabel:
        formState.category === "secondary"
          ? "Secondary Track (Flutter / Mobile)"
          : "Core Back-End (PHP / Laravel)",
      stack: parsedStack,
      keyDecisions: parsedDecisions,
    };

    let updatedProjects: Project[];
    if (editingId) {
      updatedProjects = projects.map((p) => (p.id === editingId ? projectToSave : p));
    } else {
      updatedProjects = [projectToSave, ...projects];
    }

    setProjects(updatedProjects);
    setIsModalOpen(false);
    persistProjects(updatedProjects);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updated = projects.filter((p) => p.id !== id);
      setProjects(updated);
      persistProjects(updated);
    }
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === projects.length - 1)
    )
      return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setProjects(updated);
    persistProjects(updated);
  };

  const persistProjects = async (updatedProjects: Project[]) => {
    setSaving(true);
    setStatusMsg({ type: "", text: "" });

    const updatedPortfolio = {
      ...fullPortfolio,
      projects: updatedProjects,
    };

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPortfolio),
      });
      const data = await res.json();
      if (data.success) {
        setFullPortfolio(updatedPortfolio);
        setStatusMsg({ type: "success", text: "Projects list updated successfully!" });
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to save projects." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error saving projects." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-neutral-400 font-mono text-sm">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects Manager</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage your Core PHP/Laravel systems and Secondary mobile projects
          </p>
        </div>
        <button
          onClick={openNewProjectModal}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-lg transition-all shadow-lg shadow-emerald-500/20"
        >
          + Add New Project
        </button>
      </div>

      {statusMsg.text && (
        <div
          className={`p-4 rounded-lg font-medium text-sm border ${
            statusMsg.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((proj, idx) => {
          const isSecondary = proj.category === "secondary";
          return (
            <div
              key={proj.id || idx}
              className={`p-6 bg-[#141720] border rounded-xl space-y-4 ${
                isSecondary ? "border-cyan-500/30" : "border-white/10"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono text-emerald-400 font-bold">#{idx + 1}</span>
                    <h3 className="text-lg font-bold text-white">{proj.title}</h3>

                    {/* Specialization distinction tag */}
                    {isSecondary ? (
                      <span className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono rounded">
                        ⚡ Secondary Track (Mobile / Dart)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono rounded">
                        🟢 Core Focus (PHP / Laravel)
                      </span>
                    )}

                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-xs text-neutral-400 rounded">
                      {proj.role}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 max-w-3xl leading-relaxed">
                    <strong className="text-neutral-300">Problem:</strong> {proj.problem}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveProject(idx, "up")}
                    disabled={idx === 0}
                    className="p-1.5 bg-white/5 hover:bg-white/10 rounded text-xs disabled:opacity-30"
                    title="Move Up"
                  >
                    ⬆️
                  </button>
                  <button
                    onClick={() => moveProject(idx, "down")}
                    disabled={idx === projects.length - 1}
                    className="p-1.5 bg-white/5 hover:bg-white/10 rounded text-xs disabled:opacity-30"
                    title="Move Down"
                  >
                    ⬇️
                  </button>
                  <button
                    onClick={() => openEditProjectModal(proj)}
                    className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-mono rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs font-mono rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Stack Tags & Link Indicators */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(proj.stack || []).map((t, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 border text-[11px] font-mono rounded ${
                      isSecondary
                        ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {t}
                  </span>
                ))}

                {proj.githubUrl && (
                  <span className="px-2 py-0.5 border border-white/20 bg-white/5 text-neutral-300 text-[10px] font-mono rounded flex items-center gap-1">
                    <span>🐙 GitHub Repo</span>
                  </span>
                )}

                {proj.liveUrl && (
                  <span className="px-2 py-0.5 border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-[10px] font-mono rounded flex items-center gap-1">
                    <span>🌐 Live Demo</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Add / Edit Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-[#141720] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 shrink-0">
              <h2 className="text-lg font-bold text-white">
                {editingId ? "Edit Project Details" : "Add New Project"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProjectForm} className="space-y-5 overflow-y-auto flex-1 pr-2">
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Specialization Track / Category *
                </label>
                <select
                  value={formState.category || "core"}
                  onChange={(e) =>
                    setFormState({ ...formState, category: e.target.value as "core" | "secondary" })
                  }
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
                >
                  <option value="core">🟢 Core Specialization (PHP & Laravel / Back-End)</option>
                  <option value="secondary">⚡ Secondary Track (Flutter / Mobile / Exploratory)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Athr (أَثَر) - Islamic Productivity App"
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Your Role *
                </label>
                <input
                  type="text"
                  required
                  value={formState.role}
                  onChange={(e) => setFormState({ ...formState, role: e.target.value })}
                  placeholder="e.g. Full Stack Developer / Mobile Developer"
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Tech Stack (Comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  placeholder="Dart, Flutter, Provider, REST API"
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  The Problem / Challenge *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formState.problem}
                  onChange={(e) => setFormState({ ...formState, problem: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Your Solution & Architecture *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formState.solution}
                  onChange={(e) => setFormState({ ...formState, solution: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Key Architectural Decisions (One per line)
                </label>
                <textarea
                  rows={4}
                  value={decisionsInput}
                  onChange={(e) => setDecisionsInput(e.target.value)}
                  placeholder="Clean mobile UX inspired by concentric ripple geometry&#10;Offline-first local storage persistence"
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none resize-none font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    GitHub Repository URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formState.githubUrl || ""}
                    onChange={(e) => setFormState({ ...formState, githubUrl: e.target.value })}
                    placeholder="https://github.com/basselessamm/..."
                    className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formState.liveUrl || ""}
                    onChange={(e) => setFormState({ ...formState, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-black/40 border border-white/10 focus:border-cyan-500 text-white p-3 rounded-lg text-sm outline-none font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition-all"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
