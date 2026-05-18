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
}

const WorkSection = ({ dict }: WorkSectionProps) => {
  const localizedProjects = dict?.work?.projects || [];
  const projects = [
    {
      ...localizedProjects[0],
      image: work3,
      isFeatured: true,
    },
    {
      ...localizedProjects[1],
      image: work2,
      isFeatured: false,
    },
    {
      ...localizedProjects[2],
      image: work1,
      isFeatured: false,
    },
  ];

  return (
    <Section id="work" py="py-12 lg:py-24">
      <SectionHeader title={dict?.work?.title} subtitle={dict?.work?.subtitle} />

      <div className="flex flex-col gap-2">
        {/* Featured Project */}
        {projects
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
          {projects
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

      <div className="w-full flex justify-center mt-8 lg:mt-16">
        <ArrowLink href="#">{dict?.work?.linkText}</ArrowLink>
      </div>
    </Section>
  );
};
export default WorkSection;
