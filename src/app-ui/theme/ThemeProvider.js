"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FONT_ATTR,
  FONT_SIZES,
  FONT_STORAGE_KEY,
  THEME_ATTR,
  THEME_COLORS,
  THEME_MODES,
  THEME_STORAGE_KEY,
} from "./themeConfig";

// Izgled aplikacije: tema i velicina slova.
const ThemeContext = createContext({
  mode: "system",
  setMode: () => {},
  fontSize: "normal",
  setFontSize: () => {},
});
export const useAppTheme = () => useContext(ThemeContext);

function applyTheme(mode) {
  const root = document.documentElement;
  if (mode === "light" || mode === "dark") {
    root.setAttribute(THEME_ATTR, mode);
  } else {
    root.removeAttribute(THEME_ATTR);
  }
  const dark =
    mode === "dark" ||
    (mode === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
}

function applyFontSize(size) {
  const root = document.documentElement;
  if (size === "normal") root.removeAttribute(FONT_ATTR);
  else root.setAttribute(FONT_ATTR, size);
}

function readStored(key, allowed, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return allowed.includes(stored) ? stored : fallback;
  } catch {
    return fallback;
  }
}

function store(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export default function ThemeProvider({ children }) {
  const [mode, setModeState] = useState("system");
  const [fontSize, setFontSizeState] = useState("normal");

  useEffect(() => {
    const savedMode = readStored(THEME_STORAGE_KEY, THEME_MODES, "system");
    const savedSize = readStored(FONT_STORAGE_KEY, FONT_SIZES, "normal");
    setModeState(savedMode);
    setFontSizeState(savedSize);
    applyTheme(savedMode);
    applyFontSize(savedSize);
  }, []);

  // Prati promenu sistemske teme dok je izabrano "Sistem".
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(mode);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [mode]);

  const setMode = useCallback((next) => {
    setModeState(next);
    store(THEME_STORAGE_KEY, next);
    applyTheme(next);
  }, []);

  const setFontSize = useCallback((next) => {
    setFontSizeState(next);
    store(FONT_STORAGE_KEY, next);
    applyFontSize(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, setMode, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
}
