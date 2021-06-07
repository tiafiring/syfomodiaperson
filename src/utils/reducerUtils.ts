export const harForsoktHentetOppfoelgingsdialoger = (
  oppfoelgingsdialogerReducer: any
) => {
  return (
    oppfoelgingsdialogerReducer.hentet ||
    oppfoelgingsdialogerReducer.hentingFeilet
  );
};

export const harForsoktHentetSoknader = (soknaderReducer: any) => {
  return soknaderReducer.hentet || soknaderReducer.hentingFeilet;
};

export const harForsoktHentetSykmeldinger = (sykmeldingerReducer: any) => {
  return sykmeldingerReducer.hentet || sykmeldingerReducer.hentingFeilet;
};
