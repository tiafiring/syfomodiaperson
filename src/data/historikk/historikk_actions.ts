import { HistorikkEvent, HistorikkKilde } from "./types/historikkTypes";

const HENT_HISTORIKK = "HENT_HISTORIKK";
const HENTER_HISTORIKK = "HENTER_HISTORIKK";
const HISTORIKK_HENTET = "HISTORIKK_HENTET";
const HENT_HISTORIKK_FEILET = "HENT_HISTORIKK_FEILET";
export const HENT_HISTORIKK_FEILET_MOTER = `${HENT_HISTORIKK_FEILET}_MOTER` as const;
export const HENT_HISTORIKK_FEILET_MOTEBEHOV = `${HENT_HISTORIKK_FEILET}_MOTEBEHOV` as const;
export const HENT_HISTORIKK_FEILET_OPPFOELGINGSDIALOG = `${HENT_HISTORIKK_FEILET}_OPPFOELGINGSDIALOG` as const;
export const HENTER_HISTORIKK_MOTER = `${HENTER_HISTORIKK}_MOTER` as const;
export const HENTER_HISTORIKK_MOTEBEHOV = `${HENTER_HISTORIKK}_MOTEBEHOV` as const;
export const HENTER_HISTORIKK_OPPFOELGINGSDIALOG = `${HENTER_HISTORIKK}_OPPFOELGINGSDIALOG` as const;
export const HENT_HISTORIKK_MOTER = `${HENT_HISTORIKK}_MOTER` as const;
export const HENT_HISTORIKK_MOTEBEHOV = `${HENT_HISTORIKK}_MOTEBEHOV` as const;
export const HENT_HISTORIKK_OPPFOELGINGSDIALOG = `${HENT_HISTORIKK}_OPPFOELGINGSDIALOG` as const;
export const HISTORIKK_HENTET_MOTER = `${HISTORIKK_HENTET}_MOTER` as const;
export const HISTORIKK_HENTET_MOTEBEHOV = `${HISTORIKK_HENTET}_MOTEBEHOV` as const;
export const HISTORIKK_HENTET_OPPFOELGINGSDIALOG = `${HISTORIKK_HENTET}_OPPFOELGINGSDIALOG` as const;

export interface HentHistorikkFeiletAction {
  type:
    | typeof HENT_HISTORIKK_FEILET_MOTER
    | typeof HENT_HISTORIKK_FEILET_MOTEBEHOV
    | typeof HENT_HISTORIKK_FEILET_OPPFOELGINGSDIALOG;
}

export interface HenterHistorikkAction {
  type:
    | typeof HENTER_HISTORIKK_MOTER
    | typeof HENTER_HISTORIKK_MOTEBEHOV
    | typeof HENTER_HISTORIKK_OPPFOELGINGSDIALOG;
}

export interface HentHistorikkAction {
  type:
    | typeof HENT_HISTORIKK_MOTER
    | typeof HENT_HISTORIKK_MOTEBEHOV
    | typeof HENT_HISTORIKK_OPPFOELGINGSDIALOG;
  fnr: string;
}

export interface HistorikkHentetAction {
  type:
    | typeof HISTORIKK_HENTET_MOTER
    | typeof HISTORIKK_HENTET_MOTEBEHOV
    | typeof HISTORIKK_HENTET_OPPFOELGINGSDIALOG;
  data: HistorikkEvent[];
}

export type HistorikkActions =
  | HentHistorikkAction
  | HenterHistorikkAction
  | HentHistorikkFeiletAction
  | HistorikkHentetAction;

export const hentHistorikkFeilet = (
  kilde: HistorikkKilde
): HentHistorikkFeiletAction => ({
  type: `${HENT_HISTORIKK_FEILET}_${kilde}` as const,
});

export const henterHistorikk = (
  kilde: HistorikkKilde
): HenterHistorikkAction => ({
  type: `${HENTER_HISTORIKK}_${kilde}` as const,
});

export const hentHistorikk = (
  fnr: string,
  kilde: HistorikkKilde
): HentHistorikkAction => ({
  type: `${HENT_HISTORIKK}_${kilde}` as const,
  fnr,
});

export const historikkHentet = (
  data: HistorikkEvent[],
  kilde: HistorikkKilde
): HistorikkHentetAction => ({
  type: `${HISTORIKK_HENTET}_${kilde}` as const,
  data,
});
