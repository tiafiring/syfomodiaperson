import { useAppSelector } from "../../hooks/hooks";
import { SykmeldingOldFormat } from "./types/SykmeldingOldFormat";

export const useSykmeldinger: () => {
  harForsoktHentetSykmeldinger: boolean;
  henterSykmeldinger: boolean;
  hentetSykmeldinger: boolean;
  sykmeldinger: SykmeldingOldFormat[];
  arbeidsgiverssykmeldinger: SykmeldingOldFormat[];
  hentingSykmeldingerFeilet: boolean;
} = () => {
  const {
    henter,
    hentet,
    error,
    data,
    arbeidsgiverssykmeldinger,
  } = useAppSelector((state) => state.sykmeldinger);
  return {
    henterSykmeldinger: henter,
    hentetSykmeldinger: hentet,
    hentingSykmeldingerFeilet: !!error,
    harForsoktHentetSykmeldinger: hentet || !!error,
    sykmeldinger: data,
    arbeidsgiverssykmeldinger,
  };
};
