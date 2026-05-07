"use client";
import React from "react";
import "./ToggleButton.scss";

export default function ToggleButton(props) {
  return (
    <div className="toggle__button">
      <button className="toggle" onClick={props.clicked} aria-label="toggle button">
        <div className="toggle-button-line" />
        <div className="toggle-button-line" />
        <div className="toggle-button-line" />
      </button>
    </div>
  );
}
