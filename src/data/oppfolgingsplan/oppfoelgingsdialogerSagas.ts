import { call, put, select, takeEvery } from "redux-saga/effects";
import { get } from "@/api/axios";
import * as actions from "./oppfoelgingsdialoger_actions";
import { OppfolgingsplanDTO } from "./oppfoelgingsdialoger";
import { SYFOOPPFOLGINGSPLANSERVICE_ROOT } from "@/apiConstants";

export const skalHenteOppfolgingsplaner = (state: any) => {
  const reducer = state.oppfoelgingsdialoger;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentOppfolgingsplanerHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteOppfolgingsplaner);
  if (skalHente) {
    yield put(actions.henterOppfoelgingsdialoger());

    const path = `${SYFOOPPFOLGINGSPLANSERVICE_ROOT}/v1/oppfolgingsplan/${action.fnr}`;
    try {
      const data: OppfolgingsplanDTO[] = yield call(get, path);
      yield put(actions.hentOppfolgingsdialogerHentet(data));
    } catch (e) {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentOppfoelgingsdialogerFeilet());
    }
  }
}

export default function* oppfoelgingsdialogerSagas() {
  yield takeEvery(
    actions.HENT_OPPFOELGINGSDIALOGER_FORESPURT,
    hentOppfolgingsplanerHvisIkkeHentet
  );
}
