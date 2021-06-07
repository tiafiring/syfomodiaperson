import { useSelector } from "react-redux";
import { RootState } from "../rootState";
import { SykepengesoknaderState } from "./soknader";

export const useSoknaderState = (): SykepengesoknaderState => {
  return useSelector((state: RootState) => state.soknader);
};
