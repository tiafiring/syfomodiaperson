import { OppfolgingsplanerState } from "@/data/oppfolgingsplan/oppfoelgingsdialoger";

export const harForsoktHentetOppfoelgingsdialoger = (
  oppfoelgingsdialogerReducer: OppfolgingsplanerState
): boolean => {
  return (
    oppfoelgingsdialogerReducer.hentet ||
    oppfoelgingsdialogerReducer.hentingFeilet
  );
};
