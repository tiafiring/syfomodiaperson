import { BRUKER, MULIGE_SVAR } from "../konstanter";

export const brukerHarSvart = (svartidspunkt: any, created: any) => {
  if (!svartidspunkt) {
    return false;
  }
  return new Date(svartidspunkt) > new Date(created);
};

export const getSvar = (deltakerSvar: any, svartidspunkt: any) => {
  const { valgt, created } = deltakerSvar;
  if (!brukerHarSvart(svartidspunkt, created)) {
    return MULIGE_SVAR.IKKE_SVART;
  }
  return valgt ? MULIGE_SVAR.PASSER : MULIGE_SVAR.PASSER_IKKE;
};

export const getTidligereAlternativer = (mote: any, deltakertype = BRUKER) => {
  const innloggetBruker = mote.deltakere.filter((deltaker: any) => {
    return deltaker.type === deltakertype;
  })[0];
  return mote.alternativer.filter((alternativ: any) => {
    return alternativ.created < innloggetBruker.svartidspunkt;
  });
};
