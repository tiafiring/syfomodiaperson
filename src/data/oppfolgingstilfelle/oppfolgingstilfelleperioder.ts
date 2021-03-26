import { Reducer } from "redux";
import { OppfolgingstilfellePersonArbeidsgiver } from "./types/OppfolgingstilfellePersonArbeidsgiver";
import {
  HENT_OPPFOLGINGSTILFELLEPERIODER_FEILET,
  HENT_OPPFOLGINGSTILFELLEPERIODER_HENTER,
  HENT_OPPFOLGINGSTILFELLEPERIODER_HENTET,
} from "./oppfolgingstilfelleperioder_actions";

export interface OppfolgingstilfelleperioderArbeidsgiverState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  hentingForsokt: boolean;
  data: OppfolgingstilfellePersonArbeidsgiver | Record<string, any>;
}

export interface OppfolgingstilfelleperioderMapState {
  [index: string]: OppfolgingstilfelleperioderArbeidsgiverState;
}

const initialState = {} as OppfolgingstilfelleperioderMapState;

const oppfolgingstilfelleperioder: Reducer<OppfolgingstilfelleperioderMapState> = (
  state = initialState,
  action = { type: "" }
) => {
  const arbeidsgiver = {} as OppfolgingstilfelleperioderMapState;
  switch (action.type) {
    case HENT_OPPFOLGINGSTILFELLEPERIODER_FEILET:
      arbeidsgiver[action.orgnummer] = {
        henter: false,
        hentet: false,
        hentingFeilet: true,
        hentingForsokt: true,
        data: state[action.orgnummer] ? state[action.orgnummer].data : [],
      };
      return { ...state, ...arbeidsgiver };
    case HENT_OPPFOLGINGSTILFELLEPERIODER_HENTER:
      arbeidsgiver[action.orgnummer] = {
        henter: true,
        hentet: false,
        hentingFeilet: false,
        hentingForsokt: false,
        data: state[action.orgnummer] ? state[action.orgnummer].data : [],
      };
      return { ...state, ...arbeidsgiver };
    case HENT_OPPFOLGINGSTILFELLEPERIODER_HENTET:
      arbeidsgiver[action.orgnummer] = {
        henter: false,
        hentet: true,
        hentingFeilet: false,
        hentingForsokt: true,
        data: action.data,
      };
      return { ...state, ...arbeidsgiver };
    default: {
      return state;
    }
  }
};

export default oppfolgingstilfelleperioder;
