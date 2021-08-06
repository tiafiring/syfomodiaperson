import { call, put, select, takeEvery } from "redux-saga/effects";
import * as actions from "./prediksjon_actions";
import { Prediksjon, PrediksjonState } from "./prediksjon";
import { get, Result, Success } from "../../api/axios";

export const skalHentePrediksjon = (state: { prediksjon: PrediksjonState }) => {
  const reducer = state.prediksjon;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentPrediksjonHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHentePrediksjon);
  if (skalHente) {
    yield put(actions.hentPrediksjonHenter());
    const path = `${process.env.REACT_APP_ISPREDIKSJON_ROOT}/v1/prediksjon`;
    const result: Result<Prediksjon> = yield call(get, path, action.fnr);

    if (result instanceof Success) {
      yield put(actions.hentPrediksjonHentet(result.data, action.fnr));
    } else {
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
