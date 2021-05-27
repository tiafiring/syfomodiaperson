import { Reducer } from "redux";
import {
  PUSHER_MODIACONTEXT,
  PUSH_MODIACONTEXT_FEILET,
  MODIACONTEXT_PUSHET,
  HENTER_AKTIVBRUKER,
  HENT_AKTIVBRUKER_FEILET,
  HENTER_AKTIVENHET,
  HENT_AKTIVENHET_FEILET,
  AKTIVBRUKER_HENTET,
} from "./modiacontext_actions";
import { RSContext } from "./modiacontextTypes";

export interface ModiaContextState {
  pushet: boolean;
  pusher: boolean;
  pushingFeilet: boolean;
  henterEnhet: boolean;
  hentingEnhetFeilet: boolean;
  henterBruker: boolean;
  hentingBrukerFeilet: boolean;
  hentingBrukerForsokt: boolean;
  data: RSContext | Record<string, unknown>;
}

export const initialState: ModiaContextState = {
  pushet: false,
  pusher: false,
  pushingFeilet: false,
  henterEnhet: false,
  hentingEnhetFeilet: false,
  henterBruker: false,
  hentingBrukerFeilet: false,
  hentingBrukerForsokt: false,
  data: {},
};

const modiacontext: Reducer<ModiaContextState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PUSH_MODIACONTEXT_FEILET: {
      return Object.assign({}, state, {
        pushet: false,
        pusher: false,
        pushingFeilet: true,
      });
    }
    case PUSHER_MODIACONTEXT: {
      return Object.assign({}, state, {
        pushet: false,
        pusher: true,
        pushingFeilet: false,
      });
    }
    case MODIACONTEXT_PUSHET: {
      return Object.assign({}, state, {
        pushet: true,
        pusher: false,
        pushingFeilet: false,
      });
    }
    case AKTIVBRUKER_HENTET: {
      return Object.assign({}, state, {
        henterBruker: false,
        hentingBrukerForsokt: true,
      });
    }
    case HENT_AKTIVBRUKER_FEILET: {
      return Object.assign({}, state, {
        henterBruker: false,
        hentingBrukerFeilet: true,
        hentingBrukerForsokt: true,
      });
    }
    case HENTER_AKTIVBRUKER: {
      return Object.assign({}, state, {
        henterBruker: true,
        hentingBrukerFeilet: false,
        hentingBrukerForsokt: false,
      });
    }
    case HENT_AKTIVENHET_FEILET: {
      return Object.assign({}, state, {
        henterEnhet: false,
        hentingEnhetFeilet: true,
      });
    }
    case HENTER_AKTIVENHET: {
      return Object.assign({}, state, {
        henterEnhet: true,
        hentingEnhetFeilet: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default modiacontext;
