import React from "react";
import { notFound } from "next/navigation";
import HomeClient from "@/app/[lang]/home-client";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";
import ArrowLink from "@/components/ui/arrow-link";

interface PageProps {
  params: Promise<{ lang: string }>;
}

import Section from "../ui/section";

const MandalaTopLeft = () => {
  const circles = [
    30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390
  ];
  const starPoints = 24;
  const outerPetals = 36;
  const flowerOfLifeCount = 18;

  return (
    <svg
      viewBox="0 0 800 800"
      className="absolute top-[-25%] left-[-20%] w-[85vw] h-[85vw] max-w-[1000px] max-h-[1000px] text-primary/35 pointer-events-none mix-blend-screen select-none z-0"
      style={{ animation: "spin 300s linear infinite" }}
    >
      <defs>
        <radialGradient id="mandala-grad-1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(400, 400)">
        {/* Glow behind */}
        <circle r="380" fill="url(#mandala-grad-1)" />

        {/* Dense Concentric Rings with intricate dash arrays */}
        {circles.map((r, idx) => (
          <circle
            key={`c-${idx}`}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={idx % 4 === 0 ? "1.5" : "0.5"}
            strokeDasharray={
              idx % 2 === 0 ? "1 3" : idx % 3 === 0 ? "4 4 1 4" : undefined
            }
            opacity={0.3 + (1 - r / 400) * 0.6}
          />
        ))}

        {/* Complex 24-point star overlapping */}
        {Array.from({ length: starPoints }).map((_, idx) => {
          const angle = (idx * 360) / starPoints;
          return (
            <g key={`star-${idx}`} transform={`rotate(${angle})`}>
              <polygon
                points="0,-360 -45,-180 0,-90 45,-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                opacity="0.2"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-380"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.2"
                strokeDasharray="2 6"
              />
            </g>
          );
        })}

        {/* Intricate Overlapping Petals */}
        {Array.from({ length: outerPetals }).map((_, idx) => {
          const angle = (idx * 360) / outerPetals;
          return (
            <path
              key={`petal-${idx}`}
              d="M0 -150 C-40 -250, -40 -350, 0 -380 C40 -350, 40 -250, 0 -150"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.15"
              transform={`rotate(${angle})`}
            />
          );
        })}

        {/* Complex Flower of Life / Seed patterns */}
        {Array.from({ length: flowerOfLifeCount }).map((_, idx) => {
          const angle = (idx * 360) / flowerOfLifeCount;
          const distance = 120;
          return (
            <circle
              key={`fol-${idx}`}
              cx={distance * Math.cos((angle * Math.PI) / 180)}
              cy={distance * Math.sin((angle * Math.PI) / 180)}
              r="120"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.15"
            />
          );
        })}

        {/* Center detailed mandala node */}
        {Array.from({ length: 12 }).map((_, idx) => {
          const angle = (idx * 360) / 12;
          return (
            <path
              key={`center-node-${idx}`}
              d="M0 0 L-15 -45 L0 -90 L15 -45 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>
    </svg>
  );
};

const MandalaBottomRight = () => {
  const circles = [
    30, 60, 90, 120, 150, 180, 210, 240, 270
  ];
  const ellipses = 36;
  const outerStars = 8;
  const spiralArms = 12;

  return (
    <svg
      viewBox="0 0 600 600"
      className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] text-primary/30 pointer-events-none mix-blend-screen select-none z-0"
      style={{ animation: "spin 250s linear infinite reverse" }}
    >
      <defs>
        <radialGradient id="mandala-grad-2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="translate(300, 300)">
        {/* Glow behind */}
        <circle r="280" fill="url(#mandala-grad-2)" />

        {/* Concentric Rings with varied styles */}
        {circles.map((r, idx) => (
          <circle
            key={`c2-${idx}`}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={idx % 2 === 0 ? "1" : "0.5"}
            strokeDasharray={
              idx % 3 === 0 ? "3 6" : idx % 4 === 0 ? "1 4" : undefined
            }
            opacity={0.2 + (1 - r / 300) * 0.5}
          />
        ))}

        {/* Toroidal Field (Overlapping Ellipses) */}
        {Array.from({ length: ellipses }).map((_, idx) => {
          const angle = (idx * 360) / ellipses;
          return (
            <ellipse
              key={`ell-${idx}`}
              cx="0"
              cy="0"
              rx="240"
              ry="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.15"
              transform={`rotate(${angle})`}
            />
          );
        })}

        {/* Nested Octagrams (Sacred Geometry) */}
        {Array.from({ length: outerStars }).map((_, idx) => {
          const angle = (idx * 45) / 2; // Offset rotation
          return (
            <g key={`oct-${idx}`} transform={`rotate(${angle})`}>
              <polygon
                points="0,-260 50,-100 260,0 50,100 0,260 -50,100 -260,0 -50,-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.15"
              />
            </g>
          );
        })}

        {/* Inner Spiral / Vortex arcs */}
        {Array.from({ length: spiralArms }).map((_, idx) => {
          const angle = (idx * 360) / spiralArms;
          return (
            <path
              key={`spiral-${idx}`}
              d="M0 0 C50 -50, 150 -50, 200 -200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.25"
              transform={`rotate(${angle})`}
            />
          );
        })}
        
        {/* Core detailed node */}
        <circle r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        <circle r="5" fill="currentColor" opacity="0.8" />
      </g>
    </svg>
  );
};

export default async function Hero({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute top-[-25%] left-[-15%] w-[80%] h-[80%] rounded-full opacity-[0.1] blur-[160px] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 80%)",
        }}
      />

      {/* Decorative Rotating Sacred Geometry Mandalas */}
      <MandalaTopLeft />
      <MandalaBottomRight />

      {/* Pass dictionary and current lang to the client component */}
      <HomeClient dict={dict} lang={lang} />

      <Section
        py=""
        className="min-h-[calc(100svh-120px)] lg:min-h-[calc(100vh-200px)] flex flex-col justify-end lg:block pb-16 lg:pb-0"
      >
        <div className="relative lg:absolute lg:bottom-12 xl:bottom-16 w-full lg:w-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 lg:gap-0">
            <div className="lg:col-span-7 xl:col-span-7">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.1] lg:leading-[1] xl:leading-[0.9] tracking-tight">
                  <span className="block">{dict.firstLine}</span>
                  <span className="block text-primary">{dict.secondLine}</span>
                </h1>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8 lg:gap-10">
              <div className="flex flex-col gap-6 lg:gap-8">
                <p className="text-base lg:text-lg text-white/40 max-w-[1440px]">
                  {dict.description}
                </p>

                <ArrowLink href="#">{dict.shipProduct}</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <div className="relative lg:absolute bottom-0 w-full z-10">
        <div className="border-y border-white/20 py-4 w-full">
          <p className="text-white/40 max-w-[1440px] mx-auto px-6 lg:px-12 2xl:px-0 uppercase text-sm text-center lg:text-left leading-relaxed">
            {dict.techStack}
          </p>
        </div>
      </div>
    </main>
  );
}
