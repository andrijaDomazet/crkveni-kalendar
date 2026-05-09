"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const AdManagerSlot = ({ slotNumber, onSlotRenderEnded }) => {
  const pathname = usePathname();
  const previousLocation = useRef(
    typeof window !== "undefined"
      ? sessionStorage.getItem("prevPathname") || ""
      : "",
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.googletag) {
      window.googletag.cmd.push(function () {
        const slots = window.googletag.pubads().getSlots();
        console.log(
          "Dostupni slotovi:",
          slots.map((s) => s.getSlotElementId()),
        );
        console.log("Tražim:", slotNumber);
        window.googletag.display(slotNumber);
        window.googletag
          .pubads()
          .addEventListener("slotRenderEnded", (event) => {
            if (event.slot.getSlotElementId() === slotNumber) {
              if (typeof onSlotRenderEnded === "function") {
                onSlotRenderEnded(event);
              }
            }
          });
      });
    }
  }, [slotNumber, onSlotRenderEnded]);

  useEffect(() => {
    if (!window.googletag?.cmd) return;
    if (!previousLocation.current) previousLocation.current = pathname;

    if (previousLocation.current !== pathname) {
      window.googletag.cmd.push(() => {
        const slot = window.googletag
          .pubads()
          .getSlots()
          .find((s) => s.getSlotElementId() === slotNumber);
        if (slot) window.googletag.pubads().refresh([slot]);
      });
    }

    previousLocation.current = pathname;
    sessionStorage.setItem("prevPathname", pathname);
  }, [pathname, slotNumber]);

  return <div id={slotNumber}></div>;
};

export default AdManagerSlot;
