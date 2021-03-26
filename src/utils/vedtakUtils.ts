import dayjs from "dayjs";
import { Utbetalingslinje, VedtakDTO } from "../data/vedtak/vedtak";

interface Dag {
  dato: string;
  beløp: number;
}

export enum VedtakFagomrade {
  SPREF = "SPREF",
  SP = "SP",
}

export const erHelg = (dato: Date) => {
  return dato.getDay() === 6 || dato.getDay() === 0;
};

export const estimertMaksdato = (vedtak: VedtakDTO) => {
  let slutt = dayjs(vedtak.vedtak.tom);
  let x = 0;
  while (x < vedtak.vedtak.gjenståendeSykedager) {
    slutt = slutt.add(1, "day");
    while (erHelg(slutt.toDate())) {
      slutt = slutt.add(1, "day");
    }
    x++;
  }
  return slutt.format("DD.MM.YYYY");
};

const utbetalingslinjerTilDager = (utbetalingslinjer: Utbetalingslinje[]) => {
  const dager: Dag[] = [];

  utbetalingslinjer.forEach((linje) => {
    let start = dayjs(linje.fom);
    const slutt = dayjs(linje.tom);

    while (start <= slutt) {
      if (!erHelg(start.toDate())) {
        dager.push({
          dato: start.toString(),
          beløp: linje.beløp,
        });
      }
      start = start.add(1, "day");
    }
  });

  return dager;
};

const refusjonUtbetalingsLinjer = (
  vedtak: VedtakDTO,
  fagomrade: VedtakFagomrade
) => {
  return vedtak.vedtak.utbetalinger
    .filter((v) => v.fagområde === fagomrade)
    .flatMap((v) => v.utbetalingslinjer);
};

const dagerInnenforPeriode = (dager: Dag[], vedtak: VedtakDTO) => {
  const min = dayjs(vedtak.vedtak.fom).toDate();
  const max = dayjs(vedtak.vedtak.tom).toDate();
  return dager.filter((dag) => {
    const dato = dayjs(dag.dato).toDate();
    return dato >= min && dato <= max;
  });
};

export const refusjonsdagerInnenforVedtakPeriode = (
  vedtak: VedtakDTO,
  vedtakFagomrade: VedtakFagomrade
) => {
  const refusjoner = refusjonUtbetalingsLinjer(vedtak, vedtakFagomrade);
  const refusjonsdager = utbetalingslinjerTilDager(refusjoner);
  return dagerInnenforPeriode(refusjonsdager, vedtak);
};

export const refusjonTilUtbetalingsdager = (
  vedtakFagomrade: VedtakFagomrade,
  vedtak?: VedtakDTO
) => {
  if (!vedtak) return 0;

  return refusjonsdagerInnenforVedtakPeriode(vedtak, vedtakFagomrade).length;
};

export const refusjonTilUtbetalingsbelopBrutto = (
  vedtakFagomrade: VedtakFagomrade,
  vedtak?: VedtakDTO
) => {
  if (!vedtak) return 0;

  return (
    refusjonsdagerInnenforVedtakPeriode(vedtak, vedtakFagomrade).reduce(
      (a, b) => a + b.beløp,
      0
    ) || 0
  );
};

export const groupVedtakByOrgnr = (vedtak: VedtakDTO[]): VedtakDTO[][] => {
  const orgMap = vedtak.reduce(
    (acc: Map<string, VedtakDTO[]>, currentValue: VedtakDTO) => {
      const orgnr = currentValue.vedtak.organisasjonsnummer;

      if (!acc.has(orgnr)) {
        acc.set(orgnr, [currentValue]);
        return acc;
      }

      const listOfVedtak = acc.get(orgnr);

      if (listOfVedtak !== undefined) {
        acc.set(orgnr, [...listOfVedtak, currentValue]);
      }

      return acc;
    },
    new Map<string, VedtakDTO[]>()
  );

  return [...orgMap.values()];
};
