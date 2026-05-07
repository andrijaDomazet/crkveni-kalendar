import "../src/index.scss";
import "../src/App.scss";
import Script from "next/script";
import Providers from "../src/shared/Providers";
import Bars from "../src/components/Bars/Bars";
import ScrollToTop from "../src/UI/ScrollToTop/ScrollToTop";
import Footer from "../src/components/Footer/Footer";
import PreFooter from "../src/components/Footer/PreFooter";

export const metadata = {
  metadataBase: new URL("https://crkveni-kalendar.net"),
  verification: {
    google: "B0KDDVUOGlx-VYWnVEmissm4bwysllkE_eyBTwEC27w",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <head>
        <link rel="icon" href="/img/krst__logo.png" />
        <meta name="theme-color" content="#d6d6d6" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
          integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>
          <Bars />
          <ScrollToTop />
          {children}
          <PreFooter />
          <Footer />
        </Providers>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1EQZLGPRPD"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-1EQZLGPRPD');
        `}</Script>

        {/* jQuery */}
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="afterInteractive"
        />

        {/* Google Ad Manager */}
        <Script
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          strategy="afterInteractive"
        />
        <Script id="gpt-init" strategy="afterInteractive">{`
          var googletag = googletag || {};
          googletag.cmd = googletag.cmd || [];
        `}</Script>
        <Script id="gpt-slots" strategy="afterInteractive">{`
          var adUnits = [];
          var interstitialSlot;
          googletag.cmd.push(function () {
            var mappingBillboard = googletag.sizeMapping()
              .addSize([21, 21], [[1, 1], [320, 100]])
              .addSize([768, 21], [[1, 1], [728, 90]])
              .addSize([1023, 21], [[1, 1], [970, 250], [728, 90]])
              .build();
            var mappingAfterText = googletag.sizeMapping()
              .addSize([21, 21], [[1, 1], [320, 100], [300, 250]])
              .addSize([860, 21], [[1, 1], [728, 90]])
              .build();
            var mappingSideBar = googletag.sizeMapping()
              .addSize([21, 21], [[300, 250]])
              .addSize([860, 21], [[300, 250], [300, 600]])
              .addSize([1030, 21], [[300, 600]])
              .build();
            var mappingSideBar2 = googletag.sizeMapping()
              .addSize([21, 21], [[300, 250]])
              .addSize([860, 21], [[300, 250]])
              .addSize([1030, 21], [[300, 250]])
              .build();
            var mappingInText = googletag.sizeMapping()
              .addSize([21, 21], [[300, 250]])
              .addSize([860, 21], [[300, 250]])
              .addSize([1030, 21], [[300, 250]])
              .build();
            var mappingCalendar = googletag.sizeMapping()
              .addSize([21, 21], [320, 100])
              .addSize([1030, 21], [])
              .build();
            var mappingInterstitial = googletag.sizeMapping()
              .addSize([0, 0], [[300, 250], [320, 480]])
              .build();
            var mappingSticky = googletag.sizeMapping()
              .addSize([21, 21], [320, 100])
              .addSize([320, 21], [320, 100])
              .addSize([768, 21], [728, 90])
              .addSize([1023, 21], [728, 90])
              .build();

            adUnits[0] = googletag.defineSlot("/23098387262/crkveni-kalendar/crkveni-kalendar-afterText-1", [[320, 100], [300, 250], [728, 90]], "div-gpt-ad-1750409157804-0").addService(googletag.pubads()).defineSizeMapping(mappingAfterText);
            adUnits[1] = googletag.defineSlot("/23098387262/crkveni-kalendar/crkveni-kalendar-afterText-2", [[320, 100], [300, 250], [728, 90]], "div-gpt-ad-1750409277034-0").addService(googletag.pubads()).defineSizeMapping(mappingAfterText);
            adUnits[2] = googletag.defineSlot("/23098387262/crkveni-kalendar/crkveni-kalendar-sb-sticky", [[300, 250], [300, 600]], "div-gpt-ad-1750411708088-0").addService(googletag.pubads()).defineSizeMapping(mappingSideBar);
            adUnits[3] = googletag.defineSlot("/23098387262/crkveni-kalendar/crkveni-kalendar-inText-1", [[300, 250], [300, 600]], "div-gpt-ad-1750930023966-0").addService(googletag.pubads()).defineSizeMapping(mappingInText);
            adUnits[4] = googletag.defineSlot("/23098387262/crkveni-kalendar/crkveni-kalendar-bilbord", [[728, 90], [320, 100], [970, 250]], "div-gpt-ad-1761641124263-0").addService(googletag.pubads()).defineSizeMapping(mappingBillboard);
            adUnits[5] = googletag.defineSlot("/23098387262/crkveni-kalendar/crkveni-kalendar-sb-2", [[728, 90], [320, 100], [970, 250]], "div-gpt-ad-1763130338013-0").addService(googletag.pubads()).defineSizeMapping(mappingSideBar2);
            adUnits[6] = googletag.defineSlot("/23098387262/crkveni-kalendar/crkveni-kalendar-infeed", [[728, 90], [320, 100], [970, 250]], "div-gpt-ad-1764593675864-0").addService(googletag.pubads()).defineSizeMapping(mappingBillboard);
            adUnits[7] = googletag.defineSlot("/23098387262/crkveni-kalendar/crkveni-kalendar-sticky", [[320, 100], [728, 90]], "div-gpt-ad-1768472077826-0").addService(googletag.pubads()).defineSizeMapping(mappingSticky);

            var adSlots = [
              { path: "/23098387262/crkveni-kalendar/InCalendar-1", id: "div-gpt-ad-1769765602091-0", size: [320, 100] },
              { path: "/23098387262/crkveni-kalendar/InCalendar-2", id: "div-gpt-ad-1769765622164-0", size: [320, 100] },
              { path: "/23098387262/crkveni-kalendar/InCalendar-3", id: "div-gpt-ad-1769765646981-0", size: [320, 100] },
              { path: "/23098387262/crkveni-kalendar/InCalendar-4", id: "div-gpt-ad-1769765669736-0", size: [320, 100] },
              { path: "/23098387262/crkveni-kalendar/InCalendar-5", id: "div-gpt-ad-1769765520606-0", size: [320, 100] }
            ];

            interstitialSlot = googletag.defineOutOfPageSlot("/23098387262/crkveni-kalendar/crkveni-kalendar-interstitial", googletag.enums.OutOfPageFormat.INTERSTITIAL).defineSizeMapping(mappingInterstitial);
            if (interstitialSlot) {
              interstitialSlot.addService(googletag.pubads());
              interstitialSlot.setConfig({ interstitial: { triggers: { navBar: true, unhideWindow: true } } });
            }

            adSlots.forEach(function(slot, index) {
              adUnits[index + 8] = googletag.defineSlot(slot.path, [slot.size], slot.id).addService(googletag.pubads()).defineSizeMapping(mappingCalendar);
            });

            window.addEventListener("load", function () {
              if (interstitialSlot) googletag.display(interstitialSlot);
            });

            googletag.pubads().setCentering(true);
            googletag.pubads().collapseEmptyDivs(true, true);
            googletag.pubads().enableAsyncRendering();
            googletag.pubads().setSafeFrameConfig({ allowOverlayExpansion: true });
            googletag.pubads().enableLazyLoad({ fetchMarginPercent: 200, renderMarginPercent: 100, mobileScaling: 0.5 });
            googletag.enableServices();
          });
        `}</Script>

        {/* Google Adsense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3520542236575841"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Yandex Metrika */}
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function (m, e, t, r, i, k, a) {
            m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) { return; }
            }
            ((k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]),
            (k.async = 1), (k.src = r), a.parentNode.insertBefore(k, a))
          })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          ym(99513608, "init", { clickmap: false, trackLinks: true, accurateTrackBounce: true, webvisor: true });
        `}</Script>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/99513608"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
