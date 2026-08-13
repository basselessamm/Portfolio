"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Overview", href: "/admin", icon: "📊" },
  { label: "Identity & Bio", href: "/admin/identity", icon: "👤" },
  { label: "Philosophy", href: "/admin/philosophy", icon: "💡" },
  { label: "Projects", href: "/admin/projects", icon: "🚀" },
  { label: "Skills", href: "/admin/skills", icon: "⚡" },
  { label: "Education", href: "/admin/education", icon: "🎓" },
  { label: "Inbox Messages", href: "/admin/messages", icon: "📬" },
  { label: "SEO & Backup", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (pathname === "/admin/login") return;

    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.messages) {
          const unread = data.messages.filter((m: any) => !m.read).length;
          setUnreadCount(unread);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // If on login page, render child directly without sidebar (AFTER all hooks called unconditionally)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0d0e12] text-neutral-200 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#12141a] border-r border-white/10 flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500/20 text-emerald-400 font-mono text-base font-bold rounded-lg flex items-center justify-center border border-emerald-500/30">
              BE
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">Bassel Essam</h2>
              <p className="text-[10px] font-mono text-emerald-400">Portfolio CMS v1.0</p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {item.href === "/admin/messages" && unreadCount > 0 && (
                    <span className="bg-emerald-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                      {unreadCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium rounded-lg transition-colors border border-white/10"
          >
            <span>🌐 View Public Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded-lg transition-colors border border-red-500/20"
          >
            <span>🚪 Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Mobile/Desktop Navigation Bar */}
        <header className="h-16 bg-[#12141a] border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
              {NAV_ITEMS.find((i) => i.href === pathname)?.label || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admin Authorized</span>
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden text-red-400 hover:underline"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Mobile Navigation bar */}
        <div className="md:hidden bg-[#161922] border-b border-white/10 p-2 overflow-x-auto flex gap-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded text-xs whitespace-nowrap font-medium ${
                pathname === item.href ? "bg-emerald-500/20 text-emerald-400" : "text-neutral-400"
              }`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </div>

        {/* Dynamic Page Component */}
        <main className="p-6 md:p-10 flex-1 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
