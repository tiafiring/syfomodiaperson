import { useAppSelector } from "@/hooks/hooks";
import { SykepengesoknadDTO } from "./types/SykepengesoknadDTO";

export const useSykepengeSoknader: () => {
  sykepengesoknader: SykepengesoknadDTO[];
  hentingFeiletSoknader: boolean;
  harForsoktHentetSoknader: boolean;
} = () => {
  const { data, hentingFeilet, hentet } = useAppSelector(
    (state) => state.soknader
  );
  return {
    sykepengesoknader: data,
    hentingFeiletSoknader: hentingFeilet,
    harForsoktHentetSoknader: hentet || hentingFeilet,
  };
};
