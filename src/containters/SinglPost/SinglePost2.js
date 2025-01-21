import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./SinglePost2.scss";
// import AdvModule from "../../components/AdvModule/AdvModule";
import ArticalBox from "../../components/ArticalBox/ArticalBox";
import BodyText from "../../components/BodyText/BodyText";
import SocialButtons from "../../UI/SocialButtons/SocialButtons";
import HeadHelmet from "../../UI/HeadHelmet/HeadHelmet";
import TimeFormat from "../../components/TimeFormat/TimeFormat";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import { useGlobalLocation } from "../../shared/LocationContext";
import { useIdContext } from "../../shared/IdProvider";

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
  return postTitle.title_2 ? postTitle.title_2 : postTitle.title;
};

export default function SinglePost2(props) {
  const { data } = useIdContext();
  const { id } = useParams();
  // console.log("ID", id);
  // let location = useLocation();
  const location = useGlobalLocation();

  const newData = () => {
    let dd = data.filter((item) => {
      return urlTitle2(item.title) === id;
    });
    return dd[0];
  };
  const [newsPost, setNewsPost] = useState(newData);
  useEffect(() => {
    setNewsPost(newData);
  }, [location.pathname]);

  return (
    <div className="singlePost2">
      <div className="banner-wrapper">
        <AdManagerSlot
          adUnitPath={location.pathname}
          slotNumber={"div-gpt-ad-1723658374440-0"}
        />
      </div>
      {/* <SocialButtons location={location} /> */}
      <div className="content">
        <main className="mainContent">
          {/* <SocialButtons location={location} /> */}
          <article className="mainContent-wrapper">
            <div className="time">
              Datum: <TimeFormat timePost={newsPost.time2} />
              {/* , Izvor:{" "}
              {newsPost.source} */}
            </div>
            <h1 className="mainContent-title">{setTitle(newsPost)}</h1>
            <strong className="mainContent-lead">{newsPost.lead}</strong>
            <div className="mainContent-img">
              <img src={`${newsPost.pics[0]}`} alt="" />
              <div className="mainContent-img_source">
                Foto: {newsPost.pics[1]}
              </div>
            </div>
            <div>
              <BodyText bodyText={newsPost.body} />
            </div>
            <div className="tags">
              <span className="tags-title">Tagovi</span>
              <div className="tags__arr">
                {newsPost.tags.map((x, index) => {
                  return <span key={index}>{x}</span>;
                })}
              </div>
            </div>
          </article>
          {/* <SocialButtons location={location} /> */}
        </main>
        <aside className="newsAside">
          <div className="banner-wrapper xl_sticky">
            <AdManagerSlot
              adUnitPath={location.pathname}
              slotNumber={"div-gpt-ad-1723682121612-0"}
            />
          </div>
          {/* <AdvModule classes={"adClass xl_sticky"} size={"xl"} /> */}
        </aside>
      </div>
    </div>
  );
}
