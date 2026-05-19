"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const row1Images = [
  "https://instagram.fccu4-2.fna.fbcdn.net/v/t51.82787-15/670677783_18456314038111860_7562431809683467242_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=Mzg3MTU1OTM3MzUzNzc4MzczNA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=Orod8eAtuLEQ7kNvwG85moz&_nc_oc=AdoriHm008b1yUZWSvCCKcHaYV3eBB4UbsPvEposQHPVyq6EAhtybzTyT6l-7IcKwRRQRGR9kiOFXnYa6Bs6wmIF&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu4-2.fna&_nc_gid=r4remuSr_R9GihjHLY35_w&_nc_ss=7a22e&oh=00_Af4BldjupEqzwHfVlc3d4Yu5_5NQuMDf8U3YspA3DM3ahg&oe=6A122386",
  "https://i1-e.pinimg.com/1200x/c8/a0/c4/c8a0c406a221efab268e71a4836e7901.jpg",
  "https://instagram.fccu25-1.fna.fbcdn.net/v/t51.75761-15/484965536_18393766840111860_1924979304447716835_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzU5MTc0MjcwMzAwNTk3MTQyNQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuODgxLnNkci5yZWd1bGFyX3Bob3RvLkMzIn0%3D&_nc_ohc=nFdP6MzYMUEQ7kNvwHmxvlN&_nc_oc=Ado5n9SZ_WiAX2o_N0i60C0U77COXeYmKHIqIFvWjWvH8xtPAIK7kqzdePbK1AonkGJy60mkJSCRUCkI68DXPlOT&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu25-1.fna&_nc_gid=YVxTmljqEaFZaRCewLTEoA&_nc_ss=7a22e&oh=00_Af78Hqp4YtFuKsxTLFMM32hs7uQ1Nz2W9hMjzXnWbVuynQ&oe=6A1235B0",
  "https://instagram.fccu25-1.fna.fbcdn.net/v/t51.82787-15/655128699_18451820437111860_4537908515679703160_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzg1Nzc0Njc0ODM5NTgyMDYzMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=yYGoB7ffM9YQ7kNvwGL08DZ&_nc_oc=Adq1KDRd4_zYL71KpnQWSroAfsXnDkn4qbDomrWiu-4WbmpdRBzw-bRXA0KI7MZuuiNpOoydaEXUcedPOK-kZVQV&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu25-1.fna&_nc_gid=XhxKMPHnol3Mr4AGfM1GSA&_nc_ss=7a22e&oh=00_Af5_vBwzU5ArDxArizBc33tJ-4DXb8i-F1JdkiTTxWDrvw&oe=6A121835",
];
const row2Images = [
  "https://instagram.fccu25-1.fna.fbcdn.net/v/t51.75761-15/472521579_18383707108111860_1941369237534282747_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=105&ig_cache_key=MzU0MTc5NDQyODY0MzczNzg5Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=WuAOov1mBVEQ7kNvwER32XQ&_nc_oc=AdqkBH0xJMatys-L5kF-eg8xtw2PcnRVachoo4VMLDjEFBLpVcALT4o_roXUHcSNSQVnIrAMv9mlw3GRmglUw_9B&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu25-1.fna&_nc_gid=2lBHhO5PH6r3-ghxiGNA0Q&_nc_ss=7a22e&oh=00_Af77Lgnpp9bcckIWEkisC5ZM-ioDDfNPU-q1aF1Rf4Judw&oe=6A122063",
  "https://instagram.fccu4-3.fna.fbcdn.net/v/t51.75761-15/485439280_18393766981111860_5395407906716057509_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzU5MTc0MjcwMzAzOTY3MzgxOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=xZz_awDnVq0Q7kNvwHGZ0pn&_nc_oc=AdrA4HDeLWlHcDQ35lNpy0hyveQxa39R37YU1ITV_XXMfbPKwZY60kFE62ZUiMKicRAiDNi3BSytVGCyBH1a-Qm7&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu4-3.fna&_nc_gid=YVxTmljqEaFZaRCewLTEoA&_nc_ss=7a22e&oh=00_Af4qpcrgMS9nJjs5nZ6s_eSqSkHRtpwgPBOZG4gaU7YczA&oe=6A1238EE",
  "https://instagram.fccu4-3.fna.fbcdn.net/v/t51.75761-15/472483416_18383707129111860_4488651128051126967_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=106&ig_cache_key=MzU0MTc5NDQyODYwMTk0NzQ1OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=ysBldp-B7jIQ7kNvwGRqY6S&_nc_oc=AdrBnaUUXLG9D3NZ0a3Mc22lVVW8HJxou67A-vQi29bKPu2vbRoNuRRDC-hgsecqV7r5hfV-0ugQKtY0HmgBxrHJ&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu4-3.fna&_nc_gid=2lBHhO5PH6r3-ghxiGNA0Q&_nc_ss=7a22e&oh=00_Af5S9Zs_hH1QEq-6I2CGls_SyOXrM1usYGRvHpf9Gz-6_A&oe=6A124CFB",
  "https://instagram.fccu4-3.fna.fbcdn.net/v/t51.75761-15/472524458_18383707099111860_8723256198667767167_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=MzU0MTc5NDQyODY5NDI1NTEzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=rvxEoO72qKIQ7kNvwFfJQTv&_nc_oc=Adoftc7bTJysEeRpF2im5bvEcRRF_s09VzdOEVwZfXRRlrabCFqxOeJbHVkxGyUNawKNZ0k5HugpRbwAkwrCLtOd&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu4-3.fna&_nc_gid=2lBHhO5PH6r3-ghxiGNA0Q&_nc_ss=7a22e&oh=00_Af6kX6DQPIqoBBJwj4lGApsCMlFKwmu_KLXsbBI167x1iw&oe=6A122FB5",
];
const row3Images = [
  "https://instagram.fccu4-3.fna.fbcdn.net/v/t51.75761-15/472281057_18383707138111860_5339580973539315097_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzU0MTc5NDQyODY1MjMwMjQ3MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=snlhIveN5KEQ7kNvwGK7DCX&_nc_oc=AdoRDUMJs6QeYwhnbP_4U8i9MJY6jOmqAZS01iYI1gGT0UqYwYLH8hNaXNHuoZGZ6sr80r3MZiRqG1OuwdG6M03K&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu4-3.fna&_nc_gid=2lBHhO5PH6r3-ghxiGNA0Q&_nc_ss=7a22e&oh=00_Af4dtjKgACUnoZsaNL_QD5IbteyqVir93OBGKtM4cwkJTw&oe=6A124F45",
  "https://instagram.fccu4-3.fna.fbcdn.net/v/t51.75761-15/485000303_18393766864111860_1613153538980779625_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=MzU5MTc0MjcwMzAzOTUyOTMwOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuODg1LnNkci5yZWd1bGFyX3Bob3RvLkMzIn0%3D&_nc_ohc=eU0M4GIbq7YQ7kNvwFW0CLE&_nc_oc=AdoZVOKB6yV26O1YCVztWv94XdJfFLKdKdVjYfRNamxQRBeBowoy8P879JmA9MZut0M4CkmlBj_tGG5CCKVxm4xG&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu4-3.fna&_nc_gid=YVxTmljqEaFZaRCewLTEoA&_nc_ss=7a22e&oh=00_Af6S-mP217HkSo5-QeaQJY7RJtmPPvlpvBJDAJFf9-EGiQ&oe=6A122CBB",
  "https://instagram.fccu25-1.fna.fbcdn.net/v/t51.82787-15/627997437_18443177818111860_2928092755362419793_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=MzgyNTEyNDY3MzYzNDI0MDQwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=T6-ylga4jykQ7kNvwGFzzi3&_nc_oc=AdpLd8w8iSjiPyBoPWJ-aUHrvyBjkQ9bu-nIfwbnsiwC-ncQD4budqotv5YPXPl7pt3G1NhdEgNJIgpNZm1_er0r&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu25-1.fna&_nc_gid=gvj65-xbkIo9FlcBYTZpGQ&_nc_ss=7a22e&oh=00_Af5ard-Y7rT_BKlm3AcQQJfMObLOqGf8ysyz9DweCd7VBw&oe=6A122894",
  "https://instagram.fccu4-2.fna.fbcdn.net/v/t51.75761-15/485457308_18393766936111860_6399424918847721398_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=MzU5MTc0MjcwMzAzMTE2MjQzNw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=AfxotE-eCKoQ7kNvwGPUCAr&_nc_oc=AdpgfF34rSztm0M9zQx0T1ojTj-VOgN_Lt9AoQwKUcKYBtE_W3jSJDU45aYpkzVBjyqfIs0jSametlZqVur--OxV&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu4-2.fna&_nc_gid=YVxTmljqEaFZaRCewLTEoA&_nc_ss=7a22e&oh=00_Af4z0tKohJRR88Vz7oCskJocBnkkuVPscn4fBxkSzZSrAg&oe=6A122074",
  "https://instagram.fccu4-2.fna.fbcdn.net/v/t51.75761-15/472499347_18383707117111860_3266663058354173054_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzU0MTc5NDQyODYwMTgyMTQzNg%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMTQ0MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=7miykligxGMQ7kNvwFEUdiP&_nc_oc=AdoGhY6chq1rRDu4yiLZ4Oyo7bZ9upp186k2XgUqSuqyMjBpmRyxR469Ck7PpSDGNkFHdl80zu7zQQ7ZUaqAYhol&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=instagram.fccu4-2.fna&_nc_gid=2lBHhO5PH6r3-ghxiGNA0Q&_nc_ss=7a22e&oh=00_Af7ecoUZ2oJMRylcB2LwLOqKm5gnBtkFMvP-k9AsHtOcBw&oe=6A1242CE",
];

const ProjectRow = ({ images, x }: { images: any[]; x: any }) => (
  <div className="flex w-full overflow-hidden">
    <motion.div style={{ x }} className="flex gap-4 flex-none">
      {images.map((img, index) => (
        <div
          key={index}
          className="relative w-[320px] md:w-[448px] lg:w-[480px] aspect-[16/10] overflow-hidden rounded-2xl"
        >
          <Image
            src={img}
            alt={`Gallery ${index}`}
            fill
            className="object-cover transition-all duration-700"
          />
        </div>
      ))}
      {images.map((img, index) => (
        <div
          key={`repeat-${index}`}
          className="relative w-[320px] md:w-[448px] lg:w-[480px] aspect-[16/10] overflow-hidden rounded-2xl"
        >
          <Image
            src={img}
            alt={`Gallery Repeat ${index}`}
            fill
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
