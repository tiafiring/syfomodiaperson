import { call, put, select, takeEvery } from "redux-saga/effects";
import { get, Result, Success } from "../../api/axios";
import { VedtakDTO, VedtakState } from "./vedtak";
import {
  HENT_VEDTAK_FORESPURT,
  hentVedtakFeilet,
  hentVedtakHenter,
  hentVedtakHentet,
} from "./vedtak_actions";

export const skalHenteVedtak = (state: { vedtak: VedtakState }) => {
  const reducer = state.vedtak;
  return !(reducer.henter || reducer.hentingForsokt);
};

export function* hentVedtakHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteVedtak);
  if (skalHente) {
    yield put(hentVedtakHenter());

    const path = `${process.env.REACT_APP_VEDTAK_ROOT}?fnr=${action.fnr}`;
    const result: Result<VedtakDTO> = yield call(get, path);

    if (result instanceof Success) {
      yield put(hentVedtakHentet(result.data || {}, action.fnr));
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(hentVedtakFeilet());
    }
  }
}

export default function* vedtakSagas() {
  yield takeEvery(HENT_VEDTAK_FORESPURT, hentVedtakHvisIkkeHentet);
}
