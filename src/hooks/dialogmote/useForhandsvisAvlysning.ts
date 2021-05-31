import {
  DialogmoteDTO,
  DocumentComponentDto,
} from "../../data/dialogmote/dialogmoteTypes";
import { useBehandlendeEnhet } from "../../data/behandlendeenhet/behandlendeEnhet_hooks";
import { useVeilederinfo } from "../useVeilederinfo";
import { useNavBrukerData } from "../../data/navbruker/navbruker_hooks";
import { AvlysDialogmoteSkjemaValues } from "../../components/dialogmote/avlys/AvlysDialogmoteSkjema";
import { avlysningTexts } from "../../data/dialogmote/dialogmoteTexts";
import { tilDatoMedUkedagOgManedNavnOgKlokkeslett } from "../../utils/datoUtils";
import { createParagraph } from "../../utils/documentComponentUtils";

export interface ForhandsvisAvlysningGenerator {
  avlysningArbeidstaker(
    values: Partial<AvlysDialogmoteSkjemaValues>
  ): DocumentComponentDto[];

  avlysningArbeidsgiver(
    values: Partial<AvlysDialogmoteSkjemaValues>
  ): DocumentComponentDto[];
}

export const useForhandsvisAvlysning = (
  dialogmote: DialogmoteDTO
): ForhandsvisAvlysningGenerator => {
  const behandlendeEnhet = useBehandlendeEnhet();
  const { veilederinfo } = useVeilederinfo();
  const navBruker = useNavBrukerData();
  const gjelderText = createParagraph(
    `Gjelder ${navBruker.navn}, f.nr. ${navBruker.kontaktinfo.fnr}.`
  );
  const introText = createParagraph(
    `${avlysningTexts.intro1} ${tilDatoMedUkedagOgManedNavnOgKlokkeslett(
      dialogmote.tid
    )}. ${avlysningTexts.intro2}`
  );
  const hilsenText = createParagraph(
    avlysningTexts.hilsenText,
    behandlendeEnhet.navn,
    veilederinfo?.navn ?? ""
  );

  const avlysningArbeidstaker = (
    values: Partial<AvlysDialogmoteSkjemaValues>
  ): DocumentComponentDto[] => {
    const documentComponents = [gjelderText, introText];
    if (values.begrunnelseArbeidstaker) {
      documentComponents.push(createParagraph(values.begrunnelseArbeidstaker));
    }
    documentComponents.push(hilsenText);
    return documentComponents;
  };

  const avlysningArbeidsgiver = (
    values: Partial<AvlysDialogmoteSkjemaValues>
  ): DocumentComponentDto[] => {
    const documentComponents = [gjelderText, introText];
    if (values.begrunnelseArbeidsgiver) {
      documentComponents.push(createParagraph(values.begrunnelseArbeidsgiver));
    }
    documentComponents.push(hilsenText);
    return documentComponents;
  };

  return {
    avlysningArbeidstaker,
    avlysningArbeidsgiver,
  };
};
