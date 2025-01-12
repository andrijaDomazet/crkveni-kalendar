import React from "react";
import { IdProvider } from "./IdProvider";

const withIdProvider = (Component) => {
  return (props) => {
    return (
      <IdProvider {...props}>
        <Component {...props} />
      </IdProvider>
    );
  };
};
export default withIdProvider;
