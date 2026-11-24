import "../index.scss";
import "../App.scss";
import Providers from "./Providers";
import Bars from "../components/Bars/Bars";
import ScrollToTop from "../UI/ScrollToTop/ScrollToTop";
import Footer from "../components/Footer/Footer";
import PreFooter from "../components/Footer/PreFooter";
import {
  BaseHead,
  ConsentDefaults,
  Preconnects,
  JqueryScript,
} from "./head/SiteHead";
import { GoogleAnalytics, YandexMetrika } from "./head/AnalyticsScripts";
import { AdSenseScript, GptScripts } from "./head/AdScripts";

export default function WebDocument({ children }) {
  return (
    <html lang="sr">
      <head>
        <BaseHead />
        <ConsentDefaults />
        <Preconnects />
        <GoogleAnalytics />
        <AdSenseScript />
        <JqueryScript />
        <GptScripts />
        <YandexMetrika />
      </head>
      <body suppressHydrationWarning>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>
          <Bars />
          <ScrollToTop />
          {children}
          <PreFooter />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
