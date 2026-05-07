"use client";
import "./Buttons.scss";

export default function Buttons({ classes = "", clicked = () => {}, label = "", children }) {
  return (
    <button className={classes} onClick={clicked} aria-label={label}>
      {children}
    </button>
  );
}
