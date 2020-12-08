import { NyttAlternativDTO } from "./NyttAlternativDTO";

export interface NyttMoteDTO {
  alternativer: NyttAlternativDTO[];
  fnr: string;
  orgnummer: string;
  epost: string;
  navEnhet: string;
}
