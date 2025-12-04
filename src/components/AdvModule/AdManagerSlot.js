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
  const previousLocation = useRef(
    typeof window !== "undefined"
      ? sessionStorage.getItem("prevPathname") || ""
      : ""
  );

  const loadedRef = useRef(false);
  const observerRef = useRef(null);

  // ---- NON-BLOCKING LOADER ----
  const loadGPT = () => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    if (!window.googletag) window.googletag = { cmd: [] };

    // Ubacujemo GPT skriptu LAZY
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
    document.head.appendChild(script);

    script.onload = () => {
      window.googletag.cmd.push(() => {
        window.googletag.display(slotNumber);

        // Listener za slotRenderEnded (samo jednom)
        window.googletag
          .pubads()
          .addEventListener("slotRenderEnded", (event) => {
            if (event.slot.getSlotElementId() === slotNumber) {
              if (typeof onSlotRenderEnded === "function") {
                onSlotRenderEnded(event);
              }
            }
          });

        window.googletag.enableServices();
      });
    };
  };

  // ---- LOAD ON VIEWPORT / IDLE / USER ACTION ----
  useEffect(() => {
    const safeLoad = () => loadGPT();

    // 1) Load kad user bilo šta uradi
    const events = ["click", "scroll", "keydown", "mousemove", "touchstart"];
    events.forEach((ev) =>
      window.addEventListener(ev, safeLoad, { once: true })
    );

    // 2) Load kad je browser idle
    if ("requestIdleCallback" in window) {
      requestIdleCallback(safeLoad, { timeout: 1500 });
    } else {
      setTimeout(safeLoad, 1200);
    }

    // 3) Load kad slot uđe u viewport (najefikasnije)
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        safeLoad();
        observerRef.current.disconnect();
      }
    });
    observerRef.current.observe(document.getElementById(slotNumber));

    return () => {
      events.forEach((ev) =>
        window.removeEventListener(ev, safeLoad, { once: true })
      );
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [slotNumber]);

  // ---- REFRESH ON LOCATION CHANGE (čuva tvoj originalni behavior) ----
  useEffect(() => {
    if (!loadedRef.current) return;

    if (!previousLocation.current) previousLocation.current = location.pathname;

    if (previousLocation.current !== location.pathname) {
      const slot = window.googletag
        ?.pubads()
        ?.getSlots()
        ?.find((s) => s.getSlotElementId() === slotNumber);

      if (slot) {
        window.googletag.pubads().refresh([slot]);
      }
    }

    previousLocation.current = location.pathname;
    sessionStorage.setItem("prevPathname", location.pathname);
  }, [location.pathname, slotNumber]);

  // ---- RENDER ----
  return <div id={slotNumber} style={{ minHeight: "50px" }}></div>;
};

export default AdManagerSlot;
