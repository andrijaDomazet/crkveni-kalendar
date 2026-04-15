import { useEffect, useRef } from "react";
import { useRouteContext } from "../../shared/RouteProvider.js";

// Slotovi koje smo već jednom display()-ovali tokom sesije
const displayedSlots = new Set();

const AdManagerSlot = ({ slotNumber, onSlotRenderEnded }) => {
  const { location } = useRouteContext();
  const prevPathRef = useRef(null);

  // Prvo prikazivanje — display() jednom po slotu
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
          const slot = pubads.getSlots().find((s) => s.getSlotElementId() === slotNumber);
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

  // SPA navigacija unutar iste rute (komponenta ostaje montirana)
  useEffect(() => {
    if (prevPathRef.current === null) {
      prevPathRef.current = location.pathname;
      return;
    }
    if (prevPathRef.current === location.pathname) return;

    prevPathRef.current = location.pathname;

    window.googletag?.cmd?.push(() => {
      try {
        const pubads = window.googletag.pubads?.();
        if (!pubads) return;
        const slot = pubads.getSlots().find((s) => s.getSlotElementId() === slotNumber);
        if (slot) pubads.refresh([slot]);
      } catch (e) {
        console.warn("GPT refresh skipped:", e);
      }
    });
  }, [location.pathname, slotNumber]);

  return <div id={slotNumber} />;
};

export default AdManagerSlot;
