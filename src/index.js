import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import { setupStore } from "./data/store";
import "./styles/styles.less";
import { initAmplitude } from "./amplitude/amplitude";

const store = setupStore();

initAmplitude();

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("maincontent")
);

export { store };
