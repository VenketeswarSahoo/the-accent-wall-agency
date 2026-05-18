import React from "react";
import Section from "../ui/section";

interface ProcessSectionProps {
  dict: any;
}

const ProcessSection = ({ dict }: ProcessSectionProps) => {
  const processes = dict?.process?.list || [];
  const headline = dict?.process?.headline || "";
  const highlightWord = headline.includes("in weeks.") ? "in weeks." : "en semanas.";
  const parts = headline.split(highlightWord);

  return (
    <Section id="process" py="py-16 lg:py-40">
      <div className="flex flex-col gap-12 lg:gap-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-white/10 pb-12 gap-8">
          <div className="flex flex-col gap-4 lg:gap-6">
            <span className="text-xs lg:text-sm font-medium text-muted-foreground uppercase tracking-widest">
              {dict?.process?.title}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter max-w-4xl leading-[1.1]">
              {parts[0]}
              <span className="text-primary">{highlightWord}</span>
              {parts[1]}
            </h2>
          </div>
          <p className="max-w-[22rem] text-muted-foreground text-sm lg:text-base lg:text-right leading-relaxed">
            {dict?.process?.description}
          </p>
        </div>

        {/* Process List */}
        <div className="flex flex-col">
          {processes.map((process: any, index: number) => (
            <div
              key={index}
              className="group grid grid-cols-1 md:grid-cols-12 items-start py-8 lg:py-12 border-b border-white/5 last:border-0 transition-all duration-300"
            >
              <div className="md:col-span-1 text-sm font-bold text-muted-foreground/30 mb-4 md:mb-0">
                {process.number}
              </div>
              <div className="md:col-span-4 lg:col-span-3">
                <h3 className="text-2xl lg:text-3xl font-bold text-white uppercase group-hover:text-primary transition-colors duration-300">
                  {process.title}
                </h3>
              </div>
              <div className="md:col-span-7 lg:col-span-8 mt-2 md:mt-0">
                <p className="text-muted-foreground text-sm lg:text-lg leading-relaxed max-w-2xl">
                  {process.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProcessSection;
