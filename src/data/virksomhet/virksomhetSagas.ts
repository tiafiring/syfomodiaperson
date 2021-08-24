import { call, put, select, takeEvery } from "redux-saga/effects";
import { get } from "@/api/axios";
import * as actions from "./virksomhet_actions";
import { Virksomhet } from "./types/Virksomhet";
import { SYFOMOTEADMIN_ROOT } from "@/apiConstants";

export const skalHenteVirksomhet = (state: any, action: any) => {
  const orgnummer = action.orgnummer || {};
  const reducer = state.virksomhet[orgnummer] || {};
  return (!reducer.henter && !reducer.hentingForsokt) || false;
};

export function* hentVirksomhetHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteVirksomhet, action);
  if (skalHente) {
    const orgnummer = action.orgnummer;
    yield put(actions.henterVirksomhet(orgnummer));

    const path = `${SYFOMOTEADMIN_ROOT}/virksomhet/${orgnummer}`;
    try {
      const data: Virksomhet = yield call(get, path);
      yield put(actions.virksomhetHentet(orgnummer, data));
    } catch (e) {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentVirksomhetFeilet(orgnummer));
    }
  }
}

export default function* virksomhetSagas() {
  yield takeEvery(
    actions.HENT_VIRKSOMHET_FORESPURT,
    hentVirksomhetHvisIkkeHentet
  );
}
