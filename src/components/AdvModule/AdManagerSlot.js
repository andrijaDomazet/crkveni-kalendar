import { useEffect } from "react";

const AdManagerSlot = ({ slotNumber }) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.googletag = window.googletag || { cmd: [] };

    window.googletag.cmd.push(() => {
      try {
        window.googletag.display(slotNumber);
      } catch (e) {
        console.warn("GPT display skipped:", e);
      }
    });
  }, [slotNumber]);

  return <div id={slotNumber} />;
};

export default AdManagerSlot;
