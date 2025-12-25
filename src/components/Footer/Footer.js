import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-border"></div>
      {/* <footer> */}
      {/* <div class="footer-description">
        <p>
          Crkveni kalendar je vaš pouzdani izvor informacija o svim pravoslavnim
          praznicima, krsnim slavama, postovima i običajima za 2026. godinu i
          naredne godine.
        </p>
      </div> */}

      <div class="footer-columns">
        <section>
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-star w-4 h-4"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
            </svg>
            Popularno
          </h3>
          <ul>
            <li>
              <a href="/2025/decembar/">
                {/* <i className="fa-solid fa-circle-arrow-right"></i>  */}
                Crkveni kalendar decembar 2025
              </a>
            </li>
            <li>
              <a href="/2026/">Crkveni kalendar 2026</a>
            </li>
            <li>
              <a href="/slave/">Krsne slave</a>
            </li>
            <li>
              <a href="/zadusnice/">Zadušnice u 2026. godini</a>
            </li>
            {/* <li>
              <a href="/molitvenik/"><i className="fa-solid fa-circle-arrow-right"></i> Molitvenik</a>
            </li> */}
          </ul>
        </section>
        <section>
          <h3>Dodatni sadržaj</h3>
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

      <div class="footer-copyright">
        <p>&copy; 2025 crkveni-kalendar.net. Sva prava zadržana.</p>
      </div>
      {/* </footer> */}
      {/* <div className="home__section5-bottom">
        © 2025 crkveni-kalendar.net® Sva prava zadržana.
      </div> */}
    </footer>
  );
}
