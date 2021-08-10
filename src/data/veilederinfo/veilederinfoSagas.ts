import { call, put, takeEvery } from "redux-saga/effects";
import { get, Result, Success } from "../../api/axios";
import { VeilederinfoDTO } from "./types/VeilederinfoDTO";
import {
  HENT_VEILEDERINFO_FORESPURT,
  henterVeilederinfo,
  hentVeilederinfoFeilet,
  veilederinfoHentet,
} from "./veilederinfo_actions";
import { SYFOVEILEDER_ROOT } from "../../apiConstants";

export function* hentVeilederinfoSaga() {
  yield put(henterVeilederinfo());

  const path = `${SYFOVEILEDER_ROOT}/veileder/self`;
  const result: Result<VeilederinfoDTO> = yield call(get, path);

  if (result instanceof Success) {
    yield put(veilederinfoHentet(result.data));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(hentVeilederinfoFeilet());
  }
}

export default function* veilederinfoSagas() {
  yield takeEvery(HENT_VEILEDERINFO_FORESPURT, hentVeilederinfoSaga);
}
