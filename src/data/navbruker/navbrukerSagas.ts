import { call, put, takeEvery } from "redux-saga/effects";
import {
  HENT_NAVBRUKER_FEILET,
  HENT_NAVBRUKER_FORESPURT,
  HENTER_NAVBRUKER,
  NAVBRUKER_HENTET,
} from "./navbruker_actions";
import { get } from "@/api/axios";
import { MODIASYFOREST_ROOT } from "@/apiConstants";

export function* hentNavbruker(action: any) {
  yield put({ type: HENTER_NAVBRUKER });

  const path = `${MODIASYFOREST_ROOT}/brukerinfo?fnr=${action.fnr}`;
  try {
    //TODO: Add proper actions and types
    const data: string = yield call(get, path);
    yield put({ type: NAVBRUKER_HENTET, data });
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put({ type: HENT_NAVBRUKER_FEILET });
  }
}

export default function* ledereSagas() {
  yield takeEvery(HENT_NAVBRUKER_FORESPURT, hentNavbruker);
}
