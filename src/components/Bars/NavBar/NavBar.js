import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";
import { options } from "../../../shared/shared";

export default function NavBar() {
  const [dropDown, setDropDown] = useState(false);
  const navBarOptions = () => {
    return (
      <div className="links">
        {options.slice(1).map((option, index) => {
          return (
            <NavLink
              key={index}
              to={option.route}
              exact="true"
              className="nav-link"
              onMouseOver={() => {
                setDropDown(true);
              }}
              onMouseLeave={() => {
                setDropDown(false);
              }}
            >
              {option.title}
              {items_list(option.item_list)}
            </NavLink>
          );
        })}
      </div>
    );
  };
  const items_list = (items) => {
    if (items) {
      return (
        <ul className={getDropDownMenu()}>
          {items.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      );
    }
  };
  const getDropDownMenu = () => {
    return dropDown ? "drop_down_menu" : "drop_down_menu close";
  };
  return <div className="navBar">{navBarOptions()}</div>;
}
