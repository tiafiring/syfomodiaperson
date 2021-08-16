import { call, put, select, takeEvery } from "redux-saga/effects";
import { get, Result, Success } from "@/api/axios";
import * as actions from "./fastleger_actions";
import { Fastlege } from "./types/Fastlege";
import { RootState } from "../rootState";
import { FASTLEGEREST_ROOT } from "@/apiConstants";

export const skalHenteFastleger = (state: RootState) => {
  const { henter, hentet, hentingFeilet } = state.fastleger;
  return !(henter || hentet || hentingFeilet);
};

export function* hentFastlegerHvisIkkeHentet(action: any) {
  const skalHente = yield select(skalHenteFastleger);
  if (skalHente) {
    yield put(actions.henterFastleger());
    const path = `${FASTLEGEREST_ROOT}/fastleger?fnr=${action.fnr}`;
    const result: Result<Fastlege> = yield call(get, path);

    if (result instanceof Success) {
      yield put(actions.fastlegerHentet(result.data));
    } else {
      //TODO: Add error to reducer and errorboundary to components
      yield put(actions.hentFastlegerFeilet());
    }
  }
}

export default function* fastlegerSagas() {
  yield takeEvery(
    actions.HENT_FASTLEGER_FORESPURT,
    hentFastlegerHvisIkkeHentet
  );
}
