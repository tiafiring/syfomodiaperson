import { call, put, select, takeEvery } from "redux-saga/effects";
import { get, post } from "@/api/axios";
import * as actions from "./motebehov_actions";
import { HentMotebehovAction } from "./motebehov_actions";
import * as behandleActions from "./behandlemotebehov_actions";
import { BehandleMotebehovAction } from "./behandlemotebehov_actions";
import { RootState } from "../rootState";
import { MotebehovDTO } from "./types/motebehovTypes";
import { SYFOMOTEBEHOV_ROOT } from "@/apiConstants";

export const skalHenteMotebehov = (state: RootState) => {
  const reducer = state.motebehov;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentMotebehovHvisIkkeHentet(action: HentMotebehovAction) {
  const skalHente = yield select(skalHenteMotebehov);
  if (skalHente) {
    const fnr = action.fnr ? action.fnr : "";
    yield put(actions.henterMotebehov());

    const path = `${SYFOMOTEBEHOV_ROOT}/motebehov?fnr=${fnr}`;
    try {
      const data: MotebehovDTO[] = yield call(get, path);
      yield put(actions.motebehovHentet(data));
    } catch (e) {
      //TODO: Add error to reducer and errorboundary to components
      if (e.code === 403) {
        yield put(actions.hentMotebehovIkkeTilgang(e.error.message));
        return;
      }
      yield put(actions.hentMotebehovFeilet());
    }
  }
}

export function* behandleMotebehov(action: BehandleMotebehovAction) {
  const fnr = action.fnr;
  yield put(behandleActions.behandleMotebehovBehandler());

  const path = `${SYFOMOTEBEHOV_ROOT}/motebehov/${fnr}/behandle`;
  try {
    yield call(post, path, []);
    yield put(behandleActions.behandleMotebehovBehandlet(action.veilederIdent));
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    if (e.code === 403) {
      yield put(behandleActions.behandleMotebehovForbudt());
      return;
    } else if (e.code === 409) {
      window.location.reload();
      return;
    }
    yield put(behandleActions.behandleMotebehovFeilet());
  }
}

export default function* motebehovSagas() {
  yield takeEvery(
    actions.HENT_MOTEBEHOV_FORESPURT,
    hentMotebehovHvisIkkeHentet
  );
  yield takeEvery(
    behandleActions.BEHANDLE_MOTEBEHOV_FORESPURT,
    behandleMotebehov
  );
}
