export interface Kontaktinfo {
  fnr: string;
  epost?: string;
  tlf?: string;
  skalHaVarsel: boolean;
  feilAarsak?: boolean;
}

export interface Brukerinfo {
  navn: string;
  kontaktinfo: Kontaktinfo;
  arbeidssituasjon: string;
}
