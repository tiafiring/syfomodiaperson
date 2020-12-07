import { senesteTom, tidligsteFom } from "./periodeUtils";
import {
  erOppfoelgingsdatoPassertMed16UkerOgIkke26Uker,
  erOppfolgingstilfelleSluttDatoPassert,
  harArbeidstakerSvartPaaMotebehov,
} from "./motebehovUtils";
import { activeSykmeldingerSentToArbeidsgiver } from "./sykmeldinger/sykmeldingUtils";

export const ledereIVirksomheterMedMotebehovsvarFraArbeidstaker = (
  ledereData: any,
  motebehovData: any
) => {
  return ledereData.filter((leder: any) => {
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
  ledereListe: any[],
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
  ledereData: any,
  oppfolgingstilfelleperioder: any
) => {
  return ledereData.filter((leder: any) => {
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

const isNewerLeader = (ledere: any[], givenLeder: any) => {
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

const newestLederForEachVirksomhet = (ledere: any[]) => {
  return ledere.filter((leder) => {
    return !isNewerLeader(ledere, leder);
  });
};

export const ledereUtenMotebehovsvar = (
  ledereData: any,
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

export const lederHasActiveSykmelding = (leder: any, sykmeldinger: any[]) => {
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
  ledereData: any,
  sykmeldinger: any[]
) => {
  return ledereData.sort((leder1: any, leder2: any) => {
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
  ledere: any[],
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

const sykmelding2Leder = (sykmelding: any) => {
  return {
    erOppgitt: false,
    orgnummer: sykmelding.mottakendeArbeidsgiver.virksomhetsnummer,
    organisasjonsnavn: sykmelding.mottakendeArbeidsgiver.navn,
  };
};

const removeDuplicatesFromLederList = (ledere: any[]) => {
  return ledere.filter((leder, index) => {
    return (
      ledere.findIndex((leder2) => {
        return leder2.orgnummer === leder.orgnummer;
      }) === index
    );
  });
};

export const virksomheterWithoutLeder = (
  ledere: any[],
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

export const currentLedere = (ledere: any[]) => {
  return ledere.filter((leder) => {
    return leder.aktivTom === null;
  });
};

export const formerLedere = (ledere: any[]) => {
  return ledere.filter((leder) => {
    return leder.aktivTom !== null;
  });
};

const isLederEarlierThanGivenLeder = (givenLeder: any, leder: any) => {
  return new Date(leder.fomDato) < new Date(givenLeder.fomDato);
};

const ledereFromGivenLedersVirksomhet = (givenLeder: any, ledere: any[]) => {
  return ledere.filter((leder) => {
    return leder.orgnummer === givenLeder.orgnummer;
  });
};

const laterLedereThanGivenLeder = (givenLeder: any, ledere: any[]) => {
  return ledere.filter((leder) => {
    return isLederEarlierThanGivenLeder(leder, givenLeder);
  });
};

const earliestLeder = (ledere: any[]) => {
  let currentEarliestLeder = null as any;
  ledere.forEach((possibleEarliestLeder) => {
    if (
      currentEarliestLeder === null ||
      isLederEarlierThanGivenLeder(currentEarliestLeder, possibleEarliestLeder)
    ) {
      currentEarliestLeder = possibleEarliestLeder;
    }
  });

  return currentEarliestLeder;
};

const findNextLeder = (currentLeder: any, ledere: any[]) => {
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

export const mapTomDateToEarlierLedere = (ledere: any[]) => {
  return ledere.map((leder) => {
    const nextLeder = findNextLeder(leder, ledere);

    if (nextLeder !== null) {
      return {
        ...leder,
        aktivTom: nextLeder.fomDato,
      };
    }
    return leder;
  });
};
