import React from "react";
import styled from "styled-components";
import { latestSykmeldingForVirksomhet } from "../../../utils/sykmeldinger/sykmeldingUtils";
import { useSykmeldingerData } from "../../../data/sykmelding/sykmeldinger_hooks";

const texts = {
  stillingsprosent: "Stillingsprosent:",
};

const EkstraInfo = styled.div`
  margin-bottom: 1em;
`;

const BoldText = styled.span`
  font-weight: bold;
  margin-right: 1em;
`;

interface StillingsprosentProps {
  virksomhetsnummer: string;
}

const Stillingsprosent = ({ virksomhetsnummer }: StillingsprosentProps) => {
  const sykmeldingerData = useSykmeldingerData();
  const newestSykmeldingForVirksomhet = latestSykmeldingForVirksomhet(
    sykmeldingerData,
    virksomhetsnummer
  );

  return (
    <EkstraInfo>
      <BoldText>{texts.stillingsprosent}</BoldText>
      <span>{`${newestSykmeldingForVirksomhet?.stillingsprosent}%`}</span>
    </EkstraInfo>
  );
};

export default Stillingsprosent;
