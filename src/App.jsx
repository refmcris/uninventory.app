import React, { useEffect } from "react";
import { Router } from "./router/router";
import { addLocale, locale } from "primereact/api";
import { filterLocale } from "./helpers";

export const App = () => {
  useEffect(() => {
    addLocale("es", filterLocale);
    locale("es");
  }, []);
  return <Router />;
};
