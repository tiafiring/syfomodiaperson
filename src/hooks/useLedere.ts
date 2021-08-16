import { useAppSelector } from "./hooks";
import { newestLederForEachVirksomhet } from "@/utils/ledereUtils";
import { Leder } from "@/data/leder/ledere";

export const useLedere = (): {
  currentLedere: Leder[];
  formerLedere: Leder[];
  henterLedere: boolean;
  hentingLedereFeilet: boolean;
  getCurrentNarmesteLeder: (virksomhetsnummer: string) => Leder | undefined;
  hentingLedereForsokt: boolean;
} => {
  const {
    formerLedere,
    henter,
    currentLedere,
    hentingForsokt: hentingLedereForsokt,
    hentingFeilet: hentingLedereFeilet,
  } = useAppSelector((state) => state.ledere);

  const getCurrentNarmesteLeder = (
    virksomhetsnummer: string
  ): Leder | undefined => {
    const newestLedere = newestLederForEachVirksomhet(currentLedere);
    return newestLedere.find((leder) => leder.orgnummer === virksomhetsnummer);
  };

  return {
    getCurrentNarmesteLeder,
    currentLedere,
    formerLedere,
    henterLedere: henter,
    hentingLedereForsokt,
    hentingLedereFeilet,
  };
};
