import React, { useState } from "react";
import "./SinglePost.scss";
import BodyText from "../../components/BodyText/BodyText";
import { useIdContext } from "../../shared/IdProvider";
import { useGlobalLocation } from "../../shared/LocationContext";
import { urlTitle2 } from "../../shared/utility";
import Zadusnice from "../../components/Zadusnice/Zadusnice";
import CrossingData from "../../components/CrossingData/CrossingData";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";
import ArticleBox from "../../components/ArticleBox/ArticleBox";
import Widget from "../../UI/Widget/Widget";
import molitve from "../../molitve.json";
import PostImage from "./img/PostImage";

export default function SinglePost() {
  const { id, slug, data } = useIdContext();
  const { pathPart } = useGlobalLocation();
  const [isNews, setIsNews] = useState(() => setArticleState());

  function setArticleState() {
    return data.find((post) => {
      return urlTitle2(post.title) === pathPart[1];
    });
  }
  function molitveBoxes() {
    return (
      <div className="molitveBoxes">
        {molitve.map((item, index) => {
          return (
            item.published && (
              <ArticleBox key={index} n={item} classes="boxWrapper topNews" />
            )
          );
        })}
      </div>
    );
  }

  const displayTitle = isNews.title_2 || isNews.title;

  return (
    <div className="singlePost">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <div className="content">
        <main className="mainContent">
          <figure
            className="mainContent-img"
            itemProp="image"
            itemScope
            itemType="https://schema.org/ImageObject"
          >
            <div className="mainContent-title">
              <h1>{isNews.title_2 || isNews.title}</h1>
            </div>
            <PostImage
              src={isNews.pics[0]}
              alt={displayTitle}
              loading="eager"
            />
            <div className="mainContent-img_source">
              Foto: {isNews.pics && isNews.pics[1]}
            </div>
          </figure>

          <div className="mainContent-body">
            <div className="mainContent-text">
              <strong className="mainContent-lead">{isNews.lead}</strong>
              <BodyText bodyText={isNews.body} />
              {pathPart[1] === "molitvenik" && molitveBoxes()}
              <div>{pathPart[1] === "zadusnice" && <Zadusnice />}</div>
              <div>{pathPart[1] === "slave" && <CrossingData />}</div>
              <div className="banner-wrapper">
                <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
              </div>
              <div className="tags">
                <span className="tags-title">Tagovi</span>
                <div className="tags__arr">
                  {isNews.tags.map((x, index) => {
                    return <span key={index}>{x}</span>;
                  })}
                </div>
              </div>
              <div className="banner-wrapper">
                <AdManagerSlot slotNumber={"div-gpt-ad-1750409277034-0"} />
              </div>
            </div>

            <div className="home__wrapper-right">
              {["slave", "meseceve-mene"].includes(pathPart[1]) && (
                <Zadusnice />
              )}
              <div className="banner-wrapper xl_sticky">
                <AdManagerSlot slotNumber={"div-gpt-ad-1750411708088-0"} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <Widget />
    </div>
  );
}
