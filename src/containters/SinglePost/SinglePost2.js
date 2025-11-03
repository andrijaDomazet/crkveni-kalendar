import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import "./SinglePost2.scss";
// import AdvModule from "../../components/AdvModule/AdvModule";
// import BodyText from "../../components/BodyText/BodyText";
import { useGlobalLocation } from "../../shared/LocationContext";
import { useIdContext } from "../../shared/IdProvider";
import { urlTitle2 } from "../../shared/utility";
// import Molitva from "../../components/Molitva/Molitva";
import NoMatch from "../NoMatch/NoMatch";
import molitve from "../../molitve.json";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";

const MolitvaLazy = lazy(() => import("../../components/Molitva/Molitva.js"));
const setTitle = (postTitle) => {
  return postTitle.title_2 ? postTitle.title_2 : postTitle.title;
};

export default function SinglePost2() {
  const { data } = useIdContext();
  const { id, test } = useParams();
  const location = useGlobalLocation();
  console.log("ID", test);

  const newData = () => {
    let dd = molitve.filter((item) => {
      return urlTitle2(item.title) === test;
    });
    return dd[0];
  };
  const [newsPost, setNewsPost] = useState(newData);
  useEffect(() => {
    setNewsPost(newData);
  }, [location.pathname]);

  if (!data) {
    return <NoMatch />; // pravi 404 tek kad znaš da fetch nije uspeo
  }

  return (
    <div className="singlePost2">
      <div className="banner-wrapper bilbord">
        <AdManagerSlot slotNumber={"div-gpt-ad-1761641124263-0"} />
      </div>
      <div className="content">
        <main className="mainContent">
          <article className="mainContent-wrapper">
            <h1 className="mainContent-title">{setTitle(newsPost)}</h1>
            {/* <strong className="mainContent-lead">{newsPost.lead}</strong> */}
            <div className="mainContent-img">
              <img src={`${newsPost.pics[0]}`} alt="" />
              <div className="mainContent-img_source">
                Foto: {newsPost.pics[1]}
              </div>
            </div>
            <div className="mainContent-text">
              <Suspense fallback={<div></div>}>
                <MolitvaLazy molitva={newsPost} />
              </Suspense>
            </div>
          </article>
          <div className="banner-wrapper fix-size-horizontal">
            <AdManagerSlot slotNumber={"div-gpt-ad-1750409157804-0"} />
          </div>
        </main>
      </div>
    </div>
  );
}
