import { useEffect, useRef } from "react";
import { useGlobalLocation } from "../../shared/LocationContext.js";

const AdManagerSlot = ({ slotNumber, onSlotRenderEnded }) => {
  const { location } = useGlobalLocation();
  const previousLocation = useRef(
    typeof window !== "undefined"
      ? sessionStorage.getItem("prevPathname") || ""
      : ""
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.googletag) {
      window.googletag.cmd.push(function () {
        window.googletag.display(slotNumber);
        // 🎯 dodaj listener samo jednom
        window.googletag
          .pubads()
          .addEventListener("slotRenderEnded", (event) => {
            if (event.slot.getSlotElementId() === slotNumber) {
              if (typeof onSlotRenderEnded === "function") {
                onSlotRenderEnded(event); // prosledi parent komponenti
              }
            }
          });
      });
    }
  }, [slotNumber, onSlotRenderEnded]);

  useEffect(() => {
    if (!previousLocation.current) previousLocation.current = location.pathname;

    if (previousLocation.current !== location.pathname) {
      const slot = window.googletag
        .pubads()
        .getSlots()
        .find((s) => s.getSlotElementId() === slotNumber);
      if (slot) window.googletag.pubads().refresh([slot]);
    }

    previousLocation.current = location.pathname;
    sessionStorage.setItem("prevPathname", location.pathname);
  }, [location.pathname, slotNumber]);

  return <div id={slotNumber}></div>;
};

export default AdManagerSlot;

// import { useEffect, useRef } from "react";
// import { useGlobalLocation } from "../../shared/LocationContext.js";

// const AdManagerSlot = ({
//   slotNumber,
//   onSlotRenderEnded,
//   isOutOfPage = false,
// }) => {
//   const { location } = useGlobalLocation();
//   const listenerAddedRef = useRef(false);

//   useEffect(() => {
//     if (!window.googletag || !window.googletag.cmd) return;

//     // sve stavimo u cmd.push da budemo sigurni da je GPT inicijalizovan
//     window.googletag.cmd.push(() => {
//       const pubads = window.googletag.pubads?.();
//       if (!pubads) return;

//       // 🎯 listener dodajemo samo jednom
//       if (
//         !listenerAddedRef.current &&
//         typeof onSlotRenderEnded === "function"
//       ) {
//         pubads.addEventListener("slotRenderEnded", (event) => {
//           if (event.slot.getSlotElementId() === slotNumber) {
//             onSlotRenderEnded(event);
//           }
//         });
//         listenerAddedRef.current = true;
//       }

//       const slot = pubads
//         .getSlots()
//         .find((s) => s.getSlotElementId() === slotNumber);

//       if (!slot) {
//         // Slot još nije prikazan → display
//         window.googletag.display(slotNumber);
//       } else {
//         // Slot postoji → SPA update
//         if (isOutOfPage) {
//           // bilbord / out-of-page slot
//           window.googletag.display(slotNumber);
//         } else {
//           // običan slot → refresh
//           pubads.refresh([slot]);
//         }
//       }
//     });
//   }, [location.pathname, slotNumber, isOutOfPage, onSlotRenderEnded]);

//   return <div id={slotNumber}></div>;
// };

// export default AdManagerSlot;
