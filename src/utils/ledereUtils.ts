import { Leder } from "../data/leder/ledere";
import { senesteTom, tidligsteFom } from "./periodeUtils";
import {
  erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker,
  erOppfolgingstilfelleSluttDatoPassert,
  harArbeidstakerSvartPaaMotebehov,
} from "./motebehovUtils";
import { activeSykmeldingerSentToArbeidsgiver } from "./sykmeldinger/sykmeldingUtils";
import { OppfolgingstilfelleperioderMapState } from "../data/oppfolgingstilfelle/oppfolgingstilfelleperioder";
import { MotebehovDTO } from "../data/motebehov/types/motebehovTypes";
import { SykmeldingOldFormat } from "../data/sykmelding/types/SykmeldingOldFormat";

export const ledereIVirksomheterMedMotebehovsvarFraArbeidstaker = (
  ledereData: Leder[],
  motebehovData: MotebehovDTO[]
): Leder[] => {
  return ledereData.filter((leder: Leder) =>
    motebehovData.some(
      (motebehov) =>
        motebehov.opprettetAv === motebehov.aktorId &&
        leder.orgnummer === motebehov.virksomhetsnummer
    )
  );
};

export const ledereIVirksomheterDerIngenLederHarSvartPaMotebehov = (
  ledereListe: Leder[],
  motebehovData: MotebehovDTO[]
): Leder[] => {
  return ledereListe.filter(
    (leder) =>
      !motebehovData.some(
        (motebehov) =>
          motebehov.opprettetAv !== motebehov.aktorId &&
          motebehov.virksomhetsnummer === leder.orgnummer
      )
  );
};

export const ledereMedOppfolgingstilfelleInnenforMotebehovperioden = (
  ledereData: Leder[],
  oppfolgingstilfelleperioder: OppfolgingstilfelleperioderMapState
): Leder[] => {
  return ledereData.filter((leder) => {
    const startOppfolgingsdato =
      oppfolgingstilfelleperioder[leder.orgnummer] &&
      oppfolgingstilfelleperioder[leder.orgnummer].data
        ? tidligsteFom(oppfolgingstilfelleperioder[leder.orgnummer].data)
        : new Date();
    const sluttOppfolgingsdato =
      oppfolgingstilfelleperioder[leder.orgnummer] &&
      oppfolgingstilfelleperioder[leder.orgnummer].data
        ? senesteTom(oppfolgingstilfelleperioder[leder.orgnummer].data)
        : new Date();

    return (
      startOppfolgingsdato &&
      sluttOppfolgingsdato &&
      !erOppfolgingstilfelleSluttDatoPassert(sluttOppfolgingsdato) &&
      erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker(startOppfolgingsdato)
    );
  });
};

const isNewerLeader = (ledere: Leder[], givenLeder: Leder): boolean => {
  return ledere.some(
    (lederCandidate) =>
      givenLeder.aktoerId !== lederCandidate.aktoerId &&
      givenLeder.orgnummer === lederCandidate.orgnummer &&
      new Date(givenLeder.fomDato) < new Date(lederCandidate.fomDato)
  );
};

export const newestLederForEachVirksomhet = (ledere: Leder[]): Leder[] => {
  return ledere.filter((leder) => {
    return !isNewerLeader(ledere, leder);
  });
};

export const ledereUtenMotebehovsvar = (
  ledereData: Leder[],
  motebehovData: MotebehovDTO[],
  oppfolgingstilfelleperioder: OppfolgingstilfelleperioderMapState
): Leder[] => {
  const arbeidstakerHarSvartPaaMotebehov =
    motebehovData && harArbeidstakerSvartPaaMotebehov(motebehovData);

  const filtrertLederListe = arbeidstakerHarSvartPaaMotebehov
    ? ledereIVirksomheterMedMotebehovsvarFraArbeidstaker(
        ledereData,
        motebehovData
      )
    : ledereMedOppfolgingstilfelleInnenforMotebehovperioden(
        ledereData,
        oppfolgingstilfelleperioder
      );

  const ledereIVirksomhetUtenMotebehovSvarFraLeder = ledereIVirksomheterDerIngenLederHarSvartPaMotebehov(
    filtrertLederListe,
    motebehovData
  );

  return newestLederForEachVirksomhet(
    ledereIVirksomhetUtenMotebehovSvarFraLeder
  );
};

