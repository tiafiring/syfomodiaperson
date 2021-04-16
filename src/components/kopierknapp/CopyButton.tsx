import React, { useRef, useState } from "react";
import styled from "styled-components";
import Popover from "nav-frontend-popover";
import { CopyImage } from "../../../img/ImageComponents";

interface CopyButtonProps {
  message: string;
  value: string;
}

const StyledButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  img {
    margin-right: 0;
  }
`;

const StyledP = styled.p`
  padding: 0.5em;
`;

const CopyButton = ({ message, value }: CopyButtonProps) => {
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

      if (value) {
        navigator.clipboard.writeText(value);
      }
    }
  };

  return (
    <div>
      <StyledButton
        ref={buttonRef}
        onClick={(event) => {
          event.stopPropagation();
          togglePopover();
        }}
      >
        <img alt="kopier" src={CopyImage} />
      </StyledButton>
      <Popover
        ankerEl={popoverAnker}
        onRequestClose={() => setPopoverAnker(undefined)}
      >
        <StyledP>{message}</StyledP>
      </Popover>
    </div>
  );
};

export default CopyButton;
