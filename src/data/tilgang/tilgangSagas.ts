import { call, put, takeEvery } from "redux-saga/effects";
import { get, Result, Success } from "../../api/axios";
import * as actions from "./tilgang_actions";
import { Tilgang } from "./tilgang";
import { SYFOTILGANGSKONTROLL_ROOT } from "../../apiConstants";

export function* sjekkTilgang(action: any) {
  yield put(actions.sjekkerTilgang());

  const path = `${SYFOTILGANGSKONTROLL_ROOT}/tilgang/bruker?fnr=${action.fnr}`;
  const result: Result<Tilgang> = yield call(get, path);

  if (result instanceof Success) {
    if (result.data.harTilgang) {
      yield put(actions.harTilgang());
    } else {
      yield put(actions.harIkkeTilgang(result.data.begrunnelse));
    }
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.sjekkTilgangFeilet());
  }
}

export default function* tilgangSagas() {
  yield takeEvery(actions.SJEKK_TILGANG_FORESPURT, sjekkTilgang);
}
