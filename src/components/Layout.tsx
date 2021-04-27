import styled from "styled-components";

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2em;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
