import styled from "styled-components";
import Panel from "nav-frontend-paneler";
import { FlexColumn } from "../../Layout";
import { ReactElement } from "react";
import React from "react";
import { navLysBlaDarken40, navLysBlaLighten80 } from "../../../colors";

const InfoPanel = styled(Panel)`
  background-color: ${navLysBlaLighten80};
  border: 1px solid ${navLysBlaDarken40};
  margin-top: 1.9em;
`;

interface ReferatInfoColumnProps {
  children?: ReactElement[] | ReactElement;
}

export const ReferatInfoColumn = ({
  children,
}: ReferatInfoColumnProps): ReactElement => (
  <FlexColumn flex={0.5}>
    {children ? <InfoPanel>{children}</InfoPanel> : null}
  </FlexColumn>
);
