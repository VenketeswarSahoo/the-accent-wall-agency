"use client";

import { useEffect, useState } from "react";

export default function CurrentYear() {
  // Use a stable default year for initial SSR to avoid hydration mismatch
  const [year, setYear] = useState("2026");

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setYear(new Date().getFullYear().toString());
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return <>{year}</>;
}
