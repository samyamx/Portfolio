"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to submit message.");
      }
    } catch (err: unknown) {
      setStatus("error");
      const errMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(errMsg);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 overflow-hidden">
      {/* Background celestial details */}
      <div className="absolute bottom-10 left-10 w-[20rem] h-[20rem] nebula-glow rounded-full -z-10" />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-fg-primary mb-3">
            Get in Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Contact Details */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-center">
            <div className="space-y-3">
              <h3 className="font-ui text-xs uppercase tracking-widest text-accent-blue font-bold">
                Let&apos;s Collaborate
              </h3>
              <p className="font-body text-base text-fg-muted leading-relaxed">
                Whether you have an interesting project, a job opening, or just want to chat about engineering and design, feel free to drop me a message!
              </p>
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-ui text-[11px] font-semibold text-emerald-400 tracking-wider uppercase">
                Available for Freelance & Roles
              </span>
            </div>

            {/* Detail Rows */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-white/5 flex items-center justify-center flex-shrink-0 text-accent-purple">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="font-ui text-sm">
                  <div className="text-fg-muted text-[10px] uppercase tracking-widest">Email</div>
                  <a href="mailto:samyam00349@gmail.com" className="text-fg-primary hover:text-accent-purple transition-colors font-medium">
                    samyam00349@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-white/5 flex items-center justify-center flex-shrink-0 text-accent-blue">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="font-ui text-sm">
                  <div className="text-fg-muted text-[10px] uppercase tracking-widest">Phone</div>
                  <a href="tel:+9779863483004" className="text-fg-primary hover:text-accent-blue transition-colors font-medium">
                    +977-9863483004
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-white/5 flex items-center justify-center flex-shrink-0 text-fg-muted">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-ui text-sm">
                  <div className="text-fg-muted text-[10px] uppercase tracking-widest">Location</div>
                  <span className="text-fg-primary font-medium">Lalitpur, Nepal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Glass Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 border-white/10 relative">
              {status === "success" ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                  <h3 className="font-heading text-2xl font-bold text-fg-primary">
                    Message Sent Successfully!
                  </h3>
                  <p className="font-body text-sm text-fg-muted max-w-sm">
                    Thank you for reaching out. I have received your message and will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-5 py-2.5 rounded-full font-ui text-[11px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="font-ui text-[10px] uppercase tracking-widest text-fg-muted font-bold">
                        Name <span className="text-accent-purple">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-body text-fg-primary focus:outline-none focus:border-accent-purple/50 transition-all duration-200"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="font-ui text-[10px] uppercase tracking-widest text-fg-muted font-bold">
                        Email Address <span className="text-accent-purple">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-body text-fg-primary focus:outline-none focus:border-accent-purple/50 transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="font-ui text-[10px] uppercase tracking-widest text-fg-muted font-bold">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-body text-fg-primary focus:outline-none focus:border-accent-purple/50 transition-all duration-200"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="font-ui text-[10px] uppercase tracking-widest text-fg-muted font-bold">
                      Message <span className="text-accent-purple">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-bg-primary/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-body text-fg-primary focus:outline-none focus:border-accent-purple/50 transition-all duration-200 resize-none"
                      placeholder="Your message details..."
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-ui">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 rounded-xl font-ui text-xs tracking-widest uppercase font-semibold bg-accent-purple text-bg-primary hover:bg-accent-purple/90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <span>{status === "sending" ? "Transmitting..." : "Send Message"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
