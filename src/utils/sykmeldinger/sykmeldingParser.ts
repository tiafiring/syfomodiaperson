import { nyeSMStatuser } from "./sykmeldingstatuser";
import * as periodetyper from "./periodetyper";
import {
  arbeidsrelaterteArsakerKoder,
  arbeidsrelaterteArsakerTekst,
  medisinskeArsakerKoder,
  medisinskeArsakerTekster,
} from "./AktivitetIkkeMuligArsaker";
import { SykmeldingNewFormatDTO } from "@/data/sykmelding/types/SykmeldingNewFormatDTO";
import {
  Datospenn,
  FriskmeldingDTO,
  SykmeldingDiagnose,
  SykmeldingOldFormat,
  SykmeldingStatus,
} from "@/data/sykmelding/types/SykmeldingOldFormat";
import { toDate, toDateWithoutNullCheck } from "../datoUtils";
import { PeriodetypeDTO } from "@/data/sykmelding/types/PeriodetypeDTO";
import { SykmeldingsperiodeDTO } from "@/data/sykmelding/types/SykmeldingsperiodeDTO";
import { BehandlerDTO } from "@/data/sykmelding/types/BehandlerDTO";
import { SporsmalDTO } from "@/data/sykmelding/types/SporsmalDTO";
import { ShortNameDTO } from "@/data/sykmelding/types/ShortNameDTO";
import { DiagnoseDTO } from "@/data/sykmelding/types/DiagnoseDTO";

const mapArbeidsevne = (sykmelding: SykmeldingNewFormatDTO) => {
  return {
    tilretteleggingArbeidsplass: sykmelding.tiltakArbeidsplassen,
    tiltakAndre: sykmelding.andreTiltak,
    tiltakNAV: sykmelding.tiltakNAV,
  };
};

const sykmelderNavn = (behandler: BehandlerDTO): string => {
  if (behandler.mellomnavn) {
    return `${behandler.fornavn} ${behandler.mellomnavn} ${behandler.etternavn}`;
  }
  return `${behandler.fornavn} ${behandler.etternavn}`;
};

const mapSingleDiagnose = (diagnose: DiagnoseDTO): SykmeldingDiagnose => {
  return {
    diagnose: diagnose.tekst,
    diagnosekode: diagnose.kode,
    diagnosesystem: diagnose.system,
  };
};

const mapBidiagnoser = (
  sykmelding: SykmeldingNewFormatDTO
): SykmeldingDiagnose[] | undefined => {
  return sykmelding.medisinskVurdering?.biDiagnoser?.map((diagnose) => {
    return mapSingleDiagnose(diagnose);
  });
};

const mapDiagnose = (sykmelding: SykmeldingNewFormatDTO) => {
  const medisinskVurdering = sykmelding.medisinskVurdering;
  const annenFraversArsak = medisinskVurdering?.annenFraversArsak;
  const notSkjermesForPasient = sykmelding.skjermesForPasient ? null : true;
  const hovedDiagnose = sykmelding.medisinskVurdering?.hovedDiagnose;
  return {
    bidiagnoser: notSkjermesForPasient ? mapBidiagnoser(sykmelding) : undefined,
    fravaerBeskrivelse:
      notSkjermesForPasient && annenFraversArsak
        ? annenFraversArsak.beskrivelse
        : undefined,
    fravaersgrunnLovfestet:
      notSkjermesForPasient && annenFraversArsak
        ? annenFraversArsak.grunn[0]
        : undefined,
    hoveddiagnose:
      notSkjermesForPasient && hovedDiagnose
        ? mapSingleDiagnose(hovedDiagnose)
        : undefined,
    svangerskap: medisinskVurdering?.svangerskap,
    yrkesskade: medisinskVurdering?.yrkesskade,
    yrkesskadeDato: toDate(medisinskVurdering?.yrkesskadeDato),
  };
};

