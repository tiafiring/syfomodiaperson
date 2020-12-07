import { erIdag } from "./datoUtils";

const oppfolgingsplanerValidNow = (oppfolgingsplaner: any[]) => {
  return oppfolgingsplaner.filter((plan) => {
    return (
      new Date(plan.godkjentPlan.gyldighetstidspunkt.tom) > new Date() &&
      plan.godkjentPlan.deltMedNAV
    );
  });
};

const oppfolgingsplanerLPSOpprettetIdag = (oppfolgingsplaner: any[]) => {
  return oppfolgingsplaner.filter((plan) => {
    return erIdag(plan.opprettet) && !plan.personoppgave;
  });
};

const planerSortedDescendingByDeltMedNAVTidspunkt = (
  oppfolgingsplaner: any[]
) => {
  return oppfolgingsplaner.sort((a, b) => {
    return (
      new Date(b.godkjentPlan.deltMedNAVTidspunkt).getTime() -
      new Date(a.godkjentPlan.deltMedNAVTidspunkt).getTime()
    );
  });
};

const virksomheterWithPlan = (oppfolgingsplaner: any[]) => {
  const uniqueVirksomheter = new Set(
    oppfolgingsplaner.map((plan) => {
      return plan.virksomhet
        ? plan.virksomhet.virksomhetsnummer
        : plan.virksomhetsnummer;
    })
  );

  return [...uniqueVirksomheter];
};

const firstPlanForEachVirksomhet = (
  oppfolgingsplaner: any[],
  virksomheter: any[]
) => {
  const newestPlanPerVirksomhet = [] as any[];

  virksomheter.forEach((nummer) => {
    const newestPlanForVirksomhetsnummer = oppfolgingsplaner.find((plan) => {
      return plan.virksomhet
        ? plan.virksomhet.virksomhetsnummer === nummer
        : plan.virksomhetsnummer === nummer;
    });
    newestPlanPerVirksomhet.push(newestPlanForVirksomhetsnummer);
  });

  return newestPlanPerVirksomhet;
};

const newestPlanForEachVirksomhet = (oppfolgingsplaner: any[]) => {
  const sortedPlaner = planerSortedDescendingByDeltMedNAVTidspunkt(
    oppfolgingsplaner
  );

  const virksomheter = virksomheterWithPlan(sortedPlaner);

  return firstPlanForEachVirksomhet(sortedPlaner, virksomheter);
};

export const activeOppfolgingsplaner = (oppfolgingsplaner: any[]) => {
  const newestPlans = newestPlanForEachVirksomhet(oppfolgingsplaner);
  return oppfolgingsplanerValidNow(newestPlans);
};

export const activeLPSOppfolgingsplaner = (oppfolgingsplaner: any[]) => {
  return oppfolgingsplanerLPSOpprettetIdag(oppfolgingsplaner);
};
