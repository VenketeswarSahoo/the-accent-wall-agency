"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";

interface StudioClientProps {
  dict: any;
  lang: string;
  children?: React.ReactNode;
}

export default function StudioClient({
  dict,
  lang,
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

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Stunning Rotating Golden Mandala Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {children}
      </div>

      {/* Content Card */}
      <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-8 mt-16">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-none">
          {studioPageDict.title}...
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-6xl">
          {studioPageDict.description}
        </p>

        {/* Try Live Visualizer CTA */}
        <Link
          href={`/${lang}/studio/editor`}
          className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/10 flex items-center gap-2 group cursor-pointer"
        >
          <Sparkles className="size-4 group-hover:scale-125 transition-transform" />
          {lang === "es"
            ? "Probar Visualizador Espacial de IA (Beta)"
            : "Try AI Spatial Visualizer (Beta)"}
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Dynamic Interactive Action - Notify Me */}
        <div className="w-full max-w-md mt-4">
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

        {/* Back Link */}
        <Link
          href={`/${lang}`}
          className="text-xs text-muted-foreground hover:text-white transition-colors tracking-widest uppercase mt-6 border-b border-transparent hover:border-white/20 pb-1"
        >
          &larr; {studioPageDict.backHome}
        </Link>
      </div>
    </div>
  );
}
