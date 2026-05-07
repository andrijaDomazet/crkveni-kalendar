"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "./OnNetwork.scss";

const OnNetworkVideo = ({ sid, title }) => {
  const containerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = `https://video.onnetwork.tv/embed.php?sid=${sid}`;
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [pathname]);

  return (
    <div className="video-embed-wrapper">
      <p className="video-embed-title">
        {title || "Ovaj video će vam biti zanimljiv 👇👇👇"}
      </p>
      <div ref={containerRef} className="video-embed-container"></div>
    </div>
  );
};

export default OnNetworkVideo;
