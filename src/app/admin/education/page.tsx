"use client";

import { useEffect, useState } from "react";

interface Education {
  id: string;
  year: string;
  institution: string;
  program: string;
  description: string;
}

export default function AdminEducationPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const [education, setEducation] = useState<Education[]>([]);
  const [fullPortfolio, setFullPortfolio] = useState<any>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Education>({
    id: "",
    year: "",
    institution: "",
    program: "",
    description: "",
  });

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setFullPortfolio(res.data);
          setEducation(res.data.education || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const openNewEducationModal = () => {
    setFormState({
      id: "edu-" + Date.now(),
      year: new Date().getFullYear().toString(),
      institution: "",
      program: "",
      description: "",
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditEducationModal = (item: Education) => {
    setFormState(item);
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleSaveModalForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Education[];
    if (editingId) {
      updated = education.map((e) => (e.id === editingId ? formState : e));
    } else {
      updated = [formState, ...education];
    }
    setEducation(updated);
    setIsModalOpen(false);
    persistEducation(updated);
  };

  const handleRemoveEducation = (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      const updated = education.filter((e) => e.id !== id);
      setEducation(updated);
      persistEducation(updated);
    }
  };

  const moveEducation = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === education.length - 1)
    )
      return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...education];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setEducation(updated);
    persistEducation(updated);
  };

  const persistEducation = async (updatedEdu: Education[]) => {
    setSaving(true);
    setStatusMsg({ type: "", text: "" });

    const updatedPortfolio = {
      ...fullPortfolio,
      education: updatedEdu,
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
        setStatusMsg({ type: "success", text: "Education records saved successfully!" });
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to save education." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error occurred." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-neutral-400 font-mono text-sm">
        Loading education data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Education & Credentials</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Manage your degrees, professional diplomas, and training tracks
          </p>
        </div>
        <button
          type="button"
          onClick={openNewEducationModal}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-lg transition-all shadow-lg shadow-emerald-500/20"
        >
          + Add Education Entry
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

      {/* Education List */}
      <div className="space-y-4">
        {education.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-6 bg-[#141720] border border-white/10 rounded-xl space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 font-bold">#{idx + 1}</span>
                  <h3 className="text-lg font-bold text-white">{item.program}</h3>
                  <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 rounded">
                    {item.year}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 font-semibold mt-1">{item.institution}</p>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => moveEducation(idx, "up")}
                  disabled={idx === 0}
                  className="p-1.5 bg-white/5 hover:bg-white/10 rounded text-xs disabled:opacity-30"
                  title="Move Up"
                >
                  ⬆️
                </button>
                <button
                  onClick={() => moveEducation(idx, "down")}
                  disabled={idx === education.length - 1}
                  className="p-1.5 bg-white/5 hover:bg-white/10 rounded text-xs disabled:opacity-30"
                  title="Move Down"
                >
                  ⬇️
                </button>
                <button
                  onClick={() => openEditEducationModal(item)}
                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-mono rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleRemoveEducation(item.id)}
                  className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs font-mono rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog for Add / Edit Education */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-[#141720] border border-white/15 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 shrink-0">
              <h2 className="text-lg font-bold text-white">
                {editingId ? "Edit Education Record" : "Add Education Record"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModalForm} className="space-y-5 overflow-y-auto flex-1 pr-2">
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Program / Degree Title *
                </label>
                <input
                  type="text"
                  required
                  value={formState.program}
                  onChange={(e) => setFormState({ ...formState, program: e.target.value })}
                  placeholder="e.g. Full Stack PHP Development Track"
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Institution Name *
                </label>
                <input
                  type="text"
                  required
                  value={formState.institution}
                  onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                  placeholder="e.g. Information Technology Institute (ITI)"
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Graduation Year *
                </label>
                <input
                  type="text"
                  required
                  value={formState.year}
                  onChange={(e) => setFormState({ ...formState, year: e.target.value })}
                  placeholder="e.g. 2025"
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Description & Key Focus *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Intensive professional training program focused on enterprise development..."
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none resize-none leading-relaxed"
                />
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
