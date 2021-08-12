import { MedisinskArsakDTO } from "./MedisinskArsakDTO";
import { ArbeidsrelatertArsakDTO } from "./ArbeidsrelatertArsakDTO";

export interface AktivitetIkkeMuligDTO {
  readonly medisinskArsak?: MedisinskArsakDTO;
  readonly arbeidsrelatertArsak?: ArbeidsrelatertArsakDTO;
}
