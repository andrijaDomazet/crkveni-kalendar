"use client";
import Providers from "../../shared/Providers";
import ThemeProvider from "../theme/ThemeProvider";

export default function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <Providers>{children}</Providers>
    </ThemeProvider>
  );
}
