import { useAppSelector } from "../../hooks/hooks";
import { BehandlendeEnhet } from "./types/BehandlendeEnhet";

export const useBehandlendeEnhet = (): BehandlendeEnhet =>
  useAppSelector((state) => state.behandlendeEnhet.data);
