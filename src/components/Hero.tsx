"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowDown } from "lucide-react";

export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 200, mass: 1 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers
  const moonX = useTransform(cursorXSpring, [-300, 300], [-15, 15]);
  const moonY = useTransform(cursorYSpring, [-300, 300], [-15, 15]);

  const saturnX = useTransform(cursorXSpring, [-300, 300], [-30, 30]);
  const saturnY = useTransform(cursorYSpring, [-300, 300], [-30, 30]);

  const rocketX = useTransform(cursorXSpring, [-300, 300], [20, -20]);
  const rocketY = useTransform(cursorYSpring, [-300, 300], [20, -20]);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const nameLetters = "SAMYAM".split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 120, damping: 10 },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden z-10"
    >
      {/* Background radial gradient nebula */}
      <div className="absolute top-1/4 right-1/4 w-[35rem] h-[35rem] nebula-glow rounded-full -z-10" />

      {/* Main Grid */}
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/35"
          >
            <span className="w-1.5 h-1.5 bg-accent-purple rounded-full animate-pulse" />
            <span className="font-ui text-[10px] tracking-widest text-accent-purple uppercase font-semibold">
              WELCOME TO MY UNIVERSE
            </span>
          </motion.div>

          <div className="space-y-2">
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-fg-primary leading-tight">
              Hello, I&apos;m{" "}
              <motion.span
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex flex-row text-glow-purple text-accent-purple font-serif"
              >
                {nameLetters.map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </h1>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="font-ui text-md sm:text-xl md:text-2xl text-accent-blue tracking-wide font-medium"
            >
              Software Engineering Student & Frontend Developer
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="font-body text-base sm:text-lg text-fg-muted max-w-xl leading-relaxed"
          >
            I design and build modern web experiences with clean architecture, interactive interfaces, and thoughtful user experiences. Currently exploring the intersection of creative frontends and engineering robustness.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full font-ui text-xs tracking-widest uppercase font-semibold bg-accent-purple text-bg-primary hover:bg-accent-purple/90 transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(138,124,255,0.4)]"
            >
              Explore My Work
            </a>
            <a
              href="/My_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-ui text-xs tracking-widest uppercase font-semibold border border-fg-muted/30 hover:border-accent-blue hover:text-accent-blue transition-all duration-300 hover:scale-[1.03] bg-bg-secondary/40"
            >
              Download Resume
            </a>
          </motion.div>

          {/* Quick Contact / Social info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 w-full max-w-xl text-sm font-ui text-fg-muted"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-purple" />
              <span>Lalitpur, Nepal</span>
            </div>
            <a
              href="mailto:[EMAIL_ADDRESS]"
              className="flex items-center gap-2 hover:text-accent-blue transition-colors duration-200"
            >
              <Mail className="w-4 h-4 text-accent-blue" />
              <span>samyam00349@gmail.com</span>
            </a>
            <div className="flex gap-4">
              <a
                href="https://github.com/samyamx"
                target="_blank"
                className="hover:text-accent-purple transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/samyam-shrestha-940b413a3/"
                target="_blank"
                className="hover:text-accent-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Hand-drawn Sketch Universe */}
        <div className="lg:col-span-5 flex items-center justify-center relative min-h-[400px]">
          <motion.div
            style={{
              x: reducedMotion ? 0 : moonX,
              y: reducedMotion ? 0 : moonY,
            }}
            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
          >
            {/* Constellation line connections in background */}
            <svg
              className="absolute inset-0 w-full h-full text-fg-muted/10 pointer-events-none"
              viewBox="0 0 400 400"
            >
              <line x1="80" y1="80" x2="200" y2="200" className="constellation-svg" stroke="currentColor" strokeWidth="1" />
              <line x1="200" y1="200" x2="320" y2="120" className="constellation-svg" stroke="currentColor" strokeWidth="1" />
              <line x1="320" y1="120" x2="350" y2="280" className="constellation-svg" stroke="currentColor" strokeWidth="1" />
              <line x1="200" y1="200" x2="150" y2="340" className="constellation-svg" stroke="currentColor" strokeWidth="1" />
              <line x1="80" y1="80" x2="50" y2="220" className="constellation-svg" stroke="currentColor" strokeWidth="1" />

              <circle cx="80" cy="80" r="3" fill="#8A7CFF" />
              <circle cx="320" cy="120" r="3" fill="#5CAEFF" />
              <circle cx="350" cy="280" r="2.5" fill="#F5F7FF" />
              <circle cx="150" cy="340" r="3" fill="#8A7CFF" />
              <circle cx="50" cy="220" r="2" fill="#F5F7FF" />
            </svg>

            {/* Orbit rings */}
            <div className="absolute w-[95%] h-[95%] border border-dashed border-fg-muted/15 rounded-full animate-[spin_55s_linear_infinite]" />
            <div className="absolute w-[75%] h-[75%] border border-dashed border-accent-purple/10 rounded-full animate-[spin_40s_linear_infinite] reverse" />

            {/* Central Moon - Hand-drawn Sketch */}
            <motion.div className="w-48 h-48 rounded-full relative z-10 flex items-center justify-center cursor-pointer">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-fg-primary drop-shadow-[0_0_15px_rgba(245,247,255,0.15)]"
              >
                {/* Moon base outline with wavy sketch lines */}
                <path
                  d="M 50,2 A 48,48 0 1,0 98,50 A 48,48 0 0,0 50,2 Z"
                  fill="#0E1322"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="300"
                  className="animate-[dash_6s_linear_infinite]"
                />
                <path
                  d="M 51,4 C 64,5 77,11 86,21 C 95,31 99,45 97,59"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                {/* Craters - sketchy details */}
                <path d="M 28,30 C 26,30 25,32 26,34 C 27,36 30,36 31,34 C 32,32 30,30 28,30 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <path d="M 25,34 C 23,35 24,37 26,37" fill="none" stroke="currentColor" strokeWidth="0.5" />

                <path d="M 65,22 C 62,22 60,25 61,28 C 62,31 66,32 68,30 C 70,28 69,25 67,23" fill="none" stroke="currentColor" strokeWidth="0.8" />

                <path d="M 40,65 C 36,65 33,68 34,72 C 35,76 40,77 43,75 C 46,73 45,68 42,66" fill="none" stroke="currentColor" strokeWidth="0.9" />
                <path d="M 37,70 C 37,72 39,73 41,72" fill="none" stroke="currentColor" strokeWidth="0.5" />

                <path d="M 72,58 C 70,58 68,60 69,62 C 70,64 73,64 74,62 M 71,60 L 73,62" fill="none" stroke="currentColor" strokeWidth="0.8" />

                {/* Shading sketch lines (hatching) */}
                <path d="M 12,50 L 18,50 M 15,42 L 20,44 M 16,58 L 22,56 M 22,70 L 26,67 M 32,80 L 35,76 M 45,88 L 47,83 M 58,88 L 57,83 M 70,82 L 67,78 M 80,72 L 76,68 M 88,58 L 83,56" fill="none" stroke="rgba(245, 247, 255, 0.45)" strokeWidth="0.75" />
              </svg>
            </motion.div>

            {/* Orbiting Saturn Sketch */}
            <motion.div
              style={{
                x: reducedMotion ? 90 : saturnX,
                y: reducedMotion ? -90 : saturnY,
              }}
              className="absolute top-10 right-4 w-16 h-16 z-20"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-accent-blue">
                {/* Saturn Ring */}
                <ellipse cx="50" cy="50" rx="42" ry="12" transform="rotate(-18 50 50)" fill="none" stroke="currentColor" strokeWidth="1" />
                {/* Planet Body */}
                <circle cx="50" cy="50" r="22" fill="#0E1322" stroke="currentColor" strokeWidth="1.2" />
                {/* Saturn Ring Overlay (to create depth) */}
                <path d="M 13,38 C 22,46 36,50 50,50 C 64,50 78,46 87,38" fill="none" stroke="currentColor" strokeWidth="1" />
                {/* Sketch stripes */}
                <path d="M 32,46 C 40,51 55,51 68,46" fill="none" stroke="rgba(92, 174, 255, 0.4)" strokeWidth="0.8" />
              </svg>
            </motion.div>

            {/* Orbiting Rocket Sketch */}
            <motion.div
              style={{
                x: reducedMotion ? -110 : rocketX,
                y: reducedMotion ? 100 : rocketY,
              }}
              className="absolute bottom-8 left-6 w-14 h-14 z-20 animate-float"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-accent-purple">
                {/* Rocket Body */}
                <path d="M 50,15 C 60,35 60,65 58,75 L 42,75 C 40,65 40,35 50,15 Z" fill="#0E1322" stroke="currentColor" strokeWidth="1.2" />
                {/* Nose Cone */}
                <path d="M 50,15 C 53,22 56,30 56,35 L 44,35 C 44,30 47,22 50,15 Z" fill="currentColor" opacity="0.3" />
                {/* Fins */}
                <path d="M 42,65 L 30,78 L 42,75 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M 58,65 L 70,78 L 58,75 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
                {/* Window */}
                <circle cx="50" cy="48" r="5" fill="#0E1322" stroke="currentColor" strokeWidth="1" />
                {/* Exhaust flame */}
                <path d="M 46,78 L 50,92 L 54,78 Z" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3,2" />
              </svg>
            </motion.div>

            {/* Satellite Sketch */}
            <motion.div className="absolute top-1/2 -right-8 w-12 h-12 z-0 animate-[spin_45s_linear_infinite]">
              <svg viewBox="0 0 100 100" className="w-full h-full text-fg-muted">
                {/* Center body */}
                <rect x="42" y="42" width="16" height="16" rx="2" fill="#0E1322" stroke="currentColor" strokeWidth="1" />
                {/* Solar panels */}
                <rect x="10" y="46" width="28" height="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <line x1="24" y1="46" x2="24" y2="54" stroke="currentColor" strokeWidth="0.5" />
                <rect x="62" y="46" width="28" height="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <line x1="76" y1="46" x2="76" y2="54" stroke="currentColor" strokeWidth="0.5" />
                {/* Dish */}
                <path d="M 50,42 L 50,28 M 42,28 C 45,32 55,32 58,28" fill="none" stroke="currentColor" strokeWidth="0.8" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <span className="font-ui text-[10px] tracking-widest uppercase text-fg-muted">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-accent-purple" />
        </motion.div>
      </div>
    </section>
  );
}
