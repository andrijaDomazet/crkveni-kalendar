import { useEffect } from "react";
import "./OnNetwork.scss";

const OnNetworkVideo = ({ sid, title }) => {
  useEffect(() => {
    // Kreiramo container unutar useEffect
    const container = document.getElementById(`video-container-${sid}`);
    if (!container) return;

    const script = document.createElement("script");
    script.src = `https://video.onnetwork.tv/embed.php?sid=${sid}`;
    script.async = true;

    container.appendChild(script);

    // cleanup
    return () => {
      container.removeChild(script);
    };
  }, [sid]);

  return (
    <div className="video-embed-wrapper">
      <p className="video-embed-title">
        {title || "Ovaj video će vam biti zanimljiv 👇👇👇"}
      </p>
      <div
        id={`video-container-${sid}`}
        className="video-embed-container"
      ></div>
    </div>
  );
};

export default OnNetworkVideo;
