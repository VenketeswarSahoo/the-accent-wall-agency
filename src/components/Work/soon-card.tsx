"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SoonCardProps {
  dict: any;
  lang: string;
}

export default function SoonCard({ dict, lang }: SoonCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const worksPageDict = dict?.work?.worksPage || {};
  const soonText =
    worksPageDict.soon || (lang === "es" ? "PRÓXIMAMENTE" : "SOON");
  const labelText =
    worksPageDict.moreProjects ||
    (lang === "es" ? "MÁS PROYECTOS EN CURSO" : "MORE PROJECTS IN PROGRESS");
  const soonBadges = worksPageDict.soonBadges || [];

  // Positions and animation parameters for the floating badges
  const badgePlacements = [
    { className: "top-[15%] left-[8%] md:left-[12%]", delay: 0 },
    { className: "top-[20%] right-[35%] md:right-[42%]", delay: 1.5 },
    { className: "top-[28%] right-[8%] md:right-[15%]", delay: 0.8 },
    { className: "top-[40%] left-[45%] md:left-[48%]", delay: 2.2 },
    { className: "bottom-[42%] left-[10%] md:left-[18%]", delay: 1.2 },
    { className: "bottom-[28%] left-[25%] md:left-[30%]", delay: 0.4 },
    { className: "bottom-[35%] right-[20%] md:right-[25%]", delay: 1.9 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[320px] md:h-[580px] bg-[#070707]/90 border border-white/5 overflow-hidden flex flex-col items-center justify-center group cursor-crosshair"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "45px 45px",
        backgroundPosition: "center",
      }}
    >
      {/* Cursor Spotlight Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, color-mix(in srgb, var(--primary) 6%, transparent) 0%, transparent 80%)`,
        }}
      />
      {/* Background golden center radial ambient glow */}
      <div
        className="absolute w-[60%] h-[60%] rounded-full opacity-[0.03] blur-[120px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 80%)",
        }}
      />

      {/* Floating Badges */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {soonBadges.map((badgeText: string, idx: number) => {
          const placement = badgePlacements[idx % badgePlacements.length];
          return (
            <motion.div
              key={idx}
              className={cn(
                "absolute px-3.5 py-1.5 rounded-full border border-white/5 bg-[#121212]/50 text-[0.55rem] md:text-[0.625rem] font-bold tracking-widest text-white/35 uppercase select-none shadow-sm transition-all duration-500 ease-out",
                placement.className,
              )}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: placement.delay,
              }}
            >
              {badgeText}
            </motion.div>
          );
        })}
      </div>

      {/* Huge center background text */}
      <h2
        className="text-[14vw] md:text-[16rem] font-bold tracking-tighter text-[#131313] transition-all duration-700 select-none uppercase font-haffer relative z-0 group-hover:text-[#181818]"
        style={{
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.005)",
        }}
      >
        {soonText}
      </h2>

      {/* More projects indicator at bottom-left */}
      <div className="absolute bottom-6 left-6 md:left-8 z-20 flex items-center gap-2 pointer-events-none select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        <span className="text-[0.55rem] md:text-[0.6rem] font-bold tracking-widest text-white/40 uppercase">
          {labelText}
        </span>
      </div>
    </div>
  );
}
