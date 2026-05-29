"use client";

import { useEffect } from "react";

const REFRESH_INTERVAL = 30000; // 30 sekundi
const VIEWABILITY_THRESHOLD = 0.5; // 50% oglasa mora biti vidljivo

const AdRefresh = ({ slotId }) => {
  useEffect(() => {
    if (typeof window === "undefined" || !window.googletag) return;

    const element = document.getElementById(slotId);
    if (!element) return;

    let timer = null;
    let isVisible = false;

    const startTimer = () => {
      if (timer) return;
      timer = setInterval(() => {
        if (!isVisible) return;
        window.googletag.cmd.push(() => {
          const slot = window.googletag
            .pubads()
            .getSlots()
            .find((s) => s.getSlotElementId() === slotId);
          if (slot) {
            window.googletag.pubads().refresh([slot]);
          }
        });
      }, REFRESH_INTERVAL);
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            startTimer();
          } else {
            stopTimer();
          }
        });
      },
      { threshold: VIEWABILITY_THRESHOLD },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      stopTimer();
    };
  }, [slotId]);

  return null;
};

export default AdRefresh;
