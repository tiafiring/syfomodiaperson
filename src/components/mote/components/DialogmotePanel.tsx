import React, { ReactElement } from "react";
import styled from "styled-components";
import Panel from "nav-frontend-paneler";
import { FlexColumn, FlexRow } from "../../Layout";

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
`;

const Icon = styled.img`
  margin-right: 1em;
  width: 3em;
`;

const H2NoMargins = styled.h2`
  margin: 0;
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
        <FlexColumn>
          <FlexRow>
            <Icon src={ikon} alt="moteikon" />
            <div>
              <H2NoMargins>{overskrift}</H2NoMargins>
              <p>{underoverskrift}</p>
            </div>
          </FlexRow>
        </FlexColumn>
        {topRightElement && <FlexColumn>{topRightElement}</FlexColumn>}
      </FlexRow>

      <>{children}</>
    </StyledPanel>
  );
};
