import { OppfolgingstilfellePersonArbeidsgiver } from "./types/OppfolgingstilfellePersonArbeidsgiver";

export enum OppfolgingstilfelleperioderActionTypes {
  HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT = "HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT",
  HENT_OPPFOLGINGSTILFELLEPERIODER_HENTER = "HENT_OPPFOLGINGSTILFELLEPERIODER_HENTER",
  HENT_OPPFOLGINGSTILFELLEPERIODER_HENTET = "HENT_OPPFOLGINGSTILFELLEPERIODER_HENTET",
  HENT_OPPFOLGINGSTILFELLEPERIODER_FEILET = "HENT_OPPFOLGINGSTILFELLEPERIODER_FEILET",
}

export interface HentOppfolgingstilfelleperioderAction {
  type: OppfolgingstilfelleperioderActionTypes.HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT;
  fnr: string;
}

export interface HentOppfolgingstilfelleperioderHenterAction {
  type: OppfolgingstilfelleperioderActionTypes.HENT_OPPFOLGINGSTILFELLEPERIODER_HENTER;
  orgnummer: string;
}

export interface HentOppfolgingstilfelleperioderHentetAction {
  type: OppfolgingstilfelleperioderActionTypes.HENT_OPPFOLGINGSTILFELLEPERIODER_HENTET;
  data: OppfolgingstilfellePersonArbeidsgiver[];
  orgnummer: string;
}

export interface HentOppfolgingstilfelleperioderFeiletAction {
  type: OppfolgingstilfelleperioderActionTypes.HENT_OPPFOLGINGSTILFELLEPERIODER_FEILET;
  orgnummer: string;
}

export function hentOppfolgingstilfelleperioder(
  fnr: string
): HentOppfolgingstilfelleperioderAction {
  return {
    type:
      OppfolgingstilfelleperioderActionTypes.HENT_OPPFOLGINGSTILFELLEPERIODER_FORESPURT,
    fnr,
  };
}

export function hentOppfolgingstilfelleperioderHenter(
  orgnummer: string
): HentOppfolgingstilfelleperioderHenterAction {
  return {
    type:
      OppfolgingstilfelleperioderActionTypes.HENT_OPPFOLGINGSTILFELLEPERIODER_HENTER,
    orgnummer,
  };
}

export function hentOppfolgingstilfelleperioderHentet(
  data: OppfolgingstilfellePersonArbeidsgiver[],
  orgnummer: string
): HentOppfolgingstilfelleperioderHentetAction {
  return {
    type:
      OppfolgingstilfelleperioderActionTypes.HENT_OPPFOLGINGSTILFELLEPERIODER_HENTET,
    data,
    orgnummer,
  };
}

export function hentOppfolgingstilfelleperioderFeilet(
  orgnummer: string
): HentOppfolgingstilfelleperioderFeiletAction {
  return {
    type:
      OppfolgingstilfelleperioderActionTypes.HENT_OPPFOLGINGSTILFELLEPERIODER_FEILET,
    orgnummer,
  };
}
