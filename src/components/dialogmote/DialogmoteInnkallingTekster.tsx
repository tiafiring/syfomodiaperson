import React, { ReactElement } from "react";
import { Textarea } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { Field } from "react-final-form";
import { Column, Row } from "nav-frontend-grid";
import DialogmoteInnkallingSkjemaTittel from "./DialogmoteInnkallingSkjemaTittel";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";
import styled from "styled-components";
import AlertStripe from "nav-frontend-alertstriper";

const texts = {
  title: "Tekster til innkallingen",
  alert: "Hvis du vil føye til noe i standardtekstene, kan du skrive det her.",
  sykmeldtLabel: "Fritekst til den sykmeldte kan skrives her (valgfri)",
  arbeidsgiverLabel: "Fritekst til nærmeste leder kan skrives her (valgfri)",
  preview: "Forhåndsvisning",
};

interface FritekstBoksProps {
  fieldName: string;
  label: string;
}

const TeksterAlert = styled(AlertStripe)`
  margin-bottom: 2.5rem;
  .alertstripe__tekst {
    max-width: 100%;
  }
`;

const FritekstBoksRow = styled(Row)`
  margin-bottom: 4rem;
`;

const TextAreaRow = styled(Row)`
  margin-bottom: 1rem;
`;

const FritekstBoks = ({ fieldName, label }: FritekstBoksProps) => (
  <FritekstBoksRow>
    <Column className="col-xs-12">
      <TextAreaRow>
        <Column className="col-xs-12">
          <Field<string> name={fieldName}>
            {({ input }) => (
              <Textarea maxLength={1000} label={label} {...input} />
            )}
          </Field>
        </Column>
      </TextAreaRow>
      <Knapp htmlType="button">{texts.preview}</Knapp>
    </Column>
  </FritekstBoksRow>
);

const DialogmoteInnkallingTekster = (): ReactElement => (
  <DialogmoteInnkallingSkjemaSeksjon>
    <DialogmoteInnkallingSkjemaTittel>
      {texts.title}
    </DialogmoteInnkallingSkjemaTittel>
    <TeksterAlert type="info">{texts.alert}</TeksterAlert>
    <FritekstBoks
      fieldName="fritekstArbeidstaker"
      label={texts.sykmeldtLabel}
    />
    <FritekstBoks
      fieldName="fritekstArbeidsgiver"
      label={texts.arbeidsgiverLabel}
    />
  </DialogmoteInnkallingSkjemaSeksjon>
);

export default DialogmoteInnkallingTekster;
