"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminOverviewPage() {
  const [data, setData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/portfolio").then((r) => r.json()),
      fetch("/api/admin/messages").then((r) => r.json()),
    ])
      .then(([portfolioRes, messagesRes]) => {
        if (portfolioRes.success) setData(portfolioRes.data);
        if (messagesRes.success) setMessages(messagesRes.messages || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-neutral-400 font-mono text-sm">
        Loading system overview...
      </div>
    );
  }

  const unreadMessages = messages.filter((m) => !m.read);
  const totalSkills = data
    ? Object.values(data.skills || {}).reduce((acc: number, val: any) => acc + (Array.isArray(val) ? val.length : 0), 0)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Overview</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Control center for Bassel Essam&apos;s Portfolio & CMS
        </p>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 bg-[#141720] border border-white/10 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Total Projects</span>
            <span className="text-xl">🚀</span>
          </div>
          <p className="text-3xl font-bold text-white mt-3 font-mono">{data?.projects?.length || 0}</p>
          <p className="text-[11px] text-emerald-400 mt-2 font-mono">Clean Architecture & DDD</p>
        </div>

        <div className="p-5 bg-[#141720] border border-white/10 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Total Tech Skills</span>
            <span className="text-xl">⚡</span>
          </div>
          <p className="text-3xl font-bold text-white mt-3 font-mono">{totalSkills}</p>
          <p className="text-[11px] text-emerald-400 mt-2 font-mono">6 Tech Categories</p>
        </div>

        <div className="p-5 bg-[#141720] border border-white/10 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Inbox Messages</span>
            <span className="text-xl">📬</span>
          </div>
          <p className="text-3xl font-bold text-white mt-3 font-mono">{messages.length}</p>
          <p className="text-[11px] text-emerald-400 mt-2 font-mono">
            {unreadMessages.length} Unread Message{unreadMessages.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="p-5 bg-[#141720] border border-white/10 rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Education & Track</span>
            <span className="text-xl">🎓</span>
          </div>
          <p className="text-3xl font-bold text-white mt-3 font-mono">{data?.education?.length || 0}</p>
          <p className="text-[11px] text-emerald-400 mt-2 font-mono">ITI & BIS Degree</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="p-6 bg-[#141720] border border-white/10 rounded-xl">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
          Quick Control Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/identity"
            className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-center transition-all group"
          >
            <div className="text-2xl mb-1">👤</div>
            <div className="text-xs font-medium text-neutral-200 group-hover:text-emerald-400">Edit Identity</div>
          </Link>

          <Link
            href="/admin/projects"
            className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-center transition-all group"
          >
            <div className="text-2xl mb-1">🚀</div>
            <div className="text-xs font-medium text-neutral-200 group-hover:text-emerald-400">Manage Projects</div>
          </Link>

          <Link
            href="/admin/skills"
            className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-center transition-all group"
          >
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs font-medium text-neutral-200 group-hover:text-emerald-400">Manage Skills</div>
          </Link>

          <Link
            href="/admin/messages"
            className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-center transition-all group"
          >
            <div className="text-2xl mb-1">📬</div>
            <div className="text-xs font-medium text-neutral-200 group-hover:text-emerald-400">
              View Inbox ({unreadMessages.length})
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Received Messages Feed */}
      <div className="p-6 bg-[#141720] border border-white/10 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Recent Contact Messages
          </h2>
          <Link href="/admin/messages" className="text-xs text-emerald-400 hover:underline font-mono">
            View All ({messages.length}) →
          </Link>
        </div>

        {messages.length === 0 ? (
          <p className="text-xs text-neutral-500 font-mono py-4">No contact messages received yet.</p>
        ) : (
          <div className="space-y-3">
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                className="p-4 bg-black/40 border border-white/5 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{msg.name}</span>
                    <span className="text-xs text-neutral-400">({msg.email})</span>
                    {!msg.read && (
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] rounded font-mono">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-1">{msg.message}</p>
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
