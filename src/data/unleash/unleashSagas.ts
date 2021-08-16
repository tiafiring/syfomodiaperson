import { call, put, takeEvery } from "redux-saga/effects";
import { get, Result, Success } from "@/api/axios";
import {
  FetchUnleashTogglesAction,
  fetchUnleashTogglesFailed,
  fetchUnleashTogglesSuccess,
  UnleashActionTypes,
} from "./unleash_actions";
import { UNLEASH_ROOT } from "@/apiConstants";

//Common saga for all toggles
function* fetchToggles(action: FetchUnleashTogglesAction) {
  const dm2Path = `${UNLEASH_ROOT}/dm2/?valgtEnhet=${action.valgtEnhet}&userId=${action.userId}`;
  const result: Result<boolean> = yield call(get, dm2Path);

  if (result instanceof Success) {
    yield put(fetchUnleashTogglesSuccess(result.data));
  } else {
    //TODO: Add error to reducer and errorboundary to components
    yield put(fetchUnleashTogglesFailed());
  }
}

export default function* unleashSagas() {
  yield takeEvery(UnleashActionTypes.FETCH_UNLEASH_TOGGLES, fetchToggles);
}
