import React, { ReactElement, useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import { Field, useFormState } from "react-final-form";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";
import styled from "styled-components";
import AlertStripe from "nav-frontend-alertstriper";
import { FlexColumn, FlexRow, PaddingSize } from "../../Layout";
import FritekstStor from "../../FritekstStor";
import { Innholdstittel } from "nav-frontend-typografi";
import { DialogmoteInnkallingSkjemaValues } from "./DialogmoteInnkallingSkjema";
import InnkallingArbeidstakerForhandsvisning from "./InnkallingArbeidstakerForhandsvisning";
import InnkallingArbeidsgiverForhandsvisning from "./InnkallingArbeidsgiverForhandsvisning";

const texts = {
  title: "Tekster i innkallingen",
  alert: "Hvis du vil føye til noe i standardtekstene, kan du skrive det her.",
  arbeidstakerLabel: "Fritekst til arbeidstakeren (valgfri)",
  arbeidsgiverLabel: "Fritekst til nærmeste leder (valgfri)",
  preview: "Forhåndsvisning",
};

interface FritekstSeksjonProps {
  fieldName: string;
  label: string;
  handlePreviewClick: () => void;
}

const TeksterAlert = styled(AlertStripe)`
  margin-bottom: 4em;
  .alertstripe__tekst {
    max-width: 100%;
  }
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
            <FritekstStor maxLength={1000} label={label} {...input} />
          )}
        </Field>
      </FlexColumn>
    </FlexRow>
    <FlexRow>
      <Knapp htmlType="button" onClick={handlePreviewClick}>
        {texts.preview}
      </Knapp>
    </FlexRow>
  </FritekstWrapper>
);

const DialogmoteInnkallingTekster = (): ReactElement => {
  const { values } = useFormState<DialogmoteInnkallingSkjemaValues>();
  const [
    visInnkallingArbeidstakerPreview,
    setVisInnkallingArbeidstakerPreview,
  ] = useState(false);
  const [
    visInnkallingArbeidsgiverPreview,
    setVisInnkallingArbeidsgiverPreview,
  ] = useState(false);
  return (
    <DialogmoteInnkallingSkjemaSeksjon>
      <TeksterTittel>{texts.title}</TeksterTittel>
      <TeksterAlert type="info">{texts.alert}</TeksterAlert>
      <FritekstSeksjon
        fieldName="fritekstArbeidstaker"
        label={texts.arbeidstakerLabel}
        handlePreviewClick={() => setVisInnkallingArbeidstakerPreview(true)}
      />
      <InnkallingArbeidstakerForhandsvisning
        isOpen={visInnkallingArbeidstakerPreview}
        handleClose={() => setVisInnkallingArbeidstakerPreview(false)}
        innkallingSkjemaValues={values}
      />
      <FritekstSeksjon
        fieldName="fritekstArbeidsgiver"
        label={texts.arbeidsgiverLabel}
        handlePreviewClick={() => setVisInnkallingArbeidsgiverPreview(true)}
      />
      <InnkallingArbeidsgiverForhandsvisning
        isOpen={visInnkallingArbeidsgiverPreview}
        handleClose={() => setVisInnkallingArbeidsgiverPreview(false)}
        innkallingSkjemaValues={values}
      />
    </DialogmoteInnkallingSkjemaSeksjon>
  );
};

export default DialogmoteInnkallingTekster;
