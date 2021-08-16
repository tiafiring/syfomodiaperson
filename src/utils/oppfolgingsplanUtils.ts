import { OppfolgingsplanLPS } from "@/data/oppfolgingsplan/types/OppfolgingsplanLPS";
import { OppfolgingstilfelleperioderMapState } from "@/data/oppfolgingstilfelle/oppfolgingstilfelleperioder";
import { startDateFromLatestActiveTilfelle } from "./periodeUtils";

const newestLpsPlanPerVirksomhet = (lpsplaner: OppfolgingsplanLPS[]) => {
  return lpsplaner.filter((plan) => {
    return (
      lpsplaner.findIndex((plan2) => {
        return (
          plan2.virksomhetsnummer === plan.virksomhetsnummer &&
          plan2.uuid !== plan.uuid &&
          new Date(plan2.opprettet) > new Date(plan.opprettet)
        );
      }) < 0
    );
  });
};

const lpsPlanerWithinActiveTilfelle = (
  lpsplaner: OppfolgingsplanLPS[],
  oppfolgingstilfelleperioderMapState: OppfolgingstilfelleperioderMapState
) => {
  const startDateNewestActiveTilfelle = startDateFromLatestActiveTilfelle(
    oppfolgingstilfelleperioderMapState
  );

  if (startDateNewestActiveTilfelle === null) {
    return [];
  }

  return lpsplaner.filter((plan) => {
    return new Date(plan.opprettet) > new Date(startDateNewestActiveTilfelle);
  });
};

export const lpsPlanerWithActiveTilfelle = (
  lpsplaner: OppfolgingsplanLPS[],
  oppfolgingstilfelleperioderMapState: OppfolgingstilfelleperioderMapState
) => {
  const newestPlanPerVirksomhet = newestLpsPlanPerVirksomhet(lpsplaner);

  return lpsPlanerWithinActiveTilfelle(
    newestPlanPerVirksomhet,
    oppfolgingstilfelleperioderMapState
  );
};
