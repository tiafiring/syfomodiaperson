import { Reducer } from "redux";
import {
  AKTIVBRUKER_HENTET,
  AktivBrukerHentetAction,
} from "../modiacontext/modiacontext_actions";

export interface ValgtBrukerState {
  personident: string;
}

const initialState: ValgtBrukerState = {
  personident: "",
};

const valgtbruker: Reducer<ValgtBrukerState, AktivBrukerHentetAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AKTIVBRUKER_HENTET: {
      return {
        ...state,
        personident: action.data.aktivBruker,
      };
    }
    default: {
      return state;
    }
  }
};

export default valgtbruker;
