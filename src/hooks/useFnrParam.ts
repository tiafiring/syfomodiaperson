import { useParams } from "react-router-dom";

export const useFnrParam = (): string => {
  const { fnr } = useParams<{ fnr: string }>();
  return fnr;
};
