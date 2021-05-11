import { useSelector } from "react-redux";
import { RootState } from "../rootState";
import { Brukerinfo } from "./types/Brukerinfo";

export const useNavBrukerData = (): Brukerinfo => {
  return useSelector((state: RootState) => state.navbruker.data);
};
