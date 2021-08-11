import { ErIArbeidDTO } from "./ErIArbeidDTO";
import { ErIkkeIArbeidDTO } from "./ErIkkeIArbeidDTO";

export interface PrognoseDTO {
  readonly arbeidsforEtterPeriode: boolean;
  readonly hensynArbeidsplassen?: string;
  readonly erIArbeid?: ErIArbeidDTO;
  readonly erIkkeIArbeid?: ErIkkeIArbeidDTO;
}
