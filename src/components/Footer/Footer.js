import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
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
          <h3>Popularno</h3>
          <ul>
            <li>
              <a href="/2026/"><i className="fa-solid fa-circle-arrow-right"></i> Crkveni kalendar 2026</a>
            </li>
            <li>
              <a href="/slave/"><i className="fa-solid fa-circle-arrow-right"></i> Krsne slave</a>
            </li>
            <li>
              <a href="/zadusnice/"><i className="fa-solid fa-circle-arrow-right"></i> Zadušnice</a>
            </li>
            <li>
              <a href="/molitvenik/"><i className="fa-solid fa-circle-arrow-right"></i> Molitvenik</a>
            </li>
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
              <a href="/meseceve-mene/"><i className="fa-solid fa-circle-arrow-right"></i> Mesečeve mene</a>
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
