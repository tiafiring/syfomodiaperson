import { Reducer } from "redux";
import { DialogmoteActions, DialogmoteActionTypes } from "./dialogmote_actions";
import { DialogmoteDTO } from "./dialogmoteTypes";

export interface DialogmoteState {
  senderInnkalling: boolean;
  senderInnkallingFeilet: boolean;
  innkallingSendt: boolean;
  henterMote: boolean;
  henterMoteFeilet: boolean;
  dialogmoter: DialogmoteDTO[];
}

export const initialState: DialogmoteState = {
  senderInnkalling: false,
  senderInnkallingFeilet: false,
  innkallingSendt: false,
  henterMote: false,
  henterMoteFeilet: false,
  dialogmoter: [],
};

const dialogmote: Reducer<DialogmoteState, DialogmoteActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case DialogmoteActionTypes.OPPRETTER_INNKALLING: {
      return {
        ...state,
        senderInnkalling: true,
      };
    }
    case DialogmoteActionTypes.INNKALLING_OPPRETTET: {
      return {
        ...state,
        senderInnkalling: false,
        innkallingSendt: true,
      };
    }
    case DialogmoteActionTypes.OPPRETT_INNKALLING_FULLFORT: {
      return {
        ...state,
        innkallingSendt: false,
      };
    }
    case DialogmoteActionTypes.OPPRETT_INNKALLING_FEILET: {
      return {
        ...state,
        senderInnkalling: false,
        innkallingSendt: false,
        senderInnkallingFeilet: true,
      };
    }
    case DialogmoteActionTypes.FETCH_DIALOGMOTE: {
      return {
        ...state,
        henterMote: true,
        henterMoteFeilet: false,
      };
    }
    case DialogmoteActionTypes.FETCH_DIALOGMOTE_SUCCESS: {
      return {
        ...state,
        henterMote: false,
        henterMoteFeilet: false,
        dialogmoter: action.dialogmoteDtoList,
      };
    }
    case DialogmoteActionTypes.FETCH_DIALOGMOTE_FAILED: {
      return {
        ...state,
        henterMote: false,
        henterMoteFeilet: true,
        dialogmoter: initialState.dialogmoter,
      };
    }
    default: {
      return state;
    }
  }
};

export default dialogmote;
