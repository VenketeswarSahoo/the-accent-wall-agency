import AboutSection from "@/components/Home/about-section";
import CTASection from "@/components/Home/cta-section";
import Footer from "@/components/Home/footer";
import Hero from "@/components/Home/hero";
import PartnerSection from "@/components/Home/partner-section";
import ProcessSection from "@/components/Home/process-section";
import SelectedWorkSection from "@/components/Home/selected-work";
import ServicesSection from "@/components/Home/services-section";
import WorkSection from "@/components/Home/work-section";
import React from "react";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, Locale } from "@/app/[lang]/dictionaries";

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
      <Footer dict={dict} lang={lang} />
    </div>
  );
};

export default Home;
