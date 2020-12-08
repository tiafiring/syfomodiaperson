import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import { post, get } from "../../api";
import history from "../../history";
import * as actions from "./moter_actions";
import * as historikkActions from "../historikk/historikk_actions";

export function* opprettMote(action) {
  yield put(actions.oppretterMote());
  try {
    const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter`;
    yield call(post, path, action.data);
    yield put(actions.moteOpprettet(action.data));
    yield put(actions.hentMoter(action.data.fnr));
    yield put(historikkActions.hentHistorikk(action.data.fnr, "MOTER"));
  } catch (e) {
    yield put(actions.opprettMoteFeilet());
  }
}

export function* hentMoter(action) {
  yield put(actions.henterMoter());
  try {
    const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter?fnr=${action.fnr}&henttpsdata=true&limit=1`;
    const data = yield call(get, path);
    yield put(actions.moterHentet(data));
  } catch (e) {
    if (e.status === 403) {
      yield put(actions.hentMoterIkkeTilgang(e.tilgang));
      return;
    }
    yield put(actions.hentMoterFeilet());
  }
}

export const skalHenteMoter = (state) => {
  const reducer = state.moter;
  return !reducer.henter && !reducer.hentingForsokt;
};

export function* hentMoterHvisIkkeHentet(action) {
  const skalHente = yield select(skalHenteMoter);
  if (skalHente) {
    yield hentMoter(action);
  }
}

export function* avbrytMote(action) {
  yield put(actions.avbryterMote(action.uuid));
  try {
    const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter/${action.uuid}/avbryt?varsle=${action.varsle}`;
    yield call(post, path);

    yield put(actions.moteAvbrutt(action.uuid));
    yield put(historikkActions.hentHistorikk(action.fnr, "MOTER"));
    history.replace(`/sykefravaer/${action.fnr}/mote`);
  } catch (e) {
    yield put(actions.avbrytMoteFeilet());
  }
}

export function* bekreftMote(action) {
  yield put(actions.bekrefterMote());
  try {
    const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter/${action.moteUuid}/bekreft?valgtAlternativId=${action.valgtAlternativId}`;
    yield call(post, path);

    yield put(
      actions.moteBekreftet(
        action.moteUuid,
        action.valgtAlternativId,
        new Date()
      )
    );
    yield put(historikkActions.hentHistorikk(action.fnr, "MOTER"));
    history.replace(`/sykefravaer/${action.fnr}/mote`);
  } catch (e) {
    yield put(actions.bekreftMoteFeilet());
  }
}

export function* opprettFlereAlternativ(action) {
  yield put(actions.oppretterFlereAlternativ());
  try {
    const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter/${action.moteUuid}/nyealternativer`;
    yield call(post, path, action.data);

    yield put(historikkActions.hentHistorikk(action.fnr, "MOTER"));
    yield put(
      actions.opprettFlereAlternativBekreftet(action.data, action.moteUuid)
    );
  } catch (e) {
    yield put(actions.opprettFlereAlternativFeilet());
  }
}

export function* watchOpprettFlereAlternativ() {
  yield takeEvery(
    actions.OPPRETT_FLERE_ALTERNATIV_FORESPURT,
    opprettFlereAlternativ
  );
}

function* watchOpprettMote() {
  yield takeEvery(actions.OPPRETT_MOTE_FORESPURT, opprettMote);
}

function* watchAvbrytMote() {
  yield takeEvery(actions.AVBRYT_MOTE_FORESPURT, avbrytMote);
}

function* watchBekreftMote() {
  yield takeEvery(actions.BEKREFT_MOTE_FORESPURT, bekreftMote);
}

function* watchHentMoter() {
  yield takeEvery(actions.HENT_MOTER_FORESPURT, hentMoterHvisIkkeHentet);
}

function* watchMoteOpprettet() {
  yield takeEvery(actions.MOTE_OPPRETTET, hentMoter);
}

export default function* moterSagas() {
  yield all([
    fork(watchOpprettMote),
    fork(watchHentMoter),
    fork(watchAvbrytMote),
    fork(watchBekreftMote),
    fork(watchMoteOpprettet),
    fork(watchOpprettFlereAlternativ),
  ]);
}
