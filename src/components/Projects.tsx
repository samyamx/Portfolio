"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  category: "Frontend" | "Full Stack" | "UI Design";
  desc: string;
  techs: string[];
  github: string;
  live: string;
  image: string;
}

const projectsData: Project[] = [
  {
    title: "Aetheria Space Dashboard",
    category: "Frontend",
    desc: "Interactive telemetry dashboard using NASA API. Displays real-time Martian weather logs, near-Earth orbit trajectories, and high-resolution celestial image indexing.",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts"],
    github: "https://github.com",
    live: "https://example.com",
    image: "🪐",
  },
  {
    title: "Chronos Task Planner",
    category: "Full Stack",
    desc: "Linear.app-inspired project tracking board featuring ultra-fast keyboard command menus, socket synchronization, and robust subtask hierarchy trees.",
    techs: ["React", "Express", "MongoDB", "Tailwind CSS", "Socket.io"],
    github: "https://github.com",
    live: "https://example.com",
    image: "🕒",
  },
  {
    title: "Lunaris UI Design System",
    category: "UI Design",
    desc: "Cosmic-themed web UI kit incorporating hand-drawn pencil outline treatments with modern glassmorphic accents. Documented thoroughly inside active Storybook previews.",
    techs: ["Figma", "React", "Tailwind CSS", "Storybook", "NPM"],
    github: "https://github.com",
    live: "https://example.com",
    image: "🎨",
  },
  {
    title: "Helix Code Playpen",
    category: "Frontend",
    desc: "Interactive playground with real-time AST node highlighting, live code lint analysis, and custom dark mode themes configured dynamically.",
    techs: ["React", "TypeScript", "WebAssembly", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
    image: "🧬",
  },
];

const categories = ["All", "Frontend", "Full Stack", "UI Design"];

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Cap rotation at 8 degrees
    const rX = -(mouseY / (height / 2)) * 8;
    const rY = (mouseX / (width / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between h-full group"
    >
      <div>
        {/* Card Header Illustration Placeholder */}
        <div className="h-44 bg-bg-primary border-b border-white/5 relative flex items-center justify-center text-5xl overflow-hidden">
          {/* Sketch details background */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
            {project.image}
          </span>
          <div className="absolute top-3 right-3 font-ui text-[9px] uppercase tracking-widest text-accent-blue px-2 py-0.5 rounded bg-accent-blue/10 border border-accent-blue/20">
            {project.category}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-3">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-fg-primary group-hover:text-accent-purple transition-colors duration-200">
            {project.title}
          </h3>
          <p className="font-body text-sm text-fg-muted leading-relaxed line-clamp-3">
            {project.desc}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-0 space-y-4">
        {/* Technologies tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techs.map((tech) => (
            <span
              key={tech}
              className="font-ui text-[9px] px-2 py-0.5 rounded bg-white/5 text-fg-muted border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex justify-between items-center pt-2 border-t border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-ui text-xs text-fg-muted hover:text-accent-purple transition-colors duration-200"
          >
            <Github className="w-4 h-4" />
            <span>Repository</span>
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-ui text-xs text-accent-blue hover:text-accent-blue/80 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = projectsData.filter(
    (proj) => activeCategory === "All" || proj.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-fg-primary mb-3">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto rounded-full" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-ui text-xs uppercase tracking-wider font-semibold border transition-all duration-300 ${
                  isActive
                    ? "bg-accent-purple border-accent-purple text-bg-primary shadow-[0_0_15px_rgba(138,124,255,0.3)]"
                    : "bg-bg-secondary border-white/5 text-fg-muted hover:border-white/10 hover:text-fg-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
