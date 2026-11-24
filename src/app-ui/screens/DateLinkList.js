"use client";
import Link from "next/link";
import { useScriptContext } from "../../shared/ScriptProvider";
import { ChevronRightIcon } from "../icons/AppIcons";
import { MONTHS_SHORT } from "../lib/dates";

// Lista u stilu kalendara: datum levo, naslov desno. items: [{ href, day, month, title }]
export default function DateLinkList({ items }) {
  const { cyr } = useScriptContext();
  return (
    <ul className="app-card app-datelist">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="app-datelist__link">
            <div className="app-week__date">
              <b>{item.day}</b>
              <span>{cyr(MONTHS_SHORT[item.month])}</span>
            </div>
            <span className="app-week__main">{cyr(item.title)}</span>
            <ChevronRightIcon className="app-icon app-icon--sm app-datelist__chevron" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
