"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 font-mono text-xl font-bold rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            AG
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-neutral-400 mt-1">Authenticate to access portfolio control system</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-400 tracking-wider mb-2">
              Admin Key / Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/50 border border-white/15 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none transition-all placeholder:text-neutral-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Unlock Dashboard"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/10 pt-4 text-xs text-neutral-500 font-mono">
          System Status: Online | Encrypted Session
        </div>
      </div>
    </div>
  );
}
