export enum VisningskriterieDTO {
  NEI = "NEI",
  JA = "JA",
  CHECKED = "CHECKED",
}

export enum SvarTypeDTO {
  JA_NEI = "JA_NEI",
  DATO = "DATO",
  TIMER = "TIMER",
  PROSENT = "PROSENT",
  CHECKBOX = "CHECKBOX",
  CHECKBOX_GRUPPE = "CHECKBOX_GRUPPE",
  CHECKBOX_PANEL = "CHECKBOX_PANEL",
  PERIODER = "PERIODER",
  FRITEKST = "FRITEKST",
  IKKE_RELEVANT = "IKKE_RELEVANT",
  INFO_BEHANDLINGSDAGER = "INFO_BEHANDLINGSDAGER",
  TALL = "TALL",
  RADIO_GRUPPE = "RADIO_GRUPPE",
  RADIO_GRUPPE_TIMER_PROSENT = "RADIO_GRUPPE_TIMER_PROSENT",
  RADIO = "RADIO",
  RADIO_GRUPPE_UKEKALENDER = "RADIO_GRUPPE_UKEKALENDER",
}

export interface SvarDTO {
  verdi: string | Date;
}

export interface ArbeidsgiverDTO {
  navn: string;
  orgnummer: string;
}

export interface SporsmalDTO {
  id?: string;
  tag: string;
  sporsmalstekst?: string;
  undertekst?: string;
  svartype?: SvarTypeDTO;
  min: string;
  max: string;
  pavirkerAndreSporsmal: boolean;
  kriterieForVisningAvUndersporsmal?: VisningskriterieDTO;
  svar: SvarDTO[];
  undersporsmal: SporsmalDTO[];
}

export enum SoknadstypeDTO {
  SELVSTENDIGE_OG_FRILANSERE = "SELVSTENDIGE_OG_FRILANSERE",
  OPPHOLD_UTLAND = "OPPHOLD_UTLAND",
  ARBEIDSTAKERE = "ARBEIDSTAKERE",
  ARBEIDSLEDIG = "ARBEIDSLEDIG",
  BEHANDLINGSDAGER = "BEHANDLINGSDAGER",
  ANNET_ARBEIDSFORHOLD = "ANNET_ARBEIDSFORHOLD",
}

export enum SoknadstatusDTO {
  NY = "NY",
  SENDT = "SENDT",
  FREMTIDIG = "FREMTIDIG",
  UTKAST_TIL_KORRIGERING = "UTKAST_TIL_KORRIGERING",
  KORRIGERT = "KORRIGERT",
  AVBRUTT = "AVBRUTT",
  UTGAATT = "UTGAATT",
  SLETTET = "SLETTET",
}

export interface SykepengesoknadDTO {
  id: string;
  sykmeldingId?: string;
  soknadstype: SoknadstypeDTO;
  status: SoknadstatusDTO;
  fom: Date;
  tom: Date;
  opprettetDato: Date;
  innsendtDato?: Date;
  sendtTilNAVDato?: Date;
  sendtTilArbeidsgiverDato?: Date;
  sporsmal: SporsmalDTO[];
  korrigerer?: string;
  korrigertAv?: string;
  arbeidsgiver?: ArbeidsgiverDTO;
  _erOppdelt?: boolean;
}
