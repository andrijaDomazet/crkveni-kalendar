"use client";
import "./SideDrawer.scss";
import NavLink from "../../../UI/NavLink/NavLink";
import { options } from "../../../shared/shared";
import { useScriptContext } from "../../../shared/ScriptProvider";

export default function SideDrawer(props) {
  const { cyr } = useScriptContext();
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
                  {cyr(`${item.title}`)}
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
                  {cyr(`${option.title}`)}
                </NavLink>
                {items_list(option.item_list)}
              </li>
            );
          })}
        </ul>
        <div className="nameTitle">crkveni-kalendar.net</div>
      </nav>
    </div>
  );
}
