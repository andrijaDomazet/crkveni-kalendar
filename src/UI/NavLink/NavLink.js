"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ to, children, className, exact, ...rest }) {
  const pathname = usePathname();
  const isActive =
    exact || to === "/"
      ? pathname === to
      : pathname.startsWith(to.replace(/\/$/, ""));
  const finalClass = [className, isActive ? "active" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <Link href={to} className={finalClass} {...rest}>
      {children}
    </Link>
  );
}
