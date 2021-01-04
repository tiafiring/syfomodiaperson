import {
  BehandlingsutfallDTO,
  UtdypendeOpplysning,
} from "./SykmeldingNewFormatDTO";

export enum ArbeidssituasjonType {
  NAERINGSDRIVENDE = "NAERINGSDRIVENDE",
  FRILANSER = "FRILANSER",
  ARBEIDSTAKER = "ARBEIDSTAKER",
  ARBEIDSLEDIG = "ARBEIDSLEDIG",
  ANNET = "ANNET",
}

export enum SykmeldingStatus {
  NY = "NY",
  SENDT = "SENDT",
  UTGAATT = "UTGAATT",
  AVBRUTT = "AVBRUTT",
  BEKREFTET = "BEKREFTET",
  TIL_SENDING = "TIL_SENDING",
}

export interface NaermesteLeder {
  navn: string;
  epost: string;
  mobil: string;
  orgnummer: string;
  organisasjonsnavn: string;
  aktivTom: string;
}

export interface Arbeidsgiver {
  navn: string;
  orgnummer: string;
  naermesteLeder?: NaermesteLeder;
}

export interface SykmeldingDiagnose {
  diagnose?: string;
  diagnosekode: string;
  diagnosesystem: string;
  diagnosetekst?: string | null;
}

export interface SykmeldingPeriodeDTO {
  fom: string;
  tom: string;
  grad: number | null;
  behandlingsdager: number | null;
  reisetilskudd: boolean | null;
  avventende?: string | null;
  redusertVenteperiode?: boolean | null;
}

export interface Datospenn {
  fom: string | null;
  tom: string | null;
}

export interface SykmeldingOldFormat {
  id: string;
  mottattTidspunkt: Date;
  startLegemeldtFravaer: string | null;
  skalViseSkravertFelt: boolean;
  identdato: string;
  status: SykmeldingStatus;
  naermesteLederStatus: string | null;
  erEgenmeldt?: boolean | null;
  erPapirsykmelding?: boolean | null;
  innsendtArbeidsgivernavn: string | null;
  valgtArbeidssituasjon: ArbeidssituasjonType | null;
  behandlingsutfall: BehandlingsutfallDTO;
  mottakendeArbeidsgiver?: {
    navn: string;
    virksomhetsnummer: string;
    juridiskOrgnummer: string;
  } | null;
  orgnummer?: string | null;
  sendtdato: string;
  sporsmal: {
    harForsikring: boolean | null;
    arbeidssituasjon: ArbeidssituasjonType | null;
    fravaersperioder: Datospenn[] | null;
    harAnnetFravaer: boolean | null;
  };
  pasient: {
    fnr: string | null;
    fornavn: string | null;
    mellomnavn: string | null;
    etternavn: string | null;
  };
  arbeidsgiver: string | null;
  stillingsprosent: number | null;
  diagnose: {
    hoveddiagnose: SykmeldingDiagnose;
    bidiagnoser: SykmeldingDiagnose[] | null;
    fravaersgrunnLovfestet: string | null;
    fravaerBeskrivelse: string | null;
    svangerskap: boolean | null;
    yrkesskade: boolean | null;
    yrkesskadeDato: string | null;
  };
  mulighetForArbeid: {
    perioder: SykmeldingPeriodeDTO[];
    aktivitetIkkeMulig433: string[] | null;
    aktivitetIkkeMulig434: string[] | null;
    aarsakAktivitetIkkeMulig433: string | null;
    aarsakAktivitetIkkeMulig434: string | null;
  };
  friskmelding: {
    arbeidsfoerEtterPerioden: boolean | null;
    hensynPaaArbeidsplassen: string | null;
    antarReturSammeArbeidsgiver: boolean;
    antattDatoReturSammeArbeidsgiver: string | null;
    antarReturAnnenArbeidsgiver: boolean;
    tilbakemeldingReturArbeid: string | null;
    utenArbeidsgiverAntarTilbakeIArbeid: boolean;
    utenArbeidsgiverAntarTilbakeIArbeidDato: string | null;
    utenArbeidsgiverTilbakemelding: string | null;
  };
  utdypendeOpplysninger: Map<string, Map<string, UtdypendeOpplysning>>;
  arbeidsevne: {
    tilretteleggingArbeidsplass: string | null;
    tiltakNAV: string | null;
    tiltakAndre: string | null;
  };
  meldingTilNav: {
    navBoerTaTakISaken: boolean;
    navBoerTaTakISakenBegrunnelse: string | null;
  };
  innspillTilArbeidsgiver: string | null;
  tilbakedatering: {
    dokumenterbarPasientkontakt: string | null;
    tilbakedatertBegrunnelse: string | null;
  };
  bekreftelse: {
    utstedelsesdato: string | null;
    sykmelder: string | null;
    sykmelderTlf: string | null;
  };
  egenmeldt?: boolean;
}
