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
  flex: 1;
  justify-content: ${(props) =>
    props.justifyContent || JustifyContentType.FLEX_START};
`;

interface RowProps {
  topPadding?: boolean;
  bottomPadding?: boolean;
}

export const FlexRow = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding-top: ${(props) => (props.topPadding ? "2em" : "0")};
  padding-bottom: ${(props) => (props.bottomPadding ? "2em" : "0")};
`;

export const H2NoMargins = styled.h2`
  margin: 0;
`;

export const H3NoMargins = styled.h3`
  margin: 0;
`;
