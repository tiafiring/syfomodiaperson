import { BehandlendeEnhet } from "./types/BehandlendeEnhet";
import { ApiError } from "../../api/axios";

export enum BehandlendeEnhetActionTypes {
  HENT_BEHANDLENDE_ENHET_FORESPURT = "HENT_BEHANDLENDE_ENHET_FORESPURT",
  HENTER_BEHANDLENDE_ENHET = "HENTER_BEHANDLENDE_ENHET",
  HENT_BEHANDLENDE_ENHET_FEILET = "HENT_BEHANDLENDE_ENHET_FEILET",
  BEHANDLENDE_ENHET_HENTET = "BEHANDLENDE_ENHET_HENTET",
}

export interface HentBehandlendeEnhetAction {
  type: BehandlendeEnhetActionTypes.HENT_BEHANDLENDE_ENHET_FORESPURT;
  fnr: string;
}

export interface HenterBehandlendeEnhetAction {
  type: BehandlendeEnhetActionTypes.HENTER_BEHANDLENDE_ENHET;
}

export interface BehandlendeEnhetHentetAction {
  type: BehandlendeEnhetActionTypes.BEHANDLENDE_ENHET_HENTET;
  data: BehandlendeEnhet;
}

export interface HentBehandlendeEnhetFeiletAction {
  type: BehandlendeEnhetActionTypes.HENT_BEHANDLENDE_ENHET_FEILET;
  error: ApiError;
}

export function hentBehandlendeEnhet(fnr: string): HentBehandlendeEnhetAction {
  return {
    type: BehandlendeEnhetActionTypes.HENT_BEHANDLENDE_ENHET_FORESPURT,
    fnr,
  };
}

export function henterBehandlendeEnhet(): HenterBehandlendeEnhetAction {
  return {
    type: BehandlendeEnhetActionTypes.HENTER_BEHANDLENDE_ENHET,
  };
}

export function behandlendeEnhetHentet(
  data: BehandlendeEnhet
): BehandlendeEnhetHentetAction {
  return {
    type: BehandlendeEnhetActionTypes.BEHANDLENDE_ENHET_HENTET,
    data,
  };
}

export function hentBehandlendeEnhetFeilet(
  error: ApiError
): HentBehandlendeEnhetFeiletAction {
  return {
    type: BehandlendeEnhetActionTypes.HENT_BEHANDLENDE_ENHET_FEILET,
    error,
  };
}

export type BehandlendeEnhetActions =
  | HentBehandlendeEnhetAction
  | HenterBehandlendeEnhetAction
  | BehandlendeEnhetHentetAction
  | HentBehandlendeEnhetFeiletAction;
