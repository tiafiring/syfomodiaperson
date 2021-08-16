import { call, put, select, takeEvery } from "redux-saga/effects";
import { get, Result, Success } from "@/api/axios";
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
    const result: Result<OppfolgingsplanDTO[]> = yield call(get, path);

    if (result instanceof Success) {
      yield put(actions.hentOppfolgingsdialogerHentet(result.data));
    } else {
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
