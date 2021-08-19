export enum ArbeidsrelatertArsakTypeDTO {
  MANGLENDE_TILRETTELEGGING = "MANGLENDE_TILRETTELEGGING",
  ANNET = "ANNET",
}

export const arbeidsrelatertArsakTypetekster: {
  [key in ArbeidsrelatertArsakTypeDTO]: string;
} = {
  MANGLENDE_TILRETTELEGGING: "Manglende tilrettelegging på arbeidsplassen",
  ANNET: "Annet",
};
