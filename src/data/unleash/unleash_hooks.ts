import { useAppSelector } from "@/hooks/hooks";

export const useDM2FeatureToggles: () => { isDm2Enabled: boolean } = () => {
  const toggles = useAppSelector((state) => state.unleash.toggles);
  return {
    isDm2Enabled: toggles["syfo.syfomodiaperson.dm2"],
  };
};
