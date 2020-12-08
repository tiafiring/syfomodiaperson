import { Reducer } from "redux";
import { EpostInnholdDTO } from "./types/EpostInnholdDTO";
import {
  HENTER_ARBEIDSGIVEREPOSTINNHOLD,
  ARBEIDSGIVEREPOSTINNHOLD_HENTET,
  HENT_ARBEIDSGIVEREPOSTINNHOLD_FEILET,
} from "./arbeidsgiverepostinnhold_actions";

export interface ArbeidsgiverEpostinnholdState {
  henter: boolean;
  hentingFeilet: boolean;
  data: EpostInnholdDTO | {};
}

const initialState: ArbeidsgiverEpostinnholdState = {
  henter: false,
  hentingFeilet: false,
  data: {},
};

const arbeidsgiverEpostinnhold: Reducer<ArbeidsgiverEpostinnholdState> = (
  state = initialState,
  action = { type: "" }
) => {
  switch (action.type) {
    case HENTER_ARBEIDSGIVEREPOSTINNHOLD: {
      return Object.assign({}, state, {
        henter: true,
        hentingFeilet: false,
      });
    }
    case ARBEIDSGIVEREPOSTINNHOLD_HENTET: {
      return Object.assign({}, state, {
        data: action.data,
        henter: false,
        hentingFeilet: false,
        eposttype: action.eposttype,
      });
    }
    case HENT_ARBEIDSGIVEREPOSTINNHOLD_FEILET: {
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

export default arbeidsgiverEpostinnhold;
