import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "@/api/axios";
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
  try {
    const data: boolean = yield call(get, dm2Path);
    yield put(fetchUnleashTogglesSuccess(data));
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(fetchUnleashTogglesFailed());
  }
}

export default function* unleashSagas() {
  yield takeEvery(UnleashActionTypes.FETCH_UNLEASH_TOGGLES, fetchToggles);
}
