import { useBehandlendeEnhet } from "../../data/behandlendeenhet/behandlendeEnhet_hooks";
import { useVeilederinfo } from "../useVeilederinfo";
import { createParagraph } from "../../utils/documentComponentUtils";
import { commonTexts } from "../../data/dialogmote/dialogmoteTexts";
import { DocumentComponentDto } from "../../data/dialogmote/types/dialogmoteTypes";

export const useForhandsvisningHilsen = (): DocumentComponentDto[] => {
  const behandlendeEnhet = useBehandlendeEnhet();
  const { veilederinfo } = useVeilederinfo();
  const hilsen = [createParagraph(commonTexts.hilsen, behandlendeEnhet.navn)];
  if (veilederinfo) {
    hilsen.push(createParagraph(veilederinfo.navn));
  }
  return hilsen;
};
