// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const interestTags = [
//   "Hackathons",
//   "Problem Solving",
//   "Creative Design",
//   "Crafting",
//   "Space and Science",
//   "Volunteering",
// ];

// const stats = [
//   { label: "Projects Completed", value: 6, suffix: "+" },
//   { label: "Years Experience", value: 0.5, suffix: "+" },
//   { label: "Technologies Mastered", value: 12, suffix: "+" },
//   { label: "Certifications Earned", value: 3, suffix: "" },
// ];

// function CountUp({ value, suffix }: { value: number; suffix: string }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     const prefersReducedMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     if (prefersReducedMotion) {
//       setCount(value);
//       return;
//     }

//     let start = 0;
//     const duration = 1500;
//     const increment = value / (duration / 16); // ~60fps

//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= value) {
//         clearInterval(timer);
//         setCount(value);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);

//     return () => clearInterval(timer);
//   }, [value]);

//   return (
//     <span>
//       {count}
//       {suffix}
//     </span>
//   );
// }

// export default function About() {
//   return (
//     <section id="about" className="py-24 relative z-10 overflow-hidden">
//       <div className="container mx-auto px-4 max-w-6xl">
//         {/* Title */}
//         <div className="text-center mb-16">
//           <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-fg-primary mb-3">
//             About Myself
//           </h2>
//           <div className="w-16 h-1 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto rounded-full" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
//           {/* Left Column - Sketch Portrait Card */}
//           <div className="lg:col-span-5 flex justify-center">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//               className="w-full max-w-[340px] aspect-[4/5] notebook-paper p-6 relative flex flex-col justify-between shadow-2xl"
//             >
//               {/* Notebook Paper Details */}
//               <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-red-900/15" />
//               <div className="absolute top-6 right-6 font-ui text-[10px] tracking-widest text-fg-muted/40 uppercase">
//                 CR-0205 // SM
//               </div>

//               {/* Central sketchy galaxy frame */}
//               <div className="flex-1 border-2 border-dashed border-fg-muted/30 rounded-lg m-2 flex items-center justify-center relative overflow-hidden bg-bg-primary/40">
//                 <svg
//                   viewBox="0 0 100 100"
//                   className="w-28 h-28 text-fg-muted/40"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1"
//                 >
//                   {/* Spiral galaxy arms */}
//                   <path d="M 50,50 Q 65,45 70,30 Q 72,20 62,15 Q 48,10 40,20" strokeDasharray="1.5,1.5" />
//                   <path d="M 50,50 Q 35,55 30,70 Q 28,80 38,85 Q 52,90 60,80" strokeDasharray="1.5,1.5" />
//                   <path d="M 50,50 Q 60,38 58,25" stroke="rgba(138, 124, 255, 0.35)" strokeWidth="0.8" />
//                   <path d="M 50,50 Q 40,62 42,75" stroke="rgba(90, 160, 255, 0.35)" strokeWidth="0.8" />

//                   {/* Galaxy core glow */}
//                   <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.5" />
//                   <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />

//                   {/* Scattered stars */}
//                   <circle cx="20" cy="25" r="0.8" fill="currentColor" />
//                   <circle cx="80" cy="35" r="0.8" fill="currentColor" />
//                   <circle cx="75" cy="70" r="0.8" fill="currentColor" />
//                   <circle cx="25" cy="75" r="0.8" fill="currentColor" />
//                   <circle cx="15" cy="55" r="0.6" fill="currentColor" />
//                   <circle cx="85" cy="55" r="0.6" fill="currentColor" />

//                   {/* constellation links */}
//                   <path
//                     d="M 10,20 L 30,30 L 25,50 M 90,80 L 70,60"
//                     strokeDasharray="2,2"
//                     stroke="rgba(138, 124, 255, 0.2)"
//                   />
//                 </svg>
//               </div>

//               {/* Bottom sketch message */}
//               <div className="text-center font-ui text-xs text-fg-muted/70 tracking-wide mt-2">
//                 &quot;Sketching ideas in space, compiling them on Earth.&quot;
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Column - Biography / Info */}
//           <div className="lg:col-span-7 space-y-6">
//             <h3 className="font-ui text-lg uppercase tracking-wider text-accent-blue font-semibold">
//               Designing the Frontend, Engineering the Core
//             </h3>

//             <p className="font-body text-base text-fg-muted leading-relaxed">
//               Hello! I&apos;m Samyam, a software engineering student and frontend developer deeply passionate about creating performant, beautiful, and accessible web experiences. I love combining raw engineering details with fluid animations to build interfaces that feel premium.
//             </p>

//             <p className="font-body text-base text-fg-muted leading-relaxed">
//               Currently, I focus on building applications using modern frameworks like Next.js and TypeScript, styled with Tailwind CSS, and optimized for maximum responsiveness. I actively participate in hackathons, collaborate on open-source projects, and constantly challenge myself with complex problem solving.
//             </p>

