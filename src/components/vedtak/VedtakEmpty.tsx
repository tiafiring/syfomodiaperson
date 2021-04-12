import * as React from "react";
import { Column } from "nav-frontend-grid";
import styled from "styled-components";
import { MappeAdvarselImage } from "../../../img/ImageComponents";

const texts = {
  empty: "Denne personen har ingen vedtak",
};

const StyledColumn = styled(Column)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledIcon = styled.img`
  margin-top: 5em;
`;

const grey = "#78706A";

const StyledCenteredText = styled.h4`
  text-align: center;
  font-weight: normal;
  color: ${grey};
`;

const VedtakEmpty = () => {
  return (
    <StyledColumn className="col-xs-12">
      <StyledIcon src={MappeAdvarselImage} alt="mappeAdvarselIkon" />
      <StyledCenteredText>{texts.empty}</StyledCenteredText>
    </StyledColumn>
  );
};

export default VedtakEmpty;
