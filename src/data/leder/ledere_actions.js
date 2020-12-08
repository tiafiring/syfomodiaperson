import { HENT_LEDERE_FORESPURT } from "../../actions/actiontyper";

export const hentLedere = (fnr) => {
  return {
    type: HENT_LEDERE_FORESPURT,
    fnr,
  };
};
