export enum MedisinskArsakTypeDTO {
  TILSTAND_HINDRER_AKTIVITET = "TILSTAND_HINDRER_AKTIVITET",
  AKTIVITET_FORVERRER_TILSTAND = "AKTIVITET_FORVERRER_TILSTAND",
  AKTIVITET_FORHINDRER_BEDRING = "AKTIVITET_FORHINDRER_BEDRING",
  ANNET = "ANNET",
}

export const medisinskArsakTypeTekster: {
  [key in MedisinskArsakTypeDTO]: string;
} = {
  TILSTAND_HINDRER_AKTIVITET:
    "Helsetilstanden hindrer pasienten i å være i aktivitet",
  AKTIVITET_FORVERRER_TILSTAND: "Aktivitet vil forverre helsetilstanden",
  AKTIVITET_FORHINDRER_BEDRING:
    "Aktivitet vil hindre/forsinke bedring av helsetilstanden",
  ANNET: "Annet",
};
