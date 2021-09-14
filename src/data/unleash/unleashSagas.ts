import { call, put, takeEvery } from "redux-saga/effects";
import { post } from "@/api/axios";
import {
  FetchUnleashTogglesAction,
  fetchUnleashTogglesFailed,
  fetchUnleashTogglesSuccess,
  UnleashActionTypes,
} from "./unleash_actions";
import { UNLEASH_ROOT } from "@/apiConstants";
import { ToggleNames, Toggles } from "@/data/unleash/unleash_types";

//Common saga for all toggles
function* fetchToggles(action: FetchUnleashTogglesAction) {
  const dm2Path = `${UNLEASH_ROOT}/dm2?valgtEnhet=${action.valgtEnhet}&userId=${action.userId}`;
  try {
    const data: Toggles = yield call(post, dm2Path, {
      toggles: Object.values(ToggleNames),
    });
    yield put(fetchUnleashTogglesSuccess(data));
  } catch (e) {
    //TODO: Add error to reducer and errorboundary to components
    yield put(fetchUnleashTogglesFailed());
  }
}

export default function* unleashSagas() {
  yield takeEvery(UnleashActionTypes.FETCH_UNLEASH_TOGGLES, fetchToggles);
}
