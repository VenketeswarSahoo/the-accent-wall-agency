import React from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";
import StudioEditor from "@/components/studio/studio-editor";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const isEs = lang === "es";
  return {
    title: isEs
      ? "Visualizador de IA Espacial | The Accent Wall Agency"
      : "AI Spatial Visualizer | The Accent Wall Agency",
    description: isEs
      ? "Diseña y visualiza mandalas de geometría sagrada y arte mural en pan de oro en tus propias paredes de forma instantánea usando nuestra IA Espacial."
      : "Design and visualize sacred geometry mandalas and gold leaf wall art on your own walls instantly using our Spatial AI.",
  };
}

export default async function StudioEditorPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <StudioEditor dict={dict} lang={lang} />
  );
}
