"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavMenu from "@/components/Navbar/nav-menu";
import Image from "next/image";
import { LogoIcon } from "@/assets";

interface HomeClientProps {
  dict: any;
  lang: string;
}

export default function HomeClient({ dict, lang }: HomeClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between py-5 lg:py-6 px-6 lg:px-12 2xl:px-0 w-full max-w-360 mx-auto pointer-events-none transition-all duration-300">
        <div className="flex items-center gap-8 pointer-events-auto">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2.5">
            <Image src={LogoIcon} alt="Logo" width={40} height={40} />
            <div className="flex flex-col text-sm font-bold leading-[1.1] text-white tracking-wider">
              <span>The</span>
              <span>Accent</span>
              <span>Wall Agency</span>
            </div>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-4 text-xs font-medium tracking-widest uppercase pointer-events-auto">
            <Link
              href={redirectedPathname("en")}
              className={`transition-colors hover:text-white ${lang === "en" ? "text-white" : "text-white/40"}`}
            >
              EN
            </Link>
            <span className="text-white/20">/</span>
            <Link
              href={redirectedPathname("es")}
              className={`transition-colors hover:text-white ${lang === "es" ? "text-white" : "text-white/40"}`}
            >
              ES
            </Link>
          </div>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 p-1 group relative z-[60] cursor-pointer pointer-events-auto"
        >
          <div
            className={`w-8 h-[2px] bg-white transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}
          />
          <div
            className={`w-8 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`w-8 h-[2px] bg-white transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
          />
        </button>
      </nav>

      <NavMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        dict={dict}
      />
    </>
  );
}
