import React from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";
import ComingSoonClient from "@/components/coming-soon/coming-soon-client";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const isEs = lang === "es";
  return {
    title: isEs
      ? "Próximamente | The Accent Wall Agency"
      : "Coming Soon | The Accent Wall Agency",
    description: isEs
      ? "Nuevos e inspiradores proyectos de geometría sagrada y arte mural en curso."
      : "New inspiring spatial design, sacred geometry murals and installations coming soon.",
  };
}

export default async function ComingSoonPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <ComingSoonClient dict={dict} lang={lang} />
  );
}
