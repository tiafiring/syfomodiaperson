import { useState } from "react";

export const useFeilUtbedret = () => {
  const [feilUtbedret, setFeilUtbedret] = useState(false);
  const resetFeilUtbedret = () => setFeilUtbedret(false);
  const updateFeilUtbedret = (feil: { [key: string]: string }) => {
    if (
      Object.values(feil).filter((value) => value !== undefined).length === 0
    ) {
      setFeilUtbedret(true);
    }
  };
  return {
    feilUtbedret,
    resetFeilUtbedret,
    updateFeilUtbedret,
  };
};
