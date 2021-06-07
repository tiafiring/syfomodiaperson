import { useAppSelector } from "./hooks";

export const useLedere = () => {
  const {
    data: ledere,
    hentingForsokt: hentingLedereForsokt,
    hentingFeilet: hentingLedereFeilet,
  } = useAppSelector((state) => state.ledere);
  return {
    ledere,
    hentingLedereForsokt,
    hentingLedereFeilet,
  };
};
