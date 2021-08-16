import { useAppSelector } from "@/hooks/hooks";
import { HistorikkEvent } from "./types/historikkTypes";

export const useHistorikk: () => {
  skalHenteMotebehov: boolean;
  skalHenteOppfoelgingsdialoger: boolean;
  hentingHistorikkFeilet: boolean;
  skalHenteMoter: boolean;
  moteHistorikk: HistorikkEvent[];
  oppfoelgingsdialogHistorikk: HistorikkEvent[];
  motebehovHistorikk: HistorikkEvent[];
  henterHistorikk: boolean;
  hentetHistorikk: boolean;
} = () => {
  const {
    henterMoter,
    henterMotebehov,
    henterOppfoelgingsdialoger,
    hentetMoter,
    hentetMotebehov,
    hentetOppfoelgingsdialoger,
    hentingMoterFeilet,
    hentingMotebehovFeilet,
    hentingOppfoelgingdialogerFeilet,
    moteHistorikk,
    motebehovHistorikk,
    oppfoelgingsdialogHistorikk,
  } = useAppSelector((state) => state.historikk);
  const henterHistorikk =
    henterOppfoelgingsdialoger || henterMotebehov || henterMoter;
  const hentetHistorikk =
    hentetMoter && hentetMotebehov && hentetOppfoelgingsdialoger;
  const skalHenteMoter = !(henterMoter || hentetMoter || hentingMoterFeilet);
  const skalHenteMotebehov = !(
    henterMotebehov ||
    hentetMotebehov ||
    hentingMotebehovFeilet
  );
  const skalHenteOppfoelgingsdialoger = !(
    henterOppfoelgingsdialoger ||
    hentetOppfoelgingsdialoger ||
    hentingOppfoelgingdialogerFeilet
  );
  return {
    henterHistorikk,
    hentetHistorikk,
    skalHenteMoter,
    skalHenteMotebehov,
    skalHenteOppfoelgingsdialoger,
    hentingHistorikkFeilet:
      hentingMoterFeilet ||
      hentingMotebehovFeilet ||
      hentingOppfoelgingdialogerFeilet,
    moteHistorikk,
    motebehovHistorikk,
    oppfoelgingsdialogHistorikk,
  };
};
