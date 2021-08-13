import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api/axios";
import { Result, Success } from "../../api/axios";
import { HistorikkEvent } from "./types/historikkTypes";
import {
  SYFOMOTEADMIN_ROOT,
  SYFOMOTEBEHOV_ROOT,
  SYFOOPPFOLGINGSPLANSERVICE_ROOT,
} from "../../apiConstants";
import {
  HentHistorikkAction,
  henterHistorikk,
  historikkHentet,
  hentHistorikkFeilet,
  HistorikkActionTypes,
} from "./historikk_actions";

export function* hentHistorikkOppfoelgingsdialog(action: HentHistorikkAction) {
  yield put(henterHistorikk("OPPFOELGINGSDIALOG"));

  const path = `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/v1/oppfolgingsplan/${action.fnr}/historikk`;
  const result: Result<HistorikkEvent[]> = yield call(get, path);

  if (result instanceof Success) {
    yield put(historikkHentet(result.data, "OPPFOELGINGSDIALOG"));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(hentHistorikkFeilet("OPPFOELGINGSDIALOG"));
  }
}

export function* hentHistorikkMoter(action: HentHistorikkAction) {
  yield put(henterHistorikk("MOTER"));

  const path = `${SYFOMOTEADMIN_ROOT}/historikk?fnr=${action.fnr}`;
  const result: Result<HistorikkEvent[]> = yield call(get, path);

  if (result instanceof Success) {
    yield put(historikkHentet(result.data, "MOTER"));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(hentHistorikkFeilet("MOTER"));
  }
}

export function* hentHistorikkMotebehov(action: HentHistorikkAction) {
  yield put(henterHistorikk("MOTEBEHOV"));

  const path = `${SYFOMOTEBEHOV_ROOT}/historikk?fnr=${action.fnr}`;
  const result: Result<HistorikkEvent[]> = yield call(get, path);

  if (result instanceof Success) {
    yield put(historikkHentet(result.data, "MOTEBEHOV"));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(hentHistorikkFeilet("MOTEBEHOV"));
  }
}

export default function* historikkSagas() {
  yield takeEvery(
    HistorikkActionTypes.HENT_HISTORIKK_OPPFOELGINGSDIALOG,
    hentHistorikkOppfoelgingsdialog
  );
  yield takeEvery(
    HistorikkActionTypes.HENT_HISTORIKK_MOTER,
    hentHistorikkMoter
  );
  yield takeEvery(
    HistorikkActionTypes.HENT_HISTORIKK_MOTEBEHOV,
    hentHistorikkMotebehov
  );
}
