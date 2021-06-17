import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "../../api";
import {
  FetchUnleashTogglesAction,
  fetchUnleashTogglesFailed,
  fetchUnleashTogglesSuccess,
  UnleashActionTypes,
} from "./unleash_actions";

//Common saga for all toggles
function* fetchToggles(action: FetchUnleashTogglesAction) {
  try {
    const dm2Path = `${process.env.REACT_APP_UNLEASH_ROOT}/dm2/${action.valgtEnhet}`;
    const dm2Enabled = yield call(get, dm2Path);
    yield put(fetchUnleashTogglesSuccess(dm2Enabled));
  } catch (e) {
    yield put(fetchUnleashTogglesFailed());
  }
}

export default function* unleashSagas() {
  yield takeEvery(UnleashActionTypes.FETCH_UNLEASH_TOGGLES, fetchToggles);
}
