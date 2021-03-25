import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import { get } from "../../api/index";
import * as actions from "./prediksjon_actions";
import { PrediksjonState } from "./prediksjon";

export function* hentPrediksjon(action: any) {
  yield put(actions.hentPrediksjonHenter());
  try {
    const path = `${process.env.REACT_APP_ISPREDIKSJON_ROOT}/v1/prediksjon`;
    const data = yield call(get, path, action.fnr);

    console.log("data", data);

    if (data && !!data.err) {
      yield put(actions.hentPrediksjonFeilet());
    } else {
      const prediksjondata = data ? data : {};

      yield put(actions.hentPrediksjonHentet(prediksjondata, action.fnr));
    }
  } catch (e) {
    yield put(actions.hentPrediksjonFeilet());
  }
}

export const skalHentePrediksjon = (state: { prediksjon: PrediksjonState }) => {
  const reducer = state.prediksjon;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentPrediksjonHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHentePrediksjon);
  if (skalHente) {
    yield hentPrediksjon(action);
  }
}

function* watchHentPrediksjon() {
  yield takeEvery(
    actions.HENT_PREDIKSJON_FORESPURT,
    hentPrediksjonHvisIkkeHentet
  );
}

export default function* prediksjonSagas() {
  yield all([fork(watchHentPrediksjon)]);
}
