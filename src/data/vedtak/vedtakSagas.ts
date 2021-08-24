import { call, put, select, takeEvery } from "redux-saga/effects";
import { get } from "@/api/axios";
import { VedtakDTO, VedtakState } from "./vedtak";
import {
  HENT_VEDTAK_FORESPURT,
  hentVedtakFeilet,
  hentVedtakHenter,
  hentVedtakHentet,
} from "./vedtak_actions";
import { VEDTAK_ROOT } from "@/apiConstants";

export const skalHenteVedtak = (state: { vedtak: VedtakState }) => {
  const reducer = state.vedtak;
  return !(reducer.henter || reducer.hentingForsokt);
};

export function* hentVedtakHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteVedtak);
  if (skalHente) {
    yield put(hentVedtakHenter());

    const path = `${VEDTAK_ROOT}?fnr=${action.fnr}`;
    try {
      const data: VedtakDTO = yield call(get, path);
      yield put(hentVedtakHentet(data || {}, action.fnr));
    } catch (e) {
      //TODO: Add error to reducer and errorboundary to components
      yield put(hentVedtakFeilet());
    }
  }
}

export default function* vedtakSagas() {
  yield takeEvery(HENT_VEDTAK_FORESPURT, hentVedtakHvisIkkeHentet);
}
