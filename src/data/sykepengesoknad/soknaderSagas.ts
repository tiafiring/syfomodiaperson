import { call, put, select, takeEvery } from "redux-saga/effects";
import * as actions from "./soknader_actions";
import { get } from "@/api/axios";
import { SykepengesoknadDTO } from "./types/SykepengesoknadDTO";
import { SYFOSOKNAD_ROOT } from "@/apiConstants";

export const skalHenteSoknader = (state: any) => {
  const reducer = state.soknader;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentSoknaderHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteSoknader);
  if (skalHente) {
    yield put(actions.henterSoknader());

    const path = `${SYFOSOKNAD_ROOT}/soknader?fnr=${action.fnr}`;
    try {
      const data: SykepengesoknadDTO[] = yield call(get, path);
      yield put(actions.soknaderHentet(data));
    } catch (e) {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentSoknaderFeilet());
    }
  }
}

export default function* soknaderSagas() {
  yield takeEvery(actions.HENT_SOKNADER_FORESPURT, hentSoknaderHvisIkkeHentet);
}
