import { useAppSelector } from "../../hooks/hooks";

export const useIsDM2Enabled = () => {
  return useAppSelector((state) => state.unleash.dm2Enabled);
};
