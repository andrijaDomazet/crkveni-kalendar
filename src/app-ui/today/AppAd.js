"use client";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { useScriptContext } from "../../shared/ScriptProvider";

export default function AppAd({ slot }) {
  const { cyr } = useScriptContext();
  return (
    <div className="app-ad">
      <span className="app-ad__label">{cyr("OGLAS")}</span>
      <div className="app-ad__slot">
        <AdManagerSlot slotNumber={slot} />
      </div>
    </div>
  );
}
