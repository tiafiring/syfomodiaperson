import { useSelector } from "react-redux";
import { RootState } from "../rootState";
import { Brukerinfo } from "./types/Brukerinfo";

export const useNavBrukerData = (): Brukerinfo & {
  brukerKanIkkeVarslesDigitalt: boolean;
  brukerKanVarslesDigitalt: boolean;
} => {
  const brukerinfo = useSelector((state: RootState) => state.navbruker.data);
  return {
    brukerKanIkkeVarslesDigitalt: brukerinfo.kontaktinfo.skalHaVarsel === false,
    brukerKanVarslesDigitalt: brukerinfo.kontaktinfo.skalHaVarsel === true,
    ...brukerinfo,
  };
};
