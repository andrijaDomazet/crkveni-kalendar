"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  THEME_ATTR,
  THEME_COLORS,
  THEME_MODES,
  THEME_STORAGE_KEY,
} from "./themeConfig";

const ThemeContext = createContext({ mode: "system", setMode: () => {} });
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

export default function ThemeProvider({ children }) {
  const [mode, setModeState] = useState("system");

  useEffect(() => {
    let saved = "system";
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (THEME_MODES.includes(stored)) saved = stored;
    } catch {}
    setModeState(saved);
    applyTheme(saved);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(saved);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setMode = useCallback((next) => {
    setModeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    applyTheme(next);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
