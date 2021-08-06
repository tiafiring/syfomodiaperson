import { Reducer } from "redux";
import {
  HentEgenAnsattActions,
  HentEgenAnsattActionTypes,
} from "./egenansatt_actions";
import { ApiError } from "../../api/axios";

export interface EgenansattState {
  henter: boolean;
  hentet: boolean;
  error?: ApiError;
  isEgenAnsatt: boolean;
}

export const initialState: EgenansattState = {
  henter: false,
  hentet: false,
  isEgenAnsatt: false,
};

const egenansatt: Reducer<EgenansattState, HentEgenAnsattActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case HentEgenAnsattActionTypes.HENT_EGENANSATT_FORESPURT: {
      return {
        ...initialState,
        henter: true,
        error: undefined,
      };
    }
    case HentEgenAnsattActionTypes.EGENANSATT_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        error: undefined,
        isEgenAnsatt: action.isEgenAnsatt,
      };
    }
    case HentEgenAnsattActionTypes.HENT_EGENANSATT_FEILET: {
      return {
        ...state,
        henter: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default egenansatt;
