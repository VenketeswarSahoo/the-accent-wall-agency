"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlurImage } from "../ui/blur-image";
import { mandala10, mandala11, mandala12, mandala13, mandala4, mandala5, mandala6, mandala7, mandala8 } from "@/assets";

const row1Images = [
  mandala10,
  "https://i1-e.pinimg.com/1200x/c8/a0/c4/c8a0c406a221efab268e71a4836e7901.jpg",
  mandala12,
  mandala11
];
const row2Images = [
  mandala4,
  mandala5,
  mandala6
];
const row3Images = [
  mandala7,
  mandala8,
  mandala13
];

const ProjectRow = ({ images, x }: { images: any[]; x: any }) => (
  <div className="flex w-full overflow-hidden">
    <motion.div style={{ x }} className="flex gap-4 flex-none">
      {images.map((img, index) => (
        <div
          key={index}
          className="relative w-[320px] md:w-[448px] lg:w-[480px] aspect-[16/10] overflow-hidden rounded-2xl"
        >
          <BlurImage
            src={img}
            alt={`Gallery ${index}`}
            fill
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 448px, 480px"
            className="object-cover transition-all duration-700"
          />
        </div>
      ))}
      {images.map((img, index) => (
        <div
          key={`repeat-${index}`}
          className="relative w-[320px] md:w-[448px] lg:w-[480px] aspect-[16/10] overflow-hidden rounded-2xl"
        >
          <BlurImage
            src={img}
            alt={`Gallery Repeat ${index}`}
            fill
            sizes="(max-width: 768px) 320px, (max-width: 1024px) 448px, 480px"
            className="object-cover transition-all duration-700"
          />
        </div>
      ))}
    </motion.div>
  </div>
);

interface SelectedWorkSectionProps {
  dict: any;
}

const SelectedWorkSection = ({ dict }: SelectedWorkSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Row 1 moves Left to Right
  const x1 = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  // Row 2 moves Right to Left
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black overflow-hidden flex flex-col gap-4 py-8 lg:py-16"
    >
      {/* Black Gradient Overlay */}
      <div className="absolute inset-y-0 left-0 w-full md:w-[60%] lg:w-[45%] bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />

      <div className="absolute top-8 left-6 lg:top-24 lg:left-12 z-20">
        <div className="flex flex-col gap-8">
          <span className="text-sm font-medium text-muted-foreground uppercase">
            {dict?.gallery?.subtitle}
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl">
              {dict?.gallery?.title}
            </h2>
          </div>
          <p className="max-w-[20rem] text-muted-foreground text-md">
            {dict?.gallery?.text}
          </p>
        </div>
      </div>

      <ProjectRow images={row1Images} x={x1} />
      <div className="ml-[-10%]">
        <ProjectRow images={row2Images} x={x2} />
      </div>
      <ProjectRow images={row3Images} x={x1} />
    </section>
  );
};

export default SelectedWorkSection;
