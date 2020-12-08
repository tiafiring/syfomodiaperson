export const HENT_LEDERE_FORESPURT = "HENT_LEDERE_FORESPURT";
export const HENTER_LEDERE = "HENTER_LEDERE";
export const LEDERE_HENTET = "LEDERE_HENTET";
export const HENT_LEDERE_FEILET = "HENT_LEDERE_FEILET";

export const hentLedere = (fnr: string) => {
  return {
    type: HENT_LEDERE_FORESPURT,
    fnr,
  };
};
