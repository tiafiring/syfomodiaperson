import { useAppSelector } from "@/hooks/hooks";
import { ToggleNames } from "@/data/unleash/unleash_types";

export const useDM2FeatureToggles: () => {
  isDm2Enabled: boolean;
  isDm2FysiskBrevEnabled: boolean;
} = () => {
  const toggles = useAppSelector((state) => state.unleash.toggles);
  return {
    isDm2Enabled: toggles[ToggleNames.dm2],
    isDm2FysiskBrevEnabled: toggles[ToggleNames.dm2VarselFysiskBrev],
  };
};
