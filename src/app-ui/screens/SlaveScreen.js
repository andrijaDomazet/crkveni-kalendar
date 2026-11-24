"use client";
import Link from "next/link";
import PageArticleScreen from "../article/PageArticleScreen";
import slave from "../../components/Calendar/calendar-data/slave.json";
import { monthSerb } from "../../components/Calendar/calendar-data/calendar-data";
import { useScriptContext } from "../../shared/ScriptProvider";
import { toAppHref } from "../lib/links";

function SlaveList() {
  const { cyr } = useScriptContext();

  const months = [];
  slave.forEach((item) => {
    const [month] = item.date;
    let group = months.find((g) => g.month === month);
    if (!group) {
      group = { month, items: [] };
      months.push(group);
    }
    group.items.push(item);
  });

  return (
    <div className="app-slave">
      <h2 className="app-slave__title">{cyr("Lista srpskih slava")}</h2>
      {months.map((group) => (
        <section key={group.month} className="app-datalist">
          <h3>{cyr(monthSerb[group.month])}</h3>
          <ul>
            {group.items.map((item) => {
              const href = toAppHref(item.artLink);
              const row = (
                <>
                  <span>{cyr(item.title)}</span>
                  <span className="app-datalist__meta">
                    {cyr(`${item.date[1]}. ${monthSerb[item.date[0]]}`)}
                  </span>
                </>
              );
              return (
                <li key={item.date.join("-") + item.title}>
                  {href ? <Link href={href}>{row}</Link> : (
                    <div className="app-datalist__row">{row}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function SlaveScreen() {
  return (
    <PageArticleScreen slug="slave">
      <SlaveList />
    </PageArticleScreen>
  );
}
