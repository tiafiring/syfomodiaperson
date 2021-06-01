import { useBehandlendeEnhet } from "../../data/behandlendeenhet/behandlendeEnhet_hooks";
import { useVeilederinfo } from "../useVeilederinfo";
import { createParagraph } from "../../utils/documentComponentUtils";
import { commonTexts } from "../../data/dialogmote/dialogmoteTexts";
import { DocumentComponentDto } from "../../data/dialogmote/dialogmoteTypes";
import { VeilederinfoDTO } from "../../data/veilederinfo/types/VeilederinfoDTO";

export const useForhandsvisningHilsen = () => {
  const behandlendeEnhet = useBehandlendeEnhet();
  const { veilederinfo } = useVeilederinfo();
  const enhetParagraph = createParagraph(
    commonTexts.hilsen,
    behandlendeEnhet.navn
  );
  const hilsen = [enhetParagraph];
  const hilsenMedKontaktinfo = [enhetParagraph];
  if (veilederinfo) {
    hilsen.push(veilederParagraph(veilederinfo));
    hilsenMedKontaktinfo.push(veilederParagraph(veilederinfo, true));
  }
  return {
    hilsen,
    hilsenMedKontaktinfo,
  };
};

const veilederParagraph = (
  veilederinfo: VeilederinfoDTO,
  medKontaktinfo = false
): DocumentComponentDto => {
  return medKontaktinfo
    ? createParagraph(
        veilederinfo.navn,
        veilederinfo.epost,
        veilederinfo.telefonnummer ?? ""
      )
    : createParagraph(veilederinfo.navn);
};
