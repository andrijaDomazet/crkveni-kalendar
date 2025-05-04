import { Link } from "react-router-dom";

export function urlTitle2(title) {
  const cyrilic = ["č", "ć", "ž", "š", "đ", ",", ":", "-", "?", "!", "."];
  const replArray = ["c", "c", "z", "s", "dj", "", "", "", "", "", ""];
  let regex = /--/gi;
  let url_title = title
    .toLowerCase()
    .split("")
    .map((x) => {
      return cyrilic.indexOf(x) === -1 ? x : replArray[cyrilic.indexOf(x)];
    })
    .join("")
    .split(" ")
    .join("-")
    .replace(regex, "-");
  return url_title;
}

export function renderTitleSection({
  mainTitle,
  extraLabel,
  separatorSymbol = " ",
  slavaSymbol = false,
  linkClass = "slavaStrong",
  strongClass = "",
}) {
  return (
    <>
      {slavaSymbol && (
        <>
          <Link to="/slave/" className="slavaStrong">
            SLAVA
          </Link>{" "}
        </>
      )}
      <h2>{mainTitle}</h2>
      {separatorSymbol}
      <h2>
        {/* PREDEFINISATIIII-------------------------- */}
        <strong className={strongClass}>{extraLabel}</strong>
      </h2>
    </>
  );
}
