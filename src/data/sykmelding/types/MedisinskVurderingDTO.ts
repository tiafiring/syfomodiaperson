import { DiagnoseDTO } from "./DiagnoseDTO";
import { AnnenFraversArsakDTO } from "./AnnenFraversArsakDTO";

export interface MedisinskVurderingDTO {
  readonly hovedDiagnose?: DiagnoseDTO;
  readonly biDiagnoser: DiagnoseDTO[];
  readonly annenFraversArsak?: AnnenFraversArsakDTO;
  readonly svangerskap: boolean;
  readonly yrkesskade: boolean;
  readonly yrkesskadeDato?: string;
}
