import { call, put, select, takeEvery } from "redux-saga/effects";
import { get, post, Result, Success } from "../../api/axios";
import * as actions from "./personoppgave_actions";
import { PersonOppgave } from "./types/PersonOppgave";

export const skalHentePersonOppgaver = (state: any) => {
  const reducer = state.personoppgaver;
  return !(reducer.henter || reducer.hentingForsokt);
};

export function* hentPersonOppgaverHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHentePersonOppgaver);
  if (skalHente) {
    yield put(actions.hentPersonOppgaverHenter());

    const path = "/ispersonoppgave/api/get/v1/personoppgave/personident";
    const result: Result<PersonOppgave[]> = yield call(get, path, action.fnr);

    if (result instanceof Success) {
      yield put(actions.hentPersonOppgaverHentet(result.data || []));
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentPersonOppgaverFeilet());
    }
  }
}

export function* behandlePersonOppgave(action: any) {
  const uuid = action.uuid;
  const referanseUuid = action.referanseUuid;
  const veilederIdent = action.veilederIdent;
  yield put(actions.behandlePersonOppgaveBehandler());

  const path = `/ispersonoppgave/api/post/v1/personoppgave/${uuid}/behandle`;
  const result: Result<any> = yield call(post, path, []);

  if (result instanceof Success) {
    yield put(
      actions.behandlePersonOppgaveBehandlet(uuid, referanseUuid, veilederIdent)
    );
  } else {
    //TODO: Add error to reducer and errorboundary to components
    if (result.code === 409) {
      window.location.reload();
      return;
    }
    yield put(actions.behandlePersonOppgaveFeilet());
  }
}

export default function* personOppgaveSagas() {
  yield takeEvery(
    actions.BEHANDLE_PERSONOPPGAVE_FORESPURT,
    behandlePersonOppgave
  );
  yield takeEvery(
    actions.HENT_PERSONOPPGAVER_FORESPURT,
    hentPersonOppgaverHvisIkkeHentet
  );
}
