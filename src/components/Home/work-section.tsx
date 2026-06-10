import React from "react";
import SectionHeader from "@/components/ui/section-header";
import ArrowLink from "@/components/ui/arrow-link";
import Section from "../ui/section";
import ProjectCard from "./project-card";
import * as Mandalas from "@/assets";

import { Dictionary } from "@/app/[lang]/dictionaries";

interface WorkSectionProps {
  dict: Dictionary;
  lang?: string;
  isWorksPage?: boolean;
  activeCategory?: string;
  hideHeader?: boolean;
  hideFooterLink?: boolean;
}

import { type StaticImageData } from "next/image";

interface Project {
  title: string;
  categories: string;
  image: StaticImageData | string;
  isFeatured?: boolean;
}

const WorkSection = ({
  dict,
  lang = "en",
  isWorksPage = false,
  activeCategory = "ALL",
  hideHeader = false,
  hideFooterLink = false,
}: WorkSectionProps) => {
  const localizedProjects = (dict?.work?.projects || []) as Project[];
  const projects: Project[] = localizedProjects.map((p) => {
    let resolvedImage = p.image;
    if (typeof p.image === "string" && p.image.startsWith("mandala")) {
      const imgKey = p.image as keyof typeof Mandalas;
      if (Mandalas[imgKey]) {
        resolvedImage = Mandalas[imgKey];
      }
    }
    return {
      ...p,
      image: resolvedImage,
      isFeatured: false,
    };
  });

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

  const maxHomeProjects = 3;
  const filteredProjects =
    activeCategory && activeCategory !== "ALL"
      ? projects.filter((p) => matchesCategory(p.categories, activeCategory))
      : projects;

  const displayProjects = isWorksPage
    ? filteredProjects
    : filteredProjects.slice(0, maxHomeProjects);

  // Set the first item in the visible array to be featured dynamically
  const finalProjects = displayProjects.map((p, idx) => ({
    ...p,
    isFeatured: idx === 0,
  }));

  return (
    <Section id="work" py={isWorksPage ? "py-6 lg:py-12" : "py-12 lg:py-24"}>
      {!hideHeader && (
        <SectionHeader
          title={dict?.work?.title}
          subtitle={dict?.work?.subtitle}
        />
      )}

      <div className="flex flex-col gap-6">
        {/* Featured Project */}
        {finalProjects
          .filter((p) => p.isFeatured)
          .map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              categories={project.categories}
              image={project.image}
              isFeatured={true}
              className="mb-2"
              lang={lang}
            />
          ))}

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {finalProjects
            .filter((p) => !p.isFeatured)
            .map((project, idx) => (
              <ProjectCard
                key={idx}
                title={project.title}
                categories={project.categories}
                image={project.image}
                lang={lang}
              />
            ))}
        </div>
      </div>

      {!hideFooterLink && (
        <div className="w-full flex justify-center mt-8 lg:mt-16">
          <ArrowLink href={`/${lang}/works`}>{dict?.work?.linkText}</ArrowLink>
        </div>
      )}
    </Section>
  );
};
export default WorkSection;
