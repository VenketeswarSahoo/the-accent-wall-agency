"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  dict: any;
}

interface MenuItem {
  title: string;
  subtitle: string;
  href: string;
}

const NavMenu: React.FC<NavMenuProps> = ({ isOpen, onClose, dict }) => {
  const pathname = usePathname();
  const segments = pathname ? pathname.split("/") : [];
  const lang = segments[1] || "en";

  const getLocalizedHref = (href: string) => {
    if (href === "/works") {
      return `/${lang}/works`;
    }
    if (href === "/about") {
      return `/${lang}/about`;
    }
    if (href === "/studio") {
      return `/${lang}/studio`;
    }
    if (href === "/contact") {
      return `/${lang}/contact`;
    }
    if (href === "#" || href === "") {
      return `/${lang}`;
    }
    if (href.startsWith("#")) {
      // If on homepage, just scroll to anchor
      if (pathname === `/${lang}` || pathname === `/` || pathname === "") {
        return href;
      }
      // If on another page, go to homepage + anchor
      return `/${lang}${href}`;
    }
    return href;
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems: MenuItem[] = dict?.navigation?.menu || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col lg:flex-row pointer-events-none font-sans text-white">
          {/* Left / Top Panel for Mobile */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex lg:w-1/2 h-full bg-[#0a0a0a] pointer-events-auto flex-col justify-between p-6 sm:p-8 lg:p-12 relative z-20"
          >
            <div className="flex flex-col gap-6 lg:mt-auto">
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                {dict?.navigation?.connect}
              </h4>
              <ul className="flex flex-col gap-4 text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/the_venketesh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex hover:text-white text-muted-foreground transition-colors w-max group"
                  >
                    <span className="w-24 group-hover:text-white flex items-center gap-2">
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
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                      Instagram
                    </span>
                    <span className="text-muted-foreground">@the_venketesh</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/Venkatesh_5o2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex hover:text-white text-muted-foreground transition-colors w-max group"
                  >
                    <span className="w-24 group-hover:text-white flex items-center gap-2">
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
                      Twitter
                    </span>
                    <span className="text-muted-foreground">@Venkatesh_5o2</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919861949459"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex hover:text-white text-muted-foreground transition-colors w-max group"
                  >
                    <span className="w-24 group-hover:text-white flex items-center gap-2">
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
                      WhatsApp
                    </span>
                    <span className="text-muted-foreground">+91 9861949459</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/venketeswar-sahoo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex hover:text-white text-muted-foreground transition-colors w-max group"
                  >
                    <span className="w-24 group-hover:text-white flex items-center gap-2">
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
                      LinkedIn
                    </span>
                    <span className="text-muted-foreground">Venketeswar Sahoo</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:sahoovenketeswar@gmail.com"
                    className="flex hover:text-white text-muted-foreground transition-colors w-max group"
                  >
                    <span className="w-24 group-hover:text-white flex items-center gap-2">
                      <Mail className="size-4" /> Email
                    </span>
                    <span className="text-muted-foreground">
                      sahoovenketeswar@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right / Bottom Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 h-full bg-[#111111] pointer-events-auto flex flex-col relative z-20"
          >
            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto w-full pt-16 lg:pt-0">
              <div className="flex flex-col h-full items-start justify-center">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.title}
                    href={getLocalizedHref(item.href)}
                    onClick={onClose}
                    className="w-full relative group border-b border-white/5 last:border-b-0 flex flex-col justify-center px-8 lg:px-20 py-4 lg:py-8 overflow-hidden"
                  >
                    {/* Hover bg effect: subtle gradient and animated primary lines expanding to right and bottom */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

                    <div className="absolute top-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out pointer-events-none z-20" />
                    <div className="absolute top-0 left-0 w-[2px] h-full bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out pointer-events-none z-20" />

                    <div className="flex items-center justify-between relative z-10 w-full">
                      <div className="flex flex-col">
                        <span className="text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase mb-2 transition-colors group-hover:text-white/80">
                          {item.subtitle}
                        </span>
                        <span className="text-5xl lg:text-6xl font-bold text-white transition-transform duration-500 ease-out group-hover:translate-x-6">
                          {item.title}
                        </span>
                      </div>

                      <ArrowUpRight className="text-primary size-6 lg:size-8 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="lg:px-20 px-8 lg:py-4 py-2 border-t border-white/5 flex items-center justify-between text-[0.65rem] text-muted-foreground uppercase tracking-widest relative z-10 w-full">
              <a
                href="mailto:sahoovenketeswar@gmail.com"
                className="hover:text-white transition-colors"
              >
                sahoovenketeswar@gmail.com
              </a>
              <span>© 2026</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NavMenu;
