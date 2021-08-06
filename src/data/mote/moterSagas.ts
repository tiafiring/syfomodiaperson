import { call, put, select, takeEvery } from "redux-saga/effects";
import { get, post, Result, Success } from "../../api/axios";
import * as actions from "./moter_actions";
import * as historikkActions from "../historikk/historikk_actions";
import { MoteDTO } from "./types/moteTypes";

export function* opprettMote(action: any) {
  yield put(actions.oppretterMote());

  const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter`;
  const result: Result<any> = yield call(post, path, action.data);

  if (result instanceof Success) {
    yield put(actions.moteOpprettet(action.data));
    yield put(actions.hentMoter(action.data.fnr));
    yield put(historikkActions.hentHistorikk(action.data.fnr, "MOTER"));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.opprettMoteFeilet());
  }
}

export function* hentMoter(action: any) {
  yield put(actions.henterMoter());
  const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter?fnr=${action.fnr}&henttpsdata=true&limit=1`;
  const result: Result<MoteDTO[]> = yield call(get, path);

  if (result instanceof Success) {
    yield put(actions.moterHentet(result.data));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    if (result.code === 403) {
      yield put(
        actions.hentMoterIkkeTilgang({
          harTilgang: false,
          begrunnelse: result.error.message,
        })
      );
      return;
    }
    yield put(actions.hentMoterFeilet());
  }
}

export const skalHenteMoter = (state: any) => {
  const reducer = state.moter;
  return !reducer.henter && !reducer.hentingForsokt;
};

export function* hentMoterHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteMoter);
  if (skalHente) {
    yield call(hentMoter, action);
  }
}

export function* avbrytMote(action: any) {
  yield put(actions.avbryterMote(action.uuid));

  const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter/${action.uuid}/avbryt?varsle=${action.varsle}`;
  const result: Result<any> = yield call(post, path, []);

  if (result instanceof Success) {
    yield put(actions.moteAvbrutt(action.uuid));
    yield put(historikkActions.hentHistorikk(action.fnr, "MOTER"));
    window.location.href = `/sykefravaer/moteoversikt`;
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.avbrytMoteFeilet());
  }
}

export function* bekreftMote(action: any) {
  yield put(actions.bekrefterMote());
  const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter/${action.moteUuid}/bekreft?valgtAlternativId=${action.valgtAlternativId}`;
  const result: Result<any> = yield call(post, path, []);

  if (result instanceof Success) {
    yield put(
      actions.moteBekreftet(
        action.moteUuid,
        action.valgtAlternativId,
        new Date()
      )
    );
    yield put(historikkActions.hentHistorikk(action.fnr, "MOTER"));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.bekreftMoteFeilet());
  }
}

export function* opprettFlereAlternativ(action: any) {
  yield put(actions.oppretterFlereAlternativ());

  const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/moter/${action.moteUuid}/nyealternativer`;
  const result: Result<any> = yield call(post, path, action.data);

  if (result instanceof Success) {
    yield put(historikkActions.hentHistorikk(action.fnr, "MOTER"));
    yield put(
      actions.opprettFlereAlternativBekreftet(action.data, action.moteUuid)
    );
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.opprettFlereAlternativFeilet());
  }
}

export default function* moterSagas() {
  yield takeEvery(
    actions.OPPRETT_FLERE_ALTERNATIV_FORESPURT,
    opprettFlereAlternativ
  );
  yield takeEvery(actions.OPPRETT_MOTE_FORESPURT, opprettMote);
  yield takeEvery(actions.AVBRYT_MOTE_FORESPURT, avbrytMote);
  yield takeEvery(actions.BEKREFT_MOTE_FORESPURT, bekreftMote);
  yield takeEvery(actions.HENT_MOTER_FORESPURT, hentMoterHvisIkkeHentet);
  yield takeEvery(actions.MOTE_OPPRETTET, hentMoter);
}
