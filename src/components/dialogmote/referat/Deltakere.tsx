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

export type Deltaker = "arbeidstaker" | "arbeidsgiver" | "veileder";

interface DeltakereProps {
  arbeidsgiverNavn?: string;
}

interface DeltakerFieldProps {
  deltaker: Deltaker;
  label: string;
}

const DeltakerField = ({ deltaker, label }: DeltakerFieldProps) => (
  <Field<Deltaker> name="deltakere" type="checkbox" value={deltaker}>
    {({ input }) => <ReferatCheckbox {...input} label={label} />}
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
        deltaker="arbeidstaker"
        label={`Arbeidstaker (obligatorisk): ${navbruker?.navn}`}
      />
      <DeltakerField
        deltaker="arbeidsgiver"
        label={`Nærmeste leder: ${arbeidsgiverNavn || ""}`}
      />
      <DeltakerField
        deltaker="veileder"
        label={`Fra NAV: ${veilederinfo?.navn}`}
      />
    </DeltakereBoks>
  );
};

export default Deltakere;
