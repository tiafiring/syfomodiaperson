import { useParams } from "react-router-dom";

export const useFnrParam = () => {
  const { fnr } = useParams<{ fnr: string }>();
  return fnr;
};
