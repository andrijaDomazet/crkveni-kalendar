"use client";
import { useScriptContext } from "../../shared/ScriptProvider";
import "./ScriptToggle.scss";

export default function ScriptToggle() {
  const { script, toggleScript } = useScriptContext();
  return (
    <button
      className={`script-toggle ${script === 'cyrillic' ? 'active' : ''}`}
      onClick={toggleScript}
      title={script === 'latin' ? 'Prebaci na ćirilicu' : 'Prebaci na latinicu'}
    >
      {script === 'latin' ? 'Ћир' : 'Lat'}
    </button>
  );
}