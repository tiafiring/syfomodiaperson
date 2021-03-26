import { Reducer } from "redux";
import { Virksomhet } from "./types/Virksomhet";
import {
  HENTER_VIRKSOMHET,
  VIRKSOMHET_HENTET,
  HENT_VIRKSOMHET_FEILET,
} from "./virksomhet_actions";

export interface VirksomhetState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  hentingForsokt: boolean;
  data: Virksomhet | Record<string, unknown>;
}

export interface VirksomhetMapState {
  [index: string]: VirksomhetState;
}

const initialState = {} as VirksomhetMapState;

const virksomhet: Reducer<VirksomhetMapState> = (
  state = initialState,
  action = { type: "" }
) => {
  const virksomhetTemp = {} as VirksomhetMapState;
  switch (action.type) {
    case HENTER_VIRKSOMHET: {
      virksomhetTemp[action.orgnummer] = {
        henter: true,
        hentet: false,
        hentingFeilet: false,
        hentingForsokt: false,
        data: state[action.orgnummer] ? state[action.orgnummer].data : {},
      };
      return { ...state, ...virksomhetTemp };
    }
    case VIRKSOMHET_HENTET: {
      const nyeData = {} as VirksomhetMapState;
      nyeData[action.orgnummer] = action.data.navn;
      virksomhetTemp[action.orgnummer] = {
        henter: false,
        hentet: true,
        hentingFeilet: false,
        hentingForsokt: true,
        data: {
          ...state[action.orgnummer].data,
          ...nyeData,
        },
      };
      return { ...state, ...virksomhetTemp };
    }
    case HENT_VIRKSOMHET_FEILET: {
      virksomhetTemp[action.orgnummer] = {
        henter: false,
        hentet: false,
        hentingFeilet: true,
        hentingForsokt: true,
        data: state[action.orgnummer] ? state[action.orgnummer].data : {},
      };
      return { ...state, ...virksomhetTemp };
    }
    default: {
      return state;
    }
  }
};

export default virksomhet;
