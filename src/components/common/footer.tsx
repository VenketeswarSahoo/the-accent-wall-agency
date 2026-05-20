import React from "react";
import { Mail } from "lucide-react";
import Mandala from "@/components/ui/mandala";
import Link from "next/link";
import Image from "next/image";
import { LogoIcon } from "@/assets";
import NewsletterForm from "./newsletter-form";

interface FooterProps {
  dict: any;
  lang?: string;
}

const Footer = ({ dict, lang = "en" }: FooterProps) => {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/the_venketesh/",
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
      href: "https://x.com/Venkatesh_5o2",
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
      name: "WhatsApp",
      href: "https://wa.me/919861949459",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.216 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/venketeswar-sahoo/",
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
      href: "mailto:sahoovenketeswar@gmail.com",
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

            <NewsletterForm
              placeholder={dict?.footer?.newsletterPlaceholder}
              buttonText={dict?.footer?.subscribe}
            />
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
              <span className="text-[10px] text-white/30 uppercase">
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
              <span className="text-[10px] text-white/30 uppercase">
                {dict?.footer?.companyHeader}
              </span>
              <ul className="flex flex-col gap-4">
                {(dict?.footer?.companyLinks || []).map((item: string, index: number) => {
                  const paths = ["/about", "/works", "/studio", "/contact"];
                  const href = `/${lang}${paths[index] || "/coming-soon"}`;
                  return (
                    <li key={item}>
                      <Link
                        href={href}
                        className="text-muted-foreground text-sm hover:text-primary transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <span className="text-[10px] text-muted-foreground uppercase">
                {dict?.footer?.contactHeader}
              </span>
              <ul className="flex flex-col gap-4">
                {socialLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel={
                        item.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="flex items-center gap-4 text-muted-foreground text-sm hover:text-primary transition-colors"
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom: Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
            <span className="text-muted-foreground text-xs">
              © {new Date().getFullYear()} The Accent Wall Agency.{" "}
              {dict?.footer?.rights}
            </span>
            <a
              href="mailto:sahoovenketeswar@gmail.com"
              className="text-muted-foreground text-xs hover:text-primary transition-colors"
            >
              sahoovenketeswar@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
