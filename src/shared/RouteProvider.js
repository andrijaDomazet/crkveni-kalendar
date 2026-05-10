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
  const slug = params?.godina || params?.slug;
  const id = params?.mesec || params?.id;

  const currentDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [pageYear, setPageYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const parsed = Number(params?.godina || params?.slug);
    if (!isNaN(parsed)) setPageYear(parsed);
  }, [params]);

  useEffect(() => {
    const parsed = Number(slug);
    if (!isNaN(parsed)) {
      if (parsed !== pageYear) setPageYear(parsed);
    } else {
      if (pageYear !== currentDate.getFullYear())
        setPageYear(currentDate.getFullYear());
    }
  }, [slug, pageYear, currentDate]);

  const pageMonth = id ? monthSerb.indexOf(id) : currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const location = useMemo(() => ({ pathname }), [pathname]);

  const value = useMemo(
    () => ({
      location,
      pathPart,
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
