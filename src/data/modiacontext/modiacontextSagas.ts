import { call, put, takeEvery } from "redux-saga/effects";
import { get, post } from "../../api/axios";
import * as actions from "./modiacontext_actions";
import { Result, Success } from "../../api/axios";
import { RSContext } from "./modiacontextTypes";

const redirectWithoutFnrInUrl = (fnr: string) => {
  window.location.href = window.location.pathname.replace(`/${fnr}`, "");
};

export function* pushModiacontextSaga(action: actions.PushModiaContextAction) {
  yield put(actions.pusherModiaContext());

  const path = `${process.env.REACT_APP_CONTEXTHOLDER_ROOT}/context`;
  const result: Result<any> = yield call(post, path, {
    verdi: action.data.verdi,
    eventType: action.data.eventType,
  });

  if (result instanceof Success) {
    redirectWithoutFnrInUrl(action.data.verdi);
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.pushModiaContextFeilet());
  }
}

export function* aktivBrukerSaga() {
  yield put(actions.henterAktivBruker());

  const path = `${process.env.REACT_APP_CONTEXTHOLDER_ROOT}/context/aktivbruker`;
  const result: Result<RSContext> = yield call(get, path);

  if (result instanceof Success) {
    yield put(actions.aktivBrukerHentet(result.data));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentAktivBrukerFeilet());
  }
}

export function* aktivEnhetSaga(action: any) {
  yield put(actions.henterAktivEnhet());

  const path = `${process.env.REACT_APP_CONTEXTHOLDER_ROOT}/context/aktivenhet`;
  const result: Result<RSContext> = yield call(get, path);

  if (result instanceof Success) {
    action.data.callback(result.data.aktivEnhet);
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentAktivEnhetFeilet());
  }
}

export default function* modiacontextSagas() {
  yield takeEvery(actions.PUSH_MODIACONTEXT_FORESPURT, pushModiacontextSaga);
  yield takeEvery(actions.HENT_AKTIVBRUKER_FORESPURT, aktivBrukerSaga);
  yield takeEvery(actions.HENT_AKTIVENHET_FORESPURT, aktivEnhetSaga);
}
