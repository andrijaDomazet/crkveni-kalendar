"use client";
import { useEffect } from "react";
import { useScriptContext } from "../../shared/ScriptProvider";
import { slotSize } from "./slots";
import useSlotStatus from "./useSlotStatus";

// GPT sme da prikaze (display) slot samo jednom; kad se element ponovo ubaci u stranu
// (promena ekrana ili meseca), slot se osvezava umesto ponovnog prikaza.
const displayed = new Set();

function withSlot(slotId, callback) {
  const gpt = window.googletag;
  if (!gpt?.cmd) return;
  gpt.cmd.push(() => {
    const slot = gpt
      .pubads()
      .getSlots()
      .find((item) => item.getSlotElementId() === slotId);
    if (slot) callback(gpt, slot);
  });
}

export function showSlot(slotId) {
  withSlot(slotId, (gpt, slot) => {
    if (displayed.has(slotId)) {
      gpt.pubads().refresh([slot]);
    } else {
      gpt.display(slotId);
      displayed.add(slotId);
    }
  });
}

export function refreshSlot(slotId) {
  withSlot(slotId, (gpt, slot) => gpt.pubads().refresh([slot]));
}

// Pozadina je tacno velicine reklame (npr. 300x250), ne cele sirine, i nestaje kad nema reklame.
export default function AppAd({ slot }) {
  const { cyr } = useScriptContext();
  const status = useSlotStatus(slot);
  const [width, height] = slotSize(slot);

  useEffect(() => {
    showSlot(slot);
  }, [slot]);

  return (
    <div
      className="app-ad"
      hidden={status === "empty"}
      style={{ width, minHeight: height }}
    >
      <span className="app-ad__label">{cyr("OGLAS")}</span>
      <div className="app-ad__slot">
        <div id={slot} />
      </div>
    </div>
  );
}
