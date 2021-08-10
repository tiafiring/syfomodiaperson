import { call, put, select, takeEvery } from "redux-saga/effects";
import { get, Result, Success } from "../../api/axios";
import { RootState } from "../rootState";
import {
  egenansattHentet,
  HentEgenAnsattActionTypes,
  hentEgenansattFeilet,
} from "./egenansatt_actions";
import { SYFOPERSON_ROOT } from "../../apiConstants";

export function* hentEgenansattSaga(action: any) {
  const path = `${SYFOPERSON_ROOT}/person/egenansatt`;
  const result: Result<boolean> = yield call(get, path, action.fnr);
  if (result instanceof Success) {
    yield put(egenansattHentet(result.data));
  } else {
    yield put(hentEgenansattFeilet(result.error));
  }
}

export const skalHenteEgenansatt = (state: RootState) => {
  const { henter, hentet, error } = state.egenansatt;
  return !(henter || hentet || error);
};

export function* hentEgenansattHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteEgenansatt);
  if (skalHente) {
    yield hentEgenansattSaga(action);
  }
}

export default function* egenansattSagas() {
  yield takeEvery(
    HentEgenAnsattActionTypes.HENT_EGENANSATT_FORESPURT,
    hentEgenansattHvisIkkeHentet
  );
}
