"use client";

import { useEffect, useState } from "react";

export default function AdminPhilosophyPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const [headlineText, setHeadlineText] = useState("");
  const [cards, setCards] = useState<Array<{ title: string; quote: string; description: string }>>([]);
  const [fullPortfolio, setFullPortfolio] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setFullPortfolio(res.data);
          const ph = res.data.philosophy || {};
          setHeadlineText((ph.headlineWords || []).join(" "));
          setCards(ph.cards || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCardChange = (index: number, field: string, value: string) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [field]: value };
    setCards(updated);
  };

  const handleAddCard = () => {
    setCards([{ title: "New Engineering Principle", quote: '"Quote or summary phrase"', description: "Detailed explanation of this architectural principle..." }, ...cards]);
  };

  const handleRemoveCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg({ type: "", text: "" });

    const headlineWords = headlineText.split(/\s+/).filter(Boolean);

    const updatedPortfolio = {
      ...fullPortfolio,
      philosophy: {
        headlineWords,
        cards,
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
        setStatusMsg({ type: "success", text: "Philosophy & manifesto principles updated successfully!" });
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to update philosophy." });
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
        Loading philosophy data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Philosophy & Manifesto Manager</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Customize your engineering manifesto, headline words, and core architectural principles
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
        {/* Giant Headline Words */}
        <div className="p-6 bg-[#141720] border border-white/10 rounded-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
            Editorial Headline Text
          </h2>
          <div>
            <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
              Headline Words (Space-separated, will animate word by word)
            </label>
            <textarea
              rows={3}
              value={headlineText}
              onChange={(e) => setHeadlineText(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none font-mono"
            />
          </div>
        </div>

        {/* Philosophy Cards */}
        <div className="p-6 bg-[#141720] border border-white/10 rounded-xl space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Core Engineering Principles Cards
            </h2>
            <button
              type="button"
              onClick={handleAddCard}
              className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 text-xs font-mono rounded transition-colors"
            >
              + Add Principle Card
            </button>
          </div>

          <div className="space-y-6">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="p-5 bg-black/40 border border-white/10 rounded-lg space-y-4 relative group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    Principle #{idx + 1}
                  </span>
                  {cards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCard(idx)}
                      className="text-xs text-red-400 hover:underline font-mono"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={card.title}
                    onChange={(e) => handleCardChange(idx, "title", e.target.value)}
                    className="w-full bg-[#141720] border border-white/10 focus:border-emerald-500 text-white p-2.5 rounded text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Quote / Subtitle
                  </label>
                  <input
                    type="text"
                    required
                    value={card.quote}
                    onChange={(e) => handleCardChange(idx, "quote", e.target.value)}
                    className="w-full bg-[#141720] border border-white/10 focus:border-emerald-500 text-white p-2.5 rounded text-sm outline-none italic"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                    Detailed Explanation
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={card.description}
                    onChange={(e) => handleCardChange(idx, "description", e.target.value)}
                    className="w-full bg-[#141720] border border-white/10 focus:border-emerald-500 text-white p-2.5 rounded text-sm outline-none resize-none leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {saving ? "Saving Principles..." : "Save Philosophy Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
