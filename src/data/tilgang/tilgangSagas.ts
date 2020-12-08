import { call, fork, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import * as actions from "./tilgang_actions";

export function* sjekkTilgang(action: any) {
  yield put(actions.sjekkerTilgang());
  try {
    const path = `${process.env.REACT_APP_TILGANGSKONTROLL_RESTROOT}/tilgang/bruker?fnr=${action.fnr}`;
    const data = yield call(get, path);
    if (data.harTilgang === true) {
      yield put(actions.harTilgang());
    }
  } catch (e) {
    if (e.status === 403) {
      yield put(actions.harIkkeTilgang(e.tilgang.begrunnelse));
      return;
    }
    yield put(actions.sjekkTilgangFeilet());
  }
}

function* watchSjekkTilgang() {
  yield takeEvery(actions.SJEKK_TILGANG_FORESPURT, sjekkTilgang);
}

export default function* tilgangSagas() {
  yield fork(watchSjekkTilgang);
}
