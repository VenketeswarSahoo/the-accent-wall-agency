"use client";

import React from "react";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

import { Dictionary } from "@/app/[lang]/dictionaries";

interface ContactClientProps {
  dict: Dictionary;
  lang: string;
  children?: React.ReactNode;
}

export default function ContactClient({
  dict,
  lang,
  children,
}: ContactClientProps) {
  const contactDict = dict?.contactPage || {};

  // WhatsApp Pre-filled message link
  const getWhatsAppLink = () => {
    const text =
      lang === "es"
        ? "¡Hola! Me encantaría hablar sobre un proyecto de mural de geometría sagrada personalizado para mi espacio."
        : "Hello! I would love to discuss a custom sacred geometry mural project for my space.";
    return `https://wa.me/919861949459?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-24 px-6">
      {/* Stunning Rotating Golden Mandala Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {children}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-12 mt-12">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-6 max-w-2xl">
          <span className="text-xs font-semibold text-primary uppercase">
            {contactDict.subtitle}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {contactDict.title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {contactDict.description}
          </p>
        </div>

        {/* Easiest Social Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          {/* WhatsApp Card */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-between p-8 rounded-3xl border border-white/5 bg-[#0A0A0A]/60 backdrop-blur-xl min-h-[260px]"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <svg className="size-8 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.216 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="text-white font-semibold tracking-wide text-base">
                {contactDict.whatsappLabel}
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                {contactDict.whatsappSub}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-primary font-bold tracking-widest uppercase mt-6">
              {lang === "es" ? "Chatear" : "Chat Now"}{" "}
              <ArrowRight className="size-3.5" />
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/the_venketesh/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-between p-8 rounded-3xl border border-white/5 bg-[#0A0A0A]/60 backdrop-blur-xl min-h-[260px]"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-8"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <span className="text-white font-semibold tracking-wide text-base">
                {contactDict.instagramLabel}
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                {contactDict.instagramSub}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-primary font-bold tracking-widest uppercase mt-6">
              {lang === "es" ? "Mensaje" : "Send DM"}{" "}
              <ArrowRight className="size-3.5" />
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:sahoovenketeswar@gmail.com"
            className="flex flex-col items-center justify-between p-8 rounded-3xl border border-white/5 bg-[#0A0A0A]/60 backdrop-blur-xl min-h-[260px]"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                <Mail className="size-8" />
              </div>
              <span className="text-white font-semibold tracking-wide text-base">
                {contactDict.emailLabel}
              </span>
              <span className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                {contactDict.emailSub}
              </span>
            </div>

            <div className="flex flex-col items-center gap-1 mt-6">
              <span className="text-[10px] text-white/40 font-mono tracking-wide lowercase">
                {contactDict.emailText}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-primary font-bold tracking-widest uppercase">
                {lang === "es" ? "Escribir" : "Write Email"}{" "}
                <ArrowRight className="size-3.5" />
              </div>
            </div>
          </a>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href={`/${lang}`}
            className="text-xs text-muted-foreground transition-colors tracking-widest uppercase pb-1"
          >
            &larr; {dict?.studioPage?.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
