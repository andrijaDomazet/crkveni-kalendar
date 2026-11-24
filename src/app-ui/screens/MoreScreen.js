"use client";
import LinkList from "./LinkList";
import SettingsScreen from "./SettingsScreen";

const CONTENT_ITEMS = [
  { href: "/app/postovi/", title: "Hrišćanski post" },
  { href: "/app/praznici/", title: "Praznici" },
  { href: "/app/zadusnice/", title: "Zadušnice" },
  { href: "/app/mesec/", title: "Mesečeve mene" },
  { href: "/app/imenoslov/", title: "Imenoslov" },
];

const INFO_ITEMS = [
  { href: "/app/info/o-nama/", title: "O nama" },
  { href: "/app/info/pravila-koriscenja/", title: "Pravila korišćenja" },
  { href: "/app/info/politika-privatnosti/", title: "Politika privatnosti" },
];

export default function MoreScreen() {
  return (
    <div className="app-screen">
      <LinkList items={CONTENT_ITEMS} />
      <SettingsScreen />
      <LinkList items={INFO_ITEMS} />
    </div>
  );
}
