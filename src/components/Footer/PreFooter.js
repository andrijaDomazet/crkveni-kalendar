"use client";
import React from "react";
import "./PreFooter.scss";
import SimpleBox from "../Boxes/SimpleBox/SimpleBox";
import { usePathname } from "next/navigation";

export default function PreFooter() {
  const pathname = usePathname();

  const allLinks = [
    ["Preobraženje Gospodnje", "/2026/avgust/"],
    ["Gospojinski post", "/hriscanski-post/"],
    ["Miholjske zadušnice", "/2026/oktobar/"],
    ["Crkveni kalendar 2027", "/2027/"],
    ["Mesečeve mene 2026", "/meseceve-mene/"],
  ];

  const filteredLinks = allLinks.filter((item) => !pathname.startsWith(item[1]));

  return (
    <div className="preFooter">
      <div className="preFooter-wrapper">
        {filteredLinks.map((item, index) => (
          <SimpleBox
            key={index}
            classes="central"
            linkText={item[1]}
            buttonText={item[0]}
          />
        ))}
      </div>
    </div>
  );
}