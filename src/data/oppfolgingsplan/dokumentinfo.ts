import { Reducer } from "redux";
import { DokumentinfoDTO } from "./types/DokumentinfoDTO";
import {
  HENT_DOKUMENTINFO_FEILET,
  HENTER_DOKUMENTINFO,
  DOKUMENTINFO_HENTET,
} from "./dokumentinfo_actions";

export interface VirksomhetState {
  henter: boolean;
  hentet: boolean;
  hentingFeilet: boolean;
  hentingForsokt: boolean;
  data?: DokumentinfoDTO;
}

export interface DokumentinfoMapState {
  [index: string]: VirksomhetState;
}

const initialState = {} as DokumentinfoMapState;

const dokumentinfo: Reducer<DokumentinfoMapState> = (
  state = initialState,
  action = { type: "" }
) => {
  const oppfolgingsplanDokument = {} as DokumentinfoMapState;
  switch (action.type) {
    case HENTER_DOKUMENTINFO:
      oppfolgingsplanDokument[action.planId] = {
        henter: true,
        hentet: false,
        hentingFeilet: false,
        hentingForsokt: false,
      };
      return { ...state, ...oppfolgingsplanDokument };
    case DOKUMENTINFO_HENTET:
      oppfolgingsplanDokument[action.planId] = {
        data: action.data,
        henter: false,
        hentet: true,
        hentingFeilet: false,
        hentingForsokt: true,
      };
      return { ...state, ...oppfolgingsplanDokument };
    case HENT_DOKUMENTINFO_FEILET:
      oppfolgingsplanDokument[action.planId] = {
        henter: false,
        hentet: false,
        hentingFeilet: false,
        hentingForsokt: true,
      };
      return { ...state, ...oppfolgingsplanDokument };
    default: {
      return state;
    }
  }
};

export default dokumentinfo;
