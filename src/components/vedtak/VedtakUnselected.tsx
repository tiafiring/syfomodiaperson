import * as React from "react";
import styled from "styled-components";
import { Column } from "nav-frontend-grid";

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

const grey = "#78706A";

const StyledCenteredText = styled.h4`
  text-align: center;
  font-weight: normal;
  color: ${grey};
`;

const VedtakUnselected = () => {
  return (
    <StyledColumn className="col-xs-7">
      <StyledIcon src="/sykefravaer/img/svg/dokument.svg" alt="dokumentIkon" />
      <StyledCenteredText>{texts.noSelectedVedtak}</StyledCenteredText>
    </StyledColumn>
  );
};

export default VedtakUnselected;
