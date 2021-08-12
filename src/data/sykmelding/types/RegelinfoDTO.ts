import { BehandlingsutfallStatusDTO } from "./BehandlingsutfallStatusDTO";

export interface RegelinfoDTO {
  readonly messageForSender: string;
  readonly messageForUser: string;
  readonly ruleName: string;
  readonly ruleStatus: BehandlingsutfallStatusDTO;
}
