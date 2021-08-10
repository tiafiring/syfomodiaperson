import { call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./behandlendeEnhet_actions";
import {
  BehandlendeEnhetActionTypes,
  behandlendeEnhetHentet,
  HentBehandlendeEnhetAction,
  hentBehandlendeEnhetFeilet,
} from "./behandlendeEnhet_actions";
import { get, Result, Success } from "../../api/axios";
import { BehandlendeEnhet } from "./types/BehandlendeEnhet";
import { SYFOBEHANDLENDEENHET_ROOT } from "../../apiConstants";

function* hentBehandlendeEnhetSaga(action: HentBehandlendeEnhetAction) {
  yield put(actions.henterBehandlendeEnhet());
  const path = `${SYFOBEHANDLENDEENHET_ROOT}/personident`;
  const result: Result<BehandlendeEnhet> = yield call(get, path, action.fnr);
  if (result instanceof Success) {
    yield put(behandlendeEnhetHentet(result.data));
  } else {
    yield put(hentBehandlendeEnhetFeilet(result.error));
  }
}

export default function* behandlendeEnhetSagas() {
  yield takeEvery(
    BehandlendeEnhetActionTypes.HENT_BEHANDLENDE_ENHET_FORESPURT,
    hentBehandlendeEnhetSaga
  );
}
