import { call, put, select, takeEvery } from "redux-saga/effects";
import * as actions from "./prediksjon_actions";
import { Prediksjon, PrediksjonState } from "./prediksjon";
import { get } from "@/api/axios";
import { ISPREDIKSJON_ROOT } from "@/apiConstants";

export const skalHentePrediksjon = (state: { prediksjon: PrediksjonState }) => {
  const reducer = state.prediksjon;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentPrediksjonHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHentePrediksjon);
  if (skalHente) {
    yield put(actions.hentPrediksjonHenter());
    const path = `${ISPREDIKSJON_ROOT}/prediksjon`;
    try {
      const data: Prediksjon = yield call(get, path, action.fnr);
      yield put(actions.hentPrediksjonHentet(data, action.fnr));
    } catch (e) {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentPrediksjonFeilet());
    }
  }
}

export default function* prediksjonSagas() {
  yield takeEvery(
    actions.HENT_PREDIKSJON_FORESPURT,
    hentPrediksjonHvisIkkeHentet
  );
}
