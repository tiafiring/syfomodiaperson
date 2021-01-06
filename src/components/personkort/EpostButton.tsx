import React, { useRef, useState } from "react";
import { Column } from "nav-frontend-grid";
import Popover from "nav-frontend-popover";
import styled from "styled-components";

const textEpostCopied = (epost?: string) => {
  return `${epost} er kopiert!`;
};

const StyledButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
`;

const StyledP = styled.p`
  padding: 0.5em;
`;

interface EpostButtonProps {
  epost?: string;
}

const EpostButton = ({ epost }: EpostButtonProps) => {
  const [popoverAnker, setPopoverAnker] = useState<HTMLElement>();
  const [show, setShow] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglePopover = () => {
    if (popoverAnker) {
      setPopoverAnker(undefined);
    } else if (buttonRef.current) {
      setPopoverAnker(buttonRef.current);

      if (!show) {
        setShow(true);
      }

      if (epost) {
        navigator.clipboard.writeText(epost);
      }
    }
  };

  return (
    <Column className="col-sm-2">
      <StyledButton ref={buttonRef} onClick={togglePopover} value={epost}>
        <img alt="epost" src="/sykefravaer/img/svg/epost.svg" />
      </StyledButton>
      <Popover
        ankerEl={popoverAnker}
        onRequestClose={() => setPopoverAnker(undefined)}
      >
        <StyledP>{textEpostCopied(epost)}</StyledP>
      </Popover>
    </Column>
  );
};

export default EpostButton;
