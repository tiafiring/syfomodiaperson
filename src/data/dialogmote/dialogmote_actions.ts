import {
  DialogmoteDTO,
  DialogmoteInnkallingDTO,
  AvlysDialogmoteDTO,
} from "./dialogmoteTypes";

export enum DialogmoteActionTypes {
  OPPRETT_INNKALLING_FORESPURT = "OPPRETT_INNKALLING_FORESPURT",
  OPPRETTER_INNKALLING = "OPPRETTER_INNKALLING",
  OPPRETT_INNKALLING_FEILET = "OPPRETT_INNKALLING_FEILET",
  OPPRETT_INNKALLING_FULLFORT = "OPPRETT_INNKALLING_FULLFORT",
  FETCH_DIALOGMOTE = "FETCH_DIALOGMOTE",
  FETCH_DIALOGMOTE_FAILED = "FETCH_DIALOGMOTE_FAILED",
  FETCH_DIALOGMOTE_SUCCESS = "FETCH_DIALOGMOTE_SUCCESS",
  AVLYS_MOTE_FORESPURT = "AVLYS_MOTE_FORESPURT",
  AVLYSER_MOTE = "AVLYSER_MOTE",
  AVLYS_MOTE_FEILET = "AVLYS_MOTE_FEILET",
  AVLYS_MOTE_FULLFORT = "AVLYS_MOTE_FULLFORT",
}

export interface OpprettInnkallingAction {
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FORESPURT;
  fnr: string;
  data: DialogmoteInnkallingDTO;
}

export interface OppretterInnkallingAction {
  type: DialogmoteActionTypes.OPPRETTER_INNKALLING;
}

export interface OpprettInnkallingFeiletAction {
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FEILET;
}

export interface OpprettInnkallingFullfortAction {
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FULLFORT;
}

export interface FetchDialogmoteAction {
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE;
  fnr: string;
}

export interface FetchDialogmoteFailedAction {
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE_FAILED;
}

export interface FetchDialogmoteSuccessAction {
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE_SUCCESS;
  dialogmoteDtoList: DialogmoteDTO[];
}

export interface AvlysMoteAction {
  type: DialogmoteActionTypes.AVLYS_MOTE_FORESPURT;
  fnr: string;
  moteUuid: string;
  data: AvlysDialogmoteDTO;
}

export interface AvlyserMoteAction {
  type: DialogmoteActionTypes.AVLYSER_MOTE;
}

export interface AvlysMoteFeiletAction {
  type: DialogmoteActionTypes.AVLYS_MOTE_FEILET;
}

export interface AvlysMoteFullfortAction {
  type: DialogmoteActionTypes.AVLYS_MOTE_FULLFORT;
}

export type DialogmoteActions =
  | OpprettInnkallingAction
  | OppretterInnkallingAction
  | OpprettInnkallingFeiletAction
  | OpprettInnkallingFullfortAction
  | FetchDialogmoteAction
  | FetchDialogmoteFailedAction
  | FetchDialogmoteSuccessAction
  | AvlysMoteAction
  | AvlyserMoteAction
  | AvlysMoteFeiletAction
  | AvlysMoteFullfortAction;

export const opprettInnkalling = (
  fnr: string,
  data: DialogmoteInnkallingDTO
): OpprettInnkallingAction => ({
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FORESPURT,
  fnr,
  data,
});

export const oppretterInnkalling = (): OppretterInnkallingAction => ({
  type: DialogmoteActionTypes.OPPRETTER_INNKALLING,
});

export const opprettInnkallingFeilet = (): OpprettInnkallingFeiletAction => ({
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FEILET,
});

export const opprettInnkallingFullfort = (): OpprettInnkallingFullfortAction => ({
  type: DialogmoteActionTypes.OPPRETT_INNKALLING_FULLFORT,
});

export const fetchDialogmote = (fnr: string): FetchDialogmoteAction => ({
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE,
  fnr,
});
export const fetchDialogmoteFailed = (): FetchDialogmoteFailedAction => ({
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE_FAILED,
});
export const fetchDialogmoteSuccess = (
  dialogmoteDtoList: DialogmoteDTO[]
): FetchDialogmoteSuccessAction => ({
  type: DialogmoteActionTypes.FETCH_DIALOGMOTE_SUCCESS,
  dialogmoteDtoList,
});

export const avlysMote = (
  moteUuid: string,
  fnr: string,
  data: AvlysDialogmoteDTO
): AvlysMoteAction => ({
  type: DialogmoteActionTypes.AVLYS_MOTE_FORESPURT,
  fnr,
  moteUuid,
  data,
});

export const avlyserMote = (): AvlyserMoteAction => ({
  type: DialogmoteActionTypes.AVLYSER_MOTE,
});

export const avlysMoteFeilet = (): AvlysMoteFeiletAction => ({
  type: DialogmoteActionTypes.AVLYS_MOTE_FEILET,
});

export const avlysMoteFullfort = (): AvlysMoteFullfortAction => ({
  type: DialogmoteActionTypes.AVLYS_MOTE_FULLFORT,
});
