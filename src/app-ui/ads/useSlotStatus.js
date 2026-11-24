"use client";
import { useEffect, useRef, useState } from "react";

// Stanje reklamnog slota: "loading" -> "filled" ili "empty" (kad GPT javi da nema reklame).
// Poziva se pre effect-a koji prikazuje slot, da slusalac stigne pre prvog zahteva.
export default function useSlotStatus(slotId, onRender) {
  const [status, setStatus] = useState("loading");
  const callback = useRef(onRender);
  callback.current = onRender;

  useEffect(() => {
    const gpt = window.googletag;
    if (!gpt?.cmd) return;
    const handler = (event) => {
      if (event.slot.getSlotElementId() !== slotId) return;
      callback.current?.(event);
      setStatus(event.isEmpty ? "empty" : "filled");
    };
    gpt.cmd.push(() => gpt.pubads().addEventListener("slotRenderEnded", handler));
    return () => {
      gpt.cmd.push(() =>
        gpt.pubads().removeEventListener("slotRenderEnded", handler),
      );
    };
  }, [slotId]);

  return status;
}
