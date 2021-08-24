import { call, put, select, takeEvery } from "redux-saga/effects";
import { get } from "@/api/axios";
import { RootState } from "../rootState";
import {
  egenansattHentet,
  HentEgenAnsattActionTypes,
  hentEgenansattFeilet,
} from "./egenansatt_actions";
import { SYFOPERSON_ROOT } from "@/apiConstants";
import { ApiErrorException, generalError } from "@/api/errors";

export function* hentEgenansattSaga(action: any) {
  const path = `${SYFOPERSON_ROOT}/person/egenansatt`;
  try {
    const data: boolean = yield call(get, path, action.fnr);
    yield put(egenansattHentet(data));
  } catch (e) {
    if (e instanceof ApiErrorException) {
      yield put(hentEgenansattFeilet(e.error));
    } else {
      yield put(hentEgenansattFeilet(generalError(e.message)));
    }
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
