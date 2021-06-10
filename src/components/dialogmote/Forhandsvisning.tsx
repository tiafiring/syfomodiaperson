import ModalWrapper from "nav-frontend-modal";
import {
  FlexRow,
  JustifyContentType,
  ModalContentContainer,
  PaddingSize,
} from "../Layout";
import {
  Element,
  Innholdstittel,
  Normaltekst,
  Sidetittel,
} from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";
import React, { ReactElement } from "react";
import {
  DocumentComponentDto,
  DocumentComponentType,
} from "../../data/dialogmote/types/dialogmoteTypes";
import styled from "styled-components";
import Lenke from "nav-frontend-lenker";

const texts = {
  close: "Lukk",
};

const Paragraph = styled.div`
  margin-bottom: 1em;
`;

const TitledParagraph = styled.div`
  margin-bottom: 2em;
`;

const ForhandsvisningModal = styled(ModalWrapper)`
  max-width: 50em;
`;

type DocumentComponentTextProps = Required<
  Pick<DocumentComponentDto, "type" | "texts">
>;

const DocumentComponentText = ({ type, texts }: DocumentComponentTextProps) => {
  if (texts.length === 0) {
    return null;
  }
  //  TODO: Implement DocumentComponentType.HEADER for referat
  switch (type) {
    case DocumentComponentType.LINK: {
      const link = texts[0];
      return (
        <Lenke target="_blank" rel="noopener noreferrer" href={link}>
          {link}
        </Lenke>
      );
    }
    case DocumentComponentType.PARAGRAPH: {
      return (
        <>
          {texts.map((text, index) => (
            <Normaltekst key={index}>
              {text}
              <br />
            </Normaltekst>
          ))}
        </>
      );
    }
    default: {
      return null;
    }
  }
};

interface DocumentComponentVisningProps {
  documentComponent: DocumentComponentDto;
}

const DocumentComponentVisning = ({
  documentComponent: { type, title, texts },
}: DocumentComponentVisningProps) => {
  return title ? (
    <TitledParagraph>
      <Element>{title}</Element>
      <DocumentComponentText type={type} texts={texts} />
    </TitledParagraph>
  ) : (
    <Paragraph>
      <DocumentComponentText type={type} texts={texts} />
    </Paragraph>
  );
};

interface ForhandsvisningProps {
  title: string;
  subtitle: string;
  contentLabel: string;
  isOpen: boolean;
  handleClose: () => void;
  documentComponents: () => DocumentComponentDto[];
}

export const Forhandsvisning = ({
  isOpen,
  handleClose,
  title,
  subtitle,
  contentLabel,
  documentComponents,
}: ForhandsvisningProps): ReactElement => {
  return (
    <ForhandsvisningModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      closeButton={true}
      contentLabel={contentLabel}
      ariaHideApp={false}
    >
      <ModalContentContainer data-cy="ForhåndsvisningModal">
        <FlexRow
          topPadding={PaddingSize.SM}
          justifyContent={JustifyContentType.CENTER}
        >
          <Sidetittel>{title}</Sidetittel>
        </FlexRow>
        <FlexRow
          bottomPadding={PaddingSize.MD}
          justifyContent={JustifyContentType.CENTER}
        >
          <Innholdstittel>{subtitle}</Innholdstittel>
        </FlexRow>
        {documentComponents().map((component, index) => (
          <DocumentComponentVisning key={index} documentComponent={component} />
        ))}
        <FlexRow topPadding={PaddingSize.MD}>
          <Hovedknapp onClick={handleClose}>{texts.close}</Hovedknapp>
        </FlexRow>
      </ModalContentContainer>
    </ForhandsvisningModal>
  );
};
