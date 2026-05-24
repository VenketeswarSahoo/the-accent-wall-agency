import React from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import Section from "../ui/section";

interface CTASectionProps {
  dict: any;
  lang?: string;
}

const CTASection = ({ dict, lang = "en" }: CTASectionProps) => {
  return (
    <Section py="py-16 lg:py-40">
      <div className="max-w-[1440px] mx-auto border-t border-white/10 pt-16 lg:pt-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-24">
          <div className="flex flex-col gap-6 lg:gap-8 max-w-4xl">
            <span className="text-xs lg:text-sm uppercase text-muted-foreground font-medium">
              {dict?.cta?.topText}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1] lg:leading-[0.9] flex flex-col lg:block">
              <span>{dict?.cta?.titleLine1}</span>
              <span className="text-primary lg:ml-4">{dict?.cta?.titleLine2}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8 lg:gap-10 items-start w-full lg:w-auto">
            <p className="max-w-[32rem] text-muted-foreground text-base lg:text-lg leading-relaxed">
              {dict?.cta?.description}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium text-md hover:bg-primary hover:text-white transition-all duration-300"
            >
              {dict?.cta?.buttonText}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CTASection;
