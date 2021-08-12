import { SvarRestriksjonDTO } from "./SvarRestriksjonDTO";

export interface SporsmalSvarDTO {
  readonly sporsmal?: string;
  readonly svar: string;
  readonly restriksjoner: SvarRestriksjonDTO[];
}
