import React, { useState } from "react";
import "./SinglePost.scss";
import BodyText from "../../components/BodyText/BodyText";
import { useIdContext } from "../../shared/IdProvider";
import { useGlobalLocation } from "../../shared/LocationContext";
import { urlTitle2 } from "../../shared/utility";
export default function SinglePost(props) {
  const { id, slug, data } = useIdContext();
  const { pathPart } = useGlobalLocation();
  const [isNews, setIsNews] = useState(() => setArticleState());

  function setArticleState() {
    return data.find((post) => {
      return urlTitle2(post.title) === pathPart[1];
    });
  }
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
            </div>
            <div className="time">
              Izvor: {isNews.source}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
