export const PUSH_MODIACONTEXT_FORESPURT = "PUSH_MODIACONTEXT_FORESPURT";
export const PUSH_MODIACONTEXT_FEILET = "PUSH_MODIACONTEXT_FEILET";
export const MODIACONTEXT_PUSHET = "MODIACONTEXT_PUSHET";
export const PUSHER_MODIACONTEXT = "PUSHER_MODIACONTEXT";

export const HENT_AKTIVBRUKER_FORESPURT = "HENT_AKTIVBRUKER_FORESPURT";
export const HENTER_AKTIVBRUKER = "HENTER_AKTIVBRUKER";
export const HENT_AKTIVBRUKER_FEILET = "HENT_AKTIVBRUKER_FEILET";
export const AKTIVBRUKER_HENTET = "AKTIVBRUKER_HENTET";

export const HENT_AKTIVENHET_FORESPURT = "HENT_AKTIVENHET_FORESPURT";
export const HENTER_AKTIVENHET = "HENTER_AKTIVENHET";
export const HENT_AKTIVENHET_FEILET = "HENT_AKTIVENHET_FEILET";
export const AKTIVENHET_HENTET = "AKTIVENHET_HENTET";

export function hentAktivBruker(data: any) {
  return {
    type: HENT_AKTIVBRUKER_FORESPURT,
    data,
  };
}

export function hentAktivBrukerFeilet() {
  return {
    type: HENT_AKTIVBRUKER_FEILET,
  };
}

export function henterAktivBruker() {
  return {
    type: HENTER_AKTIVBRUKER,
  };
}

export function aktivBrukerHentet(data: any) {
  return {
    type: AKTIVBRUKER_HENTET,
    data,
  };
}

export function hentAktivEnhet(data: any) {
  return {
    type: HENT_AKTIVENHET_FORESPURT,
    data,
  };
}

export function hentAktivEnhetFeilet() {
  return {
    type: HENT_AKTIVENHET_FEILET,
  };
}

export function henterAktivEnhet() {
  return {
    type: HENTER_AKTIVENHET,
  };
}

export function aktivEnhetHentet(data: any) {
  return {
    type: AKTIVENHET_HENTET,
    data,
  };
}

export function pushModiaContextFeilet() {
  return {
    type: PUSH_MODIACONTEXT_FEILET,
  };
}

export function pusherModiaContext() {
  return {
    type: PUSHER_MODIACONTEXT,
  };
}

export function pushModiaContext(data: any) {
  return {
    type: PUSH_MODIACONTEXT_FORESPURT,
    data,
  };
}

export function modiaContextPushet() {
  return {
    type: MODIACONTEXT_PUSHET,
  };
}
