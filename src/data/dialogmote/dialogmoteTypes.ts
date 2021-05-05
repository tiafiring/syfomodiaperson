export interface DialogmoteInnkallingDTO {
  tildeltEnhet: string;
  arbeidstaker: {
    personIdent: string;
    fritekstInnkalling?: string;
    innkalling: unknown[]; // TODO: Definer riktig type ifm forhåndsvisning av innkalling
  };
  arbeidsgiver: {
    virksomhetsnummer: string;
    fritekstInnkalling?: string;
    innkalling: unknown[]; // TODO: Definer riktig type ifm forhåndsvisning av innkalling
  };
  tidSted: {
    sted: string;
    tid: string;
    videoLink?: string;
  };
}
