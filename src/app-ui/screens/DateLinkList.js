"use client";
import Link from "next/link";
import { useScriptContext } from "../../shared/ScriptProvider";
import { ChevronRightIcon } from "../icons/AppIcons";
import { MONTHS_SHORT } from "../lib/dates";

// Lista u stilu kalendara: datum levo, naslov desno.
// items: [{ key, day, title, month?, href? }]. Bez `month` se prikazuje samo dan;
// bez `href` red nije link.
export default function DateLinkList({ items }) {
  const { cyr } = useScriptContext();
  return (
    <ul className="app-card app-datelist">
      {items.map((item) => {
        const content = (
          <>
            <div className="app-week__date">
              <b>{item.day}</b>
              {item.month !== undefined && (
                <span>{cyr(MONTHS_SHORT[item.month])}</span>
              )}
            </div>
            <span className="app-week__main">{cyr(item.title)}</span>
            {item.href ? (
              <ChevronRightIcon className="app-icon app-icon--sm app-datelist__chevron" />
            ) : (
              <span />
            )}
          </>
        );
        return (
          <li key={item.key ?? item.href}>
            {item.href ? (
              <Link href={item.href} className="app-datelist__link">
                {content}
              </Link>
            ) : (
              <div className="app-datelist__link is-static">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
