import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import AdvModule from "../../components/AdvModule/AdvModule";
import "./SinglePost.scss";
import data from "../../all__news.json";
// import data from "../../allData.json";
// import TimeFormat from "../../components/TimeFormat/TimeFormat";
import BodyText from "../../components/BodyText/BodyText";
import { Link } from "react-router-dom";
// import { useIdContext } from "../../shared/IdProvider";
import { useGlobalLocation } from "../../shared/LocationContext";
// import ContenExBox from "../../components/ContentEx/ContenExBox";
// import SmallBox from "../Manastiri/Tools/SmallBox";
// import Calendar from "../../components/Calendar/Calendar";

export default function SinglePost() {
  // let params = useParams();
  // const { id, slug } = useIdContext();
  const { pathPart } = useGlobalLocation();
  // console.log("Params", location, pathPart);
  const [isNews, setIsNews] = useState({ items: [] });

  useEffect(() => {
    let jsonConcat = data;
    let post = jsonConcat.filter((post) => {
      // console.log(urlTitle2(post.title), location.pathname);
      return urlTitle2(post.title) === pathPart[1];
    });
    console.log("Post", post[0]);
    setIsNews(post[0]);
  }, []);

  // const currentNews = () => {
  //   return data;
  // };

  const urlTitle2 = (title) => {
    const cyrilic = ["č", "ć", "ž", "š", "đ", ",", ":", "-", "?", "!", "."];
    const replArray = ["c", "c", "z", "s", "dj", "", "", "", "", "", ""];
    let regex = /--/gi;
    let url_title = title
      .toLowerCase()
      .split("")
      .map((x) => {
        return cyrilic.indexOf(x) === -1 ? x : replArray[cyrilic.indexOf(x)];
      })
      .join("")
      .split(" ")
      .join("-")
      .replace(regex, "-");
    return url_title;
  };
  const setTitle = (postTitle) => {
    // return postTitle.title_2 ? postTitle.title_2 : postTitle.title;
    return postTitle;
  };
  //   const setBody = (body) => {
  //     return <BodyText bodyText={body} />;
  //   };
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
  return (
    <div className="singlePost">
      {/* <AdvModule classes={"adClass__XXL"} size={"xxl"} /> */}
      <div className="content">{mainPost()}</div>
      {/* <section className="sp-2">
        <h2 className="sp-2-title">Manastiri Branicevske eparhije</h2>
        <div className="sp-2-box">
          <SmallBox n={data[1]} />
          <SmallBox n={data[2]} />
          <SmallBox n={data[3]} />
        </div>
      </section> */}
      {/* <AdvModule classes={"adClass__XXL"} size={"xxl"} /> */}
      {/* <ContenExBox /> */}
      {/* <AdvModule classes={"adClass__XXL"} size={"xxl"} /> */}
    </div>
  );
}
