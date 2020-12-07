export const harForsoktHentetMotebehov = (motebehovReducer: any) => {
  return (
    motebehovReducer.hentet ||
    motebehovReducer.hentingFeilet ||
    (motebehovReducer.tilgang &&
      motebehovReducer.tilgang.harTilgang !== undefined)
  );
};

export const harForsoktHentetLedere = (ledereReducer: any) => {
  return ledereReducer.hentet || ledereReducer.hentingFeilet;
};

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
