"use client";

import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Tech", href: "#tech" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll spy logic
      const sections = navLinks.map((link) => {
        const el = document.getElementById(link.href.substring(1));
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            id: link.href.substring(1),
            // Middle-of-viewport check
            top: rect.top + window.scrollY - 300,
            bottom: rect.bottom + window.scrollY - 300,
          };
        }
        return null;
      });

      const currentScroll = window.scrollY;
      const active = sections.find(
        (sec) => sec && currentScroll >= sec.top && currentScroll <= sec.bottom
      );

      if (active) {
        setActiveSection(active.id);
      } else if (currentScroll < 100) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className={`w-full max-w-5xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${scrolled ? "glass-capsule shadow-lg py-2.5" : "bg-transparent border-transparent"
          }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="font-heading text-2xl font-bold tracking-wider text-fg-primary text-glow-purple"
        >
          Samyam
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`font-ui text-sm uppercase tracking-widest relative px-3 py-1.5 transition-colors duration-300 ${isActive ? "text-accent-purple" : "text-fg-muted hover:text-fg-primary"
                  }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 border border-accent-purple/40 rounded-full -z-10 bg-accent-purple/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Social media icons (Desktop) */}
        <div className="hidden md:flex items-center gap-4 text-fg-muted">
          <a
            href="https://github.com/samyamx"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-accent-purple transition-colors duration-200"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/samyam-shrestha-940b413a3/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-accent-blue transition-colors duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/explore.with.yam/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="hover:text-accent-purple transition-colors duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-fg-primary p-1 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-4 right-4 glass-capsule rounded-3xl p-6 flex flex-col gap-4 shadow-2xl z-40"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-ui text-base uppercase tracking-widest py-2 px-4 rounded-xl transition-colors duration-200 ${activeSection === link.href.substring(1)
                      ? "bg-accent-purple/10 text-accent-purple"
                      : "text-fg-muted hover:bg-white/5 hover:text-fg-primary"
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <hr className="border-white/10 my-1" />
            <div className="flex items-center justify-around text-fg-muted pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-accent-purple transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-accent-blue transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-accent-purple transition-colors duration-200"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
