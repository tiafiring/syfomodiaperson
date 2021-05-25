import React, { ReactElement } from "react";
import { DialogmoteInnkallingSkjemaValues } from "./DialogmoteInnkallingSkjema";
import { useForhandsvisInnkalling } from "../../../hooks/useForhandsvisInnkalling";
import { Forhandsvisning } from "../Forhandsvisning";

export const texts = {
  title: "Innkalling til dialogmøte",
  subtitle: "(brev til arbeidstakeren)",
  contentLabel: "Forhåndsvis innkalling til dialogmøte arbeidstaker",
  close: "Lukk",
};

interface InnkallingArbeidstakerForhandsvisningProps {
  isOpen: boolean;
  handleClose: () => void;
  innkallingSkjemaValues: DialogmoteInnkallingSkjemaValues;
}

const InnkallingArbeidstakerForhandsvisning = ({
  isOpen,
  handleClose,
  innkallingSkjemaValues,
}: InnkallingArbeidstakerForhandsvisningProps): ReactElement => {
  const { arbeidstakerInnkalling } = useForhandsvisInnkalling();
  return (
    <Forhandsvisning
      contentLabel={texts.contentLabel}
      title={texts.title}
      subtitle={texts.subtitle}
      isOpen={isOpen}
      handleClose={handleClose}
      documentComponents={() => arbeidstakerInnkalling(innkallingSkjemaValues)}
    />
  );
};

export default InnkallingArbeidstakerForhandsvisning;