//             {/* Interest Tags */}
//             <div className="space-y-3">
//               <h4 className="font-ui text-xs uppercase tracking-widest text-fg-primary font-bold">
//                 My Core Interests
//               </h4>
//               <div className="flex flex-wrap gap-2.5">
//                 {interestTags.map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className="font-ui text-xs px-3 py-1.5 rounded-md bg-bg-secondary border border-white/5 text-fg-muted hover:border-accent-purple/35 hover:text-fg-primary transition-all duration-300 cursor-default"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Statistics */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
//               {stats.map((stat, idx) => (
//                 <div key={idx} className="space-y-1">
//                   <div className="font-heading text-3xl font-bold text-accent-purple text-glow-purple">
//                     <CountUp value={stat.value} suffix={stat.suffix} />
//                   </div>
//                   <div className="font-ui text-[10px] uppercase tracking-widest text-fg-muted leading-tight">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const interestTags = [
  "Hackathons",
  "Problem Solving",
  "Creative Design",
  "Crafting",
  "Space and Science",
  "Volunteering",
];

const stats = [
  { label: "Projects Completed", value: 6, suffix: "+" },
  { label: "Years Experience", value: 0.5, suffix: "+" },
  { label: "Technologies Mastered", value: 12, suffix: "+" },
  { label: "Certifications Earned", value: 3, suffix: "" },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        clearInterval(timer);
        setCount(value);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-fg-primary mb-3">
            About Myself
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-accent-purple to-accent-blue mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Sketch Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[340px] aspect-[4/5] notebook-paper p-6 relative flex flex-col justify-between shadow-2xl"
            >
              {/* Notebook Paper Details */}
              <div className="absolute top-0 bottom-0 left-6 w-[1.5px] bg-red-900/15" />
              <div className="absolute top-6 right-6 font-ui text-[10px] tracking-widest text-fg-muted/40 uppercase">
                CR-0205 // SM
              </div>

              {/* Central animated planets frame */}
              <div className="flex-1 border-2 border-dashed border-fg-muted/30 rounded-lg m-2 flex items-center justify-center relative overflow-hidden bg-bg-primary/40">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  {/* Central "sun" core */}
                  <motion.div
                    className="absolute w-4 h-4 rounded-full bg-accent-purple/70"
                    style={{ boxShadow: "0 0 12px 4px rgba(138,124,255,0.5)" }}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Orbit ring 1 */}
                  <motion.div
                    className="absolute rounded-full border border-dashed border-fg-muted/25"
                    style={{ width: 70, height: 70 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      className="absolute w-2.5 h-2.5 rounded-full bg-accent-blue"
                      style={{
                        top: "-5px",
                        left: "50%",
                        marginLeft: "-5px",
                        boxShadow: "0 0 6px 2px rgba(90,160,255,0.6)",
                      }}
                    />
                  </motion.div>

                  {/* Orbit ring 2 */}
                  <motion.div
                    className="absolute rounded-full border border-dashed border-fg-muted/20"
                    style={{ width: 110, height: 110 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      className="absolute w-3 h-3 rounded-full bg-accent-purple"
                      style={{
                        top: "50%",
                        right: "-6px",
                        marginTop: "-6px",
                        boxShadow: "0 0 8px 2px rgba(138,124,255,0.6)",
                      }}
                    />
                  </motion.div>

                  {/* Orbit ring 3 (outermost, slower, small moon) */}
                  <motion.div
                    className="absolute rounded-full border border-dashed border-fg-muted/15"
                    style={{ width: 150, height: 150 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  >
                    <motion.div
                      className="absolute w-1.5 h-1.5 rounded-full bg-fg-primary/70"
                      style={{
                        bottom: "8px",
                        left: "20%",
                      }}
                    />
                  </motion.div>

                  {/* Scattered background stars */}
                  {[
                    { top: "8%", left: "15%" },
                    { top: "80%", left: "85%" },
                    { top: "15%", left: "85%" },
                    { top: "88%", left: "12%" },
                    { top: "50%", left: "5%" },
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[3px] h-[3px] rounded-full bg-fg-muted/60"
                      style={pos}
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{
                        duration: 2 + i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom sketch message */}
              <div className="text-center font-ui text-xs text-fg-muted/70 tracking-wide mt-2">
                &quot;Sketching ideas in space, compiling them on Earth.&quot;
              </div>
            </motion.div>
          </div>

          {/* Right Column - Biography / Info */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-ui text-lg uppercase tracking-wider text-accent-blue font-semibold">
              NAVIGATING THE DIGITAL UNIVERSE
            </h3>

            <p className="font-body text-base text-fg-muted leading-relaxed">
              Hello! I&apos;m Samyam, a software engineering student and frontend developer deeply passionate about creating performant, beautiful, and accessible web experiences. I love combining raw engineering details with fluid animations to build interfaces that feel premium.
            </p>

            <p className="font-body text-base text-fg-muted leading-relaxed">
              Currently, I focus on building applications using modern frameworks like Next.js and TypeScript, styled with Tailwind CSS, and optimized for maximum responsiveness. I actively participate in hackathons, collaborate on open-source projects, and constantly challenge myself with complex problem solving.
            </p>

            {/* Interest Tags */}
            <div className="space-y-3">
              <h4 className="font-ui text-xs uppercase tracking-widest text-fg-primary font-bold">
                My Core Interests
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {interestTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="font-ui text-xs px-3 py-1.5 rounded-md bg-bg-secondary border border-white/5 text-fg-muted hover:border-accent-purple/35 hover:text-fg-primary transition-all duration-300 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-heading text-3xl font-bold text-accent-purple text-glow-purple">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-ui text-[10px] uppercase tracking-widest text-fg-muted leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}