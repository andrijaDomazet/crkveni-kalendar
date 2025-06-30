import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import Zadusnice from "../../components/Zadusnice/Zadusnice";
import CalendarMonthsLinks from "../../components/CalendarMonthsLinks/CalendarMonthsLinks";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import Widget from "../../UI/Widget/Widget";

export default function Home() {
  return (
    <div className="home">
      <section className="home__wrapper">
        <div className="home__wrapper-left">
          <Calendar shortCal={6} soc={false} />
          <div className="banner-wrapper">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div>
          <CalendarMonthsLinks />
          <div className="banner-wrapper">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
          </div>
        </div>
        <div className="home__wrapper-right">
          <Zadusnice />
          <div className="banner-wrapper xl_sticky">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750411708088-0"} />
          </div>
        </div>
      </section>
      <Widget />
    </div>
  );
}
