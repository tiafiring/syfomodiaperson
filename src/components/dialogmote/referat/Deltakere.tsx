import React, { ReactElement } from "react";
import { useVeilederinfo } from "../../../hooks/useVeilederinfo";
import { useNavBrukerData } from "../../../data/navbruker/navbruker_hooks";
import { Element } from "nav-frontend-typografi";
import { Field } from "react-final-form";
import { ReferatCheckbox } from "./ReferatCheckbox";
import styled from "styled-components";

const texts = {
  title: "Deltakere i møtet",
};

interface DeltakereProps {
  arbeidsgiverNavn?: string;
}

interface DeltakerFieldProps {
  fieldName: string;
  label: string;
}

const DeltakerField = ({ fieldName, label }: DeltakerFieldProps) => (
  <Field name={fieldName} type="checkbox">
    {({ input, meta }) => (
      <ReferatCheckbox
        feil={meta.submitFailed && meta.error}
        id={fieldName}
        {...input}
        label={label}
      />
    )}
  </Field>
);

const DeltakereBoks = styled.div`
  margin-bottom: 4em;
`;

const Header = styled(Element)`
  margin-bottom: 1em;
`;

const Deltakere = ({ arbeidsgiverNavn }: DeltakereProps): ReactElement => {
  const navbruker = useNavBrukerData();
  const { veilederinfo } = useVeilederinfo();

  return (
    <DeltakereBoks>
      <Header>{texts.title}</Header>
      <DeltakerField
        fieldName="deltakerArbeidstaker"
        label={`Arbeidstaker (obligatorisk): ${navbruker?.navn}`}
      />
      <DeltakerField
        fieldName="deltakerArbeidsgiver"
        label={`Nærmeste leder: ${arbeidsgiverNavn || ""}`}
      />
      <DeltakerField
        fieldName="deltakerVeileder"
        label={`Fra NAV: ${veilederinfo?.navn}`}
      />
    </DeltakereBoks>
  );
};

export default Deltakere;
