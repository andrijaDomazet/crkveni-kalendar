"use client";
import { useParams } from "next/navigation";
import "./SimplePage.scss";
import { infoText } from "../../shared/shared.js";

export default function SimplePage() {
  const params = useParams();
  const slug = params?.slug;

  const validSlugs = [
    "o-nama",
    "pravila-koriscenja",
    "politika-privatnosti",
  ];
  const slugIndex = validSlugs.indexOf(slug);

  if (slugIndex === -1) return null;

  const bodyText = infoText[slugIndex];
  return (
    <div className="simplePage">
      <div className="simplePage-left">
        <h1>{bodyText[0]}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: bodyText[1],
          }}
        ></p>
      </div>
      <div className="simplePage-right"></div>
    </div>
  );
}
