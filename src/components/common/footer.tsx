import React from "react";
import { Mail } from "lucide-react";
import Mandala from "@/components/ui/mandala";
import Link from "next/link";
import Image from "next/image";
import { LogoIcon } from "@/assets";

interface FooterProps {
  dict: any;
  lang?: string;
}

const Footer = ({ dict, lang = "en" }: FooterProps) => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: (
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
          className="size-4"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      icon: (
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
          className="size-4"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      icon: (
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
          className="size-4"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: "Email",
      icon: <Mail className="size-4" />,
    },
  ];

  return (
    <footer className="relative w-full px-6 lg:px-12 pb-12 bg-black">
      <div className="relative max-w-[1440px] mx-auto bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden py-8 px-8 lg:px-16">
        {/* Background Glow */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

        <Mandala
          variant="mandala-1"
          className="absolute top-[-12%] left-[-12%] w-[350px] h-[350px] text-primary/20 pointer-events-none select-none z-0"
          speed={250}
        />
        <Mandala
          variant="mandala-1"
          className="absolute bottom-[-12%] right-[-12%] w-[350px] h-[350px] text-primary/20 pointer-events-none select-none z-0"
          speed={250}
          reverse
        />
        <Mandala
          variant="mandala-2"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1300px] h-[1300px] text-primary/12 pointer-events-none select-none z-0"
          speed={500}
        />

        <div className="relative z-10 flex flex-col gap-20">
          {/* Top: Newsletter */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 pb-8 border-b border-white/5">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-medium text-muted-foreground uppercase">
                {dict?.footer?.newsletter}
              </span>
              <p className="text-muted-foreground text-sm max-w-xs">
                {dict?.footer?.newsletterDescription}
              </p>
            </div>

            <div className="flex items-center w-full lg:w-auto gap-2 p-2 bg-white/5 border border-white/10 rounded-full focus-within:border-primary/50 transition-colors">
              <div className="pl-4 text-white/20">
                <Mail className="size-4" />
              </div>
              <input
                type="email"
                placeholder={dict?.footer?.newsletterPlaceholder}
                className="bg-transparent border-none outline-none text-white text-sm w-full lg:w-64 placeholder:text-white/20"
              />
              <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-all duration-300">
                {dict?.footer?.subscribe}
              </button>
            </div>
          </div>

          {/* Middle: Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 flex flex-col gap-8">
              <Link href={`/${lang}`} className="flex items-center gap-2.5">
                <Image src={LogoIcon} alt="Logo" width={36} height={36} />
                <div className="flex flex-col text-xs font-bold leading-[1.1] text-white tracking-wider">
                  <span>The</span>
                  <span>Accent</span>
                  <span>Wall Agency</span>
                </div>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs">
                {dict?.footer?.bio}
              </p>
            </div>

            <div className="lg:col-span-3 flex flex-col gap-6">
              <span className="text-[10px] font-medium text-white/30 uppercase">
                {dict?.footer?.servicesHeader}
              </span>
              <ul className="flex flex-col gap-4">
                {(dict?.services?.list || []).map((item: any) => (
                  <li key={item.title}>
                    <Link
                      href={`/${lang}/coming-soon`}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <span className="text-[10px] font-medium text-white/30 uppercase">
                {dict?.footer?.companyHeader}
              </span>
              <ul className="flex flex-col gap-4">
                {(dict?.footer?.companyLinks || []).map((item: string) => (
                  <li key={item}>
                    <Link
                      href={`/${lang}/coming-soon`}
                      className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <span className="text-[10px] font-medium text-white/30 uppercase">
                {dict?.footer?.contactHeader}
              </span>
              <ul className="flex flex-col gap-4">
                {socialLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/${lang}/coming-soon`}
                      className="flex items-center gap-4 text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom: Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
            <span className="text-white/20 text-xs">
              © {new Date().getFullYear()} The Accent Wall Agency.{" "}
              {dict?.footer?.rights}
            </span>
            <a
              href="mailto:hello@thecirclecompany.co"
              className="text-white/20 text-xs hover:text-primary transition-colors"
            >
              hello@thecirclecompany.co
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
