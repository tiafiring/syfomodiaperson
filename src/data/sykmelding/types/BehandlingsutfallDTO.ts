import { RegelinfoDTO } from "./RegelinfoDTO";
import { BehandlingsutfallStatusDTO } from "./BehandlingsutfallStatusDTO";

export interface BehandlingsutfallDTO {
  readonly ruleHits: RegelinfoDTO[];
  readonly status: BehandlingsutfallStatusDTO;
}
