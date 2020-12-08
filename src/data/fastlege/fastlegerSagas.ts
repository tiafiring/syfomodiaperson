import { call, fork, put, select, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./fastleger_actions";

export function* hentFastleger(action: any) {
  yield put(actions.henterFastleger());
  try {
    const path = `${process.env.REACT_APP_FASTLEGEREST_ROOT}/internad/fastlege/v1/fastleger?fnr=${action.fnr}`;
    const data = yield call(get, path);
    yield put(actions.fastlegerHentet(data));
  } catch (e) {
    yield put(actions.hentFastlegerFeilet());
  }
}

export const skalHenteFastleger = (state: any) => {
  const reducer = state.fastleger;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentFastlegerHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteFastleger);
  if (skalHente) {
    yield hentFastleger(action);
  }
}

function* watchHentFastleger() {
  yield takeEvery(
    actions.HENT_FASTLEGER_FORESPURT,
    hentFastlegerHvisIkkeHentet
  );
}

export default function* fastlegerSagas() {
  yield fork(watchHentFastleger);
}
