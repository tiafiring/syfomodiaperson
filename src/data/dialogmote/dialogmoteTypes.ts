export interface DialogmoteInnkallingDTO {
  tildeltEnhet: string;
  arbeidstaker: {
    personIdent: string;
    fritekstInnkalling?: string;
  };
  arbeidsgiver: {
    virksomhetsnummer: string;
    fritekstInnkalling?: string;
  };
  tidSted: {
    sted: string;
    tid: string;
    videoLink?: string;
  };
}
