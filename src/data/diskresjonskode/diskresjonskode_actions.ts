import { ApiError } from "@/api/axios";

export enum HentDiskresjonskodeActionTypes {
  HENT_DISKRESJONSKODE_FORESPURT = "HENT_DISKRESJONSKODE_FORESPURT",
  HENTER_DISKRESJONSKODE = "HENTER_DISKRESJONSKODE",
  HENT_DISKRESJONSKODE_FEILET = "HENT_DISKRESJONSKODE_FEILET",
  DISKRESJONSKODE_HENTET = "DISKRESJONSKODE_HENTET",
}

export interface HentDiskresjonskodeAction {
  type: HentDiskresjonskodeActionTypes.HENT_DISKRESJONSKODE_FORESPURT;
  fnr: string;
}

export interface HentDiskresjonskodeFeiletAction {
  type: HentDiskresjonskodeActionTypes.HENT_DISKRESJONSKODE_FEILET;
  error: ApiError;
}

export interface HenterDiskresjonskodeAction {
  type: HentDiskresjonskodeActionTypes.HENTER_DISKRESJONSKODE;
}

export interface DiskresjonskodeHentetAction {
  type: HentDiskresjonskodeActionTypes.DISKRESJONSKODE_HENTET;
  data: string;
}

export type HentDiskresjonskodeActions =
  | HentDiskresjonskodeAction
  | HentDiskresjonskodeFeiletAction
  | HenterDiskresjonskodeAction
  | DiskresjonskodeHentetAction;

export function hentDiskresjonskode(fnr: string): HentDiskresjonskodeAction {
  return {
    type: HentDiskresjonskodeActionTypes.HENT_DISKRESJONSKODE_FORESPURT,
    fnr,
  };
}

export function hentDiskresjonskodeFeilet(
  error: ApiError
): HentDiskresjonskodeFeiletAction {
  return {
    type: HentDiskresjonskodeActionTypes.HENT_DISKRESJONSKODE_FEILET,
    error,
  };
}

export function henterDiskresjonskode(): HenterDiskresjonskodeAction {
  return {
    type: HentDiskresjonskodeActionTypes.HENTER_DISKRESJONSKODE,
  };
}

export function diskresjonskodeHentet(
  data: string
): DiskresjonskodeHentetAction {
  return {
    type: HentDiskresjonskodeActionTypes.DISKRESJONSKODE_HENTET,
    data,
  };
}
