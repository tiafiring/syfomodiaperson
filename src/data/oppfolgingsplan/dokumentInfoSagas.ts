import { call, put, select, takeEvery } from "redux-saga/effects";
import * as actions from "./dokumentinfo_actions";
import { get, Result, Success } from "../../api/axios";
import { DokumentinfoDTO } from "./types/DokumentinfoDTO";
import { RootState } from "../rootState";
import { SYFOOPPFOLGINGSPLANSERVICE_ROOT } from "../../apiConstants";

export const skalHenteDokumentInfo = (state: RootState, action: any) => {
  const planId = action.id || {};
  const reducer = state.dokumentinfo[planId] || {};
  return (!reducer.henter && !reducer.hentingForsokt) || false;
};

export function* hentMotebehovHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteDokumentInfo, action);
  if (skalHente) {
    yield put(actions.henterDokumentinfo(action.id));

    const path = `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/dokument/${action.id}/dokumentinfo`;
    const result: Result<DokumentinfoDTO> = yield call(get, path);

    if (result instanceof Success) {
      yield put(actions.dokumentinfoHentet(action.id, result.data));
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentDokumentinfoFeilet(action.id));
    }
  }
}

export default function* dokumentInfoSagas() {
  yield takeEvery(
    actions.HENT_DOKUMENTINFO_FORESPURT,
    hentMotebehovHvisIkkeHentet
  );
}
