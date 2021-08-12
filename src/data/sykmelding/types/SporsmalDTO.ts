import { ShortNameDTO } from "./ShortNameDTO";
import { SvarDTO } from "./SvarDTO";

export interface SporsmalDTO {
  readonly tekst: string;
  readonly shortName: ShortNameDTO;
  readonly svar: SvarDTO;
}
