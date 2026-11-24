import "../../src/app-ui/styles/app.scss";
import AppProviders from "../../src/app-ui/shell/AppProviders";
import AppShell from "../../src/app-ui/shell/AppShell";
import AppHead from "../../src/app-ui/shell/AppHead";
import ThemeScript from "../../src/app-ui/theme/ThemeScript";
import { ConsentDefaults, Preconnects } from "../../src/shared/head/SiteHead";
import { GoogleAnalytics } from "../../src/shared/head/AnalyticsScripts";
import { AdSenseScript, GptScripts } from "../../src/shared/head/AdScripts";

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
        <AdSenseScript />
        <GptScripts interstitial={false} />
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
