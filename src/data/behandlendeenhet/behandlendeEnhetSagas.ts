import { call, put, takeEvery } from "redux-saga/effects";
import * as actions from "./behandlendeEnhet_actions";
import {
  BehandlendeEnhetActionTypes,
  behandlendeEnhetHentet,
  HentBehandlendeEnhetAction,
  hentBehandlendeEnhetFeilet,
} from "./behandlendeEnhet_actions";
import { get } from "@/api/axios";
import { BehandlendeEnhet } from "./types/BehandlendeEnhet";
import { SYFOBEHANDLENDEENHET_ROOT } from "@/apiConstants";
import { ApiErrorException, generalError } from "@/api/errors";

function* hentBehandlendeEnhetSaga(action: HentBehandlendeEnhetAction) {
  yield put(actions.henterBehandlendeEnhet());
  const path = `${SYFOBEHANDLENDEENHET_ROOT}/personident`;
  try {
    const data: BehandlendeEnhet = yield call(get, path, action.fnr);
    yield put(behandlendeEnhetHentet(data));
  } catch (e) {
    if (e instanceof ApiErrorException) {
      yield put(hentBehandlendeEnhetFeilet(e.error));
    } else {
      yield put(hentBehandlendeEnhetFeilet(generalError(e.message)));
    }
  }
}

export default function* behandlendeEnhetSagas() {
  yield takeEvery(
    BehandlendeEnhetActionTypes.HENT_BEHANDLENDE_ENHET_FORESPURT,
    hentBehandlendeEnhetSaga
  );
}
