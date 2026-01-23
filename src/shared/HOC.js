import React from "react";
import { IdProvider } from "./IdProvider";

export const withIdProvider = (Component) => {
  return (props) => {
    return (
      <IdProvider>
        <Component {...props} />
      </IdProvider>
    );
  };
};

// export const withFullDataProvider = (Component)=>{
//   return (props)=>{
// return(
//   <IdProvider>
// <FullDataProvider>
// <Component {...props}/>
// </FullDataProvider>
//   </IdProvider>
// )
//   }
// }
