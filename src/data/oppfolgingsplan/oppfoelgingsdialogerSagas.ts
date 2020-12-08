import { call, fork, put, select, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./oppfoelgingsdialoger_actions";

export function* hentOppfoelgingsdialoger(action: any) {
  yield put(actions.henterOppfoelgingsdialoger());
  try {
    const path = `${process.env.REACT_APP_OPPFOLGINGSPLANREST_ROOT}/internad/v1/oppfolgingsplan/${action.fnr}`;
    const data = yield call(get, path);
    yield put(actions.hentOppfolgingsdialogerHentet(data));
  } catch (e) {
    yield put(actions.hentOppfoelgingsdialogerFeilet());
  }
}

export const skalHenteOppfolgingsplaner = (state: any) => {
  const reducer = state.oppfoelgingsdialoger;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentOppfolgingsplanerHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteOppfolgingsplaner);
  if (skalHente) {
    yield hentOppfoelgingsdialoger(action);
  }
}

function* watchHentOppfoelgingsdialoger() {
  yield takeEvery(
    actions.HENT_OPPFOELGINGSDIALOGER_FORESPURT,
    hentOppfolgingsplanerHvisIkkeHentet
  );
}

export default function* oppfoelgingsdialogerSagas() {
  yield fork(watchHentOppfoelgingsdialoger);
}
