import { Reducer } from "redux";
import { VeilederinfoDTO } from "./types/VeilederinfoDTO";
import {
  HENTER_VEILEDERINFO,
  VEILEDERINFO_HENTET,
  HENT_VEILEDERINFO_FEILET,
} from "./veilederinfo_actions";

export interface VeilederinfoState {
  hentet: boolean;
  henter: boolean;
  hentingFeilet: boolean;
  data?: VeilederinfoDTO;
}

export const initialState: VeilederinfoState = {
  hentet: false,
  henter: false,
  hentingFeilet: false,
};

const veilederinfo: Reducer<VeilederinfoState> = (
  state = initialState,
  action = { type: "" }
) => {
  switch (action.type) {
    case HENTER_VEILEDERINFO: {
      return Object.assign({}, state, {
        henter: true,
        hentet: false,
        hentingFeilet: false,
      });
    }
    case VEILEDERINFO_HENTET: {
      return Object.assign({}, state, {
        henter: false,
        hentet: true,
        data: action.data,
      });
    }
    case HENT_VEILEDERINFO_FEILET: {
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

export default veilederinfo;
