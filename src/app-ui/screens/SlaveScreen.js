"use client";
import PageArticleScreen from "../article/PageArticleScreen";
import DateLinkList from "./DateLinkList";
import slave from "../../components/Calendar/calendar-data/slave.json";
import { monthSerb } from "../../components/Calendar/calendar-data/calendar-data";
import { useScriptContext } from "../../shared/ScriptProvider";
import { toAppHref } from "../lib/links";

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// Slave po mesecima u stilu kalendara: naslov meseca, pa red "dan + slava".
function SlaveList() {
  const { cyr } = useScriptContext();

  const months = [];
  slave.forEach((item) => {
    const [month, day] = item.date;
    let group = months.find((g) => g.month === month);
    if (!group) {
      group = { month, items: [] };
      months.push(group);
    }
    group.items.push({
      key: `${month}-${day}-${item.title}`,
      day,
      title: item.title,
      href: toAppHref(item.artLink) ?? undefined,
    });
  });

  return (
    <>
      <h2 className="app-section-title">{cyr("Lista srpskih slava")}</h2>
      {months.map((group) => (
        <section key={group.month} className="app-month-group">
          <h3 className="app-month-heading">
            {cyr(capitalize(monthSerb[group.month]))}
          </h3>
          <DateLinkList items={group.items} />
        </section>
      ))}
    </>
  );
}

export default function SlaveScreen() {
  return (
    <PageArticleScreen slug="slave">
      <SlaveList />
    </PageArticleScreen>
  );
}
