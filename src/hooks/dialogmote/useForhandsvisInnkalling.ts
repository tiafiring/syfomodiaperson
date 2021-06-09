import { DialogmoteInnkallingSkjemaValues } from "../../components/dialogmote/innkalling/DialogmoteInnkallingSkjema";
import { DocumentComponentDto } from "../../data/dialogmote/types/dialogmoteTypes";
import { tilDatoMedUkedagOgManedNavnOgKlokkeslett } from "../../utils/datoUtils";
import { genererDato } from "../../components/mote/utils";
import { useNavBrukerData } from "../../data/navbruker/navbruker_hooks";
import { Brukerinfo } from "../../data/navbruker/types/Brukerinfo";
import { innkallingTexts } from "../../data/dialogmote/dialogmoteTexts";
import {
  createLink,
  createParagraph,
  createParagraphWithTitle,
} from "../../utils/documentComponentUtils";
import { useForhandsvisningHilsen } from "./useForhandsvisningHilsen";

export interface ForhandsvisInnkallingGenerator {
  arbeidstakerInnkalling(
    values: Partial<DialogmoteInnkallingSkjemaValues>
  ): DocumentComponentDto[];

  arbeidsgiverInnkalling(
    values: Partial<DialogmoteInnkallingSkjemaValues>
  ): DocumentComponentDto[];
}

export const useForhandsvisInnkalling = (): ForhandsvisInnkallingGenerator => {
  const navBruker = useNavBrukerData();
  const hilsen = useForhandsvisningHilsen();

  const arbeidstakerInnkalling = (
    values: Partial<DialogmoteInnkallingSkjemaValues>
  ) => {
    const documentComponents = [
      ...fellesInfo(values),
      ...arbeidstakerIntro(navBruker),
    ];
    if (values.fritekstArbeidstaker) {
      documentComponents.push(createParagraph(values.fritekstArbeidstaker));
    }
    documentComponents.push(...arbeidstakerOutro(), ...hilsen);

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
      documentComponents.push(createParagraph(values.fritekstArbeidsgiver));
    }
    documentComponents.push(
      ...arbeidsgiverOutro(),
      ...hilsen,
      createParagraph(
        innkallingTexts.arbeidsgiver.arbeidsgiverTlfLabel,
        innkallingTexts.arbeidsgiver.arbeidsgiverTlf
      )
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
    createParagraphWithTitle(
      innkallingTexts.moteTidTitle,
      dato && klokkeslett
        ? tilDatoMedUkedagOgManedNavnOgKlokkeslett(
            genererDato(dato, klokkeslett)
          )
        : ""
    ),
    createParagraphWithTitle(innkallingTexts.moteStedTitle, sted || ""),
  ];
  if (videoLink) {
    components.push(createLink(innkallingTexts.videoLinkTitle, videoLink));
  }
  return components;
};

const arbeidstakerIntro = (navBruker: Brukerinfo): DocumentComponentDto[] => {
  return [
    createParagraph(`Hei ${navBruker.navn}`),
    createParagraph(innkallingTexts.arbeidstaker.intro1),
    createParagraph(innkallingTexts.arbeidstaker.intro2),
  ];
};

const arbeidsgiverIntro = (navBruker: Brukerinfo): DocumentComponentDto[] => {
  return [
    createParagraph(
      `Gjelder ${navBruker.navn}, f.nr. ${navBruker.kontaktinfo.fnr}`
    ),
    createParagraph(innkallingTexts.arbeidsgiver.intro1),
    createParagraph(innkallingTexts.arbeidsgiver.intro2),
  ];
};

const arbeidstakerOutro = (): DocumentComponentDto[] => {
  return [
    createParagraph(innkallingTexts.arbeidstaker.outro1),
    createParagraphWithTitle(
      innkallingTexts.arbeidstaker.outro2Title,
      innkallingTexts.arbeidstaker.outro2Text
    ),
  ];
};

const arbeidsgiverOutro = (): DocumentComponentDto[] => {
  return [
    createParagraph(innkallingTexts.arbeidsgiver.outro1),
    createParagraph(innkallingTexts.arbeidsgiver.outro2),
  ];
};
