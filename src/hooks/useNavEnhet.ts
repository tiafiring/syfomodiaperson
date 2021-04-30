import { useAppSelector } from "./hooks";

export const useNavEnhet = (): string =>
  useAppSelector((state) => state.enhet.valgtEnhet);
