import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import AppRouter from "./routers/AppRouter";
import rootSaga from "./data/rootSaga";
import { sjekkTilgang } from "./data/tilgang/tilgang_actions";
import { hentVeilederinfo } from "./data/veilederinfo/veilederinfo_actions";
import { hentBehandlendeEnhet } from "./data/behandlendeenhet/behandlendeEnhet_actions";
import { hentNavbruker } from "./data/navbruker/navbruker_actions";
import { hentLedere } from "./data/leder/ledere_actions";
import { hentPersonAdresse } from "./data/personinfo/personInfo_actions";
import "./styles/styles.less";
import { rootReducer } from "./data/rootState";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

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
