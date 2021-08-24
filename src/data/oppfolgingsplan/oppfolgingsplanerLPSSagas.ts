import { call, put, select, takeEvery } from "redux-saga/effects";
import * as actions from "./oppfolgingsplanerlps_actions";
import { PersonOppgave } from "../personoppgave/types/PersonOppgave";
import { get } from "@/api/axios";
import { OppfolgingsplanLPS } from "./types/OppfolgingsplanLPS";
import { RootState } from "../rootState";
import { SYFOOPPFOLGINGSPLANSERVICE_ROOT } from "@/apiConstants";

export function* hentOppfolgingsplanerLPS(
  action: any,
  personOppgaveList: PersonOppgave[]
) {
  yield put(actions.hentOppfolgingsplanerLPSHenter());

  const path = `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/oppfolgingsplan/lps`;
  try {
    const data: OppfolgingsplanLPS[] = yield call(get, path, action.fnr);
    yield put(actions.hentOppfolgingsplanerLPSHentet(data, personOppgaveList));
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(actions.hentOppfolgingsplanerLPSFeilet());
  }
}

export const skalHenteOppfolgingsplanerLPS = (state: RootState) => {
  const reducer = state.oppfolgingsplanerlps;
  const harHentetPersonOppgaver = state.personoppgaver.hentet;
  return harHentetPersonOppgaver && !(reducer.henter || reducer.hentingForsokt);
};

export const hentPersonOppgaver = (state: RootState) => {
  const hentetPersonOppgaver = state.personoppgaver.hentet;
  if (hentetPersonOppgaver) {
    return state.personoppgaver.data;
  }
  return [];
};

export function* hentOppfolgingsplanerLPSHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteOppfolgingsplanerLPS);
  if (skalHente) {
    const personOppgaveList = yield select(hentPersonOppgaver);
    yield hentOppfolgingsplanerLPS(action, personOppgaveList);
  }
}

export default function* oppfolgingsplanerLPSSagas() {
  yield takeEvery(
    actions.HENT_OPPFOLGINGSPLANER_LPS_FORESPURT,
    hentOppfolgingsplanerLPSHvisIkkeHentet
  );
}
