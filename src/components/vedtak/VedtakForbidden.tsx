import * as React from "react";
import { Column } from "nav-frontend-grid";
import styled from "styled-components";

const texts = {
  empty: "Du har ikke tilgang til denne personens vedtak",
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

const VedtakForbidden = () => {
  return (
    <StyledColumn className="col-xs-12">
      <StyledIcon
        src="/sykefravaer/img/svg/mappe-feil.svg"
        alt="mappeFeilIkon"
      />
      <StyledCenteredText>{texts.empty}</StyledCenteredText>
    </StyledColumn>
  );
};

export default VedtakForbidden;
