import * as React from "react";
import { Column } from "nav-frontend-grid";
import styled from "styled-components";

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
      <StyledIcon
        src="/sykefravaer/img/svg/mappe-advarsel.svg"
        alt="mappeAdvarselIkon"
      />
      <StyledCenteredText>{texts.empty}</StyledCenteredText>
    </StyledColumn>
  );
};

export default VedtakEmpty;
