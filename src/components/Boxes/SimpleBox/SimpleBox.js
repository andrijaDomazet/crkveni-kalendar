import { Link, useNavigate } from "react-router-dom";
import "./SimpleBox.scss";

export default function SimpleBox({ mainTitle, mainBody, linkText, buttonText, classes = "", topNavLink = false }) {
  let navigate = useNavigate();
  return (
    <section
      className={`simpleBox ${classes}`}
      {...(topNavLink && {
        onClick: () => navigate(topNavLink),
        style: { cursor: "pointer", boxShadow: "0 10px 40px -5px rgba(139, 90, 43, 0.2), 0 4px 16px -4px rgba(139, 90, 43, 0.15)" },
      })}
    >
      <h2>{mainTitle}</h2>
      {/* <p>{mainBody}</p> */}
      <div className="simpleBox-body">
    <p>
        {Array.isArray(mainBody) ? (
          <ul>
            {mainBody.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        ) : (
          <Link to={linkText}>{mainBody}</Link>
        )}
      </p>
      {/* <p className="secondBody">
        Test
      </p> */}
      </div>
  
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
