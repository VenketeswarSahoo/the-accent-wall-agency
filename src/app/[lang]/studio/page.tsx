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
    <StudioClient dict={dict} lang={lang}>
      <Mandala
        variant="mandala-2"
        className="w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] text-primary/15"
        speed={400}
      />
    </StudioClient>
  );
}
