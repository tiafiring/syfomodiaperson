import { SykmeldingNewFormatDTO } from "./types/SykmeldingNewFormatDTO";
import { ApiError } from "../../api/axios";

export enum SykmeldingerActionTypes {
  HENT_SYKMELDINGER_FEILET = "HENT_SYKMELDINGER_FEILET",
  HENT_SYKMELDINGER_FORESPURT = "HENT_SYKMELDINGER_FORESPURT",
  SYKMELDINGER_HENTET = "SYKMELDINGER_HENTET",
}

export interface HentSykmeldingerAction {
  type: SykmeldingerActionTypes.HENT_SYKMELDINGER_FORESPURT;
  fnr: string;
}

export interface HentSykmeldingerFeiletAction {
  type: SykmeldingerActionTypes.HENT_SYKMELDINGER_FEILET;
  error: ApiError;
}

export interface SykmeldingerHentetAction {
  type: SykmeldingerActionTypes.SYKMELDINGER_HENTET;
  data: SykmeldingNewFormatDTO[];
  fnr: string;
}

export type SykmeldingerActions =
  | HentSykmeldingerAction
  | HentSykmeldingerFeiletAction
  | SykmeldingerHentetAction;

export function hentSykmeldinger(fnr: string): HentSykmeldingerAction {
  return {
    type: SykmeldingerActionTypes.HENT_SYKMELDINGER_FORESPURT,
    fnr,
  };
}

export function hentSykmeldingerFeilet(
  error: ApiError
): HentSykmeldingerFeiletAction {
  return {
    type: SykmeldingerActionTypes.HENT_SYKMELDINGER_FEILET,
    error,
  };
}

export function sykmeldingerHentet(
  data: SykmeldingNewFormatDTO[],
  fnr: string
): SykmeldingerHentetAction {
  return {
    type: SykmeldingerActionTypes.SYKMELDINGER_HENTET,
    data,
    fnr,
  };
}
