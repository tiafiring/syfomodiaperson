import { Reducer } from "redux";
import {
  BehandlendeEnhetActions,
  BehandlendeEnhetActionTypes,
} from "./behandlendeEnhet_actions";
import { BehandlendeEnhet } from "./types/BehandlendeEnhet";
import { ApiError } from "@/api/errors";

export interface BehandlendeEnhetState {
  henter: boolean;
  error?: ApiError;
  data: BehandlendeEnhet;
}

export const initialState: BehandlendeEnhetState = {
  henter: false,
  data: { navn: "", enhetId: "" },
};

const behandlendeEnhet: Reducer<
  BehandlendeEnhetState,
  BehandlendeEnhetActions
> = (state = initialState, action) => {
  switch (action.type) {
    case BehandlendeEnhetActionTypes.HENT_BEHANDLENDE_ENHET_FEILET: {
      return {
        ...state,
        henter: false,
        error: action.error,
      };
    }
    case BehandlendeEnhetActionTypes.HENTER_BEHANDLENDE_ENHET: {
      return {
        ...state,
        henter: true,
        error: undefined,
      };
    }
    case BehandlendeEnhetActionTypes.BEHANDLENDE_ENHET_HENTET: {
      return {
        henter: false,
        error: undefined,
        data: action.data,
      };
    }
    default: {
      return state;
    }
  }
};

export default behandlendeEnhet;
