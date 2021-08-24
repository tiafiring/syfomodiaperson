import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "@/api/axios";
import { VeilederinfoDTO } from "./types/VeilederinfoDTO";
import {
  HENT_VEILEDERINFO_FORESPURT,
  henterVeilederinfo,
  hentVeilederinfoFeilet,
  veilederinfoHentet,
} from "./veilederinfo_actions";
import { SYFOVEILEDER_ROOT } from "@/apiConstants";

export function* hentVeilederinfoSaga() {
  yield put(henterVeilederinfo());

  const path = `${SYFOVEILEDER_ROOT}/veileder/self`;
  try {
    const data: VeilederinfoDTO = yield call(get, path);
    yield put(veilederinfoHentet(data));
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(hentVeilederinfoFeilet());
  }
}

export default function* veilederinfoSagas() {
  yield takeEvery(HENT_VEILEDERINFO_FORESPURT, hentVeilederinfoSaga);
}
