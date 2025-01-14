import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";
import { options } from "../../../shared/shared";

export default function NavBar() {
  let navRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);

  const handleClick = () => {
    if (navRef.current) {
      navRef.current.scrollLeft = 0;
    }
  };
  const navBarOptions = () => {
    // const navOptArr = () => {
    //   const arr = options.slice(0, -1); // Uzimamo sve osim poslednjeg elementa

    //   if (window.innerWidth <= 768) {
    //     arr.splice(2, 1); // Uklanjamo element na indeksu 2 samo za manje ekrane
    //   }

    //   return arr;
    // };
    // let lastIndex = options.length - 1;
    return (
      <nav className="links" ref={navRef}>
        {options.slice(1).map((option, index) => {
          // console.log("option", option);
          return (
            <div
              className="nav-link-wrapper"
              key={index}
              onMouseOver={() => {
                setDropDown(option.route);
              }}
              onMouseLeave={() => {
                setDropDown(false);
              }}
              onClick={() => {
                handleClick();
                setDropDown(null);
              }}
            >
              <NavLink to={"/2025/"} exact="true" className={`nav-link ${option.title}`}>
                {option.title}
              </NavLink>
              <div className="botDiv">{items_list(option.route, option.item_list)}</div>
            </div>
          );
        })}
        {/* {test(options, lastIndex)} */}
      </nav>
    );
  };
  const items_list = (items, itemlList) => {
    // console.log("Items",Array.isArray(itemlList));

    if (Array.isArray(itemlList)) {
      return (
        <ul className={getDropDownMenu(items, itemlList)}>
          {itemlList.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.route}>{item.title}</NavLink>
              </li>
            );
          })}
        </ul>
      );
    }
  };
  const getDropDownMenu = (setClass, items) => {
    // return dropDown ? "drop_down_menu" : "drop_down_menu close";
    const isOpen = dropDown === setClass ? "drop_down_menu" : "drop_down_menu close";
    const sizeClass = items.length > 6 ? "" : " small";
    return isOpen + sizeClass;
  };
  return (
    <div className="navBar">
      {/* <NavLink to="/" className="bars__logo">
        <img src="/img/logo.png" />
      </NavLink> */}
      {navBarOptions()}
    </div>
  );
}
