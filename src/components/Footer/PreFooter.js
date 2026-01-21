import React from "react";
import "./PreFooter.scss";
import SimpleBox from "../Boxes/SimpleBox/SimpleBox";

export default function PreFooter() {
  const allLinks = [
    // ["Kalendar 2026", "/2026/"],
    ["Vaskrs 2026", "/2026/april/"],
    // ["Pravoslavni kalendar", "/2026/"],
    ["Mladenci 2026", "/2026/mart/"],
    ["Spasovdan 2026", "/2026/maj/"],
  ];
  return (
    <div className="preFooter">
      <div className="preFooter-wrapper">
        {allLinks.map((item, index) => {
          return (
            <SimpleBox
              classes="central"
              //   classes="orange"
              linkText={item[1]}
              buttonText={item[0]}
              // buttonText={buttonText}
            />
          );
        })}
      </div>
    </div>
  );
}
