import React from "react";
import { NumberTicker } from "../ui/number-ticker";

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
  const highlightWord = headline.includes("Generative AI") ? "Generative AI" : "IA Generativa";
  const parts = headline.split(highlightWord);

  return (
    <Section id="about" py="pb-16 lg:pb-32">
      <span className="text-sm uppercase font-medium text-muted-foreground pb-4 mb-16 block border-b border-white/10 pt-8">
        {dict?.about?.title}
      </span>

      <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white max-w-[62rem] mb-24 lg:mb-32">
        {parts[0]}
        <span className="text-primary italic">{highlightWord}</span>
        {parts[1]}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
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
