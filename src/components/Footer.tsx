"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-white/5 py-12 bg-bg-primary z-10">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left column */}
        <div className="font-ui text-xs text-fg-muted uppercase tracking-widest text-center sm:text-left">
          © {new Date().getFullYear()} SAMYAM. All rights reserved.
        </div>

        {/* Center column */}
        <div className="font-ui text-xs text-fg-muted text-center">
          <span className="text-accent-purple"></span>
        </div>

        {/* Right column / Back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="flex items-center gap-1.5 font-ui text-[10px] uppercase tracking-widest font-bold text-fg-muted hover:text-accent-purple transition-colors duration-200"
        >
          <span>Back to Top</span>
          <div className="w-8 h-8 rounded-full border border-white/10 hover:border-accent-purple/50 flex items-center justify-center transition-colors">
            <ArrowUp className="w-4 h-4" />
          </div>
        </button>
      </div>
    </footer>
  );
}
