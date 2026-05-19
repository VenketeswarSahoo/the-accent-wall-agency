"use client";

import React, { useState } from "react";
import WorkSection from "@/components/Home/work-section";
import Section from "@/components/ui/section";
import SoonCard from "./soon-card";
import { cn } from "@/lib/utils";

interface WorksFilterWrapperProps {
  dict: any;
  lang: string;
}

export default function WorksFilterWrapper({
  dict,
  lang,
}: WorksFilterWrapperProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const worksPageDict = dict?.work?.worksPage || {};
  const catDict = worksPageDict.categories || {};

  const categories = [
    { id: "ALL", label: catDict.all || "ALL" },
    { id: "MURAL", label: catDict.mural || "MURAL" },
    {
      id: "SACRED GEOMETRY",
      label: catDict.sacredGeometry || "SACRED GEOMETRY",
    },
    { id: "GOLD LEAF", label: catDict.goldLeaf || "GOLD LEAF" },
    { id: "METALLIC", label: catDict.metallic || "METALLIC" },
  ];

  const localizedProjects = dict?.work?.projects || [];

  const matchesCategory = (
    categoriesStr: string,
    categoryId: string,
  ): boolean => {
    const cats = (categoriesStr || "").toLowerCase();
    const query = categoryId.toUpperCase();

    if (query === "ALL") return true;

    if (query === "MURAL") {
      return cats.includes("mural");
    }
    if (query === "SACRED GEOMETRY") {
      return (
        cats.includes("sacred geometry") ||
        cats.includes("geometría sagrada") ||
        cats.includes("geometria sagrada")
      );
    }
    if (query === "GOLD LEAF") {
      return (
        cats.includes("gold leaf") ||
        cats.includes("gold leafing") ||
        cats.includes("pan de oro") ||
        cats.includes("oro")
      );
    }
    if (query === "METALLIC") {
      return (
        cats.includes("metallic") ||
        cats.includes("detailing") ||
        cats.includes("metálico") ||
        cats.includes("metálicos") ||
        cats.includes("metalicos") ||
        cats.includes("lacas") ||
        cats.includes("lacquers")
      );
    }

    return false;
  };

  const getFilteredCount = (categoryId: string) => {
    return localizedProjects.filter((p: any) =>
      matchesCategory(p.categories, categoryId),
    ).length;
  };

  const currentCount = getFilteredCount(activeCategory);
  const countStr = currentCount.toString().padStart(2, "0");

  const projectWord =
    currentCount === 1
      ? worksPageDict.project || "Project"
      : worksPageDict.projects || "Projects";

  return (
    <>
      {/* Custom Works Header Section */}
      <Section py="pt-8 pb-0 lg:pt-16 lg:pb-0" className="relative z-10">
        <div className="flex flex-col gap-3 md:gap-4 mb-6">
          {/* Small Title */}
          <span className="text-sm text-muted-foreground uppercase">
            {worksPageDict.subtitle || "SELECTED WORK"}
          </span>

          {/* Big Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
            {worksPageDict.title || "Our Work"}
          </h1>
        </div>

        {/* Filter Categories Bar */}
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-x-6 text-xs md:text-sm font-medium tracking-wider">
            {/* Active Count representation */}
            <span className="text-primary font-bold transition-all duration-300">
              {countStr} {projectWord}
            </span>

            {/* Vertical Divider */}
            <span className="hidden md:inline text-white/20">|</span>

            {/* Interactive Filters */}
            <div className="flex flex-wrap items-center gap-x-6">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "uppercase text-sm transition-all duration-300 relative py-1 hover:text-white cursor-pointer",
                      isActive ? "text-white" : "text-muted-foreground",
                    )}
                  >
                    {cat.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      {/* Projects list */}
      <div className="flex-1 relative z-10">
        <WorkSection
          dict={dict}
          lang={lang}
          isWorksPage={true}
          activeCategory={activeCategory}
          hideHeader={true}
          hideFooterLink={true}
        />
      </div>

      {/* Soon Spotlight Card */}
      <Section py="pt-6 pb-12 lg:pb-24" className="relative z-10">
        <SoonCard dict={dict} lang={lang} />
      </Section>
    </>
  );
}
