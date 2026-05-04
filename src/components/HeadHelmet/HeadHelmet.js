import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useLocation } from "react-router-dom";
import { options } from "../../shared/shared";
import data from "../../all__news";
import molitve from "../../molitve.json";
import { urlTitle2 } from "../../shared/utility";
import { useRouteContext } from "../../shared/RouteProvider";

export default function HeadHelmet() {
  const validPathParts = ["pravila-koriscenja", "pravila-koriscenja", "o-nama"];
  const loc = useLocation();
  let pathPart = loc.pathname.split("/");
  console.log("pathPart", pathPart, pathPart.length);
  const { pageYear } = useRouteContext();
  const [post, setPost] = useState(() => setArticleState());

  useEffect(() => {
    setPost(setArticleState());
  }, [loc.pathname, pageYear]);

  function setArticleState() {
    let lastPathPart = pathPart[pathPart.length - 2];
    if (lastPathPart === "" || validPathParts.includes(pathPart[2])) {
      //home
      let post = options[0].social;
      return post;
    } else if (pathPart.length === 4 && pathPart[1] !== "info") {
      //sve sto ima 4 elementa (trenutno pojedinacni meseci i pojedinacne molitve)
      console.log("Else 1");
      if (pathPart[1] === "molitvenik") {
        //single molitve
        let post = molitve.filter((item) => {
          return urlTitle2(item.title) === pathPart[2];
        });
        post[0].lead = `${post[0].title}, tekst molitve: ${post[0].lead}`;
        let post2 = post[0];
        return post2;
      } else if (/^\d+$/.test(pathPart[1])) {
        //single months on calendar
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
    } else if (!/^\d+$/.test(pathPart[1]) && pathPart.length === 3) {
      //single post
      console.log("Else 2");
      let post = data.filter((item) => {
        return urlTitle2(item.title) === pathPart[1];
      });
      return post[0];
    } else {
      console.log("Else 3");
      const id = Number(pathPart[1]);
      let post = options[0].social;
      if (Number.isInteger(id)) {
        return {
          ...post,
          title: `Crkveni pravoslavni kalendar - ${pageYear} `,
          lead: `Crkveni pravoslavni kalendar - ${pageYear} | Svi praznici, slave i posti u godini na jednom mestu. | Pravoslavni kalendar ${pageYear}.`,
        };
      } else {
        return post;
      }
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
