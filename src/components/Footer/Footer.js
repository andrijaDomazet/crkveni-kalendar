"use client";
import { useRouteContext } from "../../shared/RouteProvider";
import { monthSerb } from "../../shared/shared";
import { getDayMonth } from "../../shared/utility";
import "./Footer.scss";

export default function Footer() {
  let { pageMonth, pageYear, currentDate } = useRouteContext();

  const dateDetails = getDayMonth(currentDate ?? new Date());

  return (
    <footer className="footer">
      <div className="footer-border"></div>
      <div className="footer-columns">
        <section>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star w-4 h-4"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
            </svg>
            Popularno
          </div>
          <ul>
            <li>
              <a href={`/${dateDetails.year}/${monthSerb[dateDetails.month]}/`}>
                {/* <i className="fa-solid fa-circle-arrow-right"></i>  */}
                Crkveni kalendar {`${monthSerb[dateDetails.month]}`}{" "}
                {`${dateDetails.year}`}
              </a>
            </li>
            <li>
              <a
                href={`/${pageYear}/`}
              >{`Crkveni kalendar ${dateDetails.year}`}</a>
            </li>
            <li>
              <a href="/slave/">Krsne slave</a>
            </li>
            <li>
              <a href="/zadusnice/">{`Zadušnice u ${dateDetails.year}. godini`}</a>
            </li>
          </ul>
        </section>
        <section>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-open w-4 h-4"
            >
              <path d="M12 7v14"></path>
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
            </svg>
            Dodatni sadržaj
          </div>
          <ul>
            {/* <li>
              <a href="/danas-je/">Danas je...</a>
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
        <section>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-church w-4 h-4"
            >
              <path d="M10 9h4"></path>
              <path d="M12 7v5"></path>
              <path d="M14 22v-4a2 2 0 0 0-4 0v4"></path>
              <path d="M18 22V5.618a1 1 0 0 0-.553-.894l-4.553-2.277a2 2 0 0 0-1.788 0L6.553 4.724A1 1 0 0 0 6 5.618V22"></path>
              <path d="m18 7 3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a1 1 0 0 1 .553-.894L6 7"></path>
            </svg>
            O sajtu
          </div>
          <ul>
            <li>
              <a href="/info/o-nama/">O nama</a>
            </li>
            <li>
              <a href="/info/pravila-koriscenja/">Politika korišćenja</a>
            </li>
            <li>
              <a href="/info/politika-privatnosti/">Politika privatnosti</a>
            </li>
          </ul>
        </section>
        <section>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar w-4 h-4"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>
            Pravoslavni kalendar
          </div>
          <p>
            Pravoslavni crkveni kalendar sa pregledom praznika, svetitelja,
            postova i važnih datuma. Namenjen svima koji žele da prate crkvenu
            godinu i sačuvaju vezu sa verom i tradicijom.
          </p>
        </section>
      </div>

      <div className="footer-copyright">
        <p>
          &copy; 2025 crkveni-kalendar.net. Sva prava zadržana | Dizajn i
          održavanje: <a href="https://tausolutions.rs/">TAUsolutions</a>
        </p>
      </div>
    </footer>
  );
}
