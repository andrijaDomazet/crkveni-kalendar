"use client";
import Link from "next/link";
import { useScriptContext } from "../../shared/ScriptProvider";

// Oznaka krsne slave uz ime sveca (kao na webu); vodi na ekran Slave.
export default function SlavaBadge({ className = "" }) {
  const { cyr } = useScriptContext();
  return (
    <Link href="/app/slave/" className={`app-slava ${className}`.trim()}>
      {cyr("SLAVA")}
    </Link>
  );
}
