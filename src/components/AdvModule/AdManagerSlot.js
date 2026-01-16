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
import { useGlobalLocation } from "../../shared/LocationContext.js";

const AdManagerSlot = ({ slotNumber, onSlotRenderEnded }) => {
  const { location } = useGlobalLocation();
  const prevPathRef = useRef(null);

  // 🔹 LISTENER + PRVI DISPLAY
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      try {
        const pubads = window.googletag.pubads?.();
        if (!pubads) return;

        pubads.addEventListener("slotRenderEnded", (event) => {
          if (event.slot.getSlotElementId() === slotNumber) {
            onSlotRenderEnded?.(event);
          }
        });

        // ⬅️ display SAMO jednom
        window.googletag.display(slotNumber);
      } catch (e) {
        console.warn("GPT init skipped:", e);
      }
    });
  }, [slotNumber, onSlotRenderEnded]);

  // 🔹 SPA ROUTE CHANGE = REFRESH (SAFE)
  useEffect(() => {
    if (!window.googletag?.cmd) return;

    if (prevPathRef.current === null) {
      prevPathRef.current = location.pathname;
      return;
    }

    if (prevPathRef.current !== location.pathname) {
      window.googletag.cmd.push(() => {
        try {
          const pubads = window.googletag.pubads?.();
          if (!pubads) return;

          const slot = pubads
            .getSlots()
            .find((s) => s.getSlotElementId() === slotNumber);

          if (slot) {
            // 🔥 KLJUČNA LINIJA
            const el = document.getElementById(slotNumber);
            if (el) el.innerHTML = "";

            pubads.refresh([slot]);
          }
        } catch (e) {
          console.warn("GPT refresh skipped:", e);
        }
      });

      prevPathRef.current = location.pathname;
    }
  }, [location.pathname, slotNumber]);

  return <div id={slotNumber} />;
};

export default AdManagerSlot;
