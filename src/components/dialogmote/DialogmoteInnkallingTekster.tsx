import React, { ReactElement } from "react";
import { Knapp } from "nav-frontend-knapper";
import { Field } from "react-final-form";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";
import styled from "styled-components";
import AlertStripe from "nav-frontend-alertstriper";
import { Flex1Column, FlexRow, PaddingSize } from "../Layout";
import FritekstStor from "../FritekstStor";
import { Innholdstittel } from "nav-frontend-typografi";

const texts = {
  title: "Tekster i innkallingen",
  alert: "Hvis du vil føye til noe i standardtekstene, kan du skrive det her.",
  arbeidstakerLabel: "Fritekst til arbeidstakeren (valgfri)",
  arbeidsgiverLabel: "Fritekst til nærmeste leder (valgfri)",
  preview: "Forhåndsvisning",
};

interface FritekstBoksProps {
  fieldName: string;
  label: string;
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

const FritekstSeksjon = ({ fieldName, label }: FritekstBoksProps) => (
  <FritekstWrapper>
    <FlexRow bottomPadding={PaddingSize.SM}>
      <Flex1Column>
        <Field<string> name={fieldName}>
          {({ input }) => (
            <FritekstStor maxLength={1000} label={label} {...input} />
          )}
        </Field>
      </Flex1Column>
    </FlexRow>
    <FlexRow>
      <Knapp htmlType="button">{texts.preview}</Knapp>
    </FlexRow>
  </FritekstWrapper>
);

const DialogmoteInnkallingTekster = (): ReactElement => (
  <DialogmoteInnkallingSkjemaSeksjon>
    <TeksterTittel>{texts.title}</TeksterTittel>
    <TeksterAlert type="info">{texts.alert}</TeksterAlert>
    <FritekstSeksjon
      fieldName="fritekstArbeidstaker"
      label={texts.arbeidstakerLabel}
    />
    <FritekstSeksjon
      fieldName="fritekstArbeidsgiver"
      label={texts.arbeidsgiverLabel}
    />
  </DialogmoteInnkallingSkjemaSeksjon>
);

export default DialogmoteInnkallingTekster;
