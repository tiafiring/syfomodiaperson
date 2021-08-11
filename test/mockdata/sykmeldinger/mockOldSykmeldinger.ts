import { toDate, toDateWithoutNullCheck } from "../../../src/utils/datoUtils";
import {
  SykmeldingOldFormat,
  SykmeldingStatus,
} from "../../../src/data/sykmelding/types/SykmeldingOldFormat";
import { BehandlingsutfallStatusDTO } from "../../../src/data/sykmelding/types/BehandlingsutfallStatusDTO";

const mockOldSykmeldinger: SykmeldingOldFormat[] = [
  {
    arbeidsevne: {
      tilretteleggingArbeidsplass: undefined,
      tiltakAndre: undefined,
      tiltakNAV: undefined,
    },
    arbeidsgiver: undefined,
    bekreftelse: {
      sykmelder: "Lego Legesen",
      sykmelderTlf: undefined,
      utstedelsesdato: toDate("2020-01-21T22:00:00Z"),
    },
    diagnose: {
      bidiagnoser: [],
      fravaerBeskrivelse: undefined,
      fravaersgrunnLovfestet: undefined,
      hoveddiagnose: {
        diagnose: undefined,
        diagnosekode: "tt",
        diagnosesystem: "tt",
      },
      svangerskap: false,
      yrkesskade: false,
      yrkesskadeDato: undefined,
    },
    friskmelding: {
      antarReturAnnenArbeidsgiver: undefined,
      antarReturSammeArbeidsgiver: undefined,
      antattDatoReturSammeArbeidsgiver: undefined,
      arbeidsfoerEtterPerioden: undefined,
      hensynPaaArbeidsplassen: undefined,
      tilbakemeldingReturArbeid: undefined,
      utenArbeidsgiverAntarTilbakeIArbeid: undefined,
      utenArbeidsgiverAntarTilbakeIArbeidDato: undefined,
      utenArbeidsgiverTilbakemelding: undefined,
    },
    id: "e425a750-7f39-4974-9a06-fa1775f987c9",
    innsendtArbeidsgivernavn: "PONTYPANDY FIRE SERVICE",
    innspillTilArbeidsgiver: undefined,
    meldingTilNav: {
      navBoerTaTakISaken: undefined,
      navBoerTaTakISakenBegrunnelse: undefined,
    },
    mottakendeArbeidsgiver: {
      juridiskOrgnummer: "110110110",
      navn: "PONTYPANDY FIRE SERVICE",
      virksomhetsnummer: "110110110",
    },
    mulighetForArbeid: {
      aarsakAktivitetIkkeMulig433: undefined,
      aarsakAktivitetIkkeMulig434: undefined,
      aktivitetIkkeMulig433: undefined,
      aktivitetIkkeMulig434: undefined,
      perioder: [
        {
          avventende: undefined,
          behandlingsdager: undefined,
          fom: toDateWithoutNullCheck("2020-01-22"),
          grad: 100,
          reisetilskudd: undefined,
          tom: toDateWithoutNullCheck("2020-05-22"),
        },
      ],
    },
    naermesteLederStatus: undefined,
    orgnummer: "110110110",
    pasient: {
      etternavn: undefined,
      fnr: "99887766554",
      fornavn: undefined,
      mellomnavn: undefined,
    },
    sendtdato: "2020-01-29T09:38:05.414834Z",
    mottattTidspunkt: new Date("2020-01-21T23:00:00Z"),
    skalViseSkravertFelt: true,
    sporsmal: {
      arbeidssituasjon: undefined,
      fravaersperioder: [],
      harAnnetFravaer: false,
      harForsikring: false,
    },
    startLegemeldtFravaer: undefined,
    status: SykmeldingStatus.SENDT,
    stillingsprosent: undefined,
    tilbakedatering: {
      dokumenterbarPasientkontakt: undefined,
      tilbakedatertBegrunnelse: undefined,
    },
    utdypendeOpplysninger: new Map(),
    valgtArbeidssituasjon: undefined,
    behandlingsutfall: {
      status: BehandlingsutfallStatusDTO.OK,
      ruleHits: [
        {
          messageForSender: "messageForSender",
          messageForUser: "messageForUser",
          ruleName: "Rule",
          ruleStatus: BehandlingsutfallStatusDTO.OK,
        },
      ],
    },
    egenmeldt: undefined,
    papirsykmelding: undefined,
    harRedusertArbeidsgiverperiode: undefined,
  },
];

export default mockOldSykmeldinger;
