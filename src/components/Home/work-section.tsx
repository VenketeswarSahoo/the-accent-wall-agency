import React from "react";
import Image from "next/image";
import SectionHeader from "@/components/ui/section-header";
import { work1, work2, work3, ProjectLink } from "@/assets";
import ArrowLink from "@/components/ui/arrow-link";
import { ArrowUpRight } from "lucide-react";

import Section from "../ui/section";
import ProjectCard from "./project-card";

interface WorkSectionProps {
  dict: any;
  isWorksPage?: boolean;
  activeCategory?: string;
  hideHeader?: boolean;
  hideFooterLink?: boolean;
}

const WorkSection = ({
  dict,
  isWorksPage = false,
  activeCategory = "ALL",
  hideHeader = false,
  hideFooterLink = false,
}: WorkSectionProps) => {
  const localizedProjects = dict?.work?.projects || [];
  const projects = [
    {
      ...localizedProjects[0],
      image:
        "https://images.pexels.com/photos/7993419/pexels-photo-7993419.jpeg?_gl=1*1429sx6*_ga*MjU0NjMzNDc3LjE3NzkxMjE2OTE.*_ga_8JE65Q40S6*czE3NzkxMjE2OTAkbzEkZzEkdDE3NzkxMjE4MDQkajIzJGwwJGgw",
      isFeatured: true,
    },
    {
      ...localizedProjects[1],
      image:
        "https://images.pexels.com/photos/33176102/pexels-photo-33176102.jpeg?_gl=1*da3far*_ga*MjU0NjMzNDc3LjE3NzkxMjE2OTE.*_ga_8JE65Q40S6*czE3NzkxMjE2OTAkbzEkZzEkdDE3NzkxMjIwNTckajU5JGwwJGgw",
      isFeatured: false,
    },
    {
      ...localizedProjects[2],
      image: work3,
      isFeatured: false,
    },
  ];

  const matchesCategory = (categoriesStr: string, categoryId: string): boolean => {
    const cats = (categoriesStr || "").toLowerCase();
    const query = categoryId.toUpperCase();
    
    if (query === "ALL") return true;
    
    if (query === "MURAL") {
      return cats.includes("mural");
    }
    if (query === "SACRED GEOMETRY") {
      return cats.includes("sacred geometry") || cats.includes("geometría sagrada") || cats.includes("geometria sagrada");
    }
    if (query === "GOLD LEAF") {
      return cats.includes("gold leaf") || cats.includes("gold leafing") || cats.includes("pan de oro") || cats.includes("oro");
    }
    if (query === "METALLIC") {
      return cats.includes("metallic") || cats.includes("detailing") || cats.includes("metálico") || cats.includes("metálicos") || cats.includes("metalicos") || cats.includes("lacas") || cats.includes("lacquers");
    }
    
    return false;
  };

  const filteredProjects =
    activeCategory && activeCategory !== "ALL"
      ? projects.filter((p) => matchesCategory(p.categories, activeCategory))
      : projects;

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
        {filteredProjects
          .filter((p) => p.isFeatured)
          .map((project, idx) => (
            <ProjectCard
              key={idx}
              title={project.title}
              categories={project.categories}
              image={project.image}
              isFeatured={true}
              className="mb-2"
            />
          ))}

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects
            .filter((p) => !p.isFeatured)
            .map((project, idx) => (
              <ProjectCard
                key={idx}
                title={project.title}
                categories={project.categories}
                image={project.image}
              />
            ))}
        </div>
      </div>

      {!hideFooterLink && (
        <div className="w-full flex justify-center mt-8 lg:mt-16">
          <ArrowLink href="#">{dict?.work?.linkText}</ArrowLink>
        </div>
      )}
    </Section>
  );
};
export default WorkSection;
