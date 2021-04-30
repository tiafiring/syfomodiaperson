import { useAppSelector } from "./hooks";

export const useLedere = () => {
  const {
    data: ledere,
    henter: henterLedere,
    hentingFeilet: hentingLedereFeilet,
  } = useAppSelector((state) => state.ledere);
  return {
    ledere,
    henterLedere,
    hentingLedereFeilet,
  };
};
