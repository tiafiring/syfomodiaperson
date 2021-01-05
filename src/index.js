import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { reducer as formReducer } from "redux-form";
import { hasURLParameter } from "@navikt/digisyfo-npm";
import AppRouter from "./routers/AppRouter";
import history from "./history";
import fastleger from "./data/fastlege/fastleger";
import ledere from "./data/leder/ledere";
import navbruker from "./data/navbruker/navbruker";
import sykmeldinger from "./data/sykmelding/sykmeldinger";
import moter from "./data/mote/moter";
import motebehov from "./data/motebehov/motebehov";
import motebehovBehandling from "./data/motebehov/motebehovBehandling";
import epostinnhold from "./data/mote/epostinnhold";
import arbeidsgiverEpostinnhold from "./data/mote/arbeidsgiverEpostinnhold";
import modiacontext from "./data/modiacontext/modiacontext";
import historikk from "./data/historikk/historikk";
import oppfoelgingsdialoger from "./data/oppfolgingsplan/oppfoelgingsdialoger";
import oppfolgingsplanerlps from "./data/oppfolgingsplan/oppfolgingsplanerlps";
import dokumentinfo from "./data/oppfolgingsplan/dokumentinfo";
import behandlendeEnhet from "./data/behandlendeenhet/behandlendeEnhet";
import enhet from "./data/valgtenhet/enhet";
import tilgang from "./data/tilgang/tilgang";
import virksomhet from "./data/virksomhet/virksomhet";
import veilederinfo from "./data/veilederinfo/veilederinfo";
import diskresjonskode from "./data/diskresjonskode/diskresjonskode";
import egenansatt from "./data/egenansatt/egenansatt";
import oppfolgingstilfellerperson from "./data/oppfolgingstilfelle/oppfolgingstilfellerperson";
import oppfolgingstilfelleperioder from "./data/oppfolgingstilfelle/oppfolgingstilfelleperioder";
import personadresse from "./data/personinfo/personadresse";
import personoppgaver from "./data/personoppgave/personoppgaver";
import flaggperson from "./data/pengestopp/flaggperson";
import prediksjon from "./data/prediksjon/prediksjon";
import rootSaga from "./data/rootSaga";
import { sjekkTilgang } from "./data/tilgang/tilgang_actions";
import { hentVeilederinfo } from "./data/veilederinfo/veilederinfo_actions";
import { hentBehandlendeEnhet } from "./data/behandlendeenhet/behandlendeEnhet_actions";
import { hentNavbruker } from "./data/navbruker/navbruker_actions";
import { hentLedere } from "./data/leder/ledere_actions";
import { hentPersonAdresse } from "./data/personinfo/personInfo_actions";
import {
  hentAktivBruker,
  hentAktivEnhet,
  pushModiaContext,
} from "./data/modiacontext/modiacontext_actions";
import { valgtEnhet } from "./data/valgtenhet/enhet_actions";
import { CONTEXT_EVENT_TYPE } from "./konstanter";
import soknader from "./data/sykepengesoknad/soknader";
import { config, setContextHolderEventHandlers } from "./global";
import "./styles/styles.less";
import vedtak from "./data/vedtak/vedtak";

const rootReducer = combineReducers({
  history,
  fastleger,
  ledere,
  navbruker,
  modiacontext,
  historikk,
  moter,
  motebehov,
  motebehovBehandling,
  virksomhet,
  epostinnhold,
  arbeidsgiverEpostinnhold,
  oppfoelgingsdialoger,
  oppfolgingsplanerlps,
  enhet,
  sykmeldinger,
  behandlendeEnhet,
  diskresjonskode,
  dokumentinfo,
  egenansatt,
  veilederinfo,
  tilgang,
  form: formReducer,
  soknader,
  oppfolgingstilfellerperson,
  oppfolgingstilfelleperioder,
  personadresse,
  personoppgaver,
  flaggperson,
  prediksjon,
  vedtak,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const fnr = window.location.pathname.split("/")[2];

const nyPersonHandler = (nyttFnr) => {
  if (nyttFnr !== config.config.fnr) {
    window.location = `/sykefravaer/${nyttFnr}`;
  }
};

const nyEnhetHandler = (enhetNr) => {
  if (config.config.initiellEnhet !== enhetNr) {
    store.dispatch(valgtEnhet(enhetNr));
    store.dispatch(
      pushModiaContext({
        verdi: enhetNr,
        eventType: CONTEXT_EVENT_TYPE.NY_AKTIV_ENHET,
      })
    );
    config.config.initiellEnhet = enhetNr;
  }
};

setContextHolderEventHandlers(nyPersonHandler, nyEnhetHandler);

const fnrRegex = new RegExp("^[0-9]{11}$");
if (fnrRegex.test(fnr)) {
  store.dispatch(hentVeilederinfo());
  store.dispatch(hentBehandlendeEnhet(fnr));
  store.dispatch(hentNavbruker(fnr));
  store.dispatch(hentLedere(fnr));
  store.dispatch(hentPersonAdresse(fnr));
  store.dispatch(sjekkTilgang(fnr));
  store.dispatch(
    hentAktivBruker({
      callback: (aktivBruker) => {
        if (aktivBruker !== fnr) {
          store.dispatch(
            pushModiaContext({
              verdi: fnr,
              eventType: CONTEXT_EVENT_TYPE.NY_AKTIV_BRUKER,
            })
          );
        }
      },
    })
  );
}

store.dispatch(
  hentAktivEnhet({
    callback: (aktivEnhet) => {
      if (aktivEnhet && config.config.initiellEnhet !== aktivEnhet) {
        store.dispatch(valgtEnhet(aktivEnhet));
        config.config.initiellEnhet = aktivEnhet;
        window.renderDecoratorHead(config);
      }
    },
  })
);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter history={history} />
  </Provider>,
  document.getElementById("maincontent")
);

document.addEventListener("DOMContentLoaded", () => {
  // eslint-disable-next-line no-unused-expressions
  window.renderDecoratorHead && window.renderDecoratorHead(config);
});

if (window.location.hostname.indexOf("localhost") !== -1) {
  store.dispatch(valgtEnhet("0219"));
}

export { store, history, config };
