import { call, put, takeEvery } from "redux-saga/effects";
import { get, post } from "@/api/axios";
import * as actions from "./modiacontext_actions";
import { RSContext } from "./modiacontextTypes";
import { MODIACONTEXTHOLDER_ROOT } from "@/apiConstants";

const redirectWithoutFnrInUrl = (fnr: string) => {
  window.location.href = window.location.pathname.replace(`/${fnr}`, "");
};

export function* pushModiacontextSaga(action: actions.PushModiaContextAction) {
  yield put(actions.pusherModiaContext());

  const path = `${MODIACONTEXTHOLDER_ROOT}/context`;
  try {
    yield call(post, path, {
      verdi: action.data.verdi,
      eventType: action.data.eventType,
    });
    redirectWithoutFnrInUrl(action.data.verdi);
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.pushModiaContextFeilet());
  }
}

export function* aktivBrukerSaga() {
  yield put(actions.henterAktivBruker());

  const path = `${MODIACONTEXTHOLDER_ROOT}/context/aktivbruker`;
  try {
    const data: RSContext = yield call(get, path);
    yield put(actions.aktivBrukerHentet(data));
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentAktivBrukerFeilet());
  }
}

export function* aktivEnhetSaga(action: any) {
  yield put(actions.henterAktivEnhet());

  const path = `${MODIACONTEXTHOLDER_ROOT}/context/aktivenhet`;
  try {
    const data: RSContext = yield call(get, path);
    action.data.callback(data.aktivEnhet);
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentAktivEnhetFeilet());
  }
}

export default function* modiacontextSagas() {
  yield takeEvery(actions.PUSH_MODIACONTEXT_FORESPURT, pushModiacontextSaga);
  yield takeEvery(actions.HENT_AKTIVBRUKER_FORESPURT, aktivBrukerSaga);
  yield takeEvery(actions.HENT_AKTIVENHET_FORESPURT, aktivEnhetSaga);
}
