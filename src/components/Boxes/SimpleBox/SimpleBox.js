import { Link } from "react-router-dom";
import "./SimpleBox.scss";

export default function SimpleBox({
  mainTitle,
  mainBody,
  linkText,
  buttonText,
  classes="",
}) {
  return (
    <section className={`simpleBox ${classes}`}>
      <strong>{mainTitle}</strong>
      <p>{mainBody}</p>
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
