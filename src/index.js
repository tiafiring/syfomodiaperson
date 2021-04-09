import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import { sjekkTilgang } from "./data/tilgang/tilgang_actions";
import { hentVeilederinfo } from "./data/veilederinfo/veilederinfo_actions";
import { hentBehandlendeEnhet } from "./data/behandlendeenhet/behandlendeEnhet_actions";
import { hentNavbruker } from "./data/navbruker/navbruker_actions";
import { hentLedere } from "./data/leder/ledere_actions";
import { hentPersonAdresse } from "./data/personinfo/personInfo_actions";
import { setupStore } from "./data/store";
import "./styles/styles.less";

const store = setupStore();

const fnr = window.location.pathname.split("/")[2];

const fnrRegex = new RegExp("^[0-9]{11}$");
if (fnrRegex.test(fnr)) {
  store.dispatch(hentVeilederinfo());
  store.dispatch(hentBehandlendeEnhet(fnr));
  store.dispatch(hentNavbruker(fnr));
  store.dispatch(hentLedere(fnr));
  store.dispatch(hentPersonAdresse(fnr));
  store.dispatch(sjekkTilgang(fnr));
}

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("maincontent")
);

export { store };
