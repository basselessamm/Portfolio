"use client";

import { useEffect, useState } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = () => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.messages || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchMessages();
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, read: !selectedMessage.read });
    }
  };

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm("Delete this message permanently?")) {
      await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
      if (selectedMessage?.id === id) setSelectedMessage(null);
      fetchMessages();
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Subject", "Message", "Date", "Read"];
    const rows = messages.map((m) => [
      m.id,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${(m.subject || "").replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      m.createdAt,
      m.read ? "Yes" : "No",
    ]);

    const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `portfolio-messages-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.subject || "").toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-neutral-400 font-mono text-sm">
        Loading inbox messages...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Contact Inbox Messages</h1>
          <p className="text-sm text-neutral-400 mt-1">
            View inquiries and messages submitted through your portfolio
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            disabled={messages.length === 0}
            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/10 text-xs font-mono rounded-lg transition-colors disabled:opacity-40"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 bg-[#141720] border border-white/10 rounded-xl">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages by name, email, subject, or keywords..."
          className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 text-white p-3 rounded-lg text-sm outline-none placeholder:text-neutral-500"
        />
      </div>

      {/* Messages List & Detail Modal */}
      {filteredMessages.length === 0 ? (
        <div className="p-12 text-center bg-[#141720] border border-white/10 rounded-xl text-neutral-400 font-mono text-xs">
          No contact messages found.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => {
                setSelectedMessage(msg);
                if (!msg.read) handleToggleRead(msg.id);
              }}
              className={`p-5 bg-[#141720] border rounded-xl transition-all cursor-pointer hover:border-emerald-500/50 ${
                !msg.read ? "border-emerald-500/40 bg-emerald-500/5" : "border-white/10"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white text-base">{msg.name}</span>
                  <span className="text-xs text-neutral-400 font-mono">{msg.email}</span>
                  {!msg.read && (
                    <span className="px-2 py-0.5 bg-emerald-500 text-black text-[10px] font-bold rounded font-mono">
                      UNREAD
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-500 font-mono">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => handleToggleRead(msg.id, e)}
                    className="text-xs text-neutral-400 hover:text-emerald-400 font-mono px-2 py-1 bg-white/5 rounded"
                  >
                    {msg.read ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button
                    onClick={(e) => handleDelete(msg.id, e)}
                    className="text-xs text-red-400 hover:underline font-mono px-2 py-1 bg-red-500/10 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {msg.subject && (
                <p className="text-xs font-mono text-emerald-400 mb-1">Subject: {msg.subject}</p>
              )}
              <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden">
          <div className="bg-[#141720] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-white/10 pb-4 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedMessage.name}</h2>
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-xs text-emerald-400 hover:underline font-mono"
                >
                  {selectedMessage.email}
                </a>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-neutral-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-neutral-400 overflow-y-auto flex-1 pr-2">
              <div>Received: {new Date(selectedMessage.createdAt).toLocaleString()}</div>
              {selectedMessage.subject && (
                <div>
                  Subject: <span className="text-white font-semibold">{selectedMessage.subject}</span>
                </div>
              )}
              <div className="p-4 bg-black/50 border border-white/10 rounded-lg text-neutral-200 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10 shrink-0">
              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-mono rounded-lg"
              >
                Delete Message
              </button>
              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=RE: ${encodeURIComponent(
                    selectedMessage.subject || "Portfolio Inquiry"
                  )}`}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition-all"
                >
                  ✉️ Reply via Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
