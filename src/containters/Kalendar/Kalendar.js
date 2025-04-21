import React from "react";
import Calendar from "../../components/Calendar/Calendar";
// import ContenExBox from "../../components/ContentEx/ContenExBox";
import "./Kalendar.scss";
// import { useGlobalLocation } from "../../shared/LocationContext";
// import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
// import { useIdContext } from "../../shared/IdProvider";
import CalendarMonthsLinks from "../../components/CalendarMonthsLinks/CalendarMonthsLinks";
import Zadusnice from "../../components/Zadusnice/Zadusnice";

export default function Kalendar() {
  return (
    <div className="kalendar">
      {/* <div className="banner-wrapper">
        <AdManagerSlot
          adUnitPath={location.pathname}
          slotNumber={"div-gpt-ad-1723658374440-0"}
        />
      </div> */}
      <div className="kalendar-wrapper">
        <div className="kalendar-left">
          <Calendar />
          <CalendarMonthsLinks />
        </div>
        <div className="kalendar-right">
          <Zadusnice />
          {/* <div className="posni_kalendar">
            <h2>Kalendar posta</h2>
            <div
              style={{
                width: "100%",
                height: "300px",
                border: "1px solid red",
              }}
            >
              Kalendar posta
            </div>
          </div> */}
          {/* <div className="banner-wrapper xl_sticky">
            <AdManagerSlot
              adUnitPath={location.pathname}
              slotNumber={"div-gpt-ad-1723682121612-0"}
            />
          </div> */}
        </div>
      </div>
      {/* <div className="banner-wrapper">
        <AdManagerSlot
          adUnitPath={location.pathname}
          slotNumber={"div-gpt-ad-1724367417806-0"}
        />
      </div> */}
      {/* <ContenExBox /> */}
      {/* <div className="banner-wrapper">
        <AdManagerSlot
          adUnitPath={location.pathname}
          slotNumber={"div-gpt-ad-1735207510691-0"}
        />
      </div> */}
    </div>
  );
}
