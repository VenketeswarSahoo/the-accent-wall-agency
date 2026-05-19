import React from "react";
import SectionHeader from "@/components/ui/section-header";
import ArrowLink from "@/components/ui/arrow-link";
import Section from "../ui/section";
import ProjectCard from "./project-card";

interface WorkSectionProps {
  dict: any;
  lang?: string;
  isWorksPage?: boolean;
  activeCategory?: string;
  hideHeader?: boolean;
  hideFooterLink?: boolean;
}

const WorkSection = ({
  dict,
  lang = "en",
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
        "https://instagram.fccu4-2.fna.fbcdn.net/v/t51.75761-15/472499347_18383707117111860_3266663058354173054_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzU0MTc5NDQyODYwMTgyMTQzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=7miykligxGMQ7kNvwFEUdiP&_nc_oc=AdoGhY6chq1rRDu4yiLZ4Oyo7bZ9upp186k2XgUqSuqyMjBpmRyxR469Ck7PpSDGNkFHdl80zu7zQQ7ZUaqAYhol&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu4-2.fna&_nc_gid=2lBHhO5PH6r3-ghxiGNA0Q&_nc_ss=7a22e&oh=00_Af7ecoUZ2oJMRylcB2LwLOqKm5gnBtkFMvP-k9AsHtOcBw&oe=6A1242CE",
      isFeatured: true,
    },
    {
      ...localizedProjects[1],
      image:
        "https://instagram.fccu25-1.fna.fbcdn.net/v/t51.82787-15/655128699_18451820437111860_4537908515679703160_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzg1Nzc0Njc0ODM5NTgyMDYzMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=yYGoB7ffM9YQ7kNvwGL08DZ&_nc_oc=Adq1KDRd4_zYL71KpnQWSroAfsXnDkn4qbDomrWiu-4WbmpdRBzw-bRXA0KI7MZuuiNpOoydaEXUcedPOK-kZVQV&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu25-1.fna&_nc_gid=XhxKMPHnol3Mr4AGfM1GSA&_nc_ss=7a22e&oh=00_Af5_vBwzU5ArDxArizBc33tJ-4DXb8i-F1JdkiTTxWDrvw&oe=6A121835",
      isFeatured: false,
    },
    {
      ...localizedProjects[2],
      image:
        "https://instagram.fccu25-1.fna.fbcdn.net/v/t51.82787-15/627997437_18443177818111860_2928092755362419793_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzgyNTEyNDY3MzYzNDI0MDQwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=T6-ylga4jykQ7kNvwGFzzi3&_nc_oc=AdpLd8w8iSjiPyBoPWJ-aUHrvyBjkQ9bu-nIfwbnsiwC-ncQD4budqotv5YPXPl7pt3G1NhdEgNJIgpNZm1_er0r&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu25-1.fna&_nc_gid=gvj65-xbkIo9FlcBYTZpGQ&_nc_ss=7a22e&oh=00_Af5ard-Y7rT_BKlm3AcQQJfMObLOqGf8ysyz9DweCd7VBw&oe=6A122894",
      isFeatured: false,
    },
  ];

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
              lang={lang}
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
                lang={lang}
              />
            ))}
        </div>
      </div>

      {!hideFooterLink && (
        <div className="w-full flex justify-center mt-8 lg:mt-16">
          <ArrowLink href={`/${lang}/wroks`}>{dict?.work?.linkText}</ArrowLink>
        </div>
      )}
    </Section>
  );
};
export default WorkSection;
