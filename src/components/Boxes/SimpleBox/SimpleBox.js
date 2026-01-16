import { Link } from "react-router-dom";
import "./SimpleBox.scss";

export default function SimpleBox({
  mainTitle,
  mainBody,
  linkText,
  buttonText,
  classes = "",
}) {
  return (
    <section
      className={`simpleBox ${classes}`}
      // style={{ order: 4 }}
    >
      <h2>{mainTitle}</h2>
      {/* <p>{mainBody}</p> */}
      <p>
        {Array.isArray(mainBody) ? (
          <ul>
            {mainBody.map((item, index) => {
              return (
                <li key={index} to={item[0]}>
                  {item}
                </li>
              );
            })}
          </ul>
        ) : (
          <Link to={linkText}>{mainBody}</Link>
        )}
      </p>
      <div>
        {Array.isArray(buttonText) ? (
          buttonText.map((item, index) => {
            return (
              <Link key={index} to={item[0]}>
                {item[1]}
              </Link>
            );
          })
        ) : (
          <Link to={linkText}>{buttonText}</Link>
        )}
      </div>
    </section>
  );
}
