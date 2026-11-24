"use client";
import { useScriptContext } from "../../shared/ScriptProvider";

export default function ScreenTitle({ title, lead }) {
  const { cyr } = useScriptContext();
  return (
    <div className="app-screen-title">
      <h1>{cyr(title)}</h1>
      {lead && <p>{cyr(lead)}</p>}
    </div>
  );
}
