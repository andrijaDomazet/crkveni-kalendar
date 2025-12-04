// import { useEffect, useRef } from "react";
// import { useGlobalLocation } from "../../shared/LocationContext.js";

// const AdManagerSlot = ({ slotNumber, onSlotRenderEnded }) => {
//   const { location } = useGlobalLocation();
//   const previousLocation = useRef(
//     typeof window !== "undefined"
//       ? sessionStorage.getItem("prevPathname") || ""
//       : ""
//   );

//   useEffect(() => {
//     if (typeof window !== "undefined" && window.googletag) {
//       window.googletag.cmd.push(function () {
//         window.googletag.display(slotNumber);
//         // 🎯 dodaj listener samo jednom
//         window.googletag
//           .pubads()
//           .addEventListener("slotRenderEnded", (event) => {
//             if (event.slot.getSlotElementId() === slotNumber) {
//               if (typeof onSlotRenderEnded === "function") {
//                 onSlotRenderEnded(event); // prosledi parent komponenti
//               }
//             }
//           });
//       });
//     }
//   }, [slotNumber, onSlotRenderEnded]);

//   useEffect(() => {
//     if (!previousLocation.current) previousLocation.current = location.pathname;

//     if (previousLocation.current !== location.pathname) {
//       const slot = window.googletag
//         .pubads()
//         .getSlots()
//         .find((s) => s.getSlotElementId() === slotNumber);
//       if (slot) window.googletag.pubads().refresh([slot]);
//     }

//     previousLocation.current = location.pathname;
//     sessionStorage.setItem("prevPathname", location.pathname);
//   }, [location.pathname, slotNumber]);
//   return <div id={slotNumber}></div>;
// };

// export default AdManagerSlot;

import { useEffect, useRef } from "react";
import { useGlobalLocation } from "../../shared/LocationContext";

const AdManagerSlot = ({ slotNumber, onSlotRenderEnded }) => {
  const { location } = useGlobalLocation();
  const previousLocation = useRef("");

  useEffect(() => {
    if (typeof window === "undefined" || !window.googletag) return;

    window.googletag.cmd.push(() => {
      // prikazujemo slot SAMO prvi put
      window.googletag.display(slotNumber);

      // Listener dodajemo samo jednom po slotu
      const pubads = window.googletag.pubads();

      const handler = (event) => {
        if (event.slot.getSlotElementId() === slotNumber) {
          onSlotRenderEnded?.(event);
        }
      };

      pubads.addEventListener("slotRenderEnded", handler);
    });
  }, []); // ← NE SME imati dependencije!

  // REFRESH deo
  useEffect(() => {
    if (typeof window === "undefined" || !window.googletag?.pubads) return;

    if (
      previousLocation.current &&
      previousLocation.current !== location.pathname
    ) {
      // NAĐI slot
      const slot = window.googletag
        .pubads()
        .getSlots()
        .find((s) => s.getSlotElementId() === slotNumber);

      if (slot) {
        window.googletag.pubads().refresh([slot]);
      }
    }

    previousLocation.current = location.pathname;
  }, [location.pathname, slotNumber]);

  return <div id={slotNumber}></div>;
};

export default AdManagerSlot;
