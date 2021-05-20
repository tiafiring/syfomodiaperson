import { useState } from "react";
import { harFeilmeldinger } from "../utils/feilmeldingerUtils";

export const useFeilUtbedret = () => {
  const [feilUtbedret, setFeilUtbedret] = useState(false);
  const resetFeilUtbedret = () => setFeilUtbedret(false);
  const updateFeilUtbedret = (feil: { [key: string]: string }) => {
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
