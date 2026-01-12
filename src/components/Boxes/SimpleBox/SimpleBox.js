import React from "react";
import { Link } from "react-router-dom";
import "./SimpleBox.scss";

export default function SimpleBox({
  mainTitle,
  mainBody,
  linkText,
  buttonText,
}) {
  return (
    <div className="simpleBox">
      <h2>{mainTitle}</h2>
      <p>{mainBody}</p>
      <Link to={linkText}>{buttonText}</Link>
    </div>
  );
}
