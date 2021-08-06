import { call, put, takeEvery } from "redux-saga/effects";
import {
  HENT_NAVBRUKER_FEILET,
  HENT_NAVBRUKER_FORESPURT,
  HENTER_NAVBRUKER,
  NAVBRUKER_HENTET,
} from "./navbruker_actions";
import { get, Result, Success } from "../../api/axios";

export function* hentNavbruker(action: any) {
  yield put({ type: HENTER_NAVBRUKER });

  const path = `${process.env.REACT_APP_REST_ROOT}/internad/brukerinfo?fnr=${action.fnr}`;
  const result: Result<string> = yield call(get, path);

  //TODO: Add proper actions and types
  if (result instanceof Success) {
    yield put({ type: NAVBRUKER_HENTET, data: result.data });
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put({ type: HENT_NAVBRUKER_FEILET });
  }
}

export default function* ledereSagas() {
  yield takeEvery(HENT_NAVBRUKER_FORESPURT, hentNavbruker);
}
