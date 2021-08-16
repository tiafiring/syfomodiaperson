import { useState } from "react";
import { harFeilmeldinger, SkjemaFeil } from "@/utils/valideringUtils";

export const useFeilUtbedret = () => {
  const [feilUtbedret, setFeilUtbedret] = useState(false);
  const resetFeilUtbedret = () => setFeilUtbedret(false);
  const updateFeilUtbedret = (feil: Partial<SkjemaFeil>) => {
    if (!harFeilmeldinger(feil)) {
      setFeilUtbedret(true);
    }
  };
  return {
    feilUtbedret,
    resetFeilUtbedret,
    updateFeilUtbedret,
  };
};
