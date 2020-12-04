import { PersonOppgave } from "./PersonOppgave";

export interface OppfolgingsplanLPS {
  uuid: string;
  fnr: string;
  virksomhetsnummer: string;
  virksomhetsnavn: string;
  personoppgave: PersonOppgave;
  opprettet: Date;
  sistEndret: Date;
}
