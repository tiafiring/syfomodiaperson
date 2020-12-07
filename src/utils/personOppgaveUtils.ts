import { PersonOppgave } from "../types/PersonOppgave";

export const isPersonOppgaveBehandlet = (personOppgave: PersonOppgave) => {
  return !!(personOppgave && personOppgave.behandletTidspunkt);
};
