import { IDENTITY } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-[var(--text-tertiary)]">
          © {year} {IDENTITY.fullName}
        </p>
        <p className="text-xs font-mono text-[var(--text-tertiary)]">
          {IDENTITY.location}
        </p>
      </div>
    </footer>
  );
}
