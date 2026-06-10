"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Save the original scroll-behavior of the html element
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;

    // Temporarily override to 'auto' to prevent conflicts/stuttering with Lenis
    html.style.scrollBehavior = "auto";

    // Initialize Lenis with custom options for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth ease-out expo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Setup a ResizeObserver to observe size changes to the body (e.g. from lazy loaded content)
    // and recalculate Lenis scroll dimensions.
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    // Request Animation Frame loop to drive Lenis scrolling
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;

      // Restore original scroll behavior
      html.style.scrollBehavior = originalScrollBehavior;
    };
  }, []);

  // Immediately reset scroll position and resize when pathname changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      // Wait a frame for DOM rendering to complete, then resize
      setTimeout(() => {
        lenisRef.current?.resize();
      }, 80);
    }
  }, [pathname]);

  return null;
}