const mapFriskmelding = (
  sykmelding: SykmeldingNewFormatDTO
): FriskmeldingDTO => {
  const prognose = sykmelding.prognose;
  return {
    antarReturAnnenArbeidsgiver: prognose?.erIArbeid?.annetArbeidPaSikt,
    antarReturSammeArbeidsgiver: prognose?.erIArbeid?.egetArbeidPaSikt,
    antattDatoReturSammeArbeidsgiver:
      toDate(prognose?.erIArbeid?.arbeidFOM) || undefined,
    arbeidsfoerEtterPerioden: prognose?.arbeidsforEtterPeriode,
    hensynPaaArbeidsplassen: prognose?.hensynArbeidsplassen,
    tilbakemeldingReturArbeid:
      toDate(prognose?.erIArbeid?.vurderingsdato) || undefined,
    utenArbeidsgiverAntarTilbakeIArbeid:
      prognose?.erIkkeIArbeid?.arbeidsforPaSikt,
    utenArbeidsgiverAntarTilbakeIArbeidDato:
      toDate(prognose?.erIkkeIArbeid?.arbeidsforFOM) || undefined,
    utenArbeidsgiverTilbakemelding:
      toDate(prognose?.erIkkeIArbeid?.vurderingsdato) || undefined,
  };
};

const mapMeldingTilNav = (sykmelding: SykmeldingNewFormatDTO) => {
  const meldingTilNav = sykmelding.meldingTilNAV;
  return {
    navBoerTaTakISaken: meldingTilNav?.bistandUmiddelbart,
    navBoerTaTakISakenBegrunnelse: meldingTilNav?.beskrivBistand,
  };
};

const mapMottakendeArbeidsgiver = (sykmelding: SykmeldingNewFormatDTO) => {
  const mottakendeArbeidsgiver = sykmelding.sykmeldingStatus.arbeidsgiver;

  return (
    mottakendeArbeidsgiver && {
      juridiskOrgnummer: mottakendeArbeidsgiver.juridiskOrgnummer,
      navn: mottakendeArbeidsgiver.orgNavn,
      virksomhetsnummer: mottakendeArbeidsgiver.orgnummer,
    }
  );
};

const periodeWithAktivitetIkkeMulig = (
  sykmelding: SykmeldingNewFormatDTO
): SykmeldingsperiodeDTO | undefined => {
  const perioder = sykmelding.sykmeldingsperioder;

  return perioder.find((periode) => {
    return periode.type === PeriodetypeDTO.AKTIVITET_IKKE_MULIG;
  });
};

const mapGrad = (periode): number | undefined => {
  if (periode === null) {
    return undefined;
  }
  if (periode.type === periodetyper.AKTIVITET_IKKE_MULIG) {
    return 100;
  }
  if (periode.gradert && periode.gradert.grad) {
    return periode.gradert.grad;
  }
  return undefined;
};

const mapPerioder = (sykmelding: SykmeldingNewFormatDTO) => {
  const perioder = sykmelding.sykmeldingsperioder;
  return (
    perioder &&
    perioder.map((periode) => {
      return {
        avventende: periode.innspillTilArbeidsgiver,
        behandlingsdager: periode.behandlingsdager,
        fom: toDateWithoutNullCheck(periode.fom),
        grad: mapGrad(periode),
        reisetilskudd:
          periode.type === periodetyper.REISETILSKUDD ||
          (periode.gradert && periode.gradert.reisetilskudd),
        tom: toDateWithoutNullCheck(periode.tom),
      };
    })
  );
};

const mapMedisinskArsak = (arsak) => {
  return arsak.map((arsakKode) => {
    switch (arsakKode) {
      case medisinskeArsakerKoder.TILSTAND_HINDRER_AKTIVITET:
        return medisinskeArsakerTekster.TILSTAND_HINDRER_AKTIVITET;
      case medisinskeArsakerKoder.AKTIVITET_FORVERRER_TILSTAND:
        return medisinskeArsakerTekster.AKTIVITET_FORVERRER_TILSTAND;
      case medisinskeArsakerKoder.AKTIVITET_FORHINDRER_BEDRING:
        return medisinskeArsakerTekster.AKTIVITET_FORHINDRER_BEDRING;
      default:
        return medisinskeArsakerTekster.ANNET;
    }
  });
};

const mapArbeidsrelatertArsak = (arsak) => {
  return arsak.map((arsakKode) => {
    if (arsakKode === arbeidsrelaterteArsakerKoder.MANGLENDE_TILRETTELEGGING) {
      return arbeidsrelaterteArsakerTekst.MANGLENDE_TILRETTELEGGING;
    }

    return arbeidsrelaterteArsakerTekst.ANNET;
  });
};

