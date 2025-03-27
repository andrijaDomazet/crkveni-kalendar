import React from "react";
import "./Footer.scss";
// import { footer } from "../../shared/shared.js";
// import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      {/* <div className="home__section5-top">
        {footer.map((item, index) => {
          return (
            <NavLink to={item[1]} key={index}>
              <span key={index}>{item[0]}</span>
            </NavLink>
          );
        })}
      </div> */}
      {/* <div className="home__section5-middle">
        <div>
          <span>Pratite nas</span>
          <a
            href="https://www.facebook.com/agroweb.portal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/icons/facebook.png" alt="Agroweb.rs - facebook" />
          </a>
          <a
            href="https://www.instagram.com/agroweb.portal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/icons/inst.png" alt="Agroweb.rs - instagram" />
          </a>
        </div>
        <div>
          <a
            href="mailto:info@agroweb.rs"
            className="topBar__link"
            rel="noopener noreferrer"
          >
            info@agroweb.rs
            <img src="/img/icons/mailBox.png" alt="Agroweb.rs - mail" />
          </a>
        </div>
      </div> */}
      <div className="home__section5-bottom">© 2025 crkveni-kalendar.net®</div>
    </footer>
  );
}
