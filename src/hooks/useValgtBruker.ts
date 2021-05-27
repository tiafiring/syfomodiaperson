import { useAppSelector } from "./hooks";

export const useValgtPersonident = (): string => {
  return useAppSelector((state) => state.valgtbruker.personident);
};
