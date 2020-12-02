import { Reducer } from "redux";
import {
  HENT_OPPFOLGINGSTILFELLER_PERSON_HENTER,
  HENT_OPPFOLGINGSTILFELLER_PERSON_HENTET,
  HENT_OPPFOLGINGSTILFELLER_PERSON_FEILET,
} from "../actions/oppfolgingstilfellerperson_actions";
import { OppfolgingstilfellePerson } from "../types/OppfolgingstilfellePerson";

export interface OppfolgingstilfellerPersonState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  hentingForsokt: boolean;
  data: OppfolgingstilfellePerson[];
}

export const initialState: OppfolgingstilfellerPersonState = {
  henter: false,
  hentet: false,
  hentingFeilet: false,
  hentingForsokt: false,
  data: [],
};

const oppfolgingstilfellerperson: Reducer<OppfolgingstilfellerPersonState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case HENT_OPPFOLGINGSTILFELLER_PERSON_HENTER:
      return {
        ...state,
        henter: true,
        hentet: false,
        hentingFeilet: false,
        hentingForsokt: false,
      };
    case HENT_OPPFOLGINGSTILFELLER_PERSON_HENTET:
      return {
        ...state,
        henter: false,
        hentet: true,
        hentingForsokt: true,
        data: action.data,
      };
    case HENT_OPPFOLGINGSTILFELLER_PERSON_FEILET:
      return {
        ...state,
        henter: false,
        hentingFeilet: true,
        hentingForsokt: true,
      };
    default: {
      return state;
    }
  }
};

export default oppfolgingstilfellerperson;
