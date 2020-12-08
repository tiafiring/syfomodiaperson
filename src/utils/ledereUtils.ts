import { Leder } from "../data/leder/ledere";
import { senesteTom, tidligsteFom } from "./periodeUtils";
import {
  erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker,
  erOppfolgingstilfelleSluttDatoPassert,
  harArbeidstakerSvartPaaMotebehov,
} from "./motebehovUtils";
import { activeSykmeldingerSentToArbeidsgiver } from "./sykmeldinger/sykmeldingUtils";

export const ledereIVirksomheterMedMotebehovsvarFraArbeidstaker = (
  ledereData: Leder[],
  motebehovData: any
) => {
  return ledereData.filter((leder: Leder) => {
    return (
      motebehovData.findIndex((motebehov: any) => {
        return (
          motebehov.opprettetAv === motebehov.aktorId &&
          leder.orgnummer === motebehov.virksomhetsnummer
        );
      }) >= 0
    );
  });
};

export const ledereIVirksomheterDerIngenLederHarSvartPaMotebehov = (
  ledereListe: Leder[],
  motebehovData: any
) => {
  return ledereListe.filter((leder) => {
    return (
      motebehovData.findIndex((motebehov: any) => {
        return (
          motebehov.opprettetAv !== motebehov.aktorId &&
          motebehov.virksomhetsnummer === leder.orgnummer
        );
      }) < 0
    );
  });
};

export const ledereMedOppfolgingstilfelleInnenforMotebehovperioden = (
  ledereData: Leder[],
  oppfolgingstilfelleperioder: any
) => {
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

const isNewerLeader = (ledere: Leder[], givenLeder: Leder) => {
  return (
    ledere.findIndex((lederCandidate) => {
      return (
        givenLeder.aktoerId !== lederCandidate.aktoerId &&
        givenLeder.orgnummer === lederCandidate.orgnummer &&
        givenLeder.fomDato < lederCandidate.fomDato
      );
    }) > -1
  );
};

const newestLederForEachVirksomhet = (ledere: Leder[]) => {
  return ledere.filter((leder) => {
    return !isNewerLeader(ledere, leder);
  });
};

export const ledereUtenMotebehovsvar = (
  ledereData: Leder[],
  motebehovData: any,
  oppfolgingstilfelleperioder: any
) => {
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

export const lederHasActiveSykmelding = (leder: Leder, sykmeldinger: any[]) => {
  const activeSykmeldingerWithArbeidsgiver = activeSykmeldingerSentToArbeidsgiver(
    sykmeldinger
  );

  return (
    activeSykmeldingerWithArbeidsgiver.findIndex((sykmelding: any) => {
      return (
        sykmelding.mottakendeArbeidsgiver.virksomhetsnummer === leder.orgnummer
      );
    }) > -1
  );
};

export const ledereWithActiveLedereFirst = (
  ledereData: Leder[],
  sykmeldinger: any[]
) => {
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
  sykmeldinger: any[]
) => {
  return sykmeldinger.filter((sykmelding) => {
    return (
      ledere.findIndex((leder) => {
        return (
          leder.orgnummer ===
          sykmelding.mottakendeArbeidsgiver.virksomhetsnummer
        );
      }) === -1
    );
  });
};

interface SykmeldingLeder {
  erOppgitt: boolean;
  orgnummer: string;
  organisasjonsnavn: string;
}

const sykmelding2Leder = (sykmelding: any) => {
  return {
    erOppgitt: false,
    orgnummer: sykmelding.mottakendeArbeidsgiver.virksomhetsnummer,
    organisasjonsnavn: sykmelding.mottakendeArbeidsgiver.navn,
  };
};

const removeDuplicatesFromLederList = (ledere: SykmeldingLeder[]) => {
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
  sykmeldinger: any[]
) => {
  const activeSykmeldinger = activeSykmeldingerSentToArbeidsgiver(sykmeldinger);

  const sykmeldingerWithoutLeder = sykmeldingerWithoutMatchingLeder(
    ledere,
    activeSykmeldinger
  );

  const virksomheterAsLedere = sykmeldingerWithoutLeder.map(sykmelding2Leder);

  return removeDuplicatesFromLederList(virksomheterAsLedere);
};

export const currentLedere = (ledere: Leder[]) => {
  return ledere.filter((leder) => {
    return leder.aktivTom === null;
  });
};

export const formerLedere = (ledere: Leder[]) => {
  return ledere.filter((leder) => {
    return leder.aktivTom !== null;
  });
};

const isLederEarlierThanGivenLeder = (givenLeder: Leder, leder: Leder) => {
  return new Date(leder.fomDato) < new Date(givenLeder.fomDato);
};

const ledereFromGivenLedersVirksomhet = (
  givenLeder: Leder,
  ledere: Leder[]
) => {
  return ledere.filter((leder) => {
    return leder.orgnummer === givenLeder.orgnummer;
  });
};

const laterLedereThanGivenLeder = (givenLeder: Leder, ledere: Leder[]) => {
  return ledere.filter((leder) => {
    return isLederEarlierThanGivenLeder(leder, givenLeder);
  });
};

const earliestLeder = (ledere: Leder[]) => {
  let currentEarliestLeder = undefined as Leder | undefined;
  ledere.forEach((possibleEarliestLeder) => {
    if (
      currentEarliestLeder === undefined ||
      isLederEarlierThanGivenLeder(currentEarliestLeder, possibleEarliestLeder)
    ) {
      currentEarliestLeder = possibleEarliestLeder;
    }
  });

  return currentEarliestLeder;
};

const findNextLeder = (currentLeder: Leder, ledere: Leder[]) => {
  const ledereFromCorrectVirksomhet = ledereFromGivenLedersVirksomhet(
    currentLeder,
    ledere
  );
  const laterLedere = laterLedereThanGivenLeder(
    currentLeder,
    ledereFromCorrectVirksomhet
  );

  return earliestLeder(laterLedere);
};

export const mapTomDateToEarlierLedere = (ledere: Leder[]) => {
  return ledere.map((leder) => {
    const nextLeder = findNextLeder(leder, ledere);

    if (nextLeder !== undefined) {
      return {
        ...leder,
        aktivTom: nextLeder.fomDato,
      };
    }
    return leder;
  });
};
