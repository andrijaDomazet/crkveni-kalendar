"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { latinToCyrillic, cyrillicHtml } from "./latinToCyrillic";

const ScriptContext = createContext();
export const useScriptContext = () => useContext(ScriptContext);

export const ScriptProvider = ({ children }) => {
  const [script, setScript] = useState("cyrillic"); // default cyrillic, bez flasha

  useEffect(() => {
    const saved = localStorage.getItem("ck-script");
    if (saved) setScript(saved);
  }, []);

  const toggleScript = useCallback(() => {
    setScript((prev) => {
      const next = prev === "latin" ? "cyrillic" : "latin";
      localStorage.setItem("ck-script", next);
      return next;
    });
  }, []);

  // Glavna helper funkcija — prima string ili array stringova
  const cyr = useCallback(
    (text) => {
      if (script !== "cyrillic") return text;
      if (Array.isArray(text)) return text.map((t) => latinToCyrillic(t));
      return latinToCyrillic(text);
    },
    [script],
  );

  const cyrHtml = useCallback(
    (html) => {
      return cyrillicHtml(html, script === "cyrillic");
    },
    [script],
  );

  return (
    <ScriptContext.Provider value={{ script, toggleScript, cyr, cyrHtml }}>
      {children}
    </ScriptContext.Provider>
  );
};
