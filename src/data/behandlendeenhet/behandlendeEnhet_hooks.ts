import { useAppSelector } from "../../hooks/hooks";
import { BehandlendeEnhetState } from "./behandlendeEnhet";

export const useBehandlendeEnhet = (): BehandlendeEnhetState => {
  return useAppSelector((state) => state.behandlendeEnhet);
};
