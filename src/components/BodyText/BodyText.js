import React from "react";
import { Tweet } from "react-twitter-widgets";
import "./BodyText.scss";

const setSubTitle = (item) => {
  // if (e.length > 0) {
  //   return <h2 className="mainContent-subtitle">{e}</h2>;
  // }
  if (item.subtitle) {
    return <h2 className="mainContent-subtitle">{item.subtitle}</h2>;
  } else if (item.subtitle3) {
    return <h3 className="mainContent-subtitle3">{item.subtitle3}</h3>;
  }
};
const setTweet = (e) => {
  if (e > 0) {
    return <Tweet tweetId={e} />;
  }
};
export default function BodyText(props) {
  return (
    <div className="bodyText">
      {props.bodyText?.map((item, index) => {
        if (index === 0) {
          return (
            <div key={index}>
              {setSubTitle(item)}
              <p dangerouslySetInnerHTML={{ __html: item["text"] }}></p>
              {setTweet(item.tweetId)}
              {/* <AdvModule classes="adClass__S" size={"s"} /> */}
            </div>
          );
        } else {
          return (
            <div key={index}>
              {setSubTitle(item)}
              <p dangerouslySetInnerHTML={{ __html: item["text"] }}></p>
              {setTweet(item.tweetId)}
            </div>
          );
        }
      })}
    </div>
  );
}
