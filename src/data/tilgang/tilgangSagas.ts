import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "@/api/axios";
import * as actions from "./tilgang_actions";
import { Tilgang } from "./tilgang";
import { SYFOTILGANGSKONTROLL_ROOT } from "@/apiConstants";

export function* sjekkTilgang(action: any) {
  yield put(actions.sjekkerTilgang());

  const path = `${SYFOTILGANGSKONTROLL_ROOT}/tilgang/navident/bruker/${action.fnr}`;
  try {
    const { harTilgang, begrunnelse }: Tilgang = yield call(get, path);
    if (harTilgang) {
      yield put(actions.harTilgang());
    } else {
      yield put(actions.harIkkeTilgang(begrunnelse));
    }
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.sjekkTilgangFeilet());
  }
}

export default function* tilgangSagas() {
  yield takeEvery(actions.SJEKK_TILGANG_FORESPURT, sjekkTilgang);
}
