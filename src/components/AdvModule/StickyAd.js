// import { useState } from "react";
// import "./StickyAd.scss";
// import AdManagerSlot from "./AdManagerSlot.js";

// export default function StickyAd(props) {
//   const [showSticky, setShowSticky] = useState(true);
//   const [contentLoaded, setContentLoaded] = useState(false);

//   return (
//     <div className="sticky-banner">
//       <div className="sticky-banner-box">
//         {showSticky && (
//           <div className="sticky-banner-wrapper">
//             <AdManagerSlot
//               adUnitPath={props.adUnitPath}
//               slotNumber={"div-gpt-ad-1713694757062-0"}
//               onSlotRenderEnded={(event) => {
//                 if (!event.isEmpty) {
//                   setContentLoaded(true);
//                 } else {
//                   setContentLoaded(false);
//                 }
//               }}
//             />
//           </div>
//         )}
//         {showSticky && contentLoaded && (
//           <img
//             className="closeButton"
//             src={"/img/closeButton.png"}
//             alt="close-button"
//             onClick={() => setShowSticky(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import "./StickyAd.scss";
import AdManagerSlot from "./AdManagerSlot.js";

export default function StickyAd({ adUnitPath, slotNumber }) {
  const [showSticky, setShowSticky] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  return (
    <div className="sticky-banner">
      <div className="sticky-banner-box">
        {showSticky && (
          <div className="sticky-banner-wrapper">
            <AdManagerSlot
              adUnitPath={adUnitPath}
              slotNumber={slotNumber}
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
