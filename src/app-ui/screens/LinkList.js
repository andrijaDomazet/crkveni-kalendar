"use client";
import Link from "next/link";
import { useScriptContext } from "../../shared/ScriptProvider";
import { ChevronRightIcon } from "../icons/AppIcons";

// items: [{ href, title, meta? }]
export default function LinkList({ items }) {
  const { cyr } = useScriptContext();
  return (
    <ul className="app-card app-linklist">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="app-linklist__item">
            <span className="app-linklist__title">{cyr(item.title)}</span>
            {item.meta && (
              <span className="app-linklist__meta">{cyr(item.meta)}</span>
            )}
            <ChevronRightIcon className="app-icon app-icon--sm" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
