import * as React from "react";
import styled from "styled-components";
import { Column } from "nav-frontend-grid";
import { DocumentImage } from "../../../img/ImageComponents";
import navFarger from "nav-frontend-core";

const texts = {
  noSelectedVedtak: "Ingen vedtak er valgt",
};

const StyledColumn = styled(Column)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledIcon = styled.img`
  margin-top: 2.5em;
  width: 2em;
`;

const StyledCenteredText = styled.h4`
  text-align: center;
  font-weight: normal;
  color: ${navFarger.navGra60};
`;

const VedtakUnselected = () => {
  return (
    <StyledColumn className="col-xs-7">
      <StyledIcon src={DocumentImage} alt="dokumentIkon" />
      <StyledCenteredText>{texts.noSelectedVedtak}</StyledCenteredText>
    </StyledColumn>
  );
};

export default VedtakUnselected;
