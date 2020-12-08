export const HENT_MOTER_FORESPURT = "HENT_MOTER_FORESPURT";
export const HENTER_MOTER = "HENTER_MOTER";
export const MOTER_HENTET = "MOTER_HENTET";
export const HENT_MOTER_FEILET = "HENT_MOTER_FEILET";
export const HENT_MOTER_IKKE_TILGANG = "HENT_MOTER_IKKE_TILGANG";

export const OPPRETT_MOTE_FORESPURT = "OPPRETT_MOTE_FORESPURT";
export const OPPRETTER_MOTE = "OPPRETTER_MOTE";
export const MOTE_OPPRETTET = "MOTE_OPPRETTET";
export const OPPRETT_MOTE_FEILET = "OPPRETT_MOTE_FEILET";

export const AVBRYT_MOTE_FORESPURT = "AVBRYT_MOTE_FORESPURT";
export const MOTE_AVBRUTT = "MOTE_AVBRUTT";
export const AVBRYT_MOTE_FEILET = "AVBRYT_MOTE_FEILET";
export const AVBRYTER_MOTE = "AVBRYTER_MOTE";

export const BEKREFT_MOTE_FORESPURT = "BEKREFT_MOTE_FORESPURT";
export const BEKREFTER_MOTE = "BEKREFTER_MOTE";
export const MOTE_BEKREFTET = "MOTE_BEKREFTET";
export const BEKREFT_MOTE_FEILET = "BEKREFT_MOTE_FEILET";

export const FLERE_ALTERNATIV = "FLERE_ALTERNATIV";
export const FJERN_ALTERNATIV = "FJERN_ALTERNATIV";
export const AVBRYT_FLERE_ALTERNATIV = "AVBRYT_FLERE_ALTERNATIV";
export const OPPRETTER_FLERE_ALTERNATIV = "OPPRETTER_FLERE_ALTERNATIV";
export const OPPRETT_FLERE_ALTERNATIV_FORESPURT =
  "OPPRETT_FLERE_ALTERNATIV_FORESPURT";
export const OPPRETT_FLERE_ALTERNATIV_FEILET =
  "OPPRETT_FLERE_ALTERNATIV_FEILET";
export const OPPRETT_FLERE_ALTERNATIV_BEKREFTET =
  "OPPRETT_FLERE_ALTERNATIV_BEKREFTET";
export const VIS_FLERE_ALTERNATIV = "VIS_FLERE_ALTERNATIV";

export function opprettMote(data) {
  return {
    type: OPPRETT_MOTE_FORESPURT,
    data,
  };
}

export function oppretterMote() {
  return {
    type: OPPRETTER_MOTE,
  };
}

export function moteOpprettet(data) {
  return {
    type: MOTE_OPPRETTET,
    fnr: data.fnr,
    data,
  };
}

export function opprettMoteFeilet() {
  return {
    type: OPPRETT_MOTE_FEILET,
  };
}

export function hentMoter(fnr) {
  return {
    type: HENT_MOTER_FORESPURT,
    fnr,
  };
}

export function henterMoter() {
  return {
    type: HENTER_MOTER,
  };
}

export function moterHentet(data) {
  return {
    type: MOTER_HENTET,
    data,
  };
}

export function hentMoterFeilet() {
  return {
    type: HENT_MOTER_FEILET,
  };
}

export function hentMoterIkkeTilgang(tilgang) {
  return {
    type: HENT_MOTER_IKKE_TILGANG,
    tilgang,
  };
}

export function avbrytMote(uuid, fnr) {
  return {
    type: AVBRYT_MOTE_FORESPURT,
    uuid,
    fnr,
    varsle: true,
  };
}

export function avbrytMoteUtenVarsel(uuid, fnr) {
  return {
    type: AVBRYT_MOTE_FORESPURT,
    uuid,
    fnr,
    varsle: false,
  };
}

export function flereAlternativ() {
  return {
    type: FLERE_ALTERNATIV,
  };
}

export function fjernAlternativ() {
  return {
    type: FJERN_ALTERNATIV,
  };
}

export function visFlereAlternativ() {
  return {
    type: VIS_FLERE_ALTERNATIV,
  };
}

export function avbrytFlereAlternativ() {
  return {
    type: AVBRYT_FLERE_ALTERNATIV,
  };
}

export function opprettFlereAlternativBekreftet(data, moteUuid) {
  return {
    type: OPPRETT_FLERE_ALTERNATIV_BEKREFTET,
    data,
    moteUuid,
  };
}

export function opprettFlereAlternativ(data, moteUuid, fnr) {
  return {
    type: OPPRETT_FLERE_ALTERNATIV_FORESPURT,
    data,
    moteUuid,
    fnr,
  };
}

export function opprettFlereAlternativFeilet() {
  return {
    type: OPPRETT_FLERE_ALTERNATIV_FEILET,
  };
}

export function oppretterFlereAlternativ() {
  return {
    type: OPPRETTER_FLERE_ALTERNATIV,
  };
}

export function moteAvbrutt(uuid) {
  return {
    type: MOTE_AVBRUTT,
    uuid,
  };
}

export function avbrytMoteFeilet() {
  return {
    type: AVBRYT_MOTE_FEILET,
  };
}

export function avbryterMote(uuid) {
  return {
    type: AVBRYTER_MOTE,
    uuid,
  };
}

export function bekreftMote(moteUuid, valgtAlternativId, fnr) {
  return {
    type: BEKREFT_MOTE_FORESPURT,
    moteUuid,
    valgtAlternativId,
    fnr,
  };
}

export function bekrefterMote() {
  return {
    type: BEKREFTER_MOTE,
  };
}

export function moteBekreftet(moteUuid, valgtAlternativId, bekreftetTidspunkt) {
  return {
    type: MOTE_BEKREFTET,
    moteUuid,
    valgtAlternativId,
    bekreftetTidspunkt,
  };
}

export function bekreftMoteFeilet() {
  return {
    type: BEKREFT_MOTE_FEILET,
  };
}
