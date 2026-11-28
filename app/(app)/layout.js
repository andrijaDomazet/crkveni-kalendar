import "../../src/app-ui/styles/app.scss";
import AppProviders from "../../src/app-ui/shell/AppProviders";
import AppShell from "../../src/app-ui/shell/AppShell";
import AppHead from "../../src/app-ui/shell/AppHead";
import ThemeScript from "../../src/app-ui/theme/ThemeScript";
import { ConsentDefaults, Preconnects } from "../../src/shared/head/SiteHead";
import { GoogleAnalytics } from "../../src/shared/head/AnalyticsScripts";
import { AdSenseScript } from "../../src/shared/head/AdScripts";
import AppGptScripts from "../../src/app-ui/ads/AppGptScripts";
import { ADS_ENABLED } from "../../src/app-ui/ads/config";

export const metadata = {
  metadataBase: new URL("https://crkveni-kalendar.net"),
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Inline skripte su u <body>: Google ubacuje sopstveni <script> na pocetak <head>-a
// pre hidratacije, pa bi ih React tamo pogresno uparivao i bacao hydration gresku.
export default function AppLayout({ children }) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <head>
        <AppHead />
        <Preconnects />
      </head>
      <body suppressHydrationWarning>
        <ThemeScript />
        <ConsentDefaults />
        <GoogleAnalytics />
        {ADS_ENABLED && (
          <>
            <AdSenseScript />
            <AppGptScripts />
          </>
        )}
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
