import { AnnenFraverGrunnDTO } from "./AnnenFraverGrunnDTO";

export interface AnnenFraversArsakDTO {
  readonly beskrivelse?: string;
  readonly grunn: AnnenFraverGrunnDTO[];
}
