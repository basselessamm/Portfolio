"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { IDENTITY as DEFAULT_IDENTITY, IdentityData } from "@/lib/data";

export default function ContactSection({ identity = DEFAULT_IDENTITY }: { identity?: IdentityData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Failed to send message.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 border-t border-[var(--border)] relative overflow-hidden bg-[var(--background)]">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] block mb-3">
            Initiate Contact //
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Let&apos;s Build Resilient Systems
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg leading-relaxed text-sm">
            Available for high-impact full-time engineering roles, backend architecture consulting, and scalable platform initiatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct channels grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3.5"
          >
            <a
              href={`mailto:${identity.email}`}
              style={{ touchAction: "manipulation" }}
              className="group p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--accent)]/50 transition-all duration-200 shadow-md active:scale-95"
            >
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[var(--accent)] block mb-1">
                Direct Mail
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors break-all line-clamp-1">
                {identity.email}
              </span>
            </a>

            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ touchAction: "manipulation" }}
              className="group p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--accent-cyan)]/50 transition-all duration-200 shadow-md active:scale-95"
            >
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[var(--accent-cyan)] block mb-1">
                LinkedIn Profile
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors truncate block">
                {identity.name}
              </span>
            </a>

            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ touchAction: "manipulation" }}
              className="group p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--accent)]/50 transition-all duration-200 shadow-md active:scale-95"
            >
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-1">
                GitHub Repo
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate block">
                {identity.github ? identity.github.split("/").pop() : "GitHub"}
              </span>
            </a>

            <a
              href={`tel:${identity.phone.replace(/\s/g, "")}`}
              style={{ touchAction: "manipulation" }}
              className="group p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--accent)]/50 transition-all duration-200 shadow-md active:scale-95"
            >
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[var(--accent)] block mb-1">
                Direct Line
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate block">
                {identity.phone}
              </span>
            </a>
          </motion.div>

          {/* Direct Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 border border-[var(--border)] p-5 sm:p-8 rounded-2xl bg-[var(--surface-1)] backdrop-blur-xl shadow-2xl"
          >
            <h3 className="text-base sm:text-lg font-mono font-bold mb-5 sm:mb-6 text-[var(--text-primary)]">
              TRANSMIT MESSAGE //
            </h3>

            {status === "success" ? (
              <div className="p-6 border border-[var(--accent)]/30 bg-[var(--accent)]/10 rounded-xl text-[var(--accent)]">
                <h4 className="font-bold text-base mb-2">Message Transmitted Successfully!</h4>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  Thank you for reaching out. Your message has been logged and I will review and reply shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs font-mono uppercase underline text-[var(--accent)] cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === "error" && (
                  <div className="p-3 border border-red-500/30 bg-red-500/10 rounded-xl text-red-400 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                      Sender Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Miller"
                      className="w-full bg-[var(--surface-2)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] p-3 rounded-xl text-[16px] sm:text-xs font-mono outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-[var(--surface-2)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] p-3 rounded-xl text-[16px] sm:text-xs font-mono outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                    Subject //
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Engineering Role / Project Architecture Inquiry"
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] p-3 rounded-xl text-[16px] sm:text-xs font-mono outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                    Message Payload *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe the opportunity, platform requirements, or technical challenges..."
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] p-3 rounded-xl text-[16px] sm:text-xs font-mono outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{ touchAction: "manipulation" }}
                  className="w-full py-3.5 px-6 rounded-xl bg-[var(--accent)] text-[#080a0f] font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all duration-200 disabled:opacity-50 cursor-pointer shadow-md"
                >
                  {status === "submitting" ? "Transmitting..." : "Send Message →"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
