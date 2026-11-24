const GA_ID = "G-1EQZLGPRPD";

export function GoogleAnalytics() {
  return (
    <>
      <script
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `gtag('js', new Date());gtag('config', '${GA_ID}');`,
        }}
      />
    </>
  );
}

const YANDEX_METRIKA = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}(k=e.createElement(t),(a=e.getElementsByTagName(t)[0]),(k.async=1),(k.src=r),a.parentNode.insertBefore(k,a))})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(99513608,'init',{clickmap:false,trackLinks:true,accurateTrackBounce:true,webvisor:true});`;

export function YandexMetrika() {
  return <script defer dangerouslySetInnerHTML={{ __html: YANDEX_METRIKA }} />;
}
