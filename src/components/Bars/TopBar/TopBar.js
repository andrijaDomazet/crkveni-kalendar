import React from "react";
import "./TopBar.scss";
import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="topBar">
      <NavLink to="/kontakt" className="topBar__link">
        kontakt@crkveni-kalendar.net
      </NavLink>
    </div>
  );
}
