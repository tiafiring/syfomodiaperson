import { call, put, fork, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./behandlendeEnhet_actions";

export function* hentBehandlendeEnhetSaga(action: any) {
  yield put(actions.henterBehandlendeEnhet());
  try {
    const path = `${process.env.REACT_APP_SYFOBEHANDLENDEENHETREST_ROOT}/internad/${action.fnr}`;
    const data = yield call(get, path);
    yield put(actions.behandlendeEnhetHentet(data));
  } catch (e) {
    yield put(actions.hentBehandlendeEnhetFeilet());
  }
}

function* watchHentBehandlendeEnhet() {
  yield takeEvery(
    actions.HENT_BEHANDLENDE_ENHET_FORESPURT,
    hentBehandlendeEnhetSaga
  );
}

export default function* behandlendeEnhetSagas() {
  yield fork(watchHentBehandlendeEnhet);
}
