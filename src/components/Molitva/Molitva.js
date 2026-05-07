"use client";
import React from "react";
import BodyText from "../BodyText/BodyText";
import molitve from "../../molitve.json";
export default function Molitva(props) {
//   console.log("Molitva", molitve[0].body);
  var test = props.molitva;
  return (
    <div className="molitva-text">
      <BodyText bodyText={test.body} />
    </div>
  );
}
