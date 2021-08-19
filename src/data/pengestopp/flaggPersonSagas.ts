import { call, put, select, takeEvery } from "redux-saga/effects";
import * as actions from "./flaggperson_actions";
import { stoppAutomatikk2StatusEndring } from "@/utils/pengestoppUtils";
import { FlaggpersonState } from "./flaggperson";
import { get, post, Result, Success } from "@/api/axios";
import { StatusEndring } from "./types/FlaggPerson";
import { ISPENGESTOPP_ROOT } from "@/apiConstants";

export const skalHenteStatus = (state: { flaggperson: any }) => {
  const reducer = state.flaggperson;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentStatusHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteStatus);
  if (skalHente) {
    yield put(actions.henterStatus());

    const path = `${ISPENGESTOPP_ROOT}/person/status`;
    const result: Result<StatusEndring[]> = yield call(get, path, action.fnr);

    if (result instanceof Success) {
      yield put(actions.statusHentet(result.data || [], action.fnr));
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentStatusFeilet());
    }
  }
}

export const skalEndreStatus = (state: { flaggperson: FlaggpersonState }) => {
  const reducer = state.flaggperson;
  return !(reducer.endrer || reducer.endret);
};

export function* endreStatusHvisIkkeEndret(action: any) {
  const skalEndre = yield select(skalEndreStatus);
  if (skalEndre) {
    yield put(actions.endrerStatus());

    const path = `${ISPENGESTOPP_ROOT}/person/flagg`;

    const result: Result<any> = yield call(post, path, action.stoppAutomatikk);

    if (result instanceof Success) {
      yield put(actions.statusEndret());
      yield put(
        actions.statusHentet(
          [
            ...stoppAutomatikk2StatusEndring(action.stoppAutomatikk),
            ...(yield select((state) => state.flaggperson.data)),
          ],
          action.fnr
        )
      );
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.endreStatusFeilet());
    }
  }
}

export default function* flaggPersonSagas() {
  yield takeEvery(actions.ENDRE_STATUS_FORESPURT, endreStatusHvisIkkeEndret);
  yield takeEvery(actions.HENT_STATUS_FORESPURT, hentStatusHvisIkkeHentet);
}
