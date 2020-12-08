import { Reducer } from "redux";
import {
  HENTER_DISKRESJONSKODE,
  DISKRESJONSKODE_HENTET,
  HENT_DISKRESJONSKODE_FEILET,
} from "./diskresjonskode_actions";

export interface DiskresjonskodeData {
  diskresjonskode: string;
}

export interface DiskresjonskodeState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  data: DiskresjonskodeData;
}

export const initialState: DiskresjonskodeState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  data: {
    diskresjonskode: "",
  },
};

const diskresjonskode: Reducer<DiskresjonskodeState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case HENTER_DISKRESJONSKODE: {
      return Object.assign({}, state, {
        henter: true,
        hentet: false,
        hentingFeilet: false,
        data: {},
      });
    }
    case DISKRESJONSKODE_HENTET: {
      return Object.assign({}, state, {
        henter: false,
        hentet: true,
        data: {
          diskresjonskode: action.data.toString(),
        },
      });
    }
    case HENT_DISKRESJONSKODE_FEILET: {
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

export default diskresjonskode;