export const lederHasActiveSykmelding = (
  leder: Leder,
  sykmeldinger: SykmeldingOldFormat[]
): boolean => {
  const activeSykmeldingerWithArbeidsgiver = activeSykmeldingerSentToArbeidsgiver(
    sykmeldinger
  );

  return activeSykmeldingerWithArbeidsgiver.some(
    (sykmelding) =>
      sykmelding.mottakendeArbeidsgiver?.virksomhetsnummer === leder.orgnummer
  );
};

export const ledereWithActiveLedereFirst = (
  ledereData: Leder[],
  sykmeldinger: SykmeldingOldFormat[]
): Leder[] => {
  return ledereData.sort((leder1, leder2) => {
    const leder1Active = lederHasActiveSykmelding(leder1, sykmeldinger);
    const leder2Active = lederHasActiveSykmelding(leder2, sykmeldinger);

    if (leder1Active && !leder2Active) {
      return -1;
    }
    if (leder2Active && !leder1Active) {
      return 1;
    }
    return 0;
  });
};

const sykmeldingerWithoutMatchingLeder = (
  ledere: Leder[],
  sykmeldinger: SykmeldingOldFormat[]
): SykmeldingOldFormat[] => {
  return sykmeldinger.filter(
    (sykmelding) =>
      !ledere.some(
        (leder) =>
          leder.orgnummer ===
          sykmelding.mottakendeArbeidsgiver?.virksomhetsnummer
      )
  );
};

interface SykmeldingLeder {
  erOppgitt: boolean;
  orgnummer?: string;
  organisasjonsnavn?: string;
}

const sykmelding2Leder = (sykmelding: SykmeldingOldFormat): SykmeldingLeder => {
  return {
    erOppgitt: false,
    orgnummer: sykmelding.mottakendeArbeidsgiver?.virksomhetsnummer,
    organisasjonsnavn: sykmelding.mottakendeArbeidsgiver?.navn,
  };
};

const removeDuplicatesFromLederList = (
  ledere: SykmeldingLeder[]
): SykmeldingLeder[] => {
  return ledere.filter((leder, index) => {
    return (
      ledere.findIndex((leder2) => {
        return leder2.orgnummer === leder.orgnummer;
      }) === index
    );
  });
};

export const virksomheterWithoutLeder = (
  ledere: Leder[],
  sykmeldinger: SykmeldingOldFormat[]
): SykmeldingLeder[] => {
  const activeSykmeldinger = activeSykmeldingerSentToArbeidsgiver(sykmeldinger);

  const sykmeldingerWithoutLeder = sykmeldingerWithoutMatchingLeder(
    ledere,
    activeSykmeldinger
  );

  const virksomheterAsLedere = sykmeldingerWithoutLeder.map(sykmelding2Leder);

  return removeDuplicatesFromLederList(virksomheterAsLedere);
};

export const currentLedere = (ledere: Leder[]): Leder[] => {
  return ledere.filter((leder) => leder.aktivTom === null);
};

export const formerLedere = (ledere: Leder[]): Leder[] => {
  return ledere.filter((leder) => leder.aktivTom !== null);
};

export const ledereSortertPaaNavnOgOrganisasjonsnavn = (
  ledere: Leder[]
): Leder[] =>
  ledere
    .sort((a, b) => {
      if (a.navn > b.navn) {
        return 1;
      } else if (b.navn > a.navn) {
        return -1;
      }
      return 0;
    })
    .sort((a, b) => {
      if (a.organisasjonsnavn > b.organisasjonsnavn) {
        return 1;
      } else if (b.organisasjonsnavn > a.organisasjonsnavn) {
        return -1;
      }
      return 0;
    });
