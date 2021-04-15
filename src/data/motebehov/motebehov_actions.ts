import { MotebehovDTO } from "./types/motebehovTypes";

export const HENT_MOTEBEHOV_FORESPURT = "HENT_MOTEBEHOV_FORESPURT";
export const HENT_MOTEBEHOV_HENTER = "HENT_MOTEBEHOV_HENTER";
export const HENT_MOTEBEHOV_HENTET = "HENT_MOTEBEHOV_HENTETq";
export const HENT_MOTEBEHOV_FEILET = "HENT_MOTEBEHOV_FEILET";
export const HENT_MOTEBEHOV_IKKE_TILGANG = "HENT_MOTEBEHOV_IKKE_TILGANG";

export interface HentMotebehovAction {
  type: typeof HENT_MOTEBEHOV_FORESPURT;
  fnr: string;
}

export interface HenterMotebehovAction {
  type: typeof HENT_MOTEBEHOV_HENTER;
}

export interface MotebehovHentetAction {
  type: typeof HENT_MOTEBEHOV_HENTET;
  data: MotebehovDTO[];
}

export interface HentMotebehovFeiletAction {
  type: typeof HENT_MOTEBEHOV_FEILET;
}

export interface HentMotebehovIkkeTilgangAction {
  type: typeof HENT_MOTEBEHOV_IKKE_TILGANG;
  tilgang: string;
}

export type MotebehovActions =
  | HentMotebehovAction
  | HenterMotebehovAction
  | MotebehovHentetAction
  | HentMotebehovFeiletAction
  | HentMotebehovIkkeTilgangAction;

export const hentMotebehov = (fnr: string): HentMotebehovAction => ({
  type: HENT_MOTEBEHOV_FORESPURT,
  fnr,
});

export const henterMotebehov = (): HenterMotebehovAction => ({
  type: HENT_MOTEBEHOV_HENTER,
});

export const motebehovHentet = (
  data: MotebehovDTO[]
): MotebehovHentetAction => ({
  type: HENT_MOTEBEHOV_HENTET,
  data,
});

export const hentMotebehovFeilet = (): HentMotebehovFeiletAction => ({
  type: HENT_MOTEBEHOV_FEILET,
});

export const hentMotebehovIkkeTilgang = (
  tilgang: string
): HentMotebehovIkkeTilgangAction => ({
  type: HENT_MOTEBEHOV_IKKE_TILGANG,
  tilgang,
});
