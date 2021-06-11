import { useSelector } from "react-redux";
import { RootState } from "../rootState";

export const useIsStopped = (): boolean => {
  const flaggperson = useSelector((state: RootState) => state.flaggperson);

  return (
    flaggperson.endret && !flaggperson.endrer && !flaggperson.endringFeilet
  );
};

export const useHasServerErrors = (): boolean => {
  const flaggperson = useSelector((state: RootState) => state.flaggperson);

  return (
    !flaggperson.endret && !flaggperson.endrer && flaggperson.endringFeilet
  );
};

export const useEndrerFlaggperson = (): boolean => {
  return useSelector((state: RootState) => state.flaggperson.endrer);
};
