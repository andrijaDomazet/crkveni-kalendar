import React from "react";
import { lazy, Suspense } from "react";
import "./BodyText.scss";
import AdManagerSlot from "../AdvModule/AdManagerSlot";
import { useGlobalLocation } from "../../shared/LocationContext.js";
import Zadusnice from "../Zadusnice/Zadusnice.js";

const dynamicComponents = {
  Zadusnice,
};

const PostImage = lazy(() =>
  import("../../containters/SinglePost/img/PostImage.js")
);

const setSubTitle = (item) =>
  item.subtitle ? (
    <h2 className="mainContent-subtitle">{item.subtitle}</h2>
  ) : item.subtitle3 ? (
    <h3 className="mainContent-subtitle3">{item.subtitle3}</h3>
  ) : null;
const setQuote = (item) => {
  if (item.textQuote) {
    return (
      <blockquote
        className="textQuote"
        dangerouslySetInnerHTML={{ __html: item["textQuote"] }}
      ></blockquote>
    );
  }
};
const setImg = (item) => {
  if (item.imgSrc) {
    return (
      <div className="bodyImg">
        <Suspense fallback={<div></div>}>
          <PostImage src={item.imgSrc[0]} alt={item.imgSrc[1]} />
        </Suspense>
        <figcaption className="mainContent-img_source">
          <span>Foto: </span>
          <span dangerouslySetInnerHTML={{ __html: item.imgSrc[1] }}></span>
        </figcaption>
      </div>
    );
  }
};
const setComponent = (item) => {
  if (item.component && dynamicComponents[item.component]) {
    const Component = dynamicComponents[item.component];

    return (
      <Suspense fallback={<div></div>}>
        <Component />
      </Suspense>
    );
  }
  return null;
};

export default function BodyText(props) {
  const { pathPart } = useGlobalLocation();

  return (
    <div className="bodyText">
      {props.bodyText?.map((item, index) => {
        if (index === 0) {
          return (
            <React.Fragment key={index}>
              {setSubTitle(item)}
              <p dangerouslySetInnerHTML={{ __html: item["text"] }}></p>
              {setQuote(item)}
              {setImg(item)}
              {pathPart[1] !== "molitvenik" && pathPart[1] !== "" && (
                <div className="banner-wrapper">
                  <AdManagerSlot slotNumber={"div-gpt-ad-1750930023966-0"} />
                </div>
              )}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index}>
              {setSubTitle(item)}
              <p dangerouslySetInnerHTML={{ __html: item["text"] }}></p>
              {setImg(item)}
              {setQuote(item)}
              {setComponent(item)}
            </React.Fragment>
          );
        }
      })}
    </div>
  );
}
