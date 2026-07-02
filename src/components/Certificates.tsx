"use client";

import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink } from "lucide-react";

interface Certificate {
  title: string;
  org: string;
  date: string;
  link: string;
  icon: string;
}

const certificates: Certificate[] = [
  {
    title: "CCNA: Introduction to Networks",
    org: "Cisco",
    date: "June 2026",
    link: "https://www.credly.com/badges/15e1293a-3ca7-4aaf-a867-e546778a7921/linked_in?t=th1kac",
    icon: "🌐",
  },
  {
    title: "Software Engineering Principles",
    org: "freeCodeCamp",
    date: "Sept 2025",
    link: "https://example.com",
    icon: "💻",
  },
  {
    title: "Google UX Design Professional Certificate",
    org: "Google",
    date: "May 2025",
    link: "https://example.com",
    icon: "🎨",
  },
];

export default function Certificates() {
  return (
    <section id="certificates" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-fg-primary mb-3">
            Certifications
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto rounded-full" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-dashed border-fg-muted/20 pl-6 sm:pl-8 space-y-12 ml-4 sm:ml-8">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-5 h-5 rounded-full bg-bg-primary border-2 border-accent-purple flex items-center justify-center z-10 shadow-[0_0_10px_rgba(138,124,255,0.4)]">
                <span className="w-1.5 h-1.5 bg-accent-purple rounded-full" />
              </div>

              {/* Glass Card */}
              <div className="glass-card rounded-2xl p-6 hover:scale-[1.01] transition-transform duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {/* Icon bubble */}
                    <div className="w-12 h-12 rounded-xl bg-bg-primary border border-white/5 flex items-center justify-center text-2xl flex-shrink-0">
                      {cert.icon}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-fg-primary">
                        {cert.title}
                      </h3>
                      <div className="font-ui text-xs text-accent-blue font-semibold uppercase tracking-wider">
                        {cert.org}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1.5 font-ui text-xs text-fg-muted">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{cert.date}</span>
                    </div>

                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-ui text-[11px] font-bold uppercase tracking-wider text-accent-purple hover:text-accent-purple/80 transition-colors pt-1"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
