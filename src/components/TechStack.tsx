"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";

interface Tech {
  name: string;
  category: string;
  percent: number;
  years: number;
  desc: string;
  color: string;
}

const technologies: Tech[] = [
  { name: "HTML5", category: "Frontend", percent: 95, years: 3, desc: "Semantic page structures, SEO fundamentals, and clean layout scaffolding.", color: "#8A7CFF" },
  { name: "CSS3", category: "Frontend", percent: 90, years: 3, desc: "Complex layouts, responsive media queries, and premium micro-animations.", color: "#5CAEFF" },
  { name: "JavaScript", category: "Frontend/Backend", percent: 90, years: 3, desc: "Modern ES6+ specifications, asynchronous patterns, and DOM mechanics.", color: "#8A7CFF" },
  { name: "React", category: "Frontend", percent: 88, years: 2, desc: "State coordination, custom hooks, and high-fidelity rendering architecture.", color: "#5CAEFF" },
  { name: "Next.js", category: "Frontend", percent: 85, years: 2, desc: "App Router layouts, Server Components, API routes, and optimized builds.", color: "#8A7CFF" },
  { name: "Node.js", category: "Backend", percent: 80, years: 2, desc: "Server execution environment, module design, and package management.", color: "#5CAEFF" },
  { name: "Express", category: "Backend", percent: 82, years: 2, desc: "RESTful endpoints design, middleware execution, and API routing.", color: "#8A7CFF" },
  { name: "MongoDB", category: "Database", percent: 75, years: 2, desc: "NoSQL data schemas, queries execution, and collection relationships.", color: "#5CAEFF" },
  { name: "Git", category: "DevOps", percent: 85, years: 3, desc: "Branching workflows, version control safety, and interactive rebasing.", color: "#8A7CFF" },
  { name: "GitHub", category: "DevOps", percent: 88, years: 3, desc: "Collaborative pull requests, CI/CD actions setup, and issue tracking.", color: "#5CAEFF" },
  { name: "Figma", category: "Design", percent: 78, years: 2, desc: "Component design systems, wireframing, and vector design translation.", color: "#8A7CFF" },
  { name: "Tailwind", category: "Frontend", percent: 92, years: 3, desc: "Utility-first design tokens, custom configs, and rapid responsive styles.", color: "#5CAEFF" },
];

export default function TechStack() {
  const [rotation, setRotation] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedTech, setSelectedTech] = useState<Tech>(technologies[4]); // Default to Next.js
  const [isMobile, setIsMobile] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Check mobile device viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Frame loop for desktop rotation
  useEffect(() => {
    if (isMobile) return;

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        // Rotate if NOT hovered
        if (hoveredIdx === null) {
          setRotation((prev) => (prev + delta * 0.007) % 360);
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hoveredIdx, isMobile]);

  const selectTechnology = (tech: Tech, idx: number) => {
    setSelectedTech(tech);
    setHoveredIdx(idx);
  };

  return (
    <section id="tech" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-fg-primary mb-3">
            Technologies I Use
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto rounded-full" />
        </div>

        {/* Orbit Grid / Layout container */}
        {!isMobile ? (
          <div className="relative h-[550px] flex items-center justify-center">
            {/* Outer dotted orbit lines */}
            <div className="absolute w-[440px] h-[440px] border border-dashed border-fg-muted/15 rounded-full pointer-events-none" />
            <div className="absolute w-[280px] h-[280px] border border-dashed border-accent-purple/10 rounded-full pointer-events-none" />

            {/* Orbiting Tech Items */}
            {technologies.map((tech, idx) => {
              // Position math
              const angle = ((idx * 30 + rotation) * Math.PI) / 180;
              const radius = 220; // Radius of orbit
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isHovered = hoveredIdx === idx;

              return (
                <motion.button
                  key={tech.name}
                  style={{
                    x,
                    y,
                  }}
                  onMouseEnter={() => selectTechnology(tech, idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`absolute w-14 h-14 rounded-full flex items-center justify-center font-ui text-[10px] font-semibold border transition-all duration-300 z-30 bg-bg-secondary ${
                    isHovered
                      ? "border-accent-purple text-accent-purple scale-110 shadow-[0_0_15px_rgba(138,124,255,0.35)]"
                      : "border-white/10 text-fg-muted hover:border-accent-blue/50"
                  }`}
                  aria-label={`View details for ${tech.name}`}
                >
                  {tech.name}
                </motion.button>
              );
            })}

            {/* Central Planet Console */}
            <div className="w-60 h-60 rounded-full glass-capsule flex flex-col items-center justify-center p-6 text-center border-accent-purple/20 relative z-20">
              {/* Planetary sketchy texture */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-[0.06] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full text-fg-primary">
                  <path d="M 0,20 Q 30,50 100,20 M 0,50 Q 50,80 100,50 M 0,80 Q 70,100 100,80" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>

              {/* Console Data Display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTech.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5 w-full"
                >
                  <span className="font-ui text-[9px] uppercase tracking-widest text-accent-blue font-bold px-2 py-0.5 rounded-full bg-accent-blue/10 border border-accent-blue/20">
                    {selectedTech.category}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-fg-primary pt-1">
                    {selectedTech.name}
                  </h3>
                  <p className="font-body text-xs text-fg-muted leading-relaxed line-clamp-3">
                    {selectedTech.desc}
                  </p>
                  <div className="flex justify-between items-center text-[10px] font-ui text-fg-muted pt-2 border-t border-white/5">
                    <div>EXP: {selectedTech.years} Yrs</div>
                    <div className="text-accent-purple font-bold">SKILL: {selectedTech.percent}%</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Mobile Version - Swipe Carousel Grid */
          <div className="flex flex-col gap-6">
            {/* Selector Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {technologies.map((tech, idx) => {
                const isSelected = selectedTech.name === tech.name;
                return (
                  <button
                    key={tech.name}
                    onClick={() => setSelectedTech(tech)}
                    className={`py-3 px-2 rounded-xl text-center font-ui text-xs border transition-all duration-200 ${
                      isSelected
                        ? "bg-accent-purple/10 border-accent-purple text-accent-purple"
                        : "bg-bg-secondary border-white/5 text-fg-muted"
                    }`}
                  >
                    {tech.name}
                  </button>
                );
              })}
            </div>

            {/* Mobile Detail Panel */}
            <div className="glass-card rounded-2xl p-6 border-white/10 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-ui text-[10px] uppercase tracking-widest text-accent-blue font-bold px-2 py-0.5 rounded bg-accent-blue/10">
                  {selectedTech.category}
                </span>
                <span className="font-ui text-xs text-fg-muted">
                  Exp: {selectedTech.years}+ Years
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-fg-primary">
                {selectedTech.name}
              </h3>
              <p className="font-body text-sm text-fg-muted leading-relaxed">
                {selectedTech.desc}
              </p>
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-ui">
                  <span className="text-fg-muted">Proficiency</span>
                  <span className="text-accent-purple font-bold">{selectedTech.percent}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent-purple rounded-full transition-all duration-500"
                    style={{ width: `${selectedTech.percent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
