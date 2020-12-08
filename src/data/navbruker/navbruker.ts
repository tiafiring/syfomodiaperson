import { Reducer } from "redux";
import { Brukerinfo } from "./types/Brukerinfo";
import {
  HENT_NAVBRUKER_FORESPURT,
  NAVBRUKER_HENTET,
  HENT_NAVBRUKER_FEILET,
} from "./navbruker_actions";

export interface NavbrukerState {
  data: Brukerinfo | {};
}

export const initialState: NavbrukerState = {
  data: {},
};

const navbruker: Reducer<NavbrukerState> = (state = initialState, action) => {
  switch (action.type) {
    case NAVBRUKER_HENTET: {
      return {
        henter: false,
        hentingFeilet: false,
        data: {
          ...state.data,
          ...action.data,
        },
      };
    }
    case HENT_NAVBRUKER_FORESPURT: {
      return {
        henter: true,
        hentingFeilet: false,
        data: {
          ...state.data,
          kontaktinfo: {
            fnr: action.fnr,
          },
        },
      };
    }
    case HENT_NAVBRUKER_FEILET: {
      return {
        henter: false,
        hentingFeilet: true,
        data: {
          ...state.data,
          ...action.data,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default navbruker;
