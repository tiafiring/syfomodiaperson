export interface MotebehovSvarVeilederDTO {
  harMotebehov: boolean;
  forklaring?: string;
}

export interface MotebehovVeilederDTO {
  id: string;
  opprettetDato: Date;
  aktorId: string;
  opprettetAv: string;
  opprettetAvNavn?: string;
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  motebehovSvar?: MotebehovSvarVeilederDTO;
  tildeltEnhet?: string;
  behandletTidspunkt?: string | Date;
  behandletVeilederIdent?: string;
  skjemaType?: string;
}
