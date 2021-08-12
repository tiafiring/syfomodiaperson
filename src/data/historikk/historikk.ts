import { Reducer } from "redux";
import { HistorikkEvent, HistorikkKilde } from "./types/historikkTypes";
import { HistorikkActions, HistorikkActionTypes } from "./historikk_actions";

export interface HistorikkState {
  moteHistorikk: HistorikkEvent[];
  motebehovHistorikk: HistorikkEvent[];
  oppfoelgingsdialogHistorikk: HistorikkEvent[];
  hentingFeilet: boolean;
  henterMoter: boolean;
  hentetMoter: boolean;
  henterMotebehov: boolean;
  hentetMotebehov: boolean;
  henterOppfoelgingsdialoger: boolean;
  hentetOppfoelgingsdialoger: boolean;
}

export const initialState: HistorikkState = {
  moteHistorikk: [],
  motebehovHistorikk: [],
  oppfoelgingsdialogHistorikk: [],
  hentingFeilet: false,
  henterMoter: false,
  hentetMoter: false,
  henterMotebehov: false,
  hentetMotebehov: false,
  henterOppfoelgingsdialoger: false,
  hentetOppfoelgingsdialoger: false,
};

const mapHistorikkEvents = (
  events: HistorikkEvent[],
  kilde: HistorikkKilde
): HistorikkEvent[] => {
  return events.map((event) => ({
    ...event,
    kilde,
  }));
};

const historikk: Reducer<HistorikkState, HistorikkActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case HistorikkActionTypes.HISTORIKK_HENTET_MOTER: {
      return {
        ...state,
        henterMoter: false,
        hentetMoter: true,
        moteHistorikk: mapHistorikkEvents(action.data, "MOTER"),
      };
    }
    case HistorikkActionTypes.HISTORIKK_HENTET_MOTEBEHOV: {
      return {
        ...state,
        henterMotebehov: false,
        hentetMotebehov: true,
        motebehovHistorikk: mapHistorikkEvents(action.data, "MOTEBEHOV"),
      };
    }
    case HistorikkActionTypes.HISTORIKK_HENTET_OPPFOELGINGSDIALOG: {
      return {
        ...state,
        henterOppfoelgingsdialoger: false,
        hentetOppfoelgingsdialoger: true,
        oppfoelgingsdialogHistorikk: mapHistorikkEvents(
          action.data,
          "OPPFOELGINGSDIALOG"
        ),
      };
    }
    case HistorikkActionTypes.HENTER_HISTORIKK_MOTER: {
      return {
        ...state,
        henterMoter: true,
      };
    }
    case HistorikkActionTypes.HENTER_HISTORIKK_MOTEBEHOV: {
      return {
        ...state,
        henterMotebehov: true,
      };
    }
    case HistorikkActionTypes.HENTER_HISTORIKK_OPPFOELGINGSDIALOG: {
      return {
        ...state,
        henterOppfoelgingsdialoger: true,
      };
    }
    case HistorikkActionTypes.HENT_HISTORIKK_FEILET_MOTER: {
      return {
        ...state,
        henterMoter: false,
        hentingFeilet: true,
      };
    }
    case HistorikkActionTypes.HENT_HISTORIKK_FEILET_MOTEBEHOV: {
      return {
        ...state,
        henterMotebehov: false,
        hentingFeilet: true,
      };
    }
    case HistorikkActionTypes.HENT_HISTORIKK_FEILET_OPPFOELGINGSDIALOG: {
      return {
        ...state,
        henterOppfoelgingsdialoger: false,
        hentingFeilet: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default historikk;
