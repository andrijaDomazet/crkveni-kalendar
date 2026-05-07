"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const displayedSlots = new Set();

const AdManagerSlot = ({ slotNumber, onSlotRenderEnded }) => {
  const pathname = usePathname();
  const prevPathRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      try {
        const pubads = window.googletag.pubads?.();
        if (!pubads) return;

        if (onSlotRenderEnded) {
          pubads.addEventListener("slotRenderEnded", (event) => {
            if (event.slot.getSlotElementId() === slotNumber) {
              onSlotRenderEnded(event);
            }
          });
        }

        if (displayedSlots.has(slotNumber)) {
          const slot = pubads
            .getSlots()
            .find((s) => s.getSlotElementId() === slotNumber);
          if (slot) pubads.refresh([slot]);
        } else {
          window.googletag.display(slotNumber);
          displayedSlots.add(slotNumber);
        }
      } catch (e) {
        console.warn("GPT skipped:", e);
      }
    });
  }, [slotNumber]);

  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = pathname;
      return;
    }
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    window.googletag?.cmd?.push(() => {
      try {
        const pubads = window.googletag.pubads?.();
        if (!pubads) return;
        const slot = pubads
          .getSlots()
          .find((s) => s.getSlotElementId() === slotNumber);
        if (slot) pubads.refresh([slot]);
      } catch (e) {
        console.warn("GPT refresh skipped:", e);
      }
    });
  }, [pathname, slotNumber]);

  return <div id={slotNumber} />;
};

export default AdManagerSlot;
