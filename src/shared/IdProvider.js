import React, { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import data from "../all__news";

const IdContext = createContext();

export const useIdContext = () => useContext(IdContext);

export const IdProvider = ({ children }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const { slug, id } = useParams();
 
  return (
    <IdContext.Provider value={{ data, id, slug, currentDate, currentYear }}>
      {children}
    </IdContext.Provider>
  );
};
