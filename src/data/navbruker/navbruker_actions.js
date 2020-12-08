import { HENT_NAVBRUKER_FORESPURT } from "../../actions/actiontyper";

export function hentNavbruker(fnr) {
  return {
    type: HENT_NAVBRUKER_FORESPURT,
    fnr,
  };
}