const mapMulighetForArbeid = (sykmelding: SykmeldingNewFormatDTO) => {
  const aktivitetIkkeMulig = periodeWithAktivitetIkkeMulig(sykmelding)
    ?.aktivitetIkkeMulig;

  return {
    aarsakAktivitetIkkeMulig433:
      aktivitetIkkeMulig?.medisinskArsak?.beskrivelse,
    aarsakAktivitetIkkeMulig434:
      aktivitetIkkeMulig?.arbeidsrelatertArsak?.beskrivelse,
    aktivitetIkkeMulig433:
      aktivitetIkkeMulig?.medisinskArsak?.arsak &&
      mapMedisinskArsak(aktivitetIkkeMulig?.medisinskArsak?.arsak),
    aktivitetIkkeMulig434:
      aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak &&
      mapArbeidsrelatertArsak(aktivitetIkkeMulig?.arbeidsrelatertArsak?.arsak),
    perioder: mapPerioder(sykmelding),
  };
};

const mapOrgnummer = (sykmelding) => {
  return (
    sykmelding.sykmeldingStatus.arbeidsgiver &&
    sykmelding.sykmeldingStatus.arbeidsgiver.orgnummer
  );
};

const mapPasient = (fnr) => {
  return {
    etternavn: undefined,
    fnr,
    fornavn: undefined,
    mellomnavn: undefined,
  };
};

const mapTilbakedatering = (sykmelding: SykmeldingNewFormatDTO) => {
  const kontaktMedPasient = sykmelding.kontaktMedPasient;
  return {
    dokumenterbarPasientkontakt: toDate(kontaktMedPasient.kontaktDato),
    tilbakedatertBegrunnelse: kontaktMedPasient.begrunnelseIkkeKontakt,
  };
};

const sporsmalOfType = (
  sporsmalOgSvarListe: SporsmalDTO[],
  type: ShortNameDTO
): SporsmalDTO | undefined => {
  return (
    sporsmalOgSvarListe &&
    sporsmalOgSvarListe.find((sporsmal) => {
      return sporsmal.shortName === type;
    })
  );
};

const mapFravaersperioder = (
  sporsmal: SporsmalDTO | undefined
): Datospenn[] => {
  if (!sporsmal?.svar?.svar) {
    return [];
  }
  return JSON.parse(sporsmal.svar.svar);
};

const mapSporsmal = (sykmelding: SykmeldingNewFormatDTO) => {
  const sporsmalOgSvarListe = sykmelding.sykmeldingStatus.sporsmalOgSvarListe;
  const arbeidssituasjonSporsmal = sporsmalOfType(
    sporsmalOgSvarListe,
    ShortNameDTO.ARBEIDSSITUASJON
  );

  const forsikringSporsmal = sporsmalOfType(
    sporsmalOgSvarListe,
    ShortNameDTO.FORSIKRING
  );

  const fravaerSporsmal = sporsmalOfType(
    sporsmalOgSvarListe,
    ShortNameDTO.FRAVAER
  );

  const periodeSporsmal = sporsmalOfType(
    sporsmalOgSvarListe,
    ShortNameDTO.PERIODE
  );
  return {
    arbeidssituasjon: arbeidssituasjonSporsmal?.svar.svar,
    fravaersperioder: mapFravaersperioder(periodeSporsmal),
    harAnnetFravaer: fravaerSporsmal?.svar?.svar === "JA",
    harForsikring: forsikringSporsmal?.svar?.svar === "JA",
  };
};

const mapStatus = (sykmelding: SykmeldingNewFormatDTO): SykmeldingStatus => {
  switch (sykmelding.sykmeldingStatus.statusEvent) {
    case nyeSMStatuser.APEN: {
      return SykmeldingStatus.NY;
    }
    case nyeSMStatuser.UTGATT: {
      return SykmeldingStatus.UTGAATT;
    }
    default: {
      return SykmeldingStatus[sykmelding.sykmeldingStatus.statusEvent];
    }
  }
};

const mapValgtArbeidssituasjon = (
  sykmelding: SykmeldingNewFormatDTO
): string | undefined => {
  const sporsmalOgSvarListe = sykmelding.sykmeldingStatus.sporsmalOgSvarListe;
  const arbeidssituasjonSporsmal = sporsmalOfType(
    sporsmalOgSvarListe,
    ShortNameDTO.ARBEIDSSITUASJON
  );

  return arbeidssituasjonSporsmal?.svar.svar;
};

