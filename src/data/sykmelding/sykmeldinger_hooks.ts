import { useAppSelector } from "../../hooks/hooks";
import { SykmeldingOldFormat } from "./types/SykmeldingOldFormat";

export const useSykmeldingerData = (): SykmeldingOldFormat[] => {
  const sykmeldingerState = useAppSelector((state) => state.sykmeldinger);
  return sykmeldingerState.data;
};
