import { IDENTITY as DEFAULT_IDENTITY, IdentityData } from "@/lib/data";

export default function Footer({ identity = DEFAULT_IDENTITY }: { identity?: IdentityData }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-[var(--text-tertiary)]">
          © {year} {identity.fullName || identity.name}
        </p>
        <p className="text-xs font-mono text-[var(--text-tertiary)]">
          {identity.location}
        </p>
      </div>
    </footer>
  );
}
