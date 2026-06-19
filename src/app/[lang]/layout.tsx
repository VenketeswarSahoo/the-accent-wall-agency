import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { haffer } from "../fonts";
import { getDictionary, Locale } from "@/app/[lang]/dictionaries";
import HomeClient from "@/components/common/home-client";
import Footer from "@/components/common/footer";
import SmoothScroll from "../../components/ui/smooth-scroll";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const keywords =
    lang === "es"
      ? [
          "The Accent Wall Agency",
          "Arte de Mandalas",
          "Mandalas de Pared",
          "Murales de Mandalas",
          "Mandalas Pintados a Mano",
          "Geometría Sagrada",
          "Mandalas de Pan de Oro",
          "Murales de Mandalas Zen",
          "Diseño de Mandalas Sagrados",
          "Pintura de Mandalas Geométricos",
          "Muralista de Mandalas",
          "Mandalas Algorítmicos",
          "Mandalas Generativos",
          "Decoración con Mandalas",
          "Arte de Espacio de Meditación",
          "Murales Pintados a Mano",
          "Diseño de Arte Generativo",
          "Encargo de Arte de Pared",
          "Branding Espacial",
          "Pintura de Pared a Medida",
          "Diseño de Interiores",
          "Arte de Interiores",
        ]
      : [
          "The Accent Wall Agency",
          "Mandala Art",
          "Wall Mandalas",
          "Mandala Murals",
          "Hand-Painted Mandalas",
          "Sacred Geometry",
          "Gold Leaf Mandalas",
          "Zen Mandala Murals",
          "Sacred Mandala Design",
          "Geometric Mandala Painting",
          "Mandala Wall Artist",
          "Algorithmic Mandalas",
          "Generative Mandalas",
          "Mandala Home Decor",
          "Meditation Space Art",
          "Hand-Painted Murals",
          "Generative Art Design",
          "Wall Art Commission",
          "Spatial Branding",
          "Bespoke Wall Painting",
          "Interior Design",
          "Interior Art",
        ];

  return {
    title: {
      default: "The Accent Wall Agency",
      template: "%s | The Accent Wall Agency",
    },
    description: dict.description,
    keywords,
    authors: [{ name: "The Accent Wall Agency" }],
    creator: "The Accent Wall Agency",
    publisher: "The Accent Wall Agency",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "The Accent Wall Agency",
      description: dict.description,
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
      siteName: "The Accent Wall Agency",
    },
    twitter: {
      card: "summary_large_image",
      title: "The Accent Wall Agency",
      description: dict.description,
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "es" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html
      lang={lang}
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        haffer.variable,
        "font-haffer",
      )}
    >
      <GoogleTagManager gtmId="GTM-P34X85S9" />
      <body className="min-h-full flex flex-col bg-black">
        <TooltipProvider>
          <SmoothScroll />
          <HomeClient dict={dict} lang={lang} />
          <div className="flex-1 flex flex-col w-full">{children}</div>
          <Footer dict={dict} lang={lang} />
        </TooltipProvider>
      </body>
      <GoogleAnalytics gaId="G-JPL0KHXP5H" />
    </html>
  );
}
