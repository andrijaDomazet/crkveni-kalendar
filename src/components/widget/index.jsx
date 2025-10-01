import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Calendar from "../components/Calendar/Calendar"; // tvoja postojeća komponenta

function WidgetApp() {
  // Auto-resize iframe
  useEffect(() => {
    const sendHeight = () => {
      if (window.parent !== window) {
        const height = document.body.scrollHeight;
        window.parent.postMessage({ type: "resizeKalendar", height }, "*");
      }
    };

    sendHeight();
    const resizeObserver = new ResizeObserver(sendHeight);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Calendar />} />
    </Routes>
  );
}

// Mount widget u div sa id="root"
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <MemoryRouter>
    <WidgetApp />
  </MemoryRouter>
);
