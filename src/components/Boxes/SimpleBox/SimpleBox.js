"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./SimpleBox.scss";
import { useScriptContext } from "../../../shared/ScriptProvider";

export default function SimpleBox({
  as: Component = "section",
  href,
  mainTitle,
  mainTitleSymbol = false,
  mainBody,
  mainBody2,
  linkText = "#",
  buttonText,
  classes = "",
  topNavLink = false,
  textAnchor,
  listType = "ul",
}) {
  const router = useRouter();

  const isClickable = topNavLink && Component === "section";
  const isAnchor = Component === "a";
  const { cyr } = useScriptContext();

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
      {(mainTitle || mainTitleSymbol) && (
        <h2>
          {cyr(`${mainTitle}`)}
          {mainTitleSymbol && <i className="fa-solid fa-angle-right"></i>}
        </h2>
      )}
      {/* <h2>
        {mainTitle}
        {mainTitleSymbol && <i className="fa-solid fa-angle-right"></i>}
      </h2> */}
      <div className="simpleBox-body">
        <div className="simpleBox-body-wrapper">
          {Array.isArray(mainBody) ? (
            listType === "ol" ? (
              <ol>
                {mainBody.map((item, index) => (
                  <li key={index}> {cyr(`${item}`)}</li>
                ))}
              </ol>
            ) : (
              <ul>
                {mainBody.map((item, index) => (
                  <li key={index}>{cyr(`${item}`)}</li>
                ))}
              </ul>
            )
          ) : (
            mainBody && <p>{cyr(`${mainBody}`)}</p>
          )}

          {Array.isArray(mainBody2) && mainBody2.length > 0 ? (
            listType === "ol" ? (
              <div className="simpleBox-divider">
                {mainBody2.map((item, index) => (
                  <span key={index}>{cyr(`${item}`)}</span>
                ))}
              </div>
            ) : (
              <div className="simpleBox-highlights">
                {mainBody2.map((item, index) => (
                  <span className="simpleBox-highlights-item" key={index}>
                    {cyr(`${item}`)}
                    {index < mainBody2.length - 1 && ","}
                  </span>
                ))}
              </div>
            )
          ) : (
            mainBody2 && <p>{cyr(`${mainBody2}`)}</p>
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
                {cyr(`${item[1]}`)}
              </Link>
            ))
          ) : (
            <Link prefetch={false} href={linkText}>
              {cyr(`${buttonText}`)}
            </Link>
          ))}
      </div>
    </Component>
  );
}
