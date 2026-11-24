import WebDocument from "../src/shared/WebDocument";
import NoMatch from "../src/containters/NoMatch/NoMatch";

export const metadata = {
  title: "Stranica nije pronađena",
  metadataBase: new URL("https://crkveni-kalendar.net"),
};

export default function GlobalNotFound() {
  return (
    <WebDocument>
      <NoMatch />
    </WebDocument>
  );
}
