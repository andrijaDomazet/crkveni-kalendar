import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Bars.scss";
import TopBar from "./TopBar/TopBar";
import ToggleButton from "./SideDrawer/ToggleButton";
import SideDrawer from "./SideDrawer/SideDrawer";
import NavBar from "./NavBar/NavBar.js";

export default function Bars() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };
  return (
    <div className="bars">
      <NavLink to="/" className="bars__logo">
        CRKVENI<b>KALENDAR</b>
      </NavLink>
      <div className="bars__links">
        <TopBar />
        <NavBar />
        <ToggleButton clicked={drawerToggleClickHandler} />
        <SideDrawer show={sideDrawerOpen} clicked={drawerToggleClickHandler} />
      </div>
    </div>
  );
}
