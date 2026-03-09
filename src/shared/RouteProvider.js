import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { monthSerb } from "../components/Calendar/calendar-data/calendar-data";

const RouteContext = createContext();
export const useRouteContext = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {
  const location = useLocation();

  const pathPart = location.pathname.split("/");
  const [previousLocation, setPreviousLocation] = useState(null);

  const match = matchPath("/:slug/:id?", location.pathname);
  const slug = match?.params?.slug;
  const id = match?.params?.id;

  const currentDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [pageYear, setPageYear] = useState(() => {
    const parsed = Number(slug);
    return !isNaN(parsed) ? parsed : new Date().getFullYear();
  });

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
  const value = useMemo(
    () => ({
      location,
      pathPart,
      previousLocation,
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
      previousLocation,
      slug,
      id,
      currentDate,
      pageYear,
      pageMonth,
      currentYear,
    ],
  );
  return (
    <RouteContext.Provider
      // value={{
      //   location,
      //   pathPart,
      //   previousLocation,
      //   slug,
      //   id,
      //   currentDate,
      //   pageYear,
      //   pageMonth,
      //   currentYear,
      // }}
      value={value}
    >
      {children}
    </RouteContext.Provider>
  );
};
