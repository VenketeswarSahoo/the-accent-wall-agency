"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import Section from "@/components/ui/section";

interface StudioClientProps {
  dict: any;
  lang: string;
  bgMandalas?: React.ReactNode;
  children?: React.ReactNode;
}

export default function StudioClient({
  dict,
  lang,
  bgMandalas,
  children,
}: StudioClientProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      } else {
        const data = await res.json();
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const studioPageDict = dict?.studioPage || {};

  const isEs = lang === "es";
  const pillars = isEs
    ? ["Showroom Físico", "Previsualización Spatial AI", "Murales de Diseño"]
    : ["Physical Showroom", "Spatial AI Previews", "Bespoke Mural Art"];

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between pt-20 lg:pt-24">
      {/* Decorative Rotating Sacred Geometry Mandalas positioned dynamically to balance the space */}
      {bgMandalas}

      {/* Main Content */}
      <Section
        py=""
        className="flex-1 flex flex-col justify-end pb-12 lg:pb-40 z-10 w-full"
      >
        <div className="w-full flex flex-col gap-6 md:gap-8">
          {/* Grid Layout matching Hero/About sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 lg:gap-0 mt-4">
            {/* Left side: Subtitle & Balanced Heading */}
            <div className="lg:col-span-7 xl:col-span-7">
              <div className="flex flex-col gap-2">
                <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest">
                  {studioPageDict.subtitle}
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.1] lg:leading-[1] xl:leading-[0.9] tracking-tight">
                  <span className="block text-white">
                    {studioPageDict.title}...
                  </span>
                  <span className="block text-primary">
                    {isEs ? "Estudio Generativo" : "Generative Studio"}
                  </span>
                </h1>
              </div>
            </div>

            {/* Right side: Description & Subscription Form */}
            <div className="lg:col-span-5 xl:col-span-4 lg:col-start-8 xl:col-start-9 flex flex-col gap-8 lg:gap-10">
              <div className="flex flex-col gap-6 lg:gap-8">
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                  {studioPageDict.description}
                </p>

                {/* Dynamic Interactive Action - Notify Me */}
                <div className="w-full">
                  {subscribed ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-4 px-6 rounded-lg border border-primary/20 bg-primary/5 text-primary text-sm font-medium tracking-wide"
                    >
                      {lang === "es"
                        ? "¡Gracias! Te notificaremos pronto."
                        : "Thank you! We will notify you soon."}
                    </motion.div>
                  ) : (
                    <form
                      onSubmit={handleSubscribe}
                      className="flex flex-col sm:flex-row gap-3 w-full"
                    >
                      <input
                        type="email"
                        required
                        value={email}
                        disabled={loading}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={studioPageDict.emailPlaceholder}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/20 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-primary/95 text-black font-semibold text-sm px-6 py-3 rounded-lg transition-colors cursor-pointer shadow-lg shadow-primary/10 flex items-center justify-center gap-2 disabled:opacity-75"
                      >
                        {loading && <Loader2 className="size-4 animate-spin" />}
                        {studioPageDict.notifyMe}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
