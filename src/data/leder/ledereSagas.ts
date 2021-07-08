import { call, fork, put, select, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./ledere_actions";
import { HentLedereAction } from "./ledere_actions";
import { RootState } from "../rootState";
import { Leder } from "./ledere";

export function* hentLedere(action: HentLedereAction) {
  yield put(actions.henterLedere());
  try {
    const path = `${process.env.REACT_APP_REST_ROOT}/internad/allnaermesteledere?fnr=${action.fnr}`;
    const data: Leder[] = yield call(get, path);
    yield put(actions.ledereHentet(data));
  } catch (e) {
    yield put(actions.hentLedereFailed());
  }
}

export const skalHenteLedere = (state: RootState) => {
  const reducer = state.ledere;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentLedereHvisIkkeHentet(action: HentLedereAction) {
  const skalHente = yield select(skalHenteLedere);
  if (skalHente) {
    yield hentLedere(action);
  }
}

function* watchHentLedere() {
  yield takeEvery(actions.HENT_LEDERE_FORESPURT, hentLedereHvisIkkeHentet);
}

export default function* ledereSagas() {
  yield fork(watchHentLedere);
}
