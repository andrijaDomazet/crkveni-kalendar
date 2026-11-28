"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useScriptContext } from "../../shared/ScriptProvider";
import { ChevronLeftIcon, CrossIcon, SearchIcon } from "../icons/AppIcons";
import { APP_TABS } from "./BottomNav";

const SEARCH_PATH = "/app/pretraga/";

export default function AppHeader() {
  const { cyr } = useScriptContext();
  const pathname = usePathname();
  const router = useRouter();

  const isTabRoot = APP_TABS.some((tab) => tab.href === pathname);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/app/");
  };

  return (
    <header className="app-header">
      {isTabRoot ? (
        <CrossIcon className="app-header__cross" />
      ) : (
        <button
          type="button"
          className="app-header__back"
          aria-label={cyr("Nazad")}
          onClick={goBack}
        >
          <ChevronLeftIcon />
        </button>
      )}
      <h1 className="app-header__title">{cyr("Crkveni kalendar")}</h1>
      {pathname !== SEARCH_PATH && (
        <Link
          href={SEARCH_PATH}
          className="app-header__search"
          aria-label={cyr("Pretraga")}
        >
          <SearchIcon />
        </Link>
      )}
    </header>
  );
}
