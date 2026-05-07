"use client";
import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";

const LocationContext = createContext();

export const useGlobalLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const pathname = usePathname();
  const pathPart = pathname.split("/");
  const location = { pathname };

  return (
    <LocationContext.Provider value={{ location, pathPart }}>
      {children}
    </LocationContext.Provider>
  );
};
