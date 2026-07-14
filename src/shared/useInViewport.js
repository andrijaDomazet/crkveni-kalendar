"use client";
import { useEffect, useState } from "react";

export function useInViewport(ref, rootMargin = "200px") {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin, inView]);

  return inView;
}