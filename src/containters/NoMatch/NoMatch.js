import Buttons from "../../UI/Button/Buttons.js";
import "./NoMatch.scss";
// import ArticleBox from "../../components/ArticleBox/ArticleBox.js";
import { useNavigate } from "react-router";

export default function NoMatch() {
  // const { publishedNews, topNews } = useIdContext();
  const navigate = useNavigate();

  const changePage = () => {
    navigate(
      "/?utm_source=button&utm_medium=internal&utm_campaign=no_match_homepage"
    );
  };

  const setClass = () => {
    if (window.innerWidth < 500) {
      return "boxWrapper mainBox";
    } else {
      return "boxWrapper mainBox";
    }
  };
  // const setNewsBoxes = (n, newsState, classDiv, classBox) => {
  //   return newsState ? (
  //     <div className={classDiv}>
  //       {newsState.slice(n[0], n[1]).map((news, index) => {
  //         return <ArticleBox key={index} n={news} classes={classBox} />;
  //       })}
  //     </div>
  //   ) : (
  //     <div>Učitavanje...</div>
  //   );
  // };
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
      {/* <h1>Agroweb.rs - Najnovije vesti</h1> */}
      {/* <section className="home__box__11">{setNewsBoxes([1, 7], publishedNews, "home__box__2-layout", setClass())}</section> */}
      {/* <ArticleBox n={topNews[0]} classes="boxWrapper topNews" /> */}
      {/* <section className="home__box__11">{setNewsBoxes([7, 19], publishedNews, "home__box__2-layout", setClass())}</section> */}
    </div>
  );
}
