import {
  DocumentComponentDto,
  DocumentComponentType,
} from "@/data/dialogmote/types/dialogmoteTypes";
import { StandardTekst } from "@/data/dialogmote/dialogmoteTexts";

export const createLink = (
  title: string,
  text: string
): DocumentComponentDto => ({
  type: DocumentComponentType.LINK,
  title,
  texts: [text],
});
export const createParagraphWithTitle = (
  title: string,
  ...texts: string[]
): DocumentComponentDto => ({
  type: DocumentComponentType.PARAGRAPH,
  title,
  texts,
});
export const createParagraph = (...texts: string[]): DocumentComponentDto => ({
  type: DocumentComponentType.PARAGRAPH,
  texts,
});
export const createStandardtekstParagraph = (
  standardTekst: StandardTekst
): DocumentComponentDto => ({
  type: DocumentComponentType.PARAGRAPH,
  key: standardTekst.key,
  title: standardTekst.label,
  texts: [standardTekst.text],
});

export const createHeader = (text: string): DocumentComponentDto => ({
  type: DocumentComponentType.HEADER,
  texts: [text],
});
