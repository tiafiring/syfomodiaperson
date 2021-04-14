import { Reducer } from "redux";
import * as actions from "./behandlemotebehov_actions";
import { BehandleMotebehovActions } from "./behandlemotebehov_actions";

export interface MotebehovBehandlingState {
  behandler: boolean;
  behandlet: boolean;
  behandleFeilet: boolean;
  behandleForbudt: boolean;
}

export const initialState: MotebehovBehandlingState = {
  behandler: false,
  behandlet: false,
  behandleFeilet: false,
  behandleForbudt: false,
};

const motebehovBehandling: Reducer<
  MotebehovBehandlingState,
  BehandleMotebehovActions
> = (state = initialState, action) => {
  switch (action.type) {
    case actions.BEHANDLE_MOTEBEHOV_BEHANDLER: {
      return {
        ...state,
        behandler: true,
        behandlet: false,
        behandleFeilet: false,
        behandleForbudt: false,
      };
    }
    case actions.BEHANDLE_MOTEBEHOV_BEHANDLET: {
      return {
        ...state,
        behandler: false,
        behandlet: true,
      };
    }
    case actions.BEHANDLE_MOTEBEHOV_FEILET: {
      return {
        ...state,
        behandler: false,
        behandleFeilet: true,
      };
    }
    case actions.BEHANDLE_MOTEBEHOV_FORBUDT: {
      return {
        ...state,
        behandler: false,
        behandleForbudt: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default motebehovBehandling;
