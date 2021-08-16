import { call, put, select, takeLeading } from "redux-saga/effects";
import { get, Result, Success } from "@/api/axios";
import { SykmeldingNewFormatDTO } from "./types/SykmeldingNewFormatDTO";
import { RootState } from "../rootState";
import { SYFOSMREGISTER_ROOT } from "@/apiConstants";
import {
  hentSykmeldingerFeilet,
  SykmeldingerActionTypes,
  sykmeldingerHentet,
} from "./sykmeldinger_actions";

export const skalHenteSykmeldinger = (state: RootState) => {
  const reducer = state.sykmeldinger;
  return !(reducer.hentet || reducer.error);
};

export function* hentSykmeldingerHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteSykmeldinger);
  if (skalHente) {
    const path = `${SYFOSMREGISTER_ROOT}/internal/sykmeldinger?fnr=${action.fnr}`;
    const result: Result<SykmeldingNewFormatDTO[]> = yield call(get, path);

    if (result instanceof Success) {
      yield put(sykmeldingerHentet(result.data, action.fnr));
    } else {
      yield put(hentSykmeldingerFeilet(result.error));
    }
  }
}

export default function* sykmeldingerSagas() {
  yield takeLeading(
    SykmeldingerActionTypes.HENT_SYKMELDINGER_FORESPURT,
    hentSykmeldingerHvisIkkeHentet
  );
}
