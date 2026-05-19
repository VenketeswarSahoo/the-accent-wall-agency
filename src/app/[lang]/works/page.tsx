import React from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";
import Mandala from "@/components/ui/mandala";
import WorksFilterWrapper from "@/components/Work/works-filter-wrapper";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const isEs = lang === "es";
  return {
    title: isEs
      ? "Nuestro Trabajo | The Circle Company"
      : "Our Work | The Circle Company",
    description: isEs
      ? "Explore nuestra colección curada de murales de geometría sagrada y mandalas diseñados por IA y pintados a mano."
      : "Explore our curated collection of bespoke hand-painted AI-engineered sacred geometry mandalas and spatial murals.",
  };
}

export default async function WorksPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Decorative Header Area wrapper with Glows and Mandalas */}
      <div className="relative w-full overflow-hidden bg-black border-b border-white/5 pb-8 lg:pb-16 pt-20 lg:pt-24">
        {/* Background Glow */}
        <div
          className="absolute top-[-30%] left-[-15%] w-[80%] h-[160%] rounded-full opacity-[0.12] blur-[160px] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, var(--primary) 0%, transparent 80%)",
          }}
        />

        {/* Custom Works Interactive Heading & Grid */}
        <WorksFilterWrapper dict={dict} lang={lang} />
      </div>
    </main>
  );
}
