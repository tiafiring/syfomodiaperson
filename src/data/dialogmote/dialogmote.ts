import { Reducer } from "redux";
import {
  DialogmoteActions,
  INNKALLING_OPPRETTET,
  OPPRETT_INNKALLING_FEILET,
  OPPRETT_INNKALLING_FULLFORT,
  OPPRETTER_INNKALLING,
} from "./dialogmote_actions";

export interface DialogmoteState {
  senderInnkalling: boolean;
  senderInnkallingFeilet: boolean;
  innkallingSendt: boolean;
}

export const initialState: DialogmoteState = {
  senderInnkalling: false,
  senderInnkallingFeilet: false,
  innkallingSendt: false,
};

const dialogmote: Reducer<DialogmoteState, DialogmoteActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case OPPRETTER_INNKALLING: {
      return {
        ...state,
        senderInnkalling: true,
      };
    }
    case INNKALLING_OPPRETTET: {
      return {
        ...state,
        senderInnkalling: false,
        innkallingSendt: true,
      };
    }
    case OPPRETT_INNKALLING_FULLFORT: {
      return {
        ...state,
        innkallingSendt: false,
      };
    }
    case OPPRETT_INNKALLING_FEILET: {
      return {
        ...state,
        senderInnkalling: false,
        innkallingSendt: false,
        senderInnkallingFeilet: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default dialogmote;
