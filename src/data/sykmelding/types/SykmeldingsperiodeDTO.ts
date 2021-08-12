import { GradertDTO } from "./GradertDTO";
import { PeriodetypeDTO } from "./PeriodetypeDTO";
import { AktivitetIkkeMuligDTO } from "./AktivitetIkkeMuligDTO";

export interface SykmeldingsperiodeDTO {
  readonly fom: string;
  readonly tom: string;
  readonly gradert?: GradertDTO;
  readonly behandlingsdager?: number;
  readonly innspillTilArbeidsgiver?: string;
  readonly type: PeriodetypeDTO;
  readonly aktivitetIkkeMulig?: AktivitetIkkeMuligDTO;
  readonly reisetilskudd: boolean;
}
