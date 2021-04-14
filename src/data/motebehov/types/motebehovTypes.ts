export interface MotebehovSvar {
  harMotebehov: boolean;
  forklaring?: string;
}

export interface MotebehovDTO {
  id: string;
  opprettetDato: Date;
  aktorId: string;
  opprettetAv: string;
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  motebehovSvar?: MotebehovSvar;
  tildeltEnhet?: string;
  behandletTidspunkt?: string;
  behandletVeilederIdent?: string;
  skjemaType?: string;
}
