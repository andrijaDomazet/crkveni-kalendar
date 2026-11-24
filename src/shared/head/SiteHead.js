export function BaseHead() {
  return (
    <>
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
    </>
  );
}

const CONSENT_DEFAULTS = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'granted',
        'wait_for_update': 2000
      });
      gtag('set', 'ads_data_redaction', true);
      gtag('set', 'url_passthrough', true);
    `;

export function ConsentDefaults() {
  return <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS }} />;
}

export function Preconnects() {
  return (
    <>
      <link
        rel="preconnect"
        href="https://securepubads.g.doubleclick.net"
        crossOrigin="true"
      />
      <link
        rel="dns-prefetch"
        href="https://securepubads.g.doubleclick.net"
      />
      <link
        rel="preconnect"
        href="https://www.googletagmanager.com"
        crossOrigin="true"
      />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link
        rel="preconnect"
        href="https://pagead2.googlesyndication.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
    </>
  );
}

export function JqueryScript() {
  return <script src="https://code.jquery.com/jquery-3.6.0.min.js" defer />;
}
