import React, { ReactElement } from "react";
import styled from "styled-components";
import Panel from "nav-frontend-paneler";
import {
  FlexColumn,
  FlexRow,
  H2NoMargins,
  JustifyContentType,
} from "../../Layout";

interface Props {
  ikon: string;
  overskrift: string;
  underoverskrift?: string;
  topRightElement?: ReactElement;
  children: ReactElement[] | ReactElement;
}

const StyledPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  padding: 2em;
`;

const Icon = styled.img`
  margin-right: 1em;
  width: 3em;
`;

const DivRightAligned = styled.div`
  margin-left: auto;
`;

export const DialogmotePanel = ({
  ikon,
  overskrift,
  underoverskrift,
  topRightElement,
  children,
}: Props): ReactElement => {
  return (
    <StyledPanel>
      <FlexRow bottomPadding>
        <Icon src={ikon} alt="moteikon" />
        <FlexColumn justifyContent={JustifyContentType.CENTER}>
          <H2NoMargins>{overskrift}</H2NoMargins>
          <p>{underoverskrift}</p>
        </FlexColumn>
        {topRightElement && (
          <DivRightAligned>{topRightElement}</DivRightAligned>
        )}
      </FlexRow>

      <>{children}</>
    </StyledPanel>
  );
};
