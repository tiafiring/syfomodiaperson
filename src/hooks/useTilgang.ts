import { useAppSelector } from "./hooks";

export const useTilgang = () => {
  const {
    henter: henterTilgang,
    hentingFeilet: hentingTilgangFeilet,
    hentet: hentetTilgang,
    data: tilgang,
  } = useAppSelector((state) => state.tilgang);
  return {
    tilgang,
    henterTilgang,
    hentetTilgang,
    hentingTilgangFeilet,
  };
};
