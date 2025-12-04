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

export default function AdManagerSlot({ slotNumber, onSlotRenderEnded }) {
  const { location } = useGlobalLocation();
  const previousLocation = useRef("");

  // helper: čekaj da slot postoji pa osveži
  const tryRefreshSlot = () => {
    if (!window.googletag?.pubads) return;

    const pubads = window.googletag.pubads();
    const slot = pubads
      .getSlots()
      .find((s) => s.getSlotElementId() === slotNumber);

    if (slot) {
      pubads.refresh([slot]);
      return true;
    }

    return false;
  };

  // init display + listener
  useEffect(() => {
    if (!window.googletag) return;

    window.googletag.cmd.push(() => {
      // display slot SAMO prvi put
      window.googletag.display(slotNumber);

      const handler = (event) => {
        if (event.slot.getSlotElementId() === slotNumber) {
          onSlotRenderEnded?.(event);
        }
      };

      window.googletag.pubads().addEventListener("slotRenderEnded", handler);
    });
  }, []);

  // refresh on navigation
  useEffect(() => {
    if (!window.googletag?.cmd) return;

    if (
      previousLocation.current &&
      previousLocation.current !== location.pathname
    ) {
      window.googletag.cmd.push(() => {
        // odmah pokušaj refresh
        if (tryRefreshSlot()) return;

        // ako ne postoji — retry na 150 ms
        setTimeout(() => {
          tryRefreshSlot();
        }, 150);
      });
    }

    previousLocation.current = location.pathname;
  }, [location.pathname]);

  return <div id={slotNumber}></div>;
}
