"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export function BlurImage({ className, alt = "...", ...props }: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      className={cn(
        "transition-all duration-500 ease-in-out",
        isLoading ? "blur-md scale-105" : "blur-0 scale-100",
        className,
      )}
      alt={alt}
      onLoad={() => setLoading(false)}
      {...props}
    />
  );
}
