"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setPortfolioData(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleExportJSON = () => {
    if (!portfolioData) return;
    const jsonString = JSON.stringify(portfolioData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `portfolio-backup-${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setStatusMsg({ type: "success", text: "Portfolio backup exported successfully!" });
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (!importedData.identity || !importedData.projects || !importedData.skills) {
          setStatusMsg({ type: "error", text: "Invalid JSON backup file structure." });
          return;
        }

        const res = await fetch("/api/admin/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(importedData),
        });
        const resData = await res.json();

        if (resData.success) {
          setPortfolioData(importedData);
          setStatusMsg({ type: "success", text: "Portfolio restored from backup file successfully!" });
        } else {
          setStatusMsg({ type: "error", text: "Failed to restore portfolio backup." });
        }
      } catch (err) {
        setStatusMsg({ type: "error", text: "Error parsing JSON backup file." });
      }
    };
    reader.readAsText(file);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-neutral-400 font-mono text-sm">
        Loading system settings...
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">SEO & System Backup Settings</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Export full JSON data backups, restore from files, and manage system parameters
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

      {/* Backup & Restore Panel */}
      <div className="p-6 bg-[#141720] border border-white/10 rounded-xl space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
          Data Backup & Restore Center
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 bg-black/40 border border-white/10 rounded-lg space-y-3">
            <h3 className="text-sm font-bold text-white">Export Portfolio Backup</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Download a complete, structured JSON backup file containing all your personal details, projects, skills, and education.
            </p>
            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition-all"
            >
              📦 Export JSON Backup
            </button>
          </div>

          <div className="p-5 bg-black/40 border border-white/10 rounded-lg space-y-3">
            <h3 className="text-sm font-bold text-white">Restore from Backup File</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Upload a previously exported `portfolio-backup.json` file to restore your entire portfolio data instantly.
            </p>
            <label className="inline-block px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg transition-all cursor-pointer border border-white/10">
              📁 Choose Backup File
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Environment Security Credentials info */}
      <div className="p-6 bg-[#141720] border border-white/10 rounded-xl space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono border-b border-white/10 pb-3">
          Security & Admin Key Configuration
        </h2>
        <div className="text-xs text-neutral-300 space-y-2 font-mono">
          <p>
            To change your dashboard password, update the <code className="bg-black/50 px-2 py-1 rounded text-emerald-400">ADMIN_PASSWORD</code> key in your <code className="bg-black/50 px-2 py-1 rounded text-emerald-400">.env.local</code> environment file.
          </p>
          <p className="text-neutral-500">
            Current session timeout: 7 days | Encrypted HTTP-Only Cookie Session.
          </p>
        </div>
      </div>
    </div>
  );
}
