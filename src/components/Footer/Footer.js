import { useIdContext } from "../../shared/IdProvider";
import { monthSerb } from "../../shared/shared";
import "./Footer.scss";

export default function Footer() {
  let { pageMonth, pageYear } = useIdContext();
  return (
    <footer className="footer">
      <div className="footer-border"></div>
      {/* <footer> */}
      {/* <div className="footer-description">
        <p>
          Crkveni kalendar je vaš pouzdani izvor informacija o svim pravoslavnim
          praznicima, krsnim slavama, postovima i običajima za 2026. godinu i
          naredne godine.
        </p>
      </div> */}

      <div className="footer-columns">
        <section>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              stroke-linejoin="round"
              className="lucide lucide-star w-4 h-4"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
            </svg>
            Popularno
          </div>
          <ul>
            <li>
              <a href={`/${pageYear}/${monthSerb[pageMonth]}/`}>
                {/* <i className="fa-solid fa-circle-arrow-right"></i>  */}
                Crkveni kalendar {`${monthSerb[pageMonth]}`} {`${pageYear}`}
              </a>
            </li>
            <li>
              <a href={`/${pageYear}/`}>{`Crkveni kalendar ${pageYear}`}</a>
            </li>
            <li>
              <a href="/slave/">Krsne slave</a>
            </li>
            <li>
              <a href="/zadusnice/">{`Zadušnice u ${pageYear}. godini`}</a>
            </li>
            {/* <li>
              <a href="/molitvenik/"><i className="fa-solid fa-circle-arrow-right"></i> Molitvenik</a>
            </li> */}
          </ul>
        </section>
        <section>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              stroke-linejoin="round"
              className="lucide lucide-book-open w-4 h-4"
            >
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
            Dodatni sadržaj
          </div>
          <ul>
            {/* <li>
              <a href="/o-nama/"><i className="fa-solid fa-circle-arrow-right"></i> O nama / Impressum</a>
            </li>
            <li>
              <a href="/kontakt/"><i className="fa-solid fa-circle-arrow-right"></i> Kontakt</a>
            </li>
            <li>
              <a href="/faq/"><i className="fa-solid fa-circle-arrow-right"></i> Najčešća pitanja (FAQ)</a>
            </li> */}
            <li>
              <a href="/molitvenik/">Molitvenik</a>
            </li>
            <li>
              <a href="/hriscanski-post/">Hrišćanski post</a>
            </li>
            <li>
              <a href="/meseceve-mene/">Mesečeve mene</a>
            </li>
          </ul>
        </section>
        {/* <section>
          <h3>Pravne informacije</h3>
          <ul>
            <li>
              <a href="/privatnost/">
                <i className="fa-solid fa-circle-arrow-right"></i> Politika
                privatnosti
              </a>
            </li>
            <li>
              <a href="/uslovi/"><i className="fa-solid fa-circle-arrow-right"></i> Uslovi korišćenja</a>
            </li>
            <li>
              <a href="/sitemap.html"><i className="fa-solid fa-circle-arrow-right"></i> Mapa sajta</a>
            </li>
          </ul>
        </section> */}
      </div>

      <div className="footer-copyright">
        <p>&copy; 2025 crkveni-kalendar.net. Sva prava zadržana.</p>
      </div>
      {/* </footer> */}
      {/* <div className="home__section5-bottom">
        © 2025 crkveni-kalendar.net® Sva prava zadržana.
      </div> */}
    </footer>
  );
}
