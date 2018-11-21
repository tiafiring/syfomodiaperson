export const henterEllerHarHentetDiskresjonskode = (diskresjonskode) => {
    return diskresjonskode.henter || diskresjonskode.hentet;
};
export const henterEllerHarHentetEgenansatt = (egenansatt) => {
    return egenansatt.henter || egenansatt.hentet;
};
export const henterEllerHarHentetFastleger = (fastleger) => {
    return fastleger.henter || fastleger.hentet;
};
export const henterEllerHarHentetSykeforloep = (sykeforloep) => {
    return sykeforloep.henter || sykeforloep.hentet;
};

export const harForsoktHentetMotebehov = (motebehovReducer) => {
    return motebehovReducer.hentet || motebehovReducer.hentingFeilet;
};

export const ikkeHenterEllerForsoktHentetMotebehov = (motebehovReducer) => {
    return !(motebehovReducer.henter || harForsoktHentetMotebehov(motebehovReducer));
};

export const harForsoktHentetLedetekster = (ledeteksterReducer) => {
    return ledeteksterReducer.hentet || ledeteksterReducer.hentingFeilet;
};
