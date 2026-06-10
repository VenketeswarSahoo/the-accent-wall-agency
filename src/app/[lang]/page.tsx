import React from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";

import Hero from "@/components/Home/hero";

const PartnerSection = dynamic(
  () => import("@/components/Home/partner-section"),
);
const AboutSection = dynamic(() => import("@/components/Home/about-section"));
const WorkSection = dynamic(() => import("@/components/Home/work-section"));
const ServicesSection = dynamic(
  () => import("@/components/Home/services-section"),
);
const ProcessSection = dynamic(
  () => import("@/components/Home/process-section"),
);
const SelectedWorkSection = dynamic(
  () => import("@/components/Home/selected-work"),
);
const CTASection = dynamic(() => import("@/components/Home/cta-section"));

interface PageProps {
  params: Promise<{ lang: string }>;
}

const Home = async ({ params }: PageProps) => {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex flex-col bg-black">
      <Hero params={params} />
      <PartnerSection dict={dict} />
      <AboutSection dict={dict} />
      <WorkSection dict={dict} lang={lang} />
      <ServicesSection dict={dict} />
      <ProcessSection dict={dict} />
      <SelectedWorkSection dict={dict} />
      <CTASection dict={dict} lang={lang} />
    </div>
  );
};

export default Home;