export const newSMFormat2OldFormat = (
  sykmelding: SykmeldingNewFormatDTO,
  fnr: string
): SykmeldingOldFormat => {
  return {
    arbeidsevne: mapArbeidsevne(sykmelding),
    arbeidsgiver: sykmelding.arbeidsgiver?.navn,
    bekreftelse: {
      sykmelder: sykmelderNavn(sykmelding.behandler),
      sykmelderTlf: sykmelding.behandler.tlf,
      utstedelsesdato: toDate(sykmelding.behandletTidspunkt),
    },
    diagnose: mapDiagnose(sykmelding),
    friskmelding: mapFriskmelding(sykmelding),
    id: sykmelding.id,
    innsendtArbeidsgivernavn: sykmelding.sykmeldingStatus.arbeidsgiver?.orgNavn,
    innspillTilArbeidsgiver: sykmelding.meldingTilArbeidsgiver,
    meldingTilNav: mapMeldingTilNav(sykmelding),
    mottakendeArbeidsgiver: mapMottakendeArbeidsgiver(sykmelding),
    mulighetForArbeid: mapMulighetForArbeid(sykmelding),
    naermesteLederStatus: undefined,
    orgnummer: mapOrgnummer(sykmelding),
    pasient: mapPasient(fnr),
    sendtdato: sykmelding.sykmeldingStatus.timestamp,
    mottattTidspunkt: new Date(sykmelding.mottattTidspunkt),
    skalViseSkravertFelt: !sykmelding.skjermesForPasient,
    sporsmal: mapSporsmal(sykmelding),
    startLegemeldtFravaer: toDate(sykmelding.syketilfelleStartDato),
    status: mapStatus(sykmelding),
    stillingsprosent:
      sykmelding.arbeidsgiver && sykmelding.arbeidsgiver.stillingsprosent,
    tilbakedatering: mapTilbakedatering(sykmelding),
    utdypendeOpplysninger: sykmelding.utdypendeOpplysninger,
    valgtArbeidssituasjon: mapValgtArbeidssituasjon(sykmelding),
    behandlingsutfall: sykmelding.behandlingsutfall,
    egenmeldt: sykmelding.egenmeldt,
    papirsykmelding: sykmelding.papirsykmelding,
    harRedusertArbeidsgiverperiode: sykmelding.harRedusertArbeidsgiverperiode,
  };
};

export const oldFormatSMForAG = (
  sykmelding: SykmeldingNewFormatDTO,
  fnr: string
): SykmeldingOldFormat => {
  const oldFormatSM = newSMFormat2OldFormat(sykmelding, fnr);

  return {
    ...oldFormatSM,
    arbeidsevne: {
      ...oldFormatSM.arbeidsevne,
      tiltakAndre: undefined,
      tiltakNAV: undefined,
    },
    diagnose: {
      ...oldFormatSM.diagnose,
      bidiagnoser: [],
      fravaerBeskrivelse: undefined,
      fravaersgrunnLovfestet: undefined,
      hoveddiagnose: undefined,
      svangerskap: undefined,
      yrkesskade: undefined,
      yrkesskadeDato: undefined,
    },
    friskmelding: {
      ...oldFormatSM.friskmelding,
      tilbakemeldingReturArbeid: undefined,
      utenArbeidsgiverAntarTilbakeIArbeid: undefined,
      utenArbeidsgiverAntarTilbakeIArbeidDato: undefined,
      utenArbeidsgiverTilbakemelding: undefined,
    },
    meldingTilNav: {
      ...oldFormatSM.meldingTilNav,
      navBoerTaTakISaken: undefined,
      navBoerTaTakISakenBegrunnelse: undefined,
    },
    mulighetForArbeid: {
      ...oldFormatSM.mulighetForArbeid,
      aarsakAktivitetIkkeMulig433: undefined,
      aktivitetIkkeMulig433: undefined,
    },
    tilbakedatering: {
      ...oldFormatSM.tilbakedatering,
      tilbakedatertBegrunnelse: undefined,
    },
    utdypendeOpplysninger: new Map(),
  };
};
