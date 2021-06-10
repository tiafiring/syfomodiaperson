import { Reducer } from "redux";
import { DialogmoteActions, DialogmoteActionTypes } from "./dialogmote_actions";
import { DialogmoteDTO } from "./types/dialogmoteTypes";

export interface DialogmoteState {
  senderInnkalling: boolean;
  sendInnkallingFeilet: boolean;
  sendInnkallingFullfort: boolean;
  henterMote: boolean;
  henterMoteFeilet: boolean;
  henterMoteForsokt: boolean;
  moterHentet: boolean;
  dialogmoter: DialogmoteDTO[];
  avlyserMote: boolean;
  avlysMoteFeilet: boolean;
  avlysMoteFullfort: boolean;
  endrerTidSted: boolean;
  endreTidStedFeilet: boolean;
  endreTidStedFullfort: boolean;
}

export const initialState: DialogmoteState = {
  senderInnkalling: false,
  sendInnkallingFeilet: false,
  sendInnkallingFullfort: false,
  avlysMoteFeilet: false,
  avlyserMote: false,
  avlysMoteFullfort: false,
  endrerTidSted: false,
  endreTidStedFeilet: false,
  endreTidStedFullfort: false,
  henterMote: false,
  henterMoteFeilet: false,
  henterMoteForsokt: false,
  moterHentet: false,
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
    case DialogmoteActionTypes.OPPRETT_INNKALLING_FULLFORT: {
      return {
        ...state,
        senderInnkalling: false,
        sendInnkallingFullfort: true,
      };
    }
    case DialogmoteActionTypes.OPPRETT_INNKALLING_FEILET: {
      return {
        ...state,
        senderInnkalling: false,
        sendInnkallingFullfort: false,
        sendInnkallingFeilet: true,
      };
    }
    case DialogmoteActionTypes.AVLYSER_MOTE: {
      return {
        ...state,
        avlyserMote: true,
      };
    }
    case DialogmoteActionTypes.AVLYS_MOTE_FULLFORT: {
      return {
        ...state,
        avlyserMote: false,
        avlysMoteFullfort: true,
      };
    }
    case DialogmoteActionTypes.AVLYS_MOTE_FEILET: {
      return {
        ...state,
        avlyserMote: false,
        avlysMoteFullfort: false,
        avlysMoteFeilet: true,
      };
    }
    case DialogmoteActionTypes.FETCH_DIALOGMOTE: {
      return {
        ...state,
        henterMote: true,
        henterMoteFeilet: false,
        henterMoteForsokt: false,
      };
    }
    case DialogmoteActionTypes.FETCH_DIALOGMOTE_SUCCESS: {
      return {
        ...state,
        henterMote: false,
        henterMoteFeilet: false,
        henterMoteForsokt: true,
        dialogmoter: action.dialogmoteDtoList,
        moterHentet: true,
      };
    }
    case DialogmoteActionTypes.FETCH_DIALOGMOTE_FAILED: {
      return {
        ...state,
        henterMote: false,
        henterMoteFeilet: true,
        henterMoteForsokt: true,
        dialogmoter: initialState.dialogmoter,
      };
    }
    case DialogmoteActionTypes.ENDRER_TID_STED: {
      return {
        ...state,
        endrerTidSted: true,
      };
    }
    case DialogmoteActionTypes.ENDRE_TID_STED_FEILET: {
      return {
        ...state,
        endrerTidSted: false,
        endreTidStedFullfort: false,
        endreTidStedFeilet: true,
      };
    }
    case DialogmoteActionTypes.ENDRE_TID_STED_FULLFORT: {
      return {
        ...state,
        endrerTidSted: false,
        endreTidStedFullfort: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default dialogmote;
