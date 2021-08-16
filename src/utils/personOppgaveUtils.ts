import { PersonOppgave } from "@/data/personoppgave/types/PersonOppgave";

export const isPersonOppgaveBehandlet = (personOppgave: PersonOppgave) => {
  return !!(personOppgave && personOppgave.behandletTidspunkt);
};
