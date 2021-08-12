import { HistorikkEvent, HistorikkKilde } from "./types/historikkTypes";

export enum HistorikkActionTypes {
  HENT_HISTORIKK_FEILET_MOTER = `HENT_HISTORIKK_FEILET_MOTER`,
  HENT_HISTORIKK_FEILET_MOTEBEHOV = `HENT_HISTORIKK_FEILET_MOTEBEHOV`,
  HENT_HISTORIKK_FEILET_OPPFOELGINGSDIALOG = `HENT_HISTORIKK_FEILET_OPPFOELGINGSDIALOG`,
  HENTER_HISTORIKK_MOTER = `HENTER_HISTORIKK_MOTER`,
  HENTER_HISTORIKK_MOTEBEHOV = `HENTER_HISTORIKK_MOTEBEHOV`,
  HENTER_HISTORIKK_OPPFOELGINGSDIALOG = `HENTER_HISTORIKK_OPPFOELGINGSDIALOG`,
  HENT_HISTORIKK_MOTER = `HENT_HISTORIKK_MOTER`,
  HENT_HISTORIKK_MOTEBEHOV = `HENT_HISTORIKK_MOTEBEHOV`,
  HENT_HISTORIKK_OPPFOELGINGSDIALOG = `HENT_HISTORIKK_OPPFOELGINGSDIALOG`,
  HISTORIKK_HENTET_MOTER = `HISTORIKK_HENTET_MOTER`,
  HISTORIKK_HENTET_MOTEBEHOV = `HISTORIKK_HENTET_MOTEBEHOV`,
  HISTORIKK_HENTET_OPPFOELGINGSDIALOG = `HISTORIKK_HENTET_OPPFOELGINGSDIALOG`,
}

export interface HentHistorikkFeiletAction {
  type:
    | HistorikkActionTypes.HENT_HISTORIKK_FEILET_MOTER
    | HistorikkActionTypes.HENT_HISTORIKK_FEILET_MOTEBEHOV
    | HistorikkActionTypes.HENT_HISTORIKK_FEILET_OPPFOELGINGSDIALOG;
}

export interface HenterHistorikkAction {
  type:
    | HistorikkActionTypes.HENTER_HISTORIKK_MOTER
    | HistorikkActionTypes.HENTER_HISTORIKK_MOTEBEHOV
    | HistorikkActionTypes.HENTER_HISTORIKK_OPPFOELGINGSDIALOG;
}

export interface HentHistorikkAction {
  type:
    | HistorikkActionTypes.HENT_HISTORIKK_MOTER
    | HistorikkActionTypes.HENT_HISTORIKK_MOTEBEHOV
    | HistorikkActionTypes.HENT_HISTORIKK_OPPFOELGINGSDIALOG;
  fnr: string;
}

export interface HistorikkHentetAction {
  type:
    | HistorikkActionTypes.HISTORIKK_HENTET_MOTER
    | HistorikkActionTypes.HISTORIKK_HENTET_MOTEBEHOV
    | HistorikkActionTypes.HISTORIKK_HENTET_OPPFOELGINGSDIALOG;
  data: HistorikkEvent[];
}

export type HistorikkActions =
  | HentHistorikkAction
  | HenterHistorikkAction
  | HentHistorikkFeiletAction
  | HistorikkHentetAction;

export const hentHistorikkFeilet = (
  kilde: HistorikkKilde
): HentHistorikkFeiletAction => {
  switch (kilde) {
    case "MOTER":
      return { type: HistorikkActionTypes.HENT_HISTORIKK_FEILET_MOTER };
    case "MOTEBEHOV":
      return { type: HistorikkActionTypes.HENT_HISTORIKK_FEILET_MOTEBEHOV };
    case "OPPFOELGINGSDIALOG":
      return {
        type: HistorikkActionTypes.HENT_HISTORIKK_FEILET_OPPFOELGINGSDIALOG,
      };
  }
};

export const henterHistorikk = (
  kilde: HistorikkKilde
): HenterHistorikkAction => {
  switch (kilde) {
    case "MOTER":
      return { type: HistorikkActionTypes.HENTER_HISTORIKK_MOTER };
    case "MOTEBEHOV":
      return { type: HistorikkActionTypes.HENTER_HISTORIKK_MOTEBEHOV };
    case "OPPFOELGINGSDIALOG":
      return { type: HistorikkActionTypes.HENTER_HISTORIKK_OPPFOELGINGSDIALOG };
  }
};

export const hentHistorikk = (
  fnr: string,
  kilde: HistorikkKilde
): HentHistorikkAction => {
  switch (kilde) {
    case "MOTER":
      return { type: HistorikkActionTypes.HENT_HISTORIKK_MOTER, fnr };
    case "MOTEBEHOV":
      return { type: HistorikkActionTypes.HENT_HISTORIKK_MOTEBEHOV, fnr };
    case "OPPFOELGINGSDIALOG":
      return {
        type: HistorikkActionTypes.HENT_HISTORIKK_OPPFOELGINGSDIALOG,
        fnr,
      };
  }
};

export const historikkHentet = (
  data: HistorikkEvent[],
  kilde: HistorikkKilde
): HistorikkHentetAction => {
  switch (kilde) {
    case "MOTER":
      return { type: HistorikkActionTypes.HISTORIKK_HENTET_MOTER, data };
    case "MOTEBEHOV":
      return { type: HistorikkActionTypes.HISTORIKK_HENTET_MOTEBEHOV, data };
    case "OPPFOELGINGSDIALOG":
      return {
        type: HistorikkActionTypes.HISTORIKK_HENTET_OPPFOELGINGSDIALOG,
        data,
      };
  }
};
