import React from "react";
import { NumberTicker } from "../ui/number-ticker";
import Mandala from "../ui/mandala";

interface StatItem {
  value1: number;
  value2?: number;
  text: string;
  label: string;
  description: string;
}

import Section from "../ui/section";

interface AboutSectionProps {
  dict: any;
}

const AboutSection = ({ dict }: AboutSectionProps) => {
  const stats: StatItem[] = dict?.about?.stats || [];
  const headline = dict?.about?.headline || "";
  const highlightWord = headline.includes("Generative AI")
    ? "Generative AI"
    : "IA Generativa";
  const parts = headline.split(highlightWord);

  return (
    <Section
      id="about"
      py="pb-16 lg:pb-32"
      className="relative overflow-hidden"
    >
      <span className="text-sm uppercase font-medium text-muted-foreground pb-4 block border-b border-white/10 pt-8 relative z-10">
        {dict?.about?.title}
      </span>

      <Mandala
        variant="mandala-2"
        className="absolute top-[10%] right-[-15%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] text-primary/25 pointer-events-none select-none z-0"
        speed={500}
      />

      <h2 className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-medium text-white max-w-[62rem] mb-24 lg:mb-32 leading-tight">
        {parts[0]}
        <span className="text-primary italic">{highlightWord}</span>
        {parts[1]}
      </h2>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col gap-6">
            <div className="flex items-baseline text-6xl lg:text-8xl font-black text-primary tracking-tighter">
              <NumberTicker value={stat.value1} className="text-inherit" />
              {stat.value2 && (
                <>
                  <span className="mr-3">-</span>
                  <NumberTicker value={stat.value2} className="text-inherit" />
                </>
              )}
              <span>{stat.text}</span>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium text-white">{stat.label}</h3>
              <p className="text-muted-foreground text-md max-w-sm">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
