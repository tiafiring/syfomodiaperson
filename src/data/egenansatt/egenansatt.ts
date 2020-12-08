import { Reducer } from "redux";
import {
  HENTER_EGENANSATT,
  EGENANSATT_HENTET,
  HENT_EGENANSATT_FEILET,
} from "./egenansatt_actions";

export interface EgenansattData {
  erEgenAnsatt: boolean;
}

export interface EgenansattState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  data: EgenansattData;
}

export const initialState: EgenansattState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: {
    erEgenAnsatt: false,
  },
};

const egenansatt: Reducer<EgenansattState> = (state = initialState, action) => {
  switch (action.type) {
    case HENTER_EGENANSATT: {
      return Object.assign({}, state, {
        henter: true,
        hentet: false,
        hentingFeilet: false,
        data: {},
      });
    }
    case EGENANSATT_HENTET: {
      return Object.assign({}, state, {
        henter: false,
        hentet: true,
        data: {
          erEgenAnsatt: action.data,
        },
      });
    }
    case HENT_EGENANSATT_FEILET: {
      return Object.assign({}, state, {
        henter: false,
        hentingFeilet: true,
      });
    }
    default: {
      return state;
    }
  }
};

export default egenansatt;
