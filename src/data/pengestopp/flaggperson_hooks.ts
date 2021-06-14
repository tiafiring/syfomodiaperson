import { useSelector } from "react-redux";
import { RootState } from "../rootState";

export interface FlaggpersonMeta {
  isStopped: boolean;
  hasServerErrors: boolean;
  endrerFlaggperson: boolean;
}

export const useFlaggperson = (): FlaggpersonMeta => {
  const flaggperson = useSelector((state: RootState) => state.flaggperson);
  const isStopped =
    flaggperson.endret && !flaggperson.endrer && !flaggperson.endringFeilet;
  const hasServerErrors =
    !flaggperson.endret && !flaggperson.endrer && flaggperson.endringFeilet;
  const endrerFlaggperson = flaggperson.endrer;

  return {
    isStopped: isStopped,
    hasServerErrors: hasServerErrors,
    endrerFlaggperson: endrerFlaggperson,
  };
};
