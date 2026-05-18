import React from "react";
import { notFound } from "next/navigation";
import HomeClient from "@/app/[lang]/home-client";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";
import ArrowLink from "@/components/ui/arrow-link";
import Mandala from "@/components/ui/mandala";
import Section from "../ui/section";

interface PageProps {
  params: Promise<{ lang: string }>;
}

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
      <Mandala
        variant="mandala-2"
        className="absolute top-[-25%] left-[-20%] w-[85vw] h-[85vw] max-w-[1000px] max-h-[1000px] text-primary/25 pointer-events-none mix-blend-screen select-none z-0"
        speed={300}
      />
      <Mandala
        variant="mandala-1"
        className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] text-primary/22 pointer-events-none mix-blend-screen select-none z-0"
        speed={250}
        reverse
      />

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
