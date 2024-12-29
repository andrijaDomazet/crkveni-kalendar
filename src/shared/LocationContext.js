import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const LocationContext = createContext();

export const useGlobalLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const location = useLocation();
  // console.log("Location", location.pathname);
  const pathPart = location.pathname.split("/");
  const [previousLocation, setPreviousLocation] = useState(null);

  // useEffect(() => {
  //   setPreviousLocation(window.location.hostname);
  // }, [location]);

  return <LocationContext.Provider value={{ location, pathPart, previousLocation }}>{children}</LocationContext.Provider>;
};
