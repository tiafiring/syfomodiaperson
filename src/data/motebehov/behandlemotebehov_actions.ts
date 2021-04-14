export const BEHANDLE_MOTEBEHOV_FORESPURT = "BEHANDLE_MOTEBEHOV_FORESPURT";
export const BEHANDLE_MOTEBEHOV_BEHANDLER = "BEHANDLE_MOTEBEHOV_BEHANDLER";
export const BEHANDLE_MOTEBEHOV_BEHANDLET = "BEHANDLE_MOTEBEHOV_BEHANDLET";
export const BEHANDLE_MOTEBEHOV_FEILET = "BEHANDLE_MOTEBEHOV_FEILET";
export const BEHANDLE_MOTEBEHOV_FORBUDT = "BEHANDLE_MOTEBEHOV_FORBUDT";

export interface BehandleMotebehovAction {
  type: typeof BEHANDLE_MOTEBEHOV_FORESPURT;
  fnr: string;
  veilederIdent: string;
}

export interface BehandleMotebehovBehandlerAction {
  type: typeof BEHANDLE_MOTEBEHOV_BEHANDLER;
}

export interface BehandleMotebehovBehandletAction {
  type: typeof BEHANDLE_MOTEBEHOV_BEHANDLET;
  veilederIdent: string;
}

export interface BehandleMotebehovFeiletAction {
  type: typeof BEHANDLE_MOTEBEHOV_FEILET;
}

export interface BehandleMotebehovForbudtAction {
  type: typeof BEHANDLE_MOTEBEHOV_FORBUDT;
}

export type BehandleMotebehovActions =
  | BehandleMotebehovAction
  | BehandleMotebehovBehandlerAction
  | BehandleMotebehovBehandletAction
  | BehandleMotebehovFeiletAction
  | BehandleMotebehovForbudtAction;

export const behandleMotebehov = (
  fnr: string,
  veilederIdent: string
): BehandleMotebehovAction => ({
  type: BEHANDLE_MOTEBEHOV_FORESPURT,
  fnr,
  veilederIdent,
});

export const behandleMotebehovBehandler = (): BehandleMotebehovBehandlerAction => ({
  type: BEHANDLE_MOTEBEHOV_BEHANDLER,
});

export const behandleMotebehovBehandlet = (
  veilederIdent: string
): BehandleMotebehovBehandletAction => ({
  type: BEHANDLE_MOTEBEHOV_BEHANDLET,
  veilederIdent,
});

export const behandleMotebehovFeilet = (): BehandleMotebehovFeiletAction => ({
  type: BEHANDLE_MOTEBEHOV_FEILET,
});

export const behandleMotebehovForbudt = (): BehandleMotebehovForbudtAction => ({
  type: BEHANDLE_MOTEBEHOV_FORBUDT,
});
