import React, { ReactElement, useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import { Field, useFormState } from "react-final-form";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";
import styled from "styled-components";
import { FlexColumn, FlexRow, PaddingSize } from "../../Layout";
import { Innholdstittel } from "nav-frontend-typografi";
import { DialogmoteInnkallingSkjemaValues } from "./DialogmoteInnkallingSkjema";
import { useForhandsvisInnkalling } from "../../../hooks/dialogmote/useForhandsvisInnkalling";
import { Forhandsvisning } from "../Forhandsvisning";
import { AlertstripeFullbredde } from "../../AlertstripeFullbredde";
import Fritekst from "../../Fritekst";

export const texts = {
  title: "Tekster i innkallingen",
  alert: "Hvis du vil føye til noe i standardtekstene, kan du skrive det her.",
  arbeidstakerLabel: "Fritekst til arbeidstakeren (valgfri)",
  arbeidsgiverLabel: "Fritekst til nærmeste leder (valgfri)",
  forhandsvisning: "Forhåndsvisning",
  forhandsvisningTitle: "Innkalling til dialogmøte",
  forhandsvisningArbeidstakerSubtitle: "(brev til arbeidstakeren)",
  forhandsvisningArbeidstakerContentLabel:
    "Forhåndsvis innkalling til dialogmøte arbeidstaker",
  forhandsvisningArbeidsgiverSubtitle: "(brev til nærmeste leder)",
  forhandsvisningArbeidsgiverContentLabel:
    "Forhåndsvis innkalling til dialogmøte arbeidsgiver",
};

export const MAX_LENGTH_INNKALLING_FRITEKST = 1000;

interface FritekstSeksjonProps {
  fieldName: string;
  label: string;
  handlePreviewClick: () => void;
}

const TeksterAlert = styled(AlertstripeFullbredde)`
  margin-bottom: 4em;
`;

const FritekstWrapper = styled.div`
  margin-bottom: 4em;
`;

const TeksterTittel = styled(Innholdstittel)`
  margin-bottom: 0.5em;
`;

const FritekstSeksjon = ({
  fieldName,
  label,
  handlePreviewClick,
}: FritekstSeksjonProps) => (
  <FritekstWrapper>
    <FlexRow bottomPadding={PaddingSize.SM}>
      <FlexColumn flex={1}>
        <Field<string> name={fieldName}>
          {({ input }) => (
            <Fritekst
              size="medium"
              maxLength={MAX_LENGTH_INNKALLING_FRITEKST}
              label={label}
              {...input}
            />
          )}
        </Field>
      </FlexColumn>
    </FlexRow>
    <FlexRow>
      <Knapp htmlType="button" onClick={handlePreviewClick}>
        {texts.forhandsvisning}
      </Knapp>
    </FlexRow>
  </FritekstWrapper>
);

const DialogmoteInnkallingTekster = (): ReactElement => {
  const { values } = useFormState<DialogmoteInnkallingSkjemaValues>();
  const [
    displayInnkallingArbeidstakerPreview,
    setDisplayInnkallingArbeidstakerPreview,
  ] = useState(false);
  const [
    displayInnkallingArbeidsgiverPreview,
    setDisplayInnkallingArbeidsgiverPreview,
  ] = useState(false);
  const {
    arbeidstakerInnkalling,
    arbeidsgiverInnkalling,
  } = useForhandsvisInnkalling();
  return (
    <DialogmoteInnkallingSkjemaSeksjon>
      <TeksterTittel>{texts.title}</TeksterTittel>
      <TeksterAlert type="info">{texts.alert}</TeksterAlert>
      <FritekstSeksjon
        fieldName="fritekstArbeidstaker"
        label={texts.arbeidstakerLabel}
        handlePreviewClick={() => setDisplayInnkallingArbeidstakerPreview(true)}
      />
      <Forhandsvisning
        title={texts.forhandsvisningTitle}
        subtitle={texts.forhandsvisningArbeidstakerSubtitle}
        contentLabel={texts.forhandsvisningArbeidstakerContentLabel}
        isOpen={displayInnkallingArbeidstakerPreview}
        handleClose={() => setDisplayInnkallingArbeidstakerPreview(false)}
        documentComponents={() => arbeidstakerInnkalling(values)}
      />
      <FritekstSeksjon
        fieldName="fritekstArbeidsgiver"
        label={texts.arbeidsgiverLabel}
        handlePreviewClick={() => setDisplayInnkallingArbeidsgiverPreview(true)}
      />
      <Forhandsvisning
        title={texts.forhandsvisningTitle}
        subtitle={texts.forhandsvisningArbeidsgiverSubtitle}
        contentLabel={texts.forhandsvisningArbeidsgiverContentLabel}
        isOpen={displayInnkallingArbeidsgiverPreview}
        handleClose={() => setDisplayInnkallingArbeidsgiverPreview(false)}
        documentComponents={() => arbeidsgiverInnkalling(values)}
      />
    </DialogmoteInnkallingSkjemaSeksjon>
  );
};

export default DialogmoteInnkallingTekster;
