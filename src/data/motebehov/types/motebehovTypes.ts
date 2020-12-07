interface MotebehovSvar {
  harMotebehov: boolean;
  forklaring?: string;
}

interface Motebehov {
  id: string;
  opprettetDato: Date;
  aktorId: string;
  opprettetAv: string;
  arbeidstakerFnr: string;
  virksomhetsnummer: string;
  motebehovSvar?: MotebehovSvar;
  tildeltEnhet?: string;
  behandletTidspunkt?: Date;
  behandletVeilederIdent?: String;
  skjemaType?: String;
}
