import React from "react";
import "./SideDrawer.scss";
import { NavLink } from "react-router-dom";
import { options } from "../../../shared/shared";

export default function SideDrawer(props) {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <div onClick={props.clicked}>
      <nav className={drawerClasses}>
        <div className="logo">
          <img src="/img/favIcon.png" alt="logo" />
        </div>
        <ul>
          {options.map((option, index) => {
            return (
              <li key={index}>
                <NavLink to={option.route} exact="true" className="top-link2">
                  {option.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
