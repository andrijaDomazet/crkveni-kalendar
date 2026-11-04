"use client";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import { monthSerb } from "../components/Calendar/calendar-data/calendar-data";
//
const RouteContext = createContext();
export const useRouteContext = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {
  const pathname = usePathname();
  const params = useParams();

  const pathPart = useMemo(() => pathname.split("/"), [pathname]);
   const pageSlug = useMemo(() => pathPart[pathPart.length - 2] || "", [pathPart]);

  const slug = params?.godina || params?.slug;
  const id = params?.mesec || params?.id;

  // Uvek null na prvom renderu (i server i klijent), da se izbegne hydration mismatch.
  // Pravi datum se postavlja u useEffect, nakon hidratacije.
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    setCurrentDate(d);
  }, []);

  const [pageYear, setPageYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const parsed = Number(params?.godina || params?.slug);
    if (!isNaN(parsed) && parsed > 2000) {
      setPageYear(parsed);
    } else {
      // Kada smo na /, resetuj na trenutnu godinu
      setPageYear(new Date().getFullYear());
    }
  }, [params]);

  const pageMonth = id
    ? monthSerb.indexOf(id)
    : (currentDate?.getMonth() ?? new Date().getMonth());
  const currentYear = currentDate?.getFullYear() ?? new Date().getFullYear();

  const location = useMemo(() => ({ pathname }), [pathname]);

  const value = useMemo(
    () => ({
      location,
      pathPart,
      pageSlug,
      slug,
      id,
      currentDate,
      pageYear,
      pageMonth,
      currentYear,
    }),
    [
      location,
      pathPart,
      pageSlug,
      slug,
      id,
      currentDate,
      pageYear,
      pageMonth,
      currentYear,
    ],
  );

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
};
