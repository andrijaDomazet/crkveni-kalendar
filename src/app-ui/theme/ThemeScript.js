import {
  FONT_ATTR,
  FONT_STORAGE_KEY,
  THEME_ATTR,
  THEME_COLORS,
  THEME_STORAGE_KEY,
} from "./themeConfig";

// Postavlja temu i velicinu slova pre prvog crtanja, da nema treptaja.
const SCRIPT = `(function(){try{
  var m=localStorage.getItem('${THEME_STORAGE_KEY}');
  var r=document.documentElement;
  if(m==='light'||m==='dark'){r.setAttribute('${THEME_ATTR}',m);}
  var f=localStorage.getItem('${FONT_STORAGE_KEY}');
  if(f==='large'||f==='xlarge'){r.setAttribute('${FONT_ATTR}',f);}
  var dark=m==='dark'||(m!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
  var t=document.querySelector('meta[name="theme-color"]');
  if(t){t.setAttribute('content',dark?'${THEME_COLORS.dark}':'${THEME_COLORS.light}');}
}catch(e){}})();`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
