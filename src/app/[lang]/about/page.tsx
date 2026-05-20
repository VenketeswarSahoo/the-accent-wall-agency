import React from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";
import Mandala from "@/components/ui/mandala";
import Section from "@/components/ui/section";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const isEs = lang === "es";
  return {
    title: isEs
      ? "Sobre Nosotros | The Accent Wall Agency"
      : "About Us | The Accent Wall Agency",
    description: isEs
      ? "Somos un estudio especializado que fusiona geometría sagrada, IA espacial avanzada y pintura mural a mano."
      : "We are a specialized studio fusing sacred geometry, advanced spatial AI, and bespoke hand-painted mural artistry.",
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);
  const aboutPageDict = dict.aboutPage || {};

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden flex flex-col">
      {/* Hero Viewport Container */}
      <div className="relative min-h-screen lg:h-screen lg:min-h-[700px] w-full flex flex-col justify-between pt-20 lg:pt-24 overflow-hidden bg-black">
        {/* Background Radial Glow */}
        <div
          className="absolute top-[-25%] left-[-15%] w-[80%] h-[80%] rounded-full opacity-[0.12] blur-[160px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 80%)",
          }}
        />

        {/* Decorative Rotating Sacred Geometry Mandalas - bounded to the Hero first fold */}
        <Mandala
          variant="mandala-2"
          className="absolute top-[-15%] right-[-15%] w-[75vw] h-[75vw] max-w-[800px] max-h-[800px] text-primary/20 pointer-events-none mix-blend-screen select-none z-0"
          speed={320}
        />
        <Mandala
          variant="mandala-1"
          className="absolute bottom-[8%] left-[-10%] w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] text-primary/18 pointer-events-none mix-blend-screen select-none z-0"
          speed={280}
          reverse
        />

        {/* Main Hero Content */}
        <Section
          py=""
          className="flex-1 flex flex-col justify-end pb-6 lg:pb-10 z-10 w-full"
        >
          <div className="w-full flex flex-col gap-6 md:gap-8">
            {/* Subtitle / Uppercase Label */}
            <div className="flex flex-col gap-2">
              <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase">
                {aboutPageDict.subtitle}
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.1] lg:leading-[1] xl:leading-[0.9] tracking-tight">
                <span className="block">{aboutPageDict.titleLine1}</span>
                <span className="block text-primary">
                  {aboutPageDict.titleLine2}
                </span>
              </h1>
            </div>

            {/* Description & Stats Pill Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-6 lg:gap-12 mt-2">
              {/* Left: Description */}
              <div className="lg:col-span-6 xl:col-span-5">
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-[540px]">
                  {aboutPageDict.description}
                </p>
              </div>

              {/* Right: Modern Stat Pills */}
              <div className="lg:col-span-6 xl:col-span-7 flex flex-wrap gap-3 lg:justify-end items-center">
                {/* Stat 1 */}
                <div className="flex items-center gap-2 border border-white/10 rounded-full py-2 px-5 bg-white/5 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-primary/30">
                  <span className="text-sm md:text-base font-medium text-white">
                    {aboutPageDict.projects}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                    {aboutPageDict.projectsLabel}
                  </span>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-2 border border-white/10 rounded-full py-2 px-5 bg-white/5 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-primary/30">
                  <span className="text-sm md:text-base font-medium text-white">
                    {aboutPageDict.delivery}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                    {aboutPageDict.deliveryLabel}
                  </span>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center gap-2 border border-white/10 rounded-full py-2 px-5 bg-white/5 backdrop-blur-sm shadow-md transition-all duration-300 hover:border-primary/30">
                  <span className="text-sm md:text-base font-medium text-white">
                    {aboutPageDict.faster}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                    {aboutPageDict.fasterLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Tech Stack Bar (Repeated exactly as home page) */}
        <div className="relative w-full z-10 border-y border-white/20 py-4">
          <p className="text-muted-foreground max-w-[1440px] mx-auto px-6 lg:px-12 2xl:px-0 uppercase text-sm text-center lg:text-left leading-relaxed">
            {dict.techStack}
          </p>
        </div>
      </div>

      {/* Manifesto Section */}
      <Section
        py="py-24 lg:py-36"
        className="relative z-10 w-full border-t border-white/5 bg-[#030303]/40 backdrop-blur-[2px]"
      >
        {/* Background radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full opacity-[0.05] blur-[120px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 80%)",
          }}
        />

        <div className="w-full flex flex-col gap-6 md:gap-8 relative z-10">
          {/* Subtitle */}
          <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest">
            {aboutPageDict.manifesto?.subtitle}
          </span>

          {/* Manifesto Text Block */}
          <p className="text-xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-normal leading-[1.4] md:leading-[1.35] tracking-tight max-w-5xl text-muted-foreground">
            {aboutPageDict.manifesto?.p1}
            <span className="font-semibold text-white">
              {aboutPageDict.manifesto?.faster}
            </span>
            {aboutPageDict.manifesto?.p2}
            <span className="font-semibold text-white">
              {aboutPageDict.manifesto?.better}
            </span>
            {aboutPageDict.manifesto?.p3}
            <span className="font-semibold text-white">
              {aboutPageDict.manifesto?.craft}
            </span>
            {aboutPageDict.manifesto?.p4}
            <span className="font-semibold text-white">
              {aboutPageDict.manifesto?.vision}
            </span>
            {aboutPageDict.manifesto?.p5}
            <span className="font-semibold text-white">
              {aboutPageDict.manifesto?.space}
            </span>
          </p>
        </div>
      </Section>

      {/* How We Work Section */}
      <Section
        py="py-24 lg:py-36"
        className="relative z-10 w-full border-t border-white/5 bg-black"
      >
        <div className="w-full flex flex-col gap-10 md:gap-16">
          {/* Subtitle */}
          <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase">
            {aboutPageDict.howWeWork?.subtitle}
          </span>

          {/* Grid container with card divider borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 bg-[#070707]/30 overflow-hidden">
            {aboutPageDict.howWeWork?.cards?.map((card: any, index: number) => {
              const borderClasses =
                index === 0
                  ? "border-b md:border-r border-white/10"
                  : index === 1
                    ? "border-b border-white/10"
                    : index === 2
                      ? "border-b md:border-b-0 md:border-r border-white/10"
                      : ""; // index 3

              return (
                <div
                  key={index}
                  className={`relative py-12 px-8 md:py-16 md:px-12 flex flex-col gap-6 group overflow-hidden transition-colors duration-300 hover:bg-white/[0.01] ${borderClasses}`}
                >
                  {/* Giant background Roman Numeral */}
                  <span className="text-[7rem] md:text-[9rem] font-bold text-white/[0.02] select-none pointer-events-none absolute right-6 top-4 group-hover:text-primary/[0.03] transition-colors duration-500 font-serif">
                    {card.bgNum}
                  </span>

                  {/* Top-left small Roman Numeral Indicator */}
                  <span className="text-xs font-bold text-primary tracking-widest">
                    {card.num}
                  </span>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-3 relative z-10 mt-auto">
                    <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Stats Grid Section */}
      <Section
        py="py-16 lg:py-32 mb-24"
        className="relative z-10 w-full border-t border-white/5 bg-black"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#070707]/30 overflow-hidden">
          {aboutPageDict.stats?.map((stat: any, index: number) => {
            const borderClasses =
              index === 0
                ? "border-r border-b lg:border-b-0 border-white/10"
                : index === 1
                  ? "border-b lg:border-b-0 lg:border-r border-white/10"
                  : index === 2
                    ? "border-r border-white/10"
                    : ""; // index 3

            return (
              <div
                key={index}
                className={`py-12 px-6 md:py-16 md:px-10 flex flex-col gap-3 text-center lg:text-left justify-center ${borderClasses}`}
              >
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider leading-relaxed">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
