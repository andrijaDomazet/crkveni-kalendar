import { THEME_COLORS } from "../theme/themeConfig";

export default function AppHead() {
  return (
    <>
      <link rel="icon" href="/img/krst__logo.png" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content={THEME_COLORS.light} />
    </>
  );
}
