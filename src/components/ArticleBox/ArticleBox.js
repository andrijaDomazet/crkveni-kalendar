import React, { useEffect, useState } from "react";
import "./ArticleBox.scss";
import { Link, useNavigate } from "react-router-dom";
import PostImage from "../../containters/SinglePost/img/PostImage.js";
import { getPreUrlTitle } from "../../shared/utility.js";
import Buttons from "../../UI/Button/Buttons.js";

function ArticleBox({ n = {}, classes = "", loading = false }) {
  const articleData = n;
  // console.log("Article data", articleData);

  const [allCategories, setAllCategories] = useState(null);
  // useEffect(() => {
  //   fetch("/mini-jsons/allCategories-mini.json")
  //     .then((res) => res.json())
  //     .then(setAllCategories)
  //     .catch((err) => console.error("Greska pri ucitavanju", err));
  // }, []);

  const navigate = useNavigate();
  // const preUrlTitle = getPreUrlTitle(articleData, allCategories, false);
  const preUrlTitle = getPreUrlTitle(articleData);
  const categoryLink = getPreUrlTitle(articleData, allCategories, true);
  const displayTitle = articleData.title_2 || articleData.title;

  // if (!articleData || !allCategories) return null;

  return (
    <div className={classes}>
      <div className="artBox-wrapper">
        {/* <Link to={preUrlTitle} className="artBox-img">
          <PostImage
            src={articleData.pics}
            alt={displayTitle}
            loading={loading}
          />
        </Link> */}
        <div className="artBox-desc">
          <Link to={preUrlTitle}>
            <h3>{displayTitle}</h3>
          </Link>
          {/* <div className="artBox-desc-other">
            <Link to={categoryLink}>{articleData.category}</Link>
          </div> */}
          {/* <span className="artBox-lead">
            {articleData.lead && (
              <span className="artBox-lead">{articleData.lead}...</span>
            )}
          </span> */}
          {/* <Buttons
            classes="artBox-btn"
            clicked={() => {
              navigate(preUrlTitle);
            }}
          >
            Nastavi čitanje
          </Buttons> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ArticleBox);
