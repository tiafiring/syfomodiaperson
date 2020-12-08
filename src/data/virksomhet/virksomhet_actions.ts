import { Virksomhet } from "./types/Virksomhet";

export const HENT_VIRKSOMHET_FORESPURT = "HENT_VIRKSOMHET_FORESPURT";
export const HENTER_VIRKSOMHET = "HENTER_VIRKSOMHET";
export const VIRKSOMHET_HENTET = "VIRKSOMHET_HENTET";
export const HENT_VIRKSOMHET_FEILET = "HENT_VIRKSOMHET_FEILET";

export const hentVirksomhet = (orgnummer: string) => {
  return {
    type: HENT_VIRKSOMHET_FORESPURT,
    orgnummer,
  };
};

export const henterVirksomhet = (orgnummer: string) => {
  return {
    type: HENTER_VIRKSOMHET,
    orgnummer,
  };
};

export const virksomhetHentet = (orgnummer: string, data: Virksomhet) => {
  return {
    type: VIRKSOMHET_HENTET,
    orgnummer,
    data,
  };
};

export const hentVirksomhetFeilet = (orgnummer: string) => {
  return {
    type: HENT_VIRKSOMHET_FEILET,
    orgnummer,
  };
};
