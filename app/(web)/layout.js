import WebDocument from "../../src/shared/WebDocument";

export const metadata = {
  metadataBase: new URL("https://crkveni-kalendar.net"),
  verification: {
    google: "B0KDDVUOGlx-VYWnVEmissm4bwysllkE_eyBTwEC27w",
  },
};

export default function WebLayout({ children }) {
  return <WebDocument>{children}</WebDocument>;
}
