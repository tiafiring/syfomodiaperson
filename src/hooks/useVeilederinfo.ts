import { useAppSelector } from "./hooks";

export const useVeilederinfo = () => {
  const {
    data: veilederinfo,
    henter: henterVeilederinfo,
    hentingFeilet: hentingFeiletVeilederinfo,
  } = useAppSelector((state) => state.veilederinfo);
  return {
    veilederinfo,
    henterVeilederinfo,
    hentingFeiletVeilederinfo,
  };
};
