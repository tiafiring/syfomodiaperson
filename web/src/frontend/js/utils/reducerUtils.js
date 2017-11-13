export const henterEllerHarHentetDiskresjonskode = (diskresjonskode) => {
    return diskresjonskode.henter || diskresjonskode.hentet;
};
export const henterEllerHarHentetEgenansatt = (egenansatt) => {
    return egenansatt.henter || egenansatt.hentet;
};
export const henterEllerHarHentetFastleger = (fastleger) => {
    return fastleger.henter || fastleger.hentet;
};
