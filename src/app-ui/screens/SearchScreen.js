"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouteContext } from "../../shared/RouteProvider";
import { useScriptContext } from "../../shared/ScriptProvider";
import { BookIcon, ChevronRightIcon, SearchIcon } from "../icons/AppIcons";
import { MONTHS_SHORT } from "../lib/dates";
import { buildSearchIndex } from "../search/searchIndex";
import { rankMatches } from "../search/rank";

// Upit se pamti da ga "Nazad" sa rezultata vrati.
const QUERY_KEY = "ck-search-query";

function Result({ item }) {
  const { cyr } = useScriptContext();
  return (
    <li>
      <Link href={item.href} className="app-datelist__link">
        {item.day ? (
          <div className="app-week__date">
            <b>{item.day}</b>
            <span>{cyr(MONTHS_SHORT[item.month])}</span>
          </div>
        ) : (
          <div className="app-search__noday">
            <BookIcon />
          </div>
        )}
        <div className="app-week__text">
          <span className="app-week__main">{cyr(item.title)}</span>
          <span className="app-week__others">{cyr(item.type)}</span>
        </div>
        <ChevronRightIcon className="app-icon app-icon--sm app-datelist__chevron" />
      </Link>
    </li>
  );
}

export default function SearchScreen() {
  const { currentDate } = useRouteContext();
  const { cyr } = useScriptContext();
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      setQuery(sessionStorage.getItem(QUERY_KEY) ?? "");
    } catch {}
  }, []);

  const change = (value) => {
    setQuery(value);
    try {
      sessionStorage.setItem(QUERY_KEY, value);
    } catch {}
  };

  const index = useMemo(
    () => (currentDate ? buildSearchIndex(currentDate) : []),
    [currentDate],
  );
  const { results, total } = rankMatches(index, query);
  const ready = query.trim().length >= 2;

  return (
    <div className="app-screen">
      <form
        className="app-search"
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          document.activeElement?.blur();
        }}
      >
        <SearchIcon className="app-icon app-icon--sm" />
        <input
          id="app-search-input"
          type="search"
          enterKeyHint="search"
          autoFocus
          autoComplete="off"
          aria-label={cyr("Pretraga")}
          placeholder={cyr("Svetac, praznik, slava, molitva")}
          value={query}
          onChange={(event) => change(event.target.value)}
        />
      </form>

      {!ready && (
        <p className="app-search__hint">
          {cyr("Upišite najmanje dva slova, na primer: Nikola, Đurđevdan, Vaskrs.")}
        </p>
      )}

      {ready && results.length === 0 && index.length > 0 && (
        <p className="app-search__hint">{cyr("Nema rezultata.")}</p>
      )}

      {ready && results.length > 0 && (
        <ul className="app-card app-datelist">
          {results.map((item) => (
            <Result key={`${item.type}-${item.title}-${item.href}`} item={item} />
          ))}
        </ul>
      )}

      {total > results.length && (
        <p className="app-search__hint">
          {cyr(
            `Prikazano ${results.length} od ${total}. Upišite preciznije da suzite izbor.`,
          )}
        </p>
      )}
    </div>
  );
}
