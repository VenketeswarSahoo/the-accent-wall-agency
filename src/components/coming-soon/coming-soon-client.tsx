"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import { Dictionary } from "@/app/[lang]/dictionaries";

interface ComingSoonClientProps {
  dict: Dictionary;
  lang: string;
}

export default function ComingSoonClient({ dict, lang }: ComingSoonClientProps) {
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
  const soonText = worksPageDict.soon || (lang === "es" ? "PRÓXIMAMENTE" : "SOON");
  const labelText = worksPageDict.moreProjects || (lang === "es" ? "MÁS PROYECTOS EN CURSO" : "MORE PROJECTS IN PROGRESS");
  const soonBadges = worksPageDict.soonBadges || [];

  // Immersive floating badge layout placements for the full-screen landing
  const badgePlacements = [
    { className: "top-[18%] left-[8%] md:left-[15%]", delay: 0 },
    { className: "top-[22%] right-[30%] md:right-[40%]", delay: 1.5 },
    { className: "top-[30%] right-[10%] md:right-[18%]", delay: 0.8 },
    { className: "top-[45%] left-[42%] md:left-[47%]", delay: 2.2 },
    { className: "bottom-[38%] left-[12%] md:left-[20%]", delay: 1.2 },
    { className: "bottom-[25%] left-[28%] md:left-[35%]", delay: 0.4 },
    { className: "bottom-[32%] right-[18%] md:right-[26%]", delay: 1.9 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center group cursor-crosshair"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: "center",
      }}
    >


      {/* Cursor Spotlight Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, color-mix(in srgb, var(--primary) 7%, transparent) 0%, transparent 80%)`,
        }}
      />
      {/* Background golden center radial ambient glow */}
      <div
        className="absolute w-[70%] h-[70%] rounded-full opacity-[0.035] blur-[150px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, transparent 80%)",
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
                "absolute px-4 py-2 rounded-full border border-white/5 bg-[#121212]/50 text-[0.6rem] md:text-[0.65rem] font-bold tracking-widest text-white/35 uppercase select-none shadow-sm transition-all duration-500 ease-out",
                placement.className
              )}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 6,
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
      <h1
        className="text-[16vw] md:text-[22rem] font-bold tracking-tighter text-[#131313] transition-all duration-700 select-none uppercase font-haffer relative z-0 group-hover:text-[#181818]"
        style={{
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.005)",
        }}
      >
        {soonText}
      </h1>

      {/* More projects indicator at bottom-left corner */}
      <div className="absolute bottom-8 left-8 md:left-12 z-20 flex items-center gap-2 pointer-events-none select-none">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
        </span>
        <span className="text-[0.6rem] md:text-[0.65rem] font-bold tracking-widest text-white/40 uppercase">
          {labelText}
        </span>
      </div>
    </div>
  );
}
