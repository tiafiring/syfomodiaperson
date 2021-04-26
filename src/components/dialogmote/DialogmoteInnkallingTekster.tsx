import React, { ReactElement } from "react";
import { Textarea } from "nav-frontend-skjema";
import { Knapp } from "nav-frontend-knapper";
import { Field } from "react-final-form";
import { Column, Row } from "nav-frontend-grid";
import DialogmoteInnkallingSkjemaTittel from "./DialogmoteInnkallingSkjemaTittel";
import DialogmoteInnkallingSkjemaSeksjon from "./DialogmoteInnkallingSkjemaSeksjon";
import styled from "styled-components";
import AlertStripe from "nav-frontend-alertstriper";
import DialogmoteInnkallingSkjemaRow from "./DialogmoteInnkallingSkjemaRow";

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
`;

const TeksterRow = styled(Row)`
  margin-bottom: 2.5rem;
`;

const FritekstBoks = ({ fieldName, label }: FritekstBoksProps) => (
  <TeksterRow>
    <Column className="col-xs-12">
      <DialogmoteInnkallingSkjemaRow>
        <Column className="col-xs-12">
          <Field<string> name={fieldName}>
            {({ input }) => (
              <Textarea maxLength={1000} label={label} {...input} />
            )}
          </Field>
        </Column>
      </DialogmoteInnkallingSkjemaRow>
      <Knapp htmlType="button">{texts.preview}</Knapp>
    </Column>
  </TeksterRow>
);

const DialogmoteInnkallingTekster = (): ReactElement => (
  <DialogmoteInnkallingSkjemaSeksjon>
    <DialogmoteInnkallingSkjemaTittel>
      {texts.title}
    </DialogmoteInnkallingSkjemaTittel>
    <TeksterAlert type="info">{texts.alert}</TeksterAlert>
    <FritekstBoks fieldName={"fritekstSykmeldt"} label={texts.sykmeldtLabel} />
    <FritekstBoks
      fieldName={"fritekstArbeidsgiver"}
      label={texts.arbeidsgiverLabel}
    />
  </DialogmoteInnkallingSkjemaSeksjon>
);

export default DialogmoteInnkallingTekster;
