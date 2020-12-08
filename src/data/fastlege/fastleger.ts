import { Reducer } from "redux";
import { Fastlege } from "./types/Fastlege";
import {
  HENTER_FASTLEGER,
  FASTLEGER_HENTET,
  FASTLEGER_IKKE_FUNNET,
  HENT_FASTLEGER_FEILET,
} from "./fastleger_actions";

export interface FastlegerState {
  henter: boolean;
  hentet: boolean;
  ikkeFunnet: boolean;
  hentingFeilet: boolean;
  data: Fastlege[];
  aktiv?: Fastlege;
  tidligere: Fastlege[];
}

export const initialState: FastlegerState = {
  henter: false,
  hentet: false,
  ikkeFunnet: false,
  hentingFeilet: false,
  data: [],
  aktiv: undefined,
  tidligere: [],
};

const fastleger: Reducer<FastlegerState> = (state = initialState, action) => {
  switch (action.type) {
    case HENTER_FASTLEGER: {
      return {
        ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
        ikkeFunnet: false,
        data: [],
      };
    }
    case FASTLEGER_HENTET: {
      if (action.data.length > 0) {
        const aktiv = action.data.filter((lege: Fastlege) => {
          return (
            new Date(lege.pasientforhold.fom) < new Date() &&
            new Date(lege.pasientforhold.tom) > new Date()
          );
        })[0];

        const tidligere = action.data.filter((lege: Fastlege) => {
          return new Date(lege.pasientforhold.tom) < new Date();
        });
        return Object.assign({}, state, {
          henter: false,
          hentet: true,
          data: action.data,
          aktiv,
          tidligere,
        });
      }
      return {
        ...state,
        henter: false,
        hentet: true,
        data: [],
        ikkeFunnet: true,
      };
    }
    case FASTLEGER_IKKE_FUNNET: {
      return {
        ...state,
        henter: false,
        ikkeFunnet: true,
      };
    }
    case HENT_FASTLEGER_FEILET: {
      return {
        ...state,
        henter: false,
        hentingFeilet: true,
        data: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default fastleger;
