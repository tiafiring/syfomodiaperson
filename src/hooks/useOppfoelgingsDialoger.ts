import { OppfolgingsplanerState } from "@/data/oppfolgingsplan/oppfoelgingsdialoger";
import { useAppSelector } from "./hooks";

export const useOppfoelgingsDialoger = () => {
  const {
    data,
    hentet,
    hentingFeilet,
  }: OppfolgingsplanerState = useAppSelector(
    (state) => state.oppfoelgingsdialoger
  );
  const aktiveDialoger = data?.filter((dialog) => {
    return (
      dialog.status !== "AVBRUTT" &&
      new Date(dialog.godkjentPlan.gyldighetstidspunkt.tom) > new Date()
    );
  });
  return {
    oppfoelgingsdialogerHentingFeilet: hentingFeilet,
    oppfoelgingsdialoger: data,
    aktiveDialoger,
    harForsoktHentetOppfoelgingsdialoger: hentet || hentingFeilet,
  };
};
