import { useEffect } from "react";
import "./Snow.scss";

const Snow = ({ count = 30 }) => {
  useEffect(() => {
    const container = document.getElementById("snow-container");
    if (!container) return;

    for (let i = 0; i < count; i++) {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.style.left = Math.random() * 100 + "%";
      snowflake.style.animationDuration = 3 + Math.random() * 5 + "s";
      snowflake.style.opacity = Math.random();
      snowflake.style.fontSize = 10 + Math.random() * 10 + "px";
      container.appendChild(snowflake);
    }

    return () => {
      container.innerHTML = "";
    };
  }, [count]);

  return <div id="snow-container" />;
};

export default Snow;
