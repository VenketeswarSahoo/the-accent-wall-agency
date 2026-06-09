import React from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";
import StudioClient from "@/components/studio/studio-client";
import Mandala from "@/components/ui/mandala";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const isEs = lang === "es";
  return {
    title: isEs
      ? "Estudio | The Accent Wall Agency"
      : "Studio | The Accent Wall Agency",
    description: isEs
      ? "Próximamente la apertura de nuestro showroom de geometría sagrada física y digital."
      : "Opening soon of our physical and digital generative sacred geometry showroom.",
  };
}

export default async function StudioPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <StudioClient
      dict={dict}
      lang={lang}
      bgMandalas={
        <>
          <Mandala
            variant="mandala-2"
            className="absolute top-[-10vw] left-[-15vw] w-[80vw] h-[80vw] md:top-[-25%] md:left-[-20%] md:w-[85vw] md:h-[85vw] max-w-[1000px] max-h-[1000px] text-primary/25 pointer-events-none mix-blend-screen select-none z-0"
            speed={300}
          />
          <Mandala
            variant="mandala-1"
            className="absolute bottom-[-10vw] right-[-10vw] w-[50vw] h-[50vw] md:bottom-[-15%] md:right-[-10%] md:w-[55vw] md:h-[55vw] max-w-[600px] max-h-[600px] text-primary/22 pointer-events-none mix-blend-screen select-none z-0"
            speed={250}
            reverse
          />
        </>
      }
    />
  );
}
