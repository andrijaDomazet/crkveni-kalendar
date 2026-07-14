"use client";
import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(null); // null dok se ne utvrdi (izbegava hydration mismatch)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mql.matches);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}