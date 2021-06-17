import { Reducer } from "redux";
import { UnleashActions, UnleashActionTypes } from "./unleash_actions";

export interface UnleashState {
  fetching: boolean;
  fetchingFailed: boolean;
  dm2Enabled: boolean;
}

export const initialState: UnleashState = {
  fetching: true,
  fetchingFailed: false,
  dm2Enabled: false,
};

const unleash: Reducer<UnleashState, UnleashActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UnleashActionTypes.FETCH_UNLEASH_TOGGLES: {
      return {
        ...state,
        fetching: true,
        fetchingFailed: false,
      };
    }
    case UnleashActionTypes.FETCH_UNLEASH_TOGGLES_FAILED: {
      return {
        ...state,
        fetching: false,
        fetchingFailed: true,
      };
    }
    case UnleashActionTypes.FETCH_UNLEASH_TOGGLES_SUCCESS: {
      return {
        ...state,
        fetching: false,
        fetchingFailed: false,
        dm2Enabled: action.isDm2Enabled,
      };
    }
    default: {
      return state;
    }
  }
};

export default unleash;
