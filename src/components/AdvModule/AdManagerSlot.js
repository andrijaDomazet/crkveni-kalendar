import { useEffect } from "react";
import { useRouteContext } from "../../shared/RouteProvider.js";

// Pamti koje smo slotove već jednom display()-ovali tokom sesije
const displayedSlots = new Set();

const AdManagerSlot = ({ slotNumber, onSlotRenderEnded }) => {
  const { location } = useRouteContext();

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
          // SPA navigacija — osveži bez brisanja innerHTML
          const slot = pubads
            .getSlots()
            .find((s) => s.getSlotElementId() === slotNumber);
          if (slot) pubads.refresh([slot]);
        } else {
          // Prvo prikazivanje
          window.googletag.display(slotNumber);
          displayedSlots.add(slotNumber);
        }
      } catch (e) {
        console.warn("GPT skipped:", e);
      }
    });
  }, [slotNumber, location.pathname]);

  return <div id={slotNumber} />;
};

export default AdManagerSlot;
