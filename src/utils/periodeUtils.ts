import { dagerMellomDatoer, isDate16DaysAgoOrLater, toDate } from "./datoUtils";
import { SykmeldingPeriodeDTO } from "../data/sykmelding/types/SykmeldingOldFormat";
import { OppfolgingstilfelleperioderMapState } from "../data/oppfolgingstilfelle/oppfolgingstilfelleperioder";

export type TilfellePeriode = { fom: string | Date; tom: string | Date };

export function sorterPerioderEldsteForst(
  perioder: SykmeldingPeriodeDTO[]
): SykmeldingPeriodeDTO[] {
  return perioder.sort((a, b) => {
    if (toDate(a.fom)?.getTime() !== toDate(b.fom)?.getTime()) {
      return (toDate(a.fom)?.getTime() ?? 0) - (toDate(b.fom)?.getTime() ?? 0);
    }
    return (toDate(a.tom)?.getTime() ?? 0) - (toDate(b.tom)?.getTime() ?? 0);
  });
}

export const tidligsteFom = (perioder: TilfellePeriode[]): string | Date => {
  return perioder
    .map((p) => {
      return p.fom;
    })
    .sort((p1, p2) => {
      if (p1 > p2) {
        return 1;
      } else if (p1 < p2) {
        return -1;
      }
      return 0;
    })[0];
};

export const senesteTom = (perioder: TilfellePeriode[]): string | Date => {
  return perioder
    .map((p) => {
      return p.tom;
    })
    .sort((p1, p2) => {
      if (p1 < p2) {
        return 1;
      } else if (p1 > p2) {
        return -1;
      }
      return 0;
    })[0];
};

export const periodeOverlapperMedPeriode = (
  periodeA_: TilfellePeriode,
  periodeB_: TilfellePeriode
): boolean => {
  const periodeA = periodeA_;
  const periodeB = periodeB_;
  try {
    const forstePeriode =
      new Date(periodeA.fom).getTime() < new Date(periodeB.fom).getTime()
        ? periodeA
        : periodeB;
    const andrePeriode =
      new Date(periodeA.fom).getTime() < new Date(periodeB.fom).getTime()
        ? periodeB
        : periodeA;
    return (
      new Date(forstePeriode.tom).getTime() >=
      new Date(andrePeriode.fom).getTime()
    );
  } catch (e) {
    return false;
  }
};

export const tilfellerFromTilfelleperioder = (
  oppfolgingstilfelleperioder: OppfolgingstilfelleperioderMapState
): TilfellePeriode[] => {
  return Object.keys(oppfolgingstilfelleperioder)
    .map((orgnummer) => {
      const perioder = oppfolgingstilfelleperioder[orgnummer].data;
      const fom = tidligsteFom(perioder);
      const tom = senesteTom(perioder);

      return { fom, tom };
    })
    .filter((element) => {
      return !!element.fom && !!element.tom;
    });
};

export const tilfellerNewestToOldest = (
  oppfolgingstilfeller: TilfellePeriode[]
): TilfellePeriode[] => {
  return oppfolgingstilfeller.sort((s1, s2) => {
    return new Date(s2.fom).getTime() - new Date(s1.fom).getTime();
  });
};

const latestTilfelle = (
  oppfolgingstilfeller: TilfellePeriode[]
): TilfellePeriode => {
  const sortedTilfeller = tilfellerNewestToOldest(oppfolgingstilfeller);
  return sortedTilfeller[0];
};

export const candidateTilfelleIsConnectedToTilfelle = (
  tilfelle: TilfellePeriode,
  candidateTilfelle: TilfellePeriode
): boolean => {
  const tilfelleStartDate = new Date(tilfelle.fom);
  const tilfelleEndDate = new Date(tilfelle.tom);
  const candidateStartDate = new Date(candidateTilfelle.fom);
  const candidateEndDate = new Date(candidateTilfelle.tom);

  const candidateStartBeforeTilfelleStart =
    candidateStartDate.getTime() - tilfelleStartDate.getTime() < 0;

  if (periodeOverlapperMedPeriode(tilfelle, candidateTilfelle)) {
    return true;
  }

  if (candidateStartBeforeTilfelleStart) {
    return dagerMellomDatoer(tilfelleStartDate, candidateEndDate) <= 16;
  }

  return dagerMellomDatoer(tilfelleEndDate, candidateStartDate) <= 16;
};

const tilfellerConnectedToGivenTilfelle = (
  tilfelle: TilfellePeriode,
  candidateTilfeller: TilfellePeriode[]
): TilfellePeriode[] => {
  return candidateTilfeller.filter((candidateTilfelle) =>
    candidateTilfelleIsConnectedToTilfelle(tilfelle, candidateTilfelle)
  );
};

export const startDateFromLatestActiveTilfelle = (
  oppfolgingstilfelleperioder: OppfolgingstilfelleperioderMapState
): string | Date | null => {
  const tilfeller = tilfellerFromTilfelleperioder(oppfolgingstilfelleperioder);

  if (tilfeller.length === 1) {
    return isDate16DaysAgoOrLater(senesteTom(tilfeller))
      ? tidligsteFom(tilfeller)
      : null;
  }

  const nyesteTilfelle = latestTilfelle(tilfeller);

  const tilfellerConnectedToNewestTilfelle = tilfellerConnectedToGivenTilfelle(
    nyesteTilfelle,
    tilfeller
  );
  const isActiveTilfelle = isDate16DaysAgoOrLater(
    senesteTom(tilfellerConnectedToNewestTilfelle)
  );

  return isActiveTilfelle
    ? tidligsteFom(tilfellerConnectedToNewestTilfelle)
    : null;
};
