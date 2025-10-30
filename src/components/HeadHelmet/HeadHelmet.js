import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import { options } from "../../shared/shared";
import data from "../../all__news";
import molitve from "../../molitve.json";
import { urlTitle2 } from "../../shared/utility";

export default function HeadHelmet() {
  const loc = useLocation();
  const { id, test } = useParams();
  let pathPart = loc.pathname.split("/");
  let lastPathPart = pathPart[pathPart.length - 2];
  // const tagNews = data.filter((item) => {
  //   // return urlTitle2(item.tags[0]) === lastPathPart;
  // });
  // console.log("PAth part", pathPart[1] === "crkveni-kalendar", pathPart);
  const [post, setPost] = useState(() => setArticleState());

  useEffect(() => {
    // console.log("Effect Helmet", pathPart);
    setPost(setArticleState());
    // console.log("Post", post);
  }, [loc.pathname]);

  function setArticleState() {
    let lastPathPart = pathPart[pathPart.length - 2];
    // console.log("Pathparts helmet", pathPart);
    // console.log("Last Pathparts helmet", lastPathPart);

    if (lastPathPart === "") {
      // console.log("IF 1");

      let post = options[0].social;
      return post;

      // } else if (pathPart[1] === "crkveni-kalendar" && pathPart.length > 2) {
    } else if (pathPart.length === 4) {
      //po mesecima
      // console.log("Else 1");
      if (pathPart[1] === "molitvenik") {
        let post = molitve.filter((item) => {
          return urlTitle2(item.title) === pathPart[2];
        });
        post[0].lead = `${post[0].title}, tekst molitve: ${post[0].lead}`;
        let post2 = post[0];
        return post2;
      } else {
        let post = options[1].social2;
        let testSocTag = {
          pics: post.pics,
          source: "crkveni-kalendar.net",
          title: `Crkveni pravoslavni kalendar - ${lastPathPart.toUpperCase()} ${
            pathPart[1]
          } `,
          // time2: tagNews[tagNews.length - 1].time2,
          // modified: tagNews[0].time2,
          lead: `Crkveni pravoslavni kalendar - ${lastPathPart.toUpperCase()} ${
            pathPart[1]
          } ${post.lead} za ${pathPart[2]} ${pathPart[1]}. godine`,
        };
        return testSocTag;
      }
    } else if (pathPart[1] === "crkveni-kalendar" && pathPart.length === 2) {
      // console.log("Else 2");
      let post = options[3].social;
      return post;
    } else if (pathPart[2] === "meseceve-mene") {
      // console.log("Else 3");
      let post = options[4].social;
      return post;
    } else {
      // console.log("Else 4");
      let post = options[0].social;
      return post;
    }
  }
  const setTitle = (postTitle) => {
    return postTitle.title_2 ? postTitle.title_2 : postTitle.title;
  };
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{setTitle(post)}</title>
      <link
        rel="canonical"
        href={"https://crkveni-kalendar.net" + loc.pathname}
      />
      <meta name="description" content={post.lead} />
      {/* Opengraph - Facebook */}
      <meta property="og:locale" content="sr-RS" />
      <meta property="og:type" content="article" />
      {/* <meta property="article:publisher" content="https://www.facebook.com/ikone.portal" /> */}
      <meta property="og:title" content={setTitle(post)} />
      {/* <meta name="author" content={setSource(post.source)} /> */}
      <meta property="og:site_name" content="crkveni-kalendar.net" />
      <meta property="og:image" content={post.pics[0]} />
      {/* <meta property="og:image:secure_url" content={post.pics[0]} /> */}
      <meta property="og:image:width" content="640" />
      <meta property="og:image:height" content="480" />
      <meta property="og:image:alt" content={setTitle(post)} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta
        property="og:url"
        content={"https://crkveni-kalendar.net" + loc.pathname}
      />
      {/* <meta property="article:published_time" content={post.time2} /> */}
      {/* {setModifiedTime(post.modified)} */}
      <meta property="og:description" content={post.lead} />
      {/* End Opengraph */}
    </Helmet>
  );
}
