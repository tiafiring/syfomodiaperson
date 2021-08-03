import { Reducer } from "redux";
import {
  HentDiskresjonskodeActions,
  HentDiskresjonskodeActionTypes,
} from "./diskresjonskode_actions";
import { ApiError } from "../../api/axios";

export interface DiskresjonskodeData {
  diskresjonskode: string;
}

export interface DiskresjonskodeState {
  henter: boolean;
  hentet: boolean;
  error?: ApiError;
  data: DiskresjonskodeData;
}

export const initialState: DiskresjonskodeState = {
  henter: false,
  hentet: false,
  data: {
    diskresjonskode: "",
  },
};

const diskresjonskode: Reducer<
  DiskresjonskodeState,
  HentDiskresjonskodeActions
> = (state = initialState, action) => {
  switch (action.type) {
    case HentDiskresjonskodeActionTypes.HENTER_DISKRESJONSKODE: {
      return {
        ...initialState,
        henter: true,
        error: undefined,
      };
    }
    case HentDiskresjonskodeActionTypes.DISKRESJONSKODE_HENTET: {
      return {
        ...state,
        henter: false,
        hentet: true,
        error: undefined,
        data: {
          diskresjonskode: action.data.toString(),
        },
      };
    }
    case HentDiskresjonskodeActionTypes.HENT_DISKRESJONSKODE_FEILET: {
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

export default diskresjonskode;
