import React from "react";
import Image, { StaticImageData } from "next/image";
import { BlurImage } from "../ui/blur-image";
import { ProjectLink } from "@/assets";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  categories: string;
  image: StaticImageData | string;
  isFeatured?: boolean;
  className?: string;
  lang?: string;
}

const ProjectCard = ({
  title,
  categories,
  image,
  isFeatured = false,
  className,
  lang = "en",
}: ProjectCardProps) => {
  return (
    <Link
      href={`/${lang}/coming-soon`}
      className={cn("block group cursor-pointer", className)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-white/5 mb-4",
          isFeatured ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[4/3]",
        )}
      >
        <BlurImage
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className={cn(
              "relative flex items-center justify-center",
              isFeatured
                ? "w-28 h-28 md:w-44 md:h-44"
                : "w-24 h-24 md:w-36 md:h-36",
            )}
          >
            {/* Dark circular backdrop */}
            <div className="absolute inset-2 bg-black/60 rounded-full border border-white/5 shadow-2xl"></div>

            {/* Rotating Text */}
            <div className="absolute inset-0 animate-spin-slow">
              <BlurImage
                src={ProjectLink}
                alt="View Project"
                fill
                sizes="(max-width: 768px) 112px, 176px"
                className="object-contain"
              />
            </div>

            {/* Static Arrow */}
            <ArrowUpRight
              className={cn(
                "relative z-10 text-white opacity-90",
                isFeatured ? "size-8 md:size-12" : "size-6 md:size-10",
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-between lg:gap-4">
        <h3 className="text-sm lg:text-md text-muted-foreground">{title}</h3>
        <p className="text-xs lg:text-sm text-muted-foreground">
          ({categories})
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
