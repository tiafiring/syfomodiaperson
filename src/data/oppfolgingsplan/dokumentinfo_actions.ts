import { DokumentinfoDTO } from "./types/DokumentinfoDTO";

export const HENT_DOKUMENTINFO_FORESPURT = "HENT_DOKUMENTINFO_FORESPURT";
export const HENTER_DOKUMENTINFO = "HENTER_DOKUMENTINFO";
export const HENT_DOKUMENTINFO_FEILET = "HENT_DOKUMENTINFO_FEILET";
export const DOKUMENTINFO_HENTET = "DOKUMENTINFO_HENTET";

export function hentDokumentinfoFeilet(planId: number) {
  return {
    type: HENT_DOKUMENTINFO_FEILET,
    planId,
  };
}

export function henterDokumentinfo(planId: number) {
  return {
    type: HENTER_DOKUMENTINFO,
    planId,
  };
}

export function dokumentinfoHentet(planId: number, data: DokumentinfoDTO) {
  return {
    type: DOKUMENTINFO_HENTET,
    planId,
    data,
  };
}

export function hentDokumentinfo(id: number) {
  return {
    type: HENT_DOKUMENTINFO_FORESPURT,
    id,
  };
}
