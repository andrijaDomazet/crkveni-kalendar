import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SimplePage.scss";
import { infoText } from "../../shared/shared.js";
// import useScrollToTop from "../../shared/useScrollToTop.js";

export default function SimplePage() {
  const navigate = useNavigate();
  const { id, slug } = useParams();
  console.log("Slug", slug);

  const validSlugs = [
    "o-nama",
    "marketing",
    "pravila-koriscenja",
    "politika-privatnosti",
  ];
  const slugIndex = validSlugs.indexOf(slug);

  // useScrollToTop([slug]);

  // useEffect(() => {
  //   if (slugIndex === -1) {
  //     navigate("*");
  //   }
  // }, [slugIndex, navigate]); // Osiguravamo da navigate bude pozvan samo kada slugIndex bude promenjen

  // if (slugIndex === -1) {
  //   return null; // Ovdje možemo return null da bi se izbeglo renderovanje komponenta dok ne izvrši navigaciju
  // }

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
