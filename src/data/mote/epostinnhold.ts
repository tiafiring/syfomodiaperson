import { Reducer } from "redux";
import { EpostInnholdDTO } from "./types/EpostInnholdDTO";
import {
  HENTER_EPOSTINNHOLD,
  EPOSTINNHOLD_HENTET,
  HENT_EPOSTINNHOLD_FEILET,
} from "./epostinnhold_actions";

export interface EpostInnholdState {
  henter: boolean;
  hentingFeilet: boolean;
  data: EpostInnholdDTO | {};
}

const initialState: EpostInnholdState = {
  henter: false,
  hentingFeilet: false,
  data: {},
};

const epostinnhold: Reducer<EpostInnholdState> = (
  state = initialState,
  action = { type: "" }
) => {
  switch (action.type) {
    case HENTER_EPOSTINNHOLD: {
      return Object.assign({}, state, {
        henter: true,
        hentingFeilet: false,
      });
    }
    case EPOSTINNHOLD_HENTET: {
      return Object.assign({}, state, {
        data: action.data,
        henter: false,
        hentingFeilet: false,
        eposttype: action.eposttype,
      });
    }
    case HENT_EPOSTINNHOLD_FEILET: {
      return Object.assign({}, state, {
        data: {},
        henter: false,
        hentingFeilet: true,
      });
    }
    default: {
      return state;
    }
  }
};

export default epostinnhold;
