import {
  DocumentComponentDto,
  DocumentComponentType,
} from "../data/dialogmote/types/dialogmoteTypes";

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
