"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { IDENTITY } from "@/lib/data";

export default function ContactSection() {
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
    } catch (err) {
      setStatus("error");
      setErrorMsg("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)] block mb-3">
            Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Let&apos;s Connect
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Available for full-time positions and collaborative opportunities.
            Reach out through the form below or via any direct channel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Direct channels grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
          >
            <a
              href={`mailto:${IDENTITY.email}`}
              className="group p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors bg-[var(--surface-hover)]"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
                Email
              </span>
              <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors break-all">
                {IDENTITY.email}
              </span>
            </a>

            <a
              href={IDENTITY.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors bg-[var(--surface-hover)]"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
                LinkedIn
              </span>
              <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                Bassel Essam
              </span>
            </a>

            <a
              href={IDENTITY.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors bg-[var(--surface-hover)]"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
                GitHub
              </span>
              <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                basselessamm
              </span>
            </a>

            <a
              href={`tel:${IDENTITY.phone.replace(/\s/g, "")}`}
              className="group p-6 border border-[var(--border)] hover:border-[var(--accent)] transition-colors bg-[var(--surface-hover)]"
            >
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--text-tertiary)] block mb-2">
                Phone
              </span>
              <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                {IDENTITY.phone}
              </span>
            </a>
          </motion.div>

          {/* Direct Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 border border-[var(--border)] p-6 md:p-8 bg-[var(--surface)]"
          >
            <h3 className="text-xl font-bold mb-6 text-[var(--text-primary)]">
              Send a Direct Message
            </h3>

            {status === "success" ? (
              <div className="p-6 border border-emerald-500/30 bg-emerald-500/10 rounded text-emerald-400">
                <h4 className="font-semibold text-lg mb-2">Message Sent Successfully!</h4>
                <p className="text-sm">Thank you for reaching out. I will review your message and reply as soon as possible.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-xs font-mono uppercase underline hover:text-emerald-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === "error" && (
                  <div className="p-3 border border-red-500/30 bg-red-500/10 rounded text-red-400 text-sm">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-[var(--background)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] p-3 rounded text-sm outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-[var(--background)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] p-3 rounded text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full bg-[var(--background)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] p-3 rounded text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Bassel, I'd like to discuss..."
                    className="w-full bg-[var(--background)] border border-[var(--border)] focus:border-[var(--accent)] text-[var(--text-primary)] p-3 rounded text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto px-8 py-3 bg-[var(--accent)] text-black font-semibold text-sm rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending Message..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
