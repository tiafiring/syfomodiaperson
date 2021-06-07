export enum MotedeltakerVarselType {
  AVLYST = "AVLYST",
  INNKALT = "INNKALT",
  REFERAT = "REFERAT",
  NYTT_TID_STED = "NYTT_TID_STED",
}

export interface DialogmotedeltakerArbeidstakerVarselDTO {
  readonly createdAt: string;
  readonly varselType: MotedeltakerVarselType;
  readonly digitalt: boolean;
  readonly lestDato?: string;
  readonly fritekst: string;
  readonly document: DocumentComponentDto[];
}

export interface DialogmotedeltakerArbeidsgiverVarselDTO {
  readonly createdAt: string;
  readonly varselType: MotedeltakerVarselType;
  readonly status: string;
  readonly lestDato?: string;
  readonly fritekst: string;
  readonly document: DocumentComponentDto[];
}

export enum DocumentComponentType {
  HEADER = "HEADER",
  PARAGRAPH = "PARAGRAPH",
  LINK = "LINK",
}

export interface DocumentComponentDto {
  readonly type: DocumentComponentType;
  readonly title?: string;
  readonly texts: string[];
}

export enum DialogmoteStatus {
  INNKALT = "INNKALT",
  AVLYST = "AVLYST",
  FERDIGSTILT = "FERDIGSTILT",
  NYTT_TID_STED = "NYTT_TID_STED",
}

export interface DialogmotedeltakerArbeidstakerDTO {
  readonly personIdent: string;
  readonly type: string;
  readonly varselList: DialogmotedeltakerArbeidstakerVarselDTO[];
}

export interface DialogmotedeltakerArbeidsgiverDTO {
  readonly virksomhetsnummer: string;
  readonly lederNavn?: string;
  readonly lederEpost?: string;
  readonly type: string;
  readonly varselList: DialogmotedeltakerArbeidsgiverVarselDTO[];
}

export interface DialogmoteInnkallingDTO {
  tildeltEnhet: string;
  arbeidstaker: {
    personIdent: string;
    fritekstInnkalling?: string;
    innkalling: DocumentComponentDto[];
  };
  arbeidsgiver: {
    virksomhetsnummer: string;
    fritekstInnkalling?: string;
    innkalling: DocumentComponentDto[];
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
  avlysning: DocumentComponentDto[];
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
