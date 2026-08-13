"use client";

import { useEffect, useState } from "react";

export default function AdminSkillsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const [skills, setSkills] = useState<{
    languages: string[];
    backend: string[];
    frontend: string[];
    databases: string[];
    devops: string[];
    other: string[];
  }>({
    languages: [],
    backend: [],
    frontend: [],
    databases: [],
    devops: [],
    other: [],
  });

  const [fullPortfolio, setFullPortfolio] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setFullPortfolio(res.data);
          setSkills(res.data.skills || {});
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryChange = (category: string, value: string) => {
    const parsed = value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setSkills((prev) => ({ ...prev, [category]: parsed }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg({ type: "", text: "" });

    const updatedPortfolio = {
      ...fullPortfolio,
      skills,
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
        setStatusMsg({ type: "success", text: "Skills categories updated successfully!" });
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to update skills." });
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
        Loading skills data...
      </div>
    );
  }

  const categories = [
    { key: "languages", label: "Programming Languages" },
    { key: "backend", label: "Back-End Frameworks & Concepts" },
    { key: "frontend", label: "Front-End Frameworks & UI" },
    { key: "databases", label: "Databases & Storage" },
    { key: "devops", label: "DevOps & Tools" },
    { key: "other", label: "Architecture & Security" },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Categorized Skills Manager</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Manage technical skill tags organized by professional domains
        </p>
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

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 bg-[#141720] border border-white/10 rounded-xl space-y-6">
          {categories.map((cat) => {
            const currentList = (skills as any)[cat.key] || [];
            return (
              <div key={cat.key} className="space-y-3 pb-6 border-b border-white/10 last:border-0 last:pb-0">
                <label className="block text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  {cat.label}
                </label>
                <input
                  type="text"
                  value={currentList.join(", ")}
                  onChange={(e) => handleCategoryChange(cat.key, e.target.value)}
                  placeholder="PHP, JavaScript, TypeScript, SQL"
                  className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none font-mono"
                />

                {/* Render pill tags preview */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentList.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {saving ? "Saving Skills..." : "Save Skills Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
}
