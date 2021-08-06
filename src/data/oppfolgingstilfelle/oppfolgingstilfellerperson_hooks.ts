import { useAppSelector } from "../../hooks/hooks";
import { startDateFromLatestActiveTilfelle } from "../../utils/periodeUtils";

export const useStartDateFromLatestOppfolgingstilfellePeriode = ():
  | string
  | Date
  | null => {
  const oppfolgingstilfelleperioder = useAppSelector(
    (state) => state.oppfolgingstilfelleperioder
  );

  return (
    oppfolgingstilfelleperioder &&
    startDateFromLatestActiveTilfelle(oppfolgingstilfelleperioder)
  );
};
