import { useAppSelector } from "@/hooks/hooks";
import { MoteDTO } from "./types/moteTypes";

export const useAktivtMoteplanleggerMote = (): MoteDTO | undefined => {
  const moterState = useAppSelector((state) => state.moter);
  return moterState.data.find((mote) => mote.status !== "AVBRUTT");
};
