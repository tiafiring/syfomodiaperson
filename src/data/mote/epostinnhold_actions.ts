import { EpostInnholdDTO } from "./types/EpostInnholdDTO";

export const HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT =
  "HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT";
export const HENTER_EPOSTINNHOLD = "HENTER_EPOSTINNHOLD";
export const EPOSTINNHOLD_HENTET = "EPOSTINNHOLD_HENTET";
export const HENT_EPOSTINNHOLD_FEILET = "HENT_EPOSTINNHOLD_FEILET";
export const HENT_AVBRYT_MOTE_EPOSTINNHOLD_FORESPURT =
  "HENT_AVBRYT_MOTE_EPOSTINNHOLD_FORESPURT";

export const hentBekreftMoteEpostinnhold = (
  motedeltakerUuid: string,
  valgtAlternativId: number
) => {
  return {
    type: HENT_BEKREFT_MOTE_EPOSTINNHOLD_FORESPURT,
    motedeltakerUuid,
    valgtAlternativId,
  };
};

export const hentAvbrytMoteEpostinnhold = (motedeltakerUuid: string) => {
  return {
    type: HENT_AVBRYT_MOTE_EPOSTINNHOLD_FORESPURT,
    motedeltakerUuid,
  };
};

export const henterEpostInnhold = () => {
  return {
    type: HENTER_EPOSTINNHOLD,
  };
};

export const epostInnholdHentet = (
  eposttype: string,
  data: EpostInnholdDTO
) => {
  return {
    type: EPOSTINNHOLD_HENTET,
    eposttype,
    data,
  };
};

export const hentEpostinnholdFeilet = () => {
  return {
    type: HENT_EPOSTINNHOLD_FEILET,
  };
};
