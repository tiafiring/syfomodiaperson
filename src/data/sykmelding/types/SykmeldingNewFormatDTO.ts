export interface SykmeldingStatusDTO {}

export enum PeriodetypeDTO {
  AKTIVITET_IKKE_MULIG = "AKTIVITET_IKKE_MULIG",
  AVVENTENDE = "AVVENTENDE",
  BEHANDLINGSDAGER = "BEHANDLINGSDAGER",
  GRADERT = "GRADERT",
  REISETILSKUDD = "REISETILSKUDD",
}

export interface GradertDTO {
  grad: number;
  reisetilskudd: Boolean;
}

export interface SykmeldingsperiodeDTO {
  fom: Date;
  tom: Date;
  gradert?: GradertDTO;
  behandlingsdager?: number;
  innspillTilArbeidsgiver?: string;
  type: PeriodetypeDTO;
}

export interface ArbeidsgiverDTO {
  navn: string;
  stillingsprosent?: number;
}

export enum BehandlingsutfallStatusDTO {
  OK = "OK",
  MANUAL_PROCESSING = "MANUAL_PROCESSING",
  INVALID = "INVALID",
}

export interface RegelinfoDTO {
  messageForSender: String;
  messageForUser: String;
  ruleName: String;
  ruleStatus: BehandlingsutfallStatusDTO;
}

export interface BehandlingsutfallDTO {
  ruleHits: RegelinfoDTO[];
  status: BehandlingsutfallStatusDTO;
}

// ------ UTDYPENDE_OPPLYSNINGER
type Restriksjoner = "SKJERMET_FOR_ARBEIDSGIVER" | "SKJERMET_FOR_NAV";

export interface UtdypendeOpplysning {
  sporsmal: string;
  svar: string;
  restriksjoner: Restriksjoner[];
}

export interface SykmeldingNewFormatDTO {
  id: string;
  mottattTidspunkt: Date;
  bekreftetDato?: Date;
  behandlingsutfall: BehandlingsutfallDTO;
  legekontorOrgnummer?: string;
  legeNavn?: string;
  arbeidsgiver?: ArbeidsgiverDTO;
  sykmeldingsperioder: SykmeldingsperiodeDTO[];
  sykmeldingStatus: SykmeldingStatusDTO;
  utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>>;
}
