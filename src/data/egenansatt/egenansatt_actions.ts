import { ApiError } from "@/api/errors";

export enum HentEgenAnsattActionTypes {
  HENT_EGENANSATT_FORESPURT = "HENT_EGENANSATT_FORESPURT",
  HENT_EGENANSATT_FEILET = "HENT_EGENANSATT_FEILET",
  EGENANSATT_HENTET = "EGENANSATT_HENTET",
}

export interface HentEgenansattAction {
  type: HentEgenAnsattActionTypes.HENT_EGENANSATT_FORESPURT;
  fnr: string;
}

export interface HentEgenansattFeiletAction {
  type: HentEgenAnsattActionTypes.HENT_EGENANSATT_FEILET;
  error: ApiError;
}

export interface EgenansattHentetAction {
  type: HentEgenAnsattActionTypes.EGENANSATT_HENTET;
  isEgenAnsatt: boolean;
}

export type HentEgenAnsattActions =
  | HentEgenansattAction
  | HentEgenansattFeiletAction
  | EgenansattHentetAction;

export function hentEgenansatt(fnr: string): HentEgenansattAction {
  return {
    type: HentEgenAnsattActionTypes.HENT_EGENANSATT_FORESPURT,
    fnr,
  };
}

export function hentEgenansattFeilet(
  error: ApiError
): HentEgenansattFeiletAction {
  return {
    type: HentEgenAnsattActionTypes.HENT_EGENANSATT_FEILET,
    error,
  };
}

export function egenansattHentet(
  isEgenAnsatt: boolean
): EgenansattHentetAction {
  return {
    type: HentEgenAnsattActionTypes.EGENANSATT_HENTET,
    isEgenAnsatt,
  };
}
