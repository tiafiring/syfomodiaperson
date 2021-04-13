import { OppfolgingsplanerState } from "../data/oppfolgingsplan/oppfoelgingsdialoger";
import { useAppSelector } from "./hooks";

export const useOppfoelgingsDialoger = () => {
  const oppfolgingsplanerState: OppfolgingsplanerState = useAppSelector(
    (state) => state.oppfoelgingsdialoger
  );
  const aktiveDialoger = oppfolgingsplanerState.data.filter((dialog) => {
    return (
      dialog.status !== "AVBRUTT" &&
      new Date(dialog.godkjentPlan.gyldighetstidspunkt.tom) > new Date()
    );
  });
  return {
    aktiveDialoger,
    harForsoktHentetOppfoelgingsdialoger:
      oppfolgingsplanerState.hentet || oppfolgingsplanerState.hentingFeilet,
  };
};
