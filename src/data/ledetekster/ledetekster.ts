import { Reducer } from "redux";
import {
  LEDETEKSTER_HENTET,
  HENTER_LEDETEKSTER,
  HENT_LEDETEKSTER_FEILET,
} from "./ledetekster_actions";

export interface LedeteksterState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  data: any;
}

export const initialState: LedeteksterState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: {},
};

const ledetekster: Reducer<LedeteksterState> = (
  state = initialState,
  action = {} as any
) => {
  switch (action.type) {
    case LEDETEKSTER_HENTET:
      return {
        data: action.ledetekster,
        henter: false,
        hentingFeilet: false,
        hentet: true,
      };
    case HENTER_LEDETEKSTER:
      return {
        data: {},
        henter: true,
        hentingFeilet: false,
        hentet: false,
      };
    case HENT_LEDETEKSTER_FEILET:
      return {
        data: {},
        henter: false,
        hentingFeilet: true,
        hentet: true,
      };
    default:
      return state;
  }
};

export default ledetekster;
