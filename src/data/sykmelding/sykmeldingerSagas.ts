import { call, put, select, takeEvery } from "redux-saga/effects";
import * as actions from "./sykmeldinger_actions";
import { get, Result, Success } from "../../api/axios";
import { SykmeldingNewFormatDTO } from "./types/SykmeldingNewFormatDTO";
import { SYFOSMREGISTER_ROOT } from "../../apiConstants";

export const skalHenteSykmeldinger = (state: any) => {
  const reducer = state.sykmeldinger;
  return !(reducer.henter || reducer.hentet || reducer.hentingFeilet);
};

export function* hentSykmeldingerHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteSykmeldinger);
  if (skalHente) {
    yield put(actions.henterSykmeldinger());

    const path = `${SYFOSMREGISTER_ROOT}/internal/sykmeldinger?fnr=${action.fnr}`;
    const result: Result<SykmeldingNewFormatDTO[]> = yield call(get, path);

    if (result instanceof Success) {
      yield put(actions.sykmeldingerHentet(result.data, action.fnr));
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentSykmeldingerFeilet());
    }
  }
}

export default function* sykmeldingerSagas() {
  yield takeEvery(
    actions.HENT_SYKMELDINGER_FORESPURT,
    hentSykmeldingerHvisIkkeHentet
  );
}
