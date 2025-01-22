import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import AdvModule from "../../components/AdvModule/AdvModule";
import "./SinglePost.scss";
import data from "../../all__news.json";
// import data from "../../allData.json";
// import TimeFormat from "../../components/TimeFormat/TimeFormat";
import BodyText from "../../components/BodyText/BodyText";
import { Link } from "react-router-dom";
import { useIdContext } from "../../shared/IdProvider";
import { useGlobalLocation } from "../../shared/LocationContext";
// import ContenExBox from "../../components/ContentEx/ContenExBox";
// import SmallBox from "../Manastiri/Tools/SmallBox";
// import Calendar from "../../components/Calendar/Calendar";
import { urlTitle2 } from "../../shared/utility";
export default function SinglePost(props) {
  // let params = useParams();
  const { id, slug, data } = useIdContext();
  const { pathPart } = useGlobalLocation();
  console.log("Params", pathPart);
  console.log("Data", data);
  // const [isNews, setIsNews] = useState({ items: [] });
  const [isNews, setIsNews] = useState(() => setArticleState());

  // useEffect(() => {
  //   // let jsonConcat = data;
  //   let post = data.find((post) => {
  //     console.log("TEST", urlTitle2(post.title), pathPart[1]);
  //     return urlTitle2(post.title) === pathPart[1];
  //   });
  //   console.log("Post", post[0]);
  //   setIsNews(post[0]);
  // }, []);

  function setArticleState() {
    return data.find((post) => {
      return urlTitle2(post.title) === pathPart[1];
    });
  }
  const mainPost = () => {
    return (
      <main className="mainContent">
        <div className="mainContent-img">
          <div className="mainContent-title">
            {/* <h2>{isNews.name && setTitle(isNews.region)}</h2> */}
            <h1>{isNews.title_2 || isNews.title}</h1>
            {/* <h2>{setTitle(isNews?.region)}</h2> */}
          </div>
          {/* <img src={isNews.pics[0]} alt="" /> */}
          <div className="mainContent-img_source">{/* Foto: {isNews.pics && isNews.pics[1]} */}</div>
        </div>
        {/* <div className="mainContent-nav">
          <Link to="">O manastiru</Link>
          <Link to="">Lokacija</Link>
          <Link to="">Galerija</Link>
        </div> */}
        {/* <AdvModule classes={"adClass__XXL"} size={"xxl"} /> */}
        <div className="mainContent-body">
          <div className="mainContent-text">
            <strong className="mainContent-lead">{isNews.lead}</strong>
            <BodyText bodyText={isNews.body} />
            {/* {isNews.info && setBody(isNews.info)} */}
          </div>
          <div>{/* <AdvModule classes="AdClass__XL" size={"xl"} /> */}</div>
        </div>
        {/* <div className="mainContent-text"></div> */}

        <div className="time">
          {/* Datum: <TimeFormat timePost={isNews.time2} />,  */}
          {/* Izvor: {isNews.source} */}
        </div>
        <div className="tags">
          {/* <span className="tags-title">Tagovi</span> */}
          {/* <div className="tags__arr">
            {isNews.tags &&
              isNews.tags.map((x, index) => {
                return <span key={index}>{x}</span>;
              })}
          </div> */}
        </div>
      </main>
    );
  };
  console.log("Pics", isNews);
  return (
    <div className="singlePost">
      <div className="content">
        <main className="mainContent">
          <div className="mainContent-img">
            <div className="mainContent-title">
              <h1>{isNews.title_2 || isNews.title}</h1>
            </div>
            <img src={`${isNews.pics[0]}`} alt="" />
            <div className="mainContent-img_source">Foto: {isNews.pics && isNews.pics[1]}</div>
          </div>
          <div className="mainContent-body">
            <div className="mainContent-text">
              <strong className="mainContent-lead">{isNews.lead}</strong>
              <BodyText bodyText={isNews.body} />
              {/* {isNews.info && setBody(isNews.info)} */}
            </div>
            <div className="time">
              {/* Datum: <TimeFormat timePost={isNews.time2} />,  */}
              Izvor: {isNews.source}
            </div>
          </div>
        </main>
      </div>
      {/* <section className="sp-2">
        <h2 className="sp-2-title">Manastiri Branicevske eparhije</h2>
        <div className="sp-2-box">
          <SmallBox n={data[1]} />
          <SmallBox n={data[2]} />
          <SmallBox n={data[3]} />
        </div>
      </section> */}
      {/* <ContenExBox /> */}
    </div>
  );
}
