import { SporsmalDTO } from "./SporsmalDTO";
import { ArbeidsgiverStatusDTO } from "./ArbeidsgiverStatusDTO";

export interface SykmeldingStatusDTO {
  readonly statusEvent: string;
  readonly timestamp: string;
  readonly arbeidsgiver?: ArbeidsgiverStatusDTO;
  readonly sporsmalOgSvarListe: SporsmalDTO[];
}
