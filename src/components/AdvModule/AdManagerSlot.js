import { useEffect, useRef } from "react";
import { useGlobalLocation } from "../../shared/LocationContext.js";

const AdManagerSlot = ({ slotNumber }) => {
  const { location } = useGlobalLocation();
  const previouslocation = useRef(typeof window !== "undefined" ? sessionStorage.getItem("prevPathname") || "" : "");

  useEffect(() => {
    if (typeof window !== "undefined" && window.googletag) {
      window.googletag.cmd.push(function () {
        window.googletag.display(slotNumber);
      });
    }
  }, []);

  useEffect(() => {
    if (previouslocation.current && previouslocation.current !== location.pathname) {
      if (typeof window !== "undefined" && window.googletag) {
        window.googletag.cmd.push(function () {
          window.googletag.pubads().refresh();
        });
      }
    }
    previouslocation.current = location.pathname;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("prevPathname", location.pathname);
    }
  }, [location.pathname]);

  return <div id={slotNumber}></div>;
};

export default AdManagerSlot;
