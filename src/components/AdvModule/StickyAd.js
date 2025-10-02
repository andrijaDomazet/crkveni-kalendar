// import React, { useEffect, useState, useRef } from "react";
// import "./StickyAd.scss";
// import AdManagerSlot from "./AdManagerSlot.js";

// export default function StickyAd(props) {
//   const [showSticky, setShowSticky] = useState(true);
//   const [contentLoaded, setContentLoaded] = useState(false);
//   const adDivRef = useRef(null);

//   useEffect(() => {
//     // const checkContentLoaded = () => {
//     //   const divContent = adDivRef.current;
//     //   setContentLoaded(adDivRef.current && divContent !== "" && divContent.children[0].clientHeight !== 0);
//     // };
//     const checkContentLoaded = () => {
//       const divContent = adDivRef.current;
//       const firstChild = divContent?.children?.[0];
//       const isLoaded = !!firstChild && firstChild.clientHeight > 0;
//       setContentLoaded(isLoaded);
//     };

//     // Provera da li je sadržaj u div-u učitan kada se komponenta prvi put ucita
//     checkContentLoaded();

//     // Proveravajte da li je sadržaj u div-u učitan kada se sadržaj promeni
//     const observer = new MutationObserver(checkContentLoaded);
//     if (adDivRef.current) {
//       observer.observe(adDivRef.current, { childList: true, subtree: true });
//     }
//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   //check on refresh page, redirect from one article to another if is sticky hight greater then 0
//   useEffect(() => {
//     // console.log("Sticky Changing article", contentLoaded);
//   }, [props.adUnitPath]);

//   function handleSticky() {
//     setShowSticky((prev) => !prev);
//     // setContentLoaded((prev) => !prev);
//   }
//   return (
//     <div className="sticky-banner">
//       <div className="sticky-banner-box">
//         {showSticky && (
//           <div ref={adDivRef} className="sticky-banner-wrapper">
//             {/* //change the slot number */}
//             {/* <AdManagerSlot adUnitPath={props.adUnitPath} slotNumber={"div-gpt-ad-1713694757062-0"} /> */}
//           </div>
//         )}
//         {contentLoaded && <img className="closeButton" src={"/img/closeButton.png"} alt="close-button" onClick={handleSticky} />}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import "./StickyAd.scss";
import AdManagerSlot from "./AdManagerSlot.js";

export default function StickyAd(props) {
  const [showSticky, setShowSticky] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  return (
    <div className="sticky-banner">
      <div className="sticky-banner-box">
        {showSticky && (
          <div className="sticky-banner-wrapper">
            <AdManagerSlot
              adUnitPath={props.adUnitPath}
              slotNumber={"div-gpt-ad-1713694757062-0"}
              onSlotRenderEnded={(event) => {
                if (!event.isEmpty) {
                  setContentLoaded(true);
                } else {
                  setContentLoaded(false);
                }
              }}
            />
          </div>
        )}
        {showSticky && contentLoaded && (
          <img
            className="closeButton"
            src={"/img/closeButton.png"}
            alt="close-button"
            onClick={() => setShowSticky(false)}
          />
        )}
      </div>
    </div>
  );
}
