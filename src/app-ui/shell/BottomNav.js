"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScriptContext } from "../../shared/ScriptProvider";
import {
  BookIcon,
  CalendarIcon,
  CandleIcon,
  HomeIcon,
  MoreIcon,
} from "../icons/AppIcons";

export const APP_TABS = [
  { href: "/app/", label: "Danas", Icon: HomeIcon, exact: true },
  { href: "/app/kalendar/", label: "Kalendar", Icon: CalendarIcon },
  { href: "/app/slave/", label: "Slave", Icon: CandleIcon },
  { href: "/app/molitve/", label: "Molitve", Icon: BookIcon },
  { href: "/app/vise/", label: "Više", Icon: MoreIcon },
];

// Pod-ekrani koji nisu svoj tab (postovi, praznici, info...) pripadaju tabu "Više".
function activeTabHref(pathname) {
  if (pathname === "/app/") return "/app/";
  const direct = APP_TABS.find(
    (tab) => !tab.exact && pathname.startsWith(tab.href),
  );
  return direct ? direct.href : "/app/vise/";
}

export default function BottomNav() {
  const pathname = usePathname();
  const { cyr } = useScriptContext();
  const activeHref = activeTabHref(pathname);

  return (
    <nav className="app-tabs" aria-label={cyr("Glavna navigacija")}>
      {APP_TABS.map(({ href, label, Icon }) => {
        const active = href === activeHref;
        return (
          <Link
            key={href}
            href={href}
            className={`app-tab${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon />
            <span>{cyr(label)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
