"use client";

import { useEffect, useState } from "react";

export default function AdminIdentityPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    title: "",
    focus: "",
    email: "",
    linkedin: "",
    github: "",
    phone: "",
    location: "",
    headline: "",
    subline: "",
  });

  const [fullPortfolio, setFullPortfolio] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setFullPortfolio(res.data);
          setFormData({
            name: res.data.identity?.name || "",
            fullName: res.data.identity?.fullName || "",
            title: res.data.identity?.title || "",
            focus: res.data.identity?.focus || "",
            email: res.data.identity?.email || "",
            linkedin: res.data.identity?.linkedin || "",
            github: res.data.identity?.github || "",
            phone: res.data.identity?.phone || "",
            location: res.data.identity?.location || "",
            headline: res.data.intro?.headline || "",
            subline: res.data.intro?.subline || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg({ type: "", text: "" });

    const updatedPortfolio = {
      ...fullPortfolio,
      identity: {
        name: formData.name,
        fullName: formData.fullName,
        title: formData.title,
        focus: formData.focus,
        email: formData.email,
        linkedin: formData.linkedin,
        github: formData.github,
        phone: formData.phone,
        location: formData.location,
      },
      intro: {
        headline: formData.headline,
        subline: formData.subline,
      },
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
        setStatusMsg({ type: "success", text: "Identity and intro details updated successfully!" });
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to update identity." });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Network error occurred while saving." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-neutral-400 font-mono text-sm">
        Loading identity data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Identity & Bio Manager</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Edit personal information, social channels, hero headline, and intro subline
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

      <form onSubmit={handleSave} className="space-y-8">
        {/* Personal Details */}
        <div className="p-6 bg-[#141720] border border-white/10 rounded-xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Display Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Full Official Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Professional Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Specialization Focus *
              </label>
              <input
                type="text"
                required
                value={formData.focus}
                onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none"
              />
            </div>
          </div>
        </div>

        {/* Intro Headlines */}
        <div className="p-6 bg-[#141720] border border-white/10 rounded-xl space-y-6">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
            Hero & Bio Intro Statements
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Main Hero Headline *
              </label>
              <input
                type="text"
                required
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Bio Subline Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.subline}
                onChange={(e) => setFormData({ ...formData, subline: e.target.value })}
                className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none leading-relaxed resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Save Identity & Bio"}
          </button>
        </div>
      </form>
    </div>
  );
}
