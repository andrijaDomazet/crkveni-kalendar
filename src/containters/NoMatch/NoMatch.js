"use client";
import Buttons from "../../UI/Button/Buttons.js";
import "./NoMatch.scss";
import { useRouter } from "next/navigation";

export default function NoMatch() {
  const router = useRouter();

  const changePage = () => {
    router.push(
      "/?utm_source=button&utm_medium=internal&utm_campaign=no_match_homepage",
    );
  };

  return (
    <div className="noMatch">
      <div className="noMatch-top">
        <img
          src={"/img/noMatch/noMatch.png"}
          alt="Greška 404: stranica nije pronađena. Vratite se na početnu stranicu."
        />
        <div>
          <span>UUUPS!</span>
          <h2>Greška 404: Stranica nije pronađena</h2>
          <p>
            Nešto se dogodilo! Trenutno ne možemo da pronađemo stranicu koju
            trazite ili stranica ne postoji. <br /> Molimo vas da osvežite
            stranicu ili pokušate da odete na neku drugu.
          </p>
          <Buttons children="Nazad na početnu" clicked={changePage} />
        </div>
      </div>
    </div>
  );
}
