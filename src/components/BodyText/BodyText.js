import React from "react";
import "./BodyText.scss";

const setSubTitle = (item) =>
  item.subtitle ? (
    <h2 className="mainContent-subtitle">{item.subtitle}</h2>
  ) : item.subtitle3 ? (
    <h3 className="mainContent-subtitle3">{item.subtitle3}</h3>
  ) : null;

export default function BodyText(props) {
  return (
    <div className="bodyText">
      {props.bodyText?.map((item, index) => {
        if (index === 0) {
          return (
            <div key={index}>
              {setSubTitle(item)}
              <p dangerouslySetInnerHTML={{ __html: item["text"] }}></p>
            </div>
          );
        } else {
          return (
            <div key={index}>
              {setSubTitle(item)}
              <p dangerouslySetInnerHTML={{ __html: item["text"] }}></p>
            </div>
          );
        }
      })}
    </div>
  );
}
