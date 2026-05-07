"use client";
import React from "react";
import "./ArticleBox.scss";
import Link from "next/link";
import PostImage from "../../../containters/SinglePost/img/PostImage.js";
import { getPreUrlTitle } from "../../../shared/utility.js";

function ArticleBox({ n = {}, classes = "", loading = false }) {
  const articleData = n;
  const preUrlTitle = getPreUrlTitle(articleData);
  const displayTitle = articleData.title_2 || articleData.title;

  return (
    <div className={classes}>
      <div className="artBox-wrapper">
        <div className="artBox-desc">
          <Link href={preUrlTitle}>
            <h3>{displayTitle}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ArticleBox);
