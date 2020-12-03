import { OppfolgingstilfellePerson } from "../types/OppfolgingstilfellePerson";

export const HENT_OPPFOLGINGSTILFELLER_PERSON_FORESPURT =
  "HENT_OPPFOLGINGSTILFELLER_PERSON_FORESPURT";
export const HENT_OPPFOLGINGSTILFELLER_PERSON_HENTER =
  "HENT_OPPFOLGINGSTILFELLER_PERSON_HENTER";
export const HENT_OPPFOLGINGSTILFELLER_PERSON_HENTET =
  "HENT_OPPFOLGINGSTILFELLER_PERSON_HENTET";
export const HENT_OPPFOLGINGSTILFELLER_PERSON_FEILET =
  "HENT_OPPFOLGINGSTILFELLER_PERSON_FEILET";

export function hentOppfolgingstilfellerPersonUtenArbeidsiver(fnr: String) {
  return {
    type: HENT_OPPFOLGINGSTILFELLER_PERSON_FORESPURT,
    fnr,
  };
}

export function hentOppfolgingstilfellerPersonUtenArbeidsiverHenter() {
  return {
    type: HENT_OPPFOLGINGSTILFELLER_PERSON_HENTER,
  };
}

export function hentOppfolgingstilfellerPersonUtenArbeidsiverHentet(
  data: OppfolgingstilfellePerson[]
) {
  return {
    type: HENT_OPPFOLGINGSTILFELLER_PERSON_HENTET,
    data,
  };
}

export function hentOppfolgingstilfellerPersonUtenArbeidsiverFeilet() {
  return {
    type: HENT_OPPFOLGINGSTILFELLER_PERSON_FEILET,
  };
}
