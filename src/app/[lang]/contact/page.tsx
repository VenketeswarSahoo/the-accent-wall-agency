import React from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";
import ContactClient from "@/components/contact/contact-client";
import Mandala from "@/components/ui/mandala";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const isEs = lang === "es";
  return {
    title: isEs
      ? "Contacto | The Accent Wall Agency"
      : "Contact | The Accent Wall Agency",
    description: isEs
      ? "Ponte en contacto con nosotros para tu próximo mural de geometría sagrada pintado a mano."
      : "Get in touch with us for your next bespoke hand-painted sacred geometry mural.",
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <ContactClient dict={dict} lang={lang}>
      <Mandala
        variant="mandala-2"
        className="w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] text-primary/25"
        speed={400}
      />
    </ContactClient>
  );
}
