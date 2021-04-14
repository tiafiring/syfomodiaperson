import { toDate } from "./datoUtils";
import {
  getSykmeldingStartdato,
  sykmeldingperioderSortertEldstTilNyest,
} from "./sykmeldinger/sykmeldingUtils";

const hentArbeidsgivernavn = (sykmelding) => {
  return sykmelding.mottakendeArbeidsgiver
    ? sykmelding.mottakendeArbeidsgiver.navn
    : sykmelding.arbeidsgiver
    ? sykmelding.arbeidsgiver
    : sykmelding.innsendtArbeidsgivernavn
    ? sykmelding.innsendtArbeidsgivernavn
    : "";
};

export const sorterSykmeldinger = (sykmeldinger = [], kriterium = "fom") => {
  return sykmeldinger
    .map((sykmelding) => {
      return sykmelding.mulighetForArbeid
        ? {
            ...sykmelding,
            mulighetForArbeid: {
              ...sykmelding.mulighetForArbeid,
              perioder: sykmeldingperioderSortertEldstTilNyest(
                sykmelding.mulighetForArbeid.perioder
              ),
            },
          }
        : {
            ...sykmelding,
            sykmeldingsperioder: sykmeldingperioderSortertEldstTilNyest(
              sykmelding.sykmeldingsperioder
            ),
          };
    })
    .sort((sykmeldingA, sykmeldingB) => {
      if (
        kriterium === "fom" ||
        hentArbeidsgivernavn(sykmeldingA).trim().toUpperCase() ===
          hentArbeidsgivernavn(sykmeldingB).toUpperCase()
      ) {
        if (
          toDate(getSykmeldingStartdato(sykmeldingA)).getTime() !==
          toDate(getSykmeldingStartdato(sykmeldingB)).getTime()
        ) {
          // Hvis a og b har ulik startdato, sorterer vi etter startdato
          return (
            toDate(getSykmeldingStartdato(sykmeldingB)) -
            toDate(getSykmeldingStartdato(sykmeldingA))
          );
        }
        const perioderA = sykmeldingA.mulighetForArbeid.perioder;
        const perioderB = sykmeldingB.mulighetForArbeid.perioder;
        const sistePeriodeB = perioderB[perioderB.length - 1];
        const sistePeriodeA = perioderA[perioderA.length - 1];
        return toDate(sistePeriodeB.tom) - toDate(sistePeriodeA.tom);
      }
      return Object.byString(sykmeldingA, kriterium) <
        Object.byString(sykmeldingB, kriterium)
        ? -1
        : 1;
    });
};
