"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      twinkleDir: number;
    }> = [];

    let shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
      angle: number;
    }> = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Density-based star count
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      stars = [];

      for (let i = 0; i < Math.min(starCount, 300); i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          speed: Math.random() * 0.005 + 0.002,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const spawnShootingStar = () => {
      if (prefersReducedMotion || Math.random() > 0.15) return;
      
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        opacity: 1,
        angle: Math.PI / 6 + Math.random() * (Math.PI / 12), // roughly 30-45 degrees downwards
      });
    };

    // Spawn check interval
    let shootingStarInterval: NodeJS.Timeout;
    if (!prefersReducedMotion) {
      shootingStarInterval = setInterval(spawnShootingStar, 8000);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Starfield Drawing
      stars.forEach((star) => {
        if (!prefersReducedMotion) {
          // Adjust opacity for twinkling
          star.opacity += star.speed * star.twinkleDir;
          if (star.opacity > 1) {
            star.opacity = 1;
            star.twinkleDir = -1;
          } else if (star.opacity < 0.1) {
            star.opacity = 0.1;
            star.twinkleDir = 1;
          }
        }

        ctx.fillStyle = `rgba(245, 247, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Shooting Stars Drawing & Update
      if (!prefersReducedMotion) {
        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const ss = shootingStars[i];
          ctx.strokeStyle = `rgba(138, 124, 255, ${ss.opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(
            ss.x + Math.cos(ss.angle) * ss.length,
            ss.y + Math.sin(ss.angle) * ss.length
          );
          ctx.stroke();

          // Move
          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;
          ss.opacity -= 0.015;

          if (ss.opacity <= 0 || ss.x > canvas.width || ss.y > canvas.height) {
            shootingStars.splice(i, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (shootingStarInterval) {
        clearInterval(shootingStarInterval);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
