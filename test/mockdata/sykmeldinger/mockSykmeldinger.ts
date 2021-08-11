import { SykmeldingNewFormatDTO } from "../../../src/data/sykmelding/types/SykmeldingNewFormatDTO";
import { BehandlingsutfallStatusDTO } from "../../../src/data/sykmelding/types/BehandlingsutfallStatusDTO";
import { PeriodetypeDTO } from "../../../src/data/sykmelding/types/PeriodetypeDTO";
import { ShortNameDTO } from "../../../src/data/sykmelding/types/ShortNameDTO";
import { SvartypeDTO } from "../../../src/data/sykmelding/types/SvartypeDTO";

const mockSykmeldinger: SykmeldingNewFormatDTO[] = [
  {
    id: "e425a750-7f39-4974-9a06-fa1775f987c9",
    mottattTidspunkt: "2020-01-21T23:00:00Z",
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
    sykmeldingsperioder: [
      {
        fom: "2020-01-22",
        tom: "2020-05-22",
        type: PeriodetypeDTO.AKTIVITET_IKKE_MULIG,
        reisetilskudd: false,
      },
    ],
    sykmeldingStatus: {
      statusEvent: "SENDT",
      timestamp: "2020-01-29T09:38:05.414834Z",
      arbeidsgiver: {
        orgnummer: "110110110",
        juridiskOrgnummer: "110110110",
        orgNavn: "PONTYPANDY FIRE SERVICE",
      },
      sporsmalOgSvarListe: [
        {
          tekst: "Tekst",
          shortName: ShortNameDTO.FORSIKRING,
          svar: {
            svarType: SvartypeDTO.JA_NEI,
            svar: "svar",
          },
        },
      ],
    },
    medisinskVurdering: {
      hovedDiagnose: {
        kode: "tt",
        system: "tt",
      },
      biDiagnoser: [],
      svangerskap: false,
      yrkesskade: false,
    },
    skjermesForPasient: false,
    utdypendeOpplysninger: new Map(),
    kontaktMedPasient: {
      kontaktDato: undefined,
    },
    behandletTidspunkt: "2020-01-21T22:00:00Z",
    behandler: {
      fornavn: "Lego",
      etternavn: "Legesen",
      aktoerId: "1000014797129",
      fnr: "99900011122",
      adresse: {
        gate: undefined,
      },
    },
  },
];

export default mockSykmeldinger;
