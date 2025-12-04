import { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const LocationContext = createContext();

export const useGlobalLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const location = useLocation();

  const pathPart = location.pathname.split("/");
  const [previousLocation, setPreviousLocation] = useState(null);

  return <LocationContext.Provider value={{ location, pathPart, previousLocation }}>{children}</LocationContext.Provider>;
};
