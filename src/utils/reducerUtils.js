export const harForsoktHentetMotebehov = (motebehovReducer) => {
    return motebehovReducer.hentet || motebehovReducer.hentingFeilet || (motebehovReducer.tilgang && motebehovReducer.tilgang.harTilgang !== undefined);
};

export const harForsoktHentetLedetekster = (ledeteksterReducer) => {
    return ledeteksterReducer.hentet || ledeteksterReducer.hentingFeilet;
};

export const harForsoktHentetLedere = (ledereReducer) => {
    return ledereReducer.hentet || ledereReducer.hentingFeilet;
};

export const harForsoktHentetOppfoelgingsdialoger = (oppfoelgingsdialogerReducer) => {
    return oppfoelgingsdialogerReducer.hentet || oppfoelgingsdialogerReducer.hentingFeilet;
};

export const ikkeHenterEllerForsoktHentetOppfoelgingsdialoger = (oppfoelgingsdialogerReducer) => {
    return !(oppfoelgingsdialogerReducer.henter || harForsoktHentetOppfoelgingsdialoger(oppfoelgingsdialogerReducer));
};

export const harForsoktHentetSykmeldinger = (sykmeldingerReducer) => {
    return sykmeldingerReducer.hentet || sykmeldingerReducer.hentingFeilet;
};

export const ikkeHenterEllerForsoktHentetSykmeldinger = (sykmeldingerReducer) => {
    return !(sykmeldingerReducer.henter || harForsoktHentetSykmeldinger(sykmeldingerReducer));
};
