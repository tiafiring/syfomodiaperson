import { useMutation, useQueryClient } from "react-query";
import { ISDIALOGMOTE_ROOT } from "@/apiConstants";
import { NewDialogmoteReferatDTO } from "@/data/dialogmote/types/dialogmoteReferatTypes";
import { post } from "@/api/axios";
import { dialogmoterQueryKeys } from "@/data/dialogmote/dialogmoteQueryHooks";

export const useMellomlagreReferat = (fnr: string, dialogmoteUuid: string) => {
  const queryClient = useQueryClient();
  const path = `${ISDIALOGMOTE_ROOT}/dialogmote/${dialogmoteUuid}/mellomlagre`;
  const postMellomlagreReferat = (referat: NewDialogmoteReferatDTO) =>
    post(path, referat);

  return useMutation(postMellomlagreReferat, {
    onSettled: () =>
      queryClient.invalidateQueries(dialogmoterQueryKeys.dialogmoter(fnr), {
        refetchActive: false,
      }),
  });
};
