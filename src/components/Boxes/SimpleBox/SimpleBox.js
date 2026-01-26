import { Link, useNavigate } from "react-router-dom";
import "./SimpleBox.scss";

export default function SimpleBox({
  mainTitle,
  mainTitleSymbol = false,
  mainBody,
  linkText,
  buttonText,
  classes = "",
  topNavLink = false,
}) {
  let navigate = useNavigate();
  return (
    <section
      className={`simpleBox ${classes}`}
      {...(topNavLink && {
        onClick: () => navigate(topNavLink),
        style: {
          cursor: "pointer",
        },
      })}
    >
      <h2>
        {mainTitle}
        {/* set i icon to control from props */}
        {mainTitleSymbol && <i class="fa-solid fa-angle-right"></i>}
      </h2>
      {/* <p>{mainBody}</p> */}
      <div className="simpleBox-body">
        <div className="simpleBox-body-wrapper">
          {Array.isArray(mainBody) ? (
            <ul>
              {mainBody.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          ) : (
            <p to={linkText}>{mainBody}</p>
          )}
        </div>
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
