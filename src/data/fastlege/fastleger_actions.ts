import { Fastlege } from "./types/Fastlege";

export const HENT_FASTLEGER_FORESPURT = "HENT_FASTLEGER_FORESPURT";
export const HENTER_FASTLEGER = "HENTER_FASTLEGER";
export const HENT_FASTLEGER_FEILET = "HENT_FASTLEGER_FEILET";
export const FASTLEGER_HENTET = "FASTLEGER_HENTET";
export const FASTLEGER_IKKE_FUNNET = "FASTLEGER_IKKE_FUNNET";

export function hentFastlegerFeilet() {
  return {
    type: HENT_FASTLEGER_FEILET,
  };
}

export function henterFastleger() {
  return {
    type: HENTER_FASTLEGER,
  };
}

export function fastlegerIkkeFunnet() {
  return {
    type: FASTLEGER_IKKE_FUNNET,
  };
}

export function fastlegerHentet(data: Fastlege) {
  return {
    type: FASTLEGER_HENTET,
    data,
  };
}

export function hentFastleger(fnr: string) {
  return {
    type: HENT_FASTLEGER_FORESPURT,
    fnr,
  };
}
