import styled from "styled-components";
import { FlexColumn, FlexRow, PaddingSize } from "./Layout";
import React, { ReactElement } from "react";

interface Props {
  icon: string;
  iconAltText?: string;
  title: ReactElement;
  subtitle?: string;
  topPadding?: PaddingSize;
}

const Icon = styled.img`
  margin-right: 1em;
  width: 1.5em;
`;

export const InfoRow = ({
  icon,
  iconAltText = "Ikon",
  title,
  subtitle,
  topPadding,
}: Props) => {
  return (
    <FlexRow topPadding={topPadding}>
      <FlexColumn>
        <Icon src={icon} alt={iconAltText} />
      </FlexColumn>
      <FlexColumn>
        {title}
        {subtitle && (
          <FlexRow>
            <i>{subtitle}</i>
          </FlexRow>
        )}
      </FlexColumn>
    </FlexRow>
  );
};
