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
    hentingFeilet,
    data,
    arbeidsgiverssykmeldinger,
  } = useAppSelector((state) => state.sykmeldinger);
  return {
    henterSykmeldinger: henter,
    hentetSykmeldinger: hentet,
    hentingSykmeldingerFeilet: hentingFeilet,
    harForsoktHentetSykmeldinger: hentet || hentingFeilet,
    sykmeldinger: data,
    arbeidsgiverssykmeldinger,
  };
};
