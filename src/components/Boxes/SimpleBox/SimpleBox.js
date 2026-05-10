"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./SimpleBox.scss";

export default function SimpleBox({
  as: Component = "section",
  href,
  mainTitle,
  mainTitleSymbol = false,
  mainBody,
  linkText,
  buttonText,
  classes = "",
  topNavLink = false,
  textAnchor,
}) {
  const router = useRouter();

  const isClickable = topNavLink && Component === "section";
  const isAnchor = Component === "a";

  return (
    <Component
      className={`simpleBox ${classes}`}
      {...(Component === "a" && href
        ? { href, title: textAnchor || mainTitle }
        : {})}
      {...(isClickable && {
        onClick: () => router.push(topNavLink),
        style: { cursor: "pointer" },
      })}
    >
      <h2>
        {mainTitle}
        {mainTitleSymbol && <i className="fa-solid fa-angle-right"></i>}
      </h2>
      <div className="simpleBox-body">
        <div className="simpleBox-body-wrapper">
          {Array.isArray(mainBody) ? (
            <ul>
              {mainBody.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          ) : (
            <p>{mainBody}</p>
          )}
        </div>
      </div>
      <div>
        {buttonText &&
          (isAnchor ? (
            <span className="simpleBox-cta">{buttonText}</span>
          ) : Array.isArray(buttonText) ? (
            buttonText.map((item, index) => (
              <Link prefetch={false} key={index} href={item[0]}>
                {item[1]}
              </Link>
            ))
          ) : (
            <Link prefetch={false} href={linkText}>{buttonText}</Link>
          ))}
      </div>
    </Component>
  );
}
