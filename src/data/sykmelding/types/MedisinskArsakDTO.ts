import { MedisinskArsakTypeDTO } from "./MedisinskArsakTypeDTO";

export interface MedisinskArsakDTO {
  readonly beskrivelse?: string;
  readonly arsak: MedisinskArsakTypeDTO[];
}
