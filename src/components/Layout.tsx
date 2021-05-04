import styled from "styled-components";

export enum JustifyContentType {
  CENTER = "center",
  FLEX_END = "flex-end",
  FLEX_START = "flex-start",
}

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2em;
`;

interface FlexColumnProps {
  justifyContent?: JustifyContentType;
}

export const FlexColumn = styled.div<FlexColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.justifyContent || JustifyContentType.FLEX_START};
`;

export enum PaddingSize {
  SM = "1em",
  MD = "2em",
  LG = "3em",
}

interface RowProps {
  topPadding?: PaddingSize;
  bottomPadding?: PaddingSize;
}

export const FlexRow = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding-top: ${(props) => props.topPadding || 0};
  padding-bottom: ${(props) => props.bottomPadding || 0};
`;

export const H2NoMargins = styled.h2`
  margin: 0;
`;

export const H3NoMargins = styled.h3`
  margin: 0;
`;
