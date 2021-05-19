import React from "react";
import styled from "styled-components";
import { Checkbox } from "nav-frontend-skjema";
import { useVeilederinfo } from "../../../hooks/useVeilederinfo";
import { useNavBrukerData } from "../../../data/navbruker/navbruker_hooks";

const texts = {
  deltakereTitle: "Deltakere i møtet",
};

interface DeltakereProps {
  arbeidsgiverNavn?: string;
}

const DeltakereBoks = styled.div`
  margin-bottom: 2em;

  > * {
    margin-bottom: 0.5em;
  }
`;

const BoldText = styled.p`
  font-weight: bold;
`;

const Deltakere = ({ arbeidsgiverNavn }: DeltakereProps) => {
  const navbruker = useNavBrukerData();
  const { veilederinfo } = useVeilederinfo();

  return (
    <DeltakereBoks>
      <BoldText>{texts.deltakereTitle}</BoldText>
      <Checkbox label={`Arbeidstager: ${navbruker?.navn}`} checked readOnly />
      <Checkbox
        label={`Nærmeste leder: ${arbeidsgiverNavn || ""}`}
        checked
        readOnly
      />
      <Checkbox label={`Fra NAV: ${veilederinfo?.navn}`} checked readOnly />
    </DeltakereBoks>
  );
};

export default Deltakere;
