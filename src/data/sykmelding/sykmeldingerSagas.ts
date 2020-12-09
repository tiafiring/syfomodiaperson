import { call, put, fork, select, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./sykmeldinger_actions";

export function* hentSykmeldinger(action: any) {
  yield put(actions.henterSykmeldinger());
  try {
    const path = `${process.env.REACT_APP_SYFOSMREGISTER_ROOT}/v1/internal/sykmeldinger?fnr=${action.fnr}`;
    const data = yield call(get, path);
    if (!!data.err) {
      yield put(actions.hentSykmeldingerFeilet());
    } else {
      yield put(actions.sykmeldingerHentet(data, action.fnr));
    }
  } catch (e) {
    yield put(actions.hentSykmeldingerFeilet());
  }
}

export const skalHenteSykmeldinger = (state: any) => {
  const reducer = state.sykmeldinger;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentSykmeldingerHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteSykmeldinger);
  if (skalHente) {
    yield hentSykmeldinger(action);
  }
}

function* watchHentSykmeldinger() {
  yield takeEvery(
    actions.HENT_SYKMELDINGER_FORESPURT,
    hentSykmeldingerHvisIkkeHentet
  );
}

export default function* sykmeldingerSagas() {
  yield fork(watchHentSykmeldinger);
}
