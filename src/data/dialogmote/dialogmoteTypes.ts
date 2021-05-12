interface DialogmotedeltakerArbeidstakerVarselDTO {
  readonly createdAt: string;
  readonly varselType: string;
  readonly digitalt: boolean;
  readonly lestDato?: string;
  readonly fritekst: string;
}

export enum DialogmoteStatus {
  INNKALT = "INNKALT",
  AVLYST = "AVLYST",
  FERDIGSTILT = "FERDIGSTILT",
  NYTT_TID_STED = "NYTT_TID_STED",
}

interface DialogmotedeltakerArbeidstakerDTO {
  readonly personIdent: string;
  readonly type: string;
  readonly varselList: DialogmotedeltakerArbeidstakerVarselDTO[];
}

interface DialogmotedeltakerArbeidsgiverDTO {
  readonly virksomhetsnummer: string;
  readonly lederNavn?: string;
  readonly lederEpost?: string;
  readonly type: string;
}

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

export interface AvlysDialogmoteDTO {
  arbeidstaker: AvlysningDto;
  arbeidsgiver: AvlysningDto;
}

interface AvlysningDto {
  begrunnelse: string;
  avlysning: unknown[]; // TODO: Definer riktig type ifm forhåndsvisning av avlysning
}

export interface DialogmoteDTO {
  readonly uuid: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly planlagtMoteBekreftetTidspunkt?: string;
  readonly status: DialogmoteStatus;
  readonly opprettetAv: string;
  readonly tildeltVeilederIdent: string;
  readonly tildeltEnhet: string;
  readonly arbeidstaker: DialogmotedeltakerArbeidstakerDTO;
  readonly arbeidsgiver: DialogmotedeltakerArbeidsgiverDTO;
  readonly sted: string;
  readonly tid: string;
  readonly videoLink?: string;
}
