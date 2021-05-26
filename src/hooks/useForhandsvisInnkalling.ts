import { DialogmoteInnkallingSkjemaValues } from "../components/dialogmote/innkalling/DialogmoteInnkallingSkjema";
import {
  DocumentComponentDto,
  DocumentComponentType,
} from "../data/dialogmote/dialogmoteTypes";
import { tilDatoMedUkedagOgManedNavnOgKlokkeslett } from "../utils/datoUtils";
import { genererDato } from "../components/mote/utils";
import { useBehandlendeEnhet } from "../data/behandlendeenhet/behandlendeEnhet_hooks";
import { useVeilederinfo } from "./useVeilederinfo";
import { useNavBrukerData } from "../data/navbruker/navbruker_hooks";
import { Brukerinfo } from "../data/navbruker/types/Brukerinfo";
import { BehandlendeEnhet } from "../data/behandlendeenhet/types/BehandlendeEnhet";
import { VeilederinfoDTO } from "../data/veilederinfo/types/VeilederinfoDTO";
import { innkallingTexts } from "../data/dialogmote/dialogmoteTexts";

export interface ForhandsvisInnkallingGenerator {
  arbeidstakerInnkalling(
    values: Partial<DialogmoteInnkallingSkjemaValues>
  ): DocumentComponentDto[];

  arbeidsgiverInnkalling(
    values: Partial<DialogmoteInnkallingSkjemaValues>
  ): DocumentComponentDto[];
}

export const useForhandsvisInnkalling = (): ForhandsvisInnkallingGenerator => {
  const behandlendeEnhet = useBehandlendeEnhet();
  const { veilederinfo } = useVeilederinfo();
  const navBruker = useNavBrukerData();

  const arbeidstakerInnkalling = (
    values: Partial<DialogmoteInnkallingSkjemaValues>
  ) => {
    const documentComponents = [
      ...fellesInfo(values),
      ...arbeidstakerIntro(navBruker),
    ];
    if (values.fritekstArbeidstaker) {
      documentComponents.push(paragraph(values.fritekstArbeidstaker));
    }
    documentComponents.push(
      ...arbeidstakerOutro(behandlendeEnhet, veilederinfo)
    );

    return documentComponents;
  };

  const arbeidsgiverInnkalling = (
    values: Partial<DialogmoteInnkallingSkjemaValues>
  ) => {
    const documentComponents = [
      ...fellesInfo(values),
      ...arbeidsgiverIntro(navBruker),
    ];
    if (values.fritekstArbeidsgiver) {
      documentComponents.push(paragraph(values.fritekstArbeidsgiver));
    }
    documentComponents.push(
      ...arbeidsgiverOutro(behandlendeEnhet, veilederinfo)
    );

    return documentComponents;
  };

  return {
    arbeidstakerInnkalling,
    arbeidsgiverInnkalling,
  };
};

const fellesInfo = (
  values: Partial<DialogmoteInnkallingSkjemaValues>
): DocumentComponentDto[] => {
  const { dato, klokkeslett, sted, videoLink } = values;
  const components = [
    paragraphWithTitle(
      innkallingTexts.moteTidTitle,
      dato && klokkeslett
        ? tilDatoMedUkedagOgManedNavnOgKlokkeslett(
            genererDato(dato, klokkeslett)
          )
        : ""
    ),
    paragraphWithTitle(innkallingTexts.moteStedTitle, sted || ""),
  ];
  if (videoLink) {
    components.push(link(innkallingTexts.videoLinkTitle, videoLink));
  }
  return components;
};

const arbeidstakerIntro = (navBruker: Brukerinfo): DocumentComponentDto[] => {
  return [
    paragraph(`Hei ${navBruker.navn}`),
    paragraph(innkallingTexts.arbeidstaker.intro1),
    paragraph(innkallingTexts.arbeidstaker.intro2),
  ];
};

const arbeidsgiverIntro = (navBruker: Brukerinfo): DocumentComponentDto[] => {
  return [
    paragraph(`Gjelder ${navBruker.navn}, f.nr. ${navBruker.kontaktinfo.fnr}`),
    paragraph(innkallingTexts.arbeidsgiver.intro1),
    paragraph(innkallingTexts.arbeidsgiver.intro2),
  ];
};

const arbeidstakerOutro = (
  behandlendeEnhet: BehandlendeEnhet,
  veilederinfo?: VeilederinfoDTO
): DocumentComponentDto[] => {
  return [
    paragraph(innkallingTexts.arbeidstaker.outro1),
    paragraphWithTitle(
      innkallingTexts.foerMoteTitle,
      innkallingTexts.foerMoteText
    ),
    paragraph(innkallingTexts.hilsenText, behandlendeEnhet.navn),
    paragraph(veilederinfo?.navn ?? ""),
  ];
};

const arbeidsgiverOutro = (
  behandlendeEnhet: BehandlendeEnhet,
  veilederinfo?: VeilederinfoDTO
): DocumentComponentDto[] => {
  return [
    paragraph(innkallingTexts.arbeidsgiver.outro1),
    paragraph(innkallingTexts.arbeidsgiver.outro2),
    paragraph(innkallingTexts.arbeidsgiver.outro3),
    paragraphWithTitle(
      innkallingTexts.foerMoteTitle,
      innkallingTexts.foerMoteText
    ),
    paragraph(innkallingTexts.hilsenText, behandlendeEnhet.navn),
    paragraph(
      veilederinfo?.navn ?? "",
      veilederinfo?.epost ?? "",
      veilederinfo?.telefonnummer ?? ""
    ),
  ];
};

const link = (title: string, text: string): DocumentComponentDto => ({
  type: DocumentComponentType.LINK,
  title,
  texts: [text],
});
const paragraphWithTitle = (
  title: string,
  ...texts: string[]
): DocumentComponentDto => ({
  type: DocumentComponentType.PARAGRAPH,
  title,
  texts,
});
const paragraph = (...texts: string[]): DocumentComponentDto => ({
  type: DocumentComponentType.PARAGRAPH,
  texts,
});
