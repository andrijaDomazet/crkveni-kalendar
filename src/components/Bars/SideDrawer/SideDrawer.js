import React from "react";
import "./SideDrawer.scss";
import { NavLink } from "react-router-dom";
import { options } from "../../../shared/shared";

export default function SideDrawer(props) {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  const items_list = (items) => {
    if (items) {
      return (
        <ul className="subUl">
          {items.map((item, index) => {
            return (
              <li key={index}>
                <NavLink key={index} to={`${item.route}`}>
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      );
    }
  };
  return (
    <div onClick={props.clicked}>
      <nav className={drawerClasses}>
        <div className="logo">
          <img src="/img/logo.png" alt="logo" />
        </div>
        <ul>
          {options.slice(1).map((option, index) => {
            return (
              <li key={index}>
                <NavLink to={option.route} exact="true" className="top-link2">
                  {option.title}
                </NavLink>
                {items_list(option.item_list)}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
