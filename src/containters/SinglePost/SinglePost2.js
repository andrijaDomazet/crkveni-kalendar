"use client";
import { useState, useEffect, lazy, Suspense } from "react";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import "./SinglePost2.scss";
import { urlTitle2 } from "../../shared/utility";
import NoMatch from "../NoMatch/NoMatch";
import molitve from "../../molitve.json";
import AdManagerSlot from "../../components/AdvModule/AdManagerSlot";

const MolitvaLazy = lazy(() => import("../../components/Molitva/Molitva.js"));
const setTitle = (postTitle) => {
  return postTitle.title_2 ? postTitle.title_2 : postTitle.title;
};

export default function SinglePost2() {
  const params = useParams();
  const test = params?.test;
  const pathname = usePathname();

  const newData = () => {
    let dd = molitve.filter((item) => {
      return urlTitle2(item.title) === test;
    });
    return dd[0];
  };
  const [newsPost, setNewsPost] = useState(newData);
  useEffect(() => {
    setNewsPost(newData);
  }, [pathname]);

  if (!newsPost) {
    return <NoMatch />;
  }

  return (
    <div className="singlePost2">
      <div className="banner-wrapper bilbord">
        <div id="onBid_billboard"></div>
      </div>
      <div className="content">
        <main className="mainContent">
          <article className="mainContent-wrapper">
            <h1 className="mainContent-title">{setTitle(newsPost)}</h1>
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
