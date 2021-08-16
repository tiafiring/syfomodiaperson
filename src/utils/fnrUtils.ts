import { KJOENN } from "@/konstanter";

export const hentBrukersFoedseldatoFraFnr = (fnr: string) => {
  const individSifre = Number(fnr.substring(6, 9));

  const dag = Number(fnr.substring(0, 2));
  const foedselsDag = dag > 40 ? dag - 40 : dag;

  const mnd = Number(fnr.substring(2, 4));
  const fodselsMnd = mnd > 40 ? mnd - 40 : mnd;

  const aar = Number(fnr.substring(4, 6));
  let arhundre;
  if (individSifre >= 0 && individSifre <= 499) {
    arhundre = 19;
  } else if (individSifre >= 500 && individSifre <= 749 && aar > 55) {
    arhundre = 18;
  } else if (individSifre >= 500 && individSifre <= 999 && aar <= 39) {
    arhundre = 20;
  } else if (individSifre >= 900 && individSifre <= 999 && aar >= 40) {
    arhundre = 19;
  } else {
    return undefined;
  }
  const fodselsAr = arhundre * 100 + aar;
  const fodselsdato = new Date();
  fodselsdato.setUTCDate(foedselsDag);
  fodselsdato.setUTCMonth(fodselsMnd - 1);
  fodselsdato.setUTCFullYear(fodselsAr);
  fodselsdato.setUTCHours(0, 0, 0, 0);
  return fodselsdato;
};

export const hentBrukersAlderFraFnr = (fnr: string) => {
  const dagensDato = new Date();
  const fodselsdato = hentBrukersFoedseldatoFraFnr(fnr);

  if (fodselsdato) {
    const fodselsDatoIAr = new Date(fodselsdato);
    fodselsDatoIAr.setFullYear(dagensDato.getFullYear());
    if (fodselsdato && dagensDato.getTime() < fodselsDatoIAr.getTime()) {
      return dagensDato.getFullYear() - fodselsdato.getFullYear() - 1;
    }
    return fodselsdato && dagensDato.getFullYear() - fodselsdato.getFullYear();
  }
  return null;
};

export const hentBrukersKjoennFraFnr = (fnr: string) => {
  const kjonnSiffer = Number(fnr.substring(8, 9));
  if (kjonnSiffer % 2 === 0) {
    return KJOENN.KVINNE;
  }
  return KJOENN.MANN;
};

export const formaterFnr = (fnr: string) => {
  return fnr ? fnr.replace(/(......)(.....)/g, "$1 $2") : null;
};
