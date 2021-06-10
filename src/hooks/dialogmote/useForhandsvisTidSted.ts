import { EndreTidStedSkjemaValues } from "../../components/dialogmote/endre/EndreDialogmoteSkjema";
import { useNavBrukerData } from "../../data/navbruker/navbruker_hooks";
import {
  createLink,
  createParagraph,
  createParagraphWithTitle,
} from "../../utils/documentComponentUtils";
import { tilDatoMedUkedagOgManedNavnOgKlokkeslett } from "../../utils/datoUtils";
import { genererDato } from "../../components/mote/utils";
import { useForhandsvisningHilsen } from "./useForhandsvisningHilsen";
import {
  endreTidStedTexts,
  innkallingTexts,
} from "../../data/dialogmote/dialogmoteTexts";
import { Brukerinfo } from "../../data/navbruker/types/Brukerinfo";
import { DocumentComponentDto } from "../../data/dialogmote/types/dialogmoteTypes";

export interface ForhandsvisTidStedGenerator {
  arbeidsgiverTidSted(
    values: Partial<EndreTidStedSkjemaValues>
  ): DocumentComponentDto[];

  arbeidstakerTidSted(
    values: Partial<EndreTidStedSkjemaValues>
  ): DocumentComponentDto[];
}

export const useForhandsvisTidSted = (): ForhandsvisTidStedGenerator => {
  const navBruker = useNavBrukerData();
  const hilsen = useForhandsvisningHilsen();

  const arbeidsgiverTidSted = (values: Partial<EndreTidStedSkjemaValues>) => {
    const documentComponents = [
      arbeidsgiverIntro(navBruker),
      ...fellesInfo(values),
    ];

    if (values.begrunnelseArbeidstaker) {
      documentComponents.push(createParagraph(values.begrunnelseArbeidstaker));
    }

    return documentComponents;
  };

  const arbeidstakerTidSted = (values: Partial<EndreTidStedSkjemaValues>) => {
    const documentComponents = [
      arbeidstakerIntro(navBruker),
      ...fellesInfo(values),
    ];

    if (values.begrunnelseArbeidsgiver) {
      documentComponents.push(createParagraph(values.begrunnelseArbeidsgiver));
    }

    documentComponents.push(...hilsen);

    return documentComponents;
  };

  return {
    arbeidstakerTidSted,
    arbeidsgiverTidSted,
  };
};

const fellesInfo = (
  values: Partial<EndreTidStedSkjemaValues>
): DocumentComponentDto[] => {
  const { dato, klokkeslett, sted, videoLink } = values;

  const components = [
    createParagraph(
      `${endreTidStedTexts.intro1} ${tilDatoMedUkedagOgManedNavnOgKlokkeslett(
        genererDato(dato, klokkeslett)
      )}`
    ),
    createParagraph(endreTidStedTexts.intro2),
    createParagraphWithTitle(
      endreTidStedTexts.moteTidTitle,
      dato && klokkeslett
        ? tilDatoMedUkedagOgManedNavnOgKlokkeslett(
            genererDato(dato, klokkeslett)
          )
        : ""
    ),
    createParagraphWithTitle(endreTidStedTexts.moteStedTitle, sted || ""),
  ];

  if (videoLink) {
    components.push(createLink(innkallingTexts.videoLinkTitle, videoLink));
  }

  return components;
};

const arbeidstakerIntro = (navBruker: Brukerinfo): DocumentComponentDto =>
  createParagraph(`${navBruker.navn} (f.nr ${navBruker.kontaktinfo.fnr})`);

const arbeidsgiverIntro = (navBruker: Brukerinfo): DocumentComponentDto =>
  createParagraph(
    `Gjelder ${navBruker.navn} (f.nr ${navBruker.kontaktinfo.fnr})`
  );
