import { call, put, select, takeEvery } from "redux-saga/effects";
import { get, Result, Success } from "@/api/axios";
import * as actions from "./ledere_actions";
import { HentLedereAction } from "./ledere_actions";
import { RootState } from "../rootState";
import { Leder } from "./ledere";
import { MODIASYFOREST_ROOT } from "@/apiConstants";

export const skalHenteLedere = (state: RootState) => {
  const reducer = state.ledere;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentLedereHvisIkkeHentet(action: HentLedereAction) {
  const skalHente = yield select(skalHenteLedere);
  if (skalHente) {
    yield put(actions.henterLedere());

    const path = `${MODIASYFOREST_ROOT}/allnaermesteledere?fnr=${action.fnr}`;
    const result: Result<Leder[]> = yield call(get, path);

    if (result instanceof Success) {
      yield put(actions.ledereHentet(result.data));
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentLedereFailed());
    }
  }
}

export default function* ledereSagas() {
  yield takeEvery(actions.HENT_LEDERE_FORESPURT, hentLedereHvisIkkeHentet);
}
