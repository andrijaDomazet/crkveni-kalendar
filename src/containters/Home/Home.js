import "./Home.scss";
import Calendar from "../../components/Calendar/Calendar";
import Zadusnice from "../../components/Zadusnice/Zadusnice";
import CalendarMonthsLinks from "../../components/CalendarMonthsLinks/CalendarMonthsLinks";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import Widget from "../../UI/Widget/Widget";
// import Molitva from "../../components/Molitva/Molitva";
// import molitve from "../../molitve.json";
export default function Home() {
  return (
    <div className="home">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <section className="home__wrapper">
        <div className="home__wrapper-left">
          <Calendar shortCal={6} soc={false} />
          <section class="calendar-2026">
            <h2>📅 Crkveni kalendar 2026</h2>
            <p>
              Ovde je već dostupan i{" "}
              <a
                href="https://crkveni-kalendar.net/2026/"
                title="Crkveni kalendar 2026"
              >
                crkveni kalendar za 2026. godinu
              </a>{" "}
              sa svim važnim praznicima.
            </p>
          </section>

          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div>
          <CalendarMonthsLinks />
          <div className="banner-wrapper">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
          </div>
          {/* <div>
            <h2>Oče naš</h2>
            <Molitva molitva={molitve[molitve.length-1]} />
          </div> */}
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
