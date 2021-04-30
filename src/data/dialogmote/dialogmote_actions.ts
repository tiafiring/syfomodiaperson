import { DialogmoteInnkallingDTO } from "./dialogmoteTypes";

export const OPPRETT_INNKALLING_FORESPURT = "OPPRETT_INNKALLING_FORESPURT";
export const OPPRETTER_INNKALLING = "OPPRETTER_INNKALLING";
export const INNKALLING_OPPRETTET = "INNKALLING_OPPRETTET";
export const OPPRETT_INNKALLING_FEILET = "OPPRETT_INNKALLING_FEILET";
export const OPPRETT_INNKALLING_FULLFORT = "OPPRETT_INNKALLING_FULLFORT";

export interface OpprettInnkallingAction {
  type: typeof OPPRETT_INNKALLING_FORESPURT;
  fnr: string;
  data: DialogmoteInnkallingDTO;
}

export interface OppretterInnkallingAction {
  type: typeof OPPRETTER_INNKALLING;
}

export interface InnkallingOpprettetAction {
  type: typeof INNKALLING_OPPRETTET;
  data: DialogmoteInnkallingDTO;
}

export interface OpprettInnkallingFeiletAction {
  type: typeof OPPRETT_INNKALLING_FEILET;
}

export interface OpprettInnkallingFullfortAction {
  type: typeof OPPRETT_INNKALLING_FULLFORT;
}

export type DialogmoteActions =
  | OpprettInnkallingAction
  | OppretterInnkallingAction
  | InnkallingOpprettetAction
  | OpprettInnkallingFeiletAction
  | OpprettInnkallingFullfortAction;

export const opprettInnkalling = (
  fnr: string,
  data: DialogmoteInnkallingDTO
): OpprettInnkallingAction => ({
  type: OPPRETT_INNKALLING_FORESPURT,
  fnr,
  data,
});

export const oppretterInnkalling = (): OppretterInnkallingAction => ({
  type: OPPRETTER_INNKALLING,
});

export const innkallingOpprettet = (
  data: DialogmoteInnkallingDTO
): InnkallingOpprettetAction => ({
  type: INNKALLING_OPPRETTET,
  data,
});

export const opprettInnkallingFeilet = (): OpprettInnkallingFeiletAction => ({
  type: OPPRETT_INNKALLING_FEILET,
});

export const opprettInnkallingFullfort = (): OpprettInnkallingFullfortAction => ({
  type: OPPRETT_INNKALLING_FULLFORT,
});
