import React, { ReactElement } from "react";
import { DialogmoteInnkallingSkjemaValues } from "./DialogmoteInnkallingSkjema";
import { useForhandsvisInnkalling } from "../../../hooks/useForhandsvisInnkalling";
import { Forhandsvisning } from "../Forhandsvisning";

export const texts = {
  title: "Innkalling til dialogmøte",
  subtitle: "(brev til nærmeste leder)",
  contentLabel: "Forhåndsvis innkalling til dialogmøte arbeidsgiver",
  close: "Lukk",
};

interface InnkallingArbeidsgiverForhandsvisningProps {
  isOpen: boolean;
  handleClose: () => void;
  innkallingSkjemaValues: DialogmoteInnkallingSkjemaValues;
}

const InnkallingArbeidsgiverForhandsvisning = ({
  isOpen,
  handleClose,
  innkallingSkjemaValues,
}: InnkallingArbeidsgiverForhandsvisningProps): ReactElement => {
  const { arbeidsgiverInnkalling } = useForhandsvisInnkalling();
  return (
    <Forhandsvisning
      contentLabel={texts.contentLabel}
      title={texts.title}
      subtitle={texts.subtitle}
      isOpen={isOpen}
      handleClose={handleClose}
      documentComponents={() => arbeidsgiverInnkalling(innkallingSkjemaValues)}
    />
  );
};

export default InnkallingArbeidsgiverForhandsvisning;
