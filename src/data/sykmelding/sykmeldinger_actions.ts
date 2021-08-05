import { SykmeldingNewFormatDTO } from "./types/SykmeldingNewFormatDTO";

export const HENT_SYKMELDINGER_FEILET = "HENT_SYKMELDINGER_FEILET";
export const HENTER_SYKMELDINGER = "HENTER_SYKMELDINGER";
export const HENT_SYKMELDINGER_FORESPURT = "HENT_SYKMELDINGER_FORESPURT";
export const SYKMELDINGER_HENTET = "SYKMELDINGER_HENTET";

export function hentSykmeldingerFeilet() {
  return {
    type: HENT_SYKMELDINGER_FEILET,
  };
}

export function henterSykmeldinger() {
  return {
    type: HENTER_SYKMELDINGER,
  };
}

export function hentSykmeldinger(fnr: string) {
  return {
    type: HENT_SYKMELDINGER_FORESPURT,
    fnr,
  };
}

export function sykmeldingerHentet(
  data: SykmeldingNewFormatDTO[],
  fnr: string
) {
  return {
    type: SYKMELDINGER_HENTET,
    data,
    fnr,
  };
}
