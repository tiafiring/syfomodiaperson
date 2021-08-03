import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api/axios";
import * as actions from "./historikk_actions";
import { Result, Success } from "../../api/axios";
import { Historikk } from "./types/Historikk";

export function* hentHistorikkOppfoelgingsdialog(action: any) {
  yield put(actions.henterHistorikk("OPPFOELGINGSDIALOG"));

  const path = `${process.env.REACT_APP_OPPFOLGINGSPLANREST_ROOT}/internad/v1/oppfolgingsplan/${action.fnr}/historikk`;
  const result: Result<Historikk[]> = yield call(get, path);

  if (result instanceof Success) {
    yield put(actions.historikkHentet(result.data, "OPPFOELGINGSDIALOG"));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentHistorikkFeilet("OPPFOELGINGSDIALOG"));
  }
}

export function* hentHistorikkMoter(action: any) {
  yield put(actions.henterHistorikk("MOTER"));

  const path = `${process.env.REACT_APP_MOTEADMIN_REST_ROOT}/internad/historikk?fnr=${action.fnr}`;
  const result: Result<Historikk[]> = yield call(get, path);

  if (result instanceof Success) {
    yield put(actions.historikkHentet(result.data, "MOTER"));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentHistorikkFeilet("MOTER"));
  }
}

export function* hentHistorikkMotebehov(action: any) {
  yield put(actions.henterHistorikk("MOTEBEHOV"));

  const path = `${process.env.REACT_APP_SYFOMOTEBEHOV_ROOT}/internad/veileder/historikk?fnr=${action.fnr}`;
  const result: Result<Historikk[]> = yield call(get, path);

  if (result instanceof Success) {
    yield put(actions.historikkHentet(result.data, "MOTEBEHOV"));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentHistorikkFeilet("MOTEBEHOV"));
  }
}

export default function* historikkSagas() {
  yield takeEvery(
    "HENT_HISTORIKK_OPPFOELGINGSDIALOG_FORESPURT",
    hentHistorikkOppfoelgingsdialog
  );
  yield takeEvery("HENT_HISTORIKK_MOTER_FORESPURT", hentHistorikkMoter);
  yield takeEvery("HENT_HISTORIKK_MOTEBEHOV_FORESPURT", hentHistorikkMotebehov);
}
