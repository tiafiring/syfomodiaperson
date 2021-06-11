import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import { setupStore } from "./data/store";
import "./styles/styles.less";
import { initAmplitude } from "./amplitude/amplitude";
import * as Sentry from "@sentry/react";
import { getEnvironmentAsString } from "./utils/miljoUtil";

const store = setupStore();

initAmplitude();
Sentry.init({
  dsn: "https://8ea71ab742104cd5ad7d9d488023f28d@sentry.gc.nav.no/84",
  environment: getEnvironmentAsString(),
});

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("maincontent")
);

export { store };
