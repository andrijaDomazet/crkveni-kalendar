import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";
import { options } from "../../../shared/shared";

export default function NavBar() {
  let navRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);
  let lastIndex = options.length - 1;
  const handleClick = () => {
    if (navRef.current) {
      navRef.current.scrollLeft = 0;
    }
  };
  const setLastLink = (options, lastIndex) => {
    if (window.innerWidth < 768) {
      return (
        <>
          <div className="nav-link-wrapper">
            <NavLink
              to={options[5].item_list[0].route + "/"}
              exact="true"
              className="nav-link"
              onClick={() => {
                handleClick();
              }}
            >
              {options[5].item_list[0].title}
            </NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink
              to={options[5].item_list[1].route + "/"}
              exact="true"
              className="nav-link"
              onClick={() => {
                handleClick();
              }}
            >
              {options[5].item_list[1].title}
            </NavLink>
          </div>
        </>
      );
    } else {
      return (
        <div className="links last">
          <div
            className="nav-link-wrapper"
            onMouseOver={() => {
              setDropDown(options[lastIndex].route);
            }}
            onMouseLeave={() => {
              setDropDown(false);
            }}
            onClick={() => {
              setDropDown(null);
            }}
          >
            <img src="/img/threeDots.png" alt="" />
            <div className="botDiv">
              {items_list(
                options[lastIndex].route,
                options[lastIndex].item_list
              )}
            </div>
          </div>
        </div>
      );
    }
  };
  const navBarOptions = (x, y) => {
    let lastIndex = options.length - 1;
    return (
      <nav className="links" ref={navRef}>
        {options.slice(x, y).map((option, index) => {
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
              <NavLink
                to={option.route}
                exact="true"
                className={`nav-link ${option.title}`}
              >
                {option.title}
              </NavLink>
              <div className="botDiv">
                {items_list(option.route, option.item_list)}
              </div>
            </div>
          );
        })}
        {/* {test(options, lastIndex)} */}
      </nav>
    );
  };
  const items_list = (items, itemlList) => {
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
    const isOpen =
      dropDown === setClass ? "drop_down_menu" : "drop_down_menu close";
    const sizeClass = items.length > 6 ? "" : " small";
    return isOpen + sizeClass;
  };
  return (
    <div className="navBar">
      <div className="navBar-first">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          // class="lucide lucide-cross w-6 h-6 text-gold"
        >
          <path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"></path>
        </svg>
        <span>PRAVOSLAVNI</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          // class="lucide lucide-cross w-6 h-6 text-gold"
        >
          <path d="M4 9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a1 1 0 0 1 1 1v4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-4a1 1 0 0 1 1-1h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a1 1 0 0 1-1-1V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4a1 1 0 0 1-1 1z"></path>
        </svg>
      </div>
      <div className="navBar__logo">
        <div className="line"></div>
        <div className="box45"></div>
        <NavLink to="/">
          {/* <img src="/img/logo.png" /> */}
          <h1>Crkveni Kalendar</h1>
        </NavLink>
        <div className="box45"></div>
        <div className="line right"></div>
      </div>

      <span className="navBar-siteLink">crkveni-kalendar.net</span>
      <div className="navBar-wrapper">
        {navBarOptions(1, 3)}
        {/* <NavLink to="/" className="navBar__logo">
          <img src="/img/logo.png" />
        </NavLink> */}
        {navBarOptions(3, 5)}
        {setLastLink(options, lastIndex)}
      </div>
    </div>
  );
}
